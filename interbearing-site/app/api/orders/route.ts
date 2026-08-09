import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

type RawOrderItem = {
  id?: unknown;
  quantity?: unknown;
};

type OrderPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  comment?: unknown;
  items?: unknown;
  website?: unknown;
  startedAt?: unknown;
  privacyConsent?: unknown;
};

type OrderItemSnapshot = {
  product_id: string;
  brand: string;
  article: string;
  title: string;
  price: number | null;
  quantity: number;
  line_total: number | null;
};

type OrderRpcResult = {
  order_id: string;
  order_items: unknown;
  order_total: number | null;
  has_unknown_prices: boolean;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string"
    ? value.trim().replace(/\s+/g, " ").slice(0, maxLength)
    : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatPrice(value: number) {
  return `${value.toLocaleString("uk-UA")} грн`;
}

function parseItems(value: unknown) {
  if (!Array.isArray(value) || value.length === 0 || value.length > 50) {
    return null;
  }

  const items = value
    .map((item) => item as RawOrderItem)
    .map((item) => ({
      id: cleanText(item.id, 80),
      quantity: Number(item.quantity),
    }))
    .filter(
      (item) =>
        item.id &&
        Number.isInteger(item.quantity) &&
        item.quantity >= 1 &&
        item.quantity <= 99,
    );

  return items.length === value.length ? items : null;
}

function stockErrorMessage(message: string) {
  if (message.startsWith("INSUFFICIENT_STOCK:")) {
    const [, article, available] = message.split(":");
    return `Недостатньо товару ${article}. Доступно: ${available || 0} шт.`;
  }
  if (message.startsWith("PRODUCT_UNAVAILABLE:")) {
    const [, article] = message.split(":");
    return `Товар ${article} зараз недоступний для замовлення.`;
  }
  if (message === "PRODUCT_NOT_FOUND") {
    return "Один із товарів більше не доступний. Оновіть кошик.";
  }
  if (
    message === "INVALID_ORDER_ITEMS" ||
    message === "INVALID_ORDER_QUANTITY"
  ) {
    return "Кошик містить некоректну кількість товару.";
  }
  return "Не вдалося зберегти замовлення. Спробуйте ще раз.";
}

function createOrderText(
  orderNumber: string,
  customer: { name: string; phone: string; email: string; comment: string },
  items: OrderItemSnapshot[],
  total: number | null,
  hasUnknownPrices: boolean,
) {
  return [
    `🛒 Нове замовлення INTERBEARING №${orderNumber}`,
    "",
    `Ім’я: ${customer.name}`,
    `Телефон: ${customer.phone}`,
    `Email: ${customer.email || "не вказано"}`,
    "",
    "Товари:",
    ...items.map((item, index) => {
      const price =
        item.price === null ? "ціна уточнюється" : formatPrice(item.price);
      return `${index + 1}. ${item.brand} ${item.article} — ${item.title}; кількість: ${item.quantity}; ціна: ${price}`;
    }),
    "",
    total === null ? "Сума: уточнюється" : `Сума: ${formatPrice(total)}`,
    hasUnknownPrices ? "Є позиції без указаної ціни." : "",
    customer.comment ? `Коментар: ${customer.comment}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error("Telegram is not configured.");

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Telegram request failed: ${response.status}`);
  }
}

async function sendEmail(
  customer: { name: string; email: string },
  text: string,
  orderNumber: string,
) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from =
    process.env.CONTACT_FROM_EMAIL ||
    "INTERBEARING <onboarding@resend.dev>";
  if (!apiKey || !to) throw new Error("Email is not configured.");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `interbearing-order-${orderNumber}`,
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: customer.email || undefined,
      subject: `Нове замовлення INTERBEARING №${orderNumber}`,
      text,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.65;color:#111827">
          <h1 style="font-size:22px">Нове замовлення INTERBEARING №${escapeHtml(orderNumber)}</h1>
          <pre style="white-space:pre-wrap;font:inherit">${escapeHtml(text)}</pre>
        </div>
      `,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Resend request failed: ${response.status} ${details}`);
  }
}

export async function POST(request: Request) {
  try {
    const rateLimit = await checkRateLimit(request, "orders", 5, 900);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          message:
            "Забагато спроб оформлення. Зачекайте кілька хвилин і спробуйте ще раз.",
        },
        {
          status: 429,
          headers: { "Retry-After": String(rateLimit.retryAfter) },
        },
      );
    }

    if (!(request.headers.get("content-type") || "").includes("application/json")) {
      return NextResponse.json(
        { message: "Непідтримуваний формат запиту." },
        { status: 415 },
      );
    }

    const payload = (await request.json()) as OrderPayload;
    const name = cleanText(payload.name, 80);
    const phone = cleanText(payload.phone, 40);
    const email = cleanText(payload.email, 120);
    const comment = cleanText(payload.comment, 500);
    const website = cleanText(payload.website, 200);
    const startedAt = Number(payload.startedAt);
    const requestedItems = parseItems(payload.items);

    if (website) {
      return NextResponse.json(
        { message: "Не вдалося надіслати замовлення." },
        { status: 400 },
      );
    }
    if (payload.privacyConsent !== true) {
      return NextResponse.json(
        { message: "Підтвердьте згоду з Політикою конфіденційності." },
        { status: 400 },
      );
    }
    const receivedAt = Date.now();
    if (
      Number.isFinite(startedAt) &&
      startedAt <= receivedAt &&
      receivedAt - startedAt < 2500
    ) {
      return NextResponse.json(
        { message: "Перевірте дані та спробуйте ще раз." },
        { status: 400 },
      );
    }
    if (name.length < 2) {
      return NextResponse.json(
        { message: "Вкажіть ваше ім’я." },
        { status: 400 },
      );
    }
    if (phone.length < 7) {
      return NextResponse.json(
        { message: "Вкажіть коректний номер телефону." },
        { status: 400 },
      );
    }
    if (email && !EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { message: "Перевірте адресу електронної пошти." },
        { status: 400 },
      );
    }
    if (!requestedItems) {
      return NextResponse.json(
        { message: "Кошик порожній або містить некоректні товари." },
        { status: 400 },
      );
    }

    const supabase = await createClient();
    const { data: rpcData, error: rpcError } = await supabase.rpc(
      "create_order_with_stock",
      {
        p_customer_name: name,
        p_customer_phone: phone,
        p_customer_email: email || "",
        p_comment: comment || "",
        p_items: requestedItems,
      },
    );

    if (rpcError) {
      console.error("Atomic order creation failed", rpcError);
      const isStockProblem =
        rpcError.message.startsWith("INSUFFICIENT_STOCK:") ||
        rpcError.message.startsWith("PRODUCT_UNAVAILABLE:") ||
        rpcError.message === "PRODUCT_NOT_FOUND" ||
        rpcError.message === "INVALID_ORDER_ITEMS" ||
        rpcError.message === "INVALID_ORDER_QUANTITY";

      return NextResponse.json(
        { message: stockErrorMessage(rpcError.message) },
        { status: isStockProblem ? 409 : 500 },
      );
    }

    const rpcResult = (Array.isArray(rpcData) ? rpcData[0] : rpcData) as
      | OrderRpcResult
      | null;

    if (!rpcResult || !Array.isArray(rpcResult.order_items)) {
      console.error("Atomic order creation returned invalid data", rpcData);
      return NextResponse.json(
        { message: "Не вдалося підтвердити замовлення." },
        { status: 500 },
      );
    }

    const orderId = rpcResult.order_id;
    const items = rpcResult.order_items as OrderItemSnapshot[];
    const total =
      rpcResult.order_total === null
        ? null
        : Number(rpcResult.order_total);
    const hasUnknownPrices = rpcResult.has_unknown_prices;
    const orderNumber = orderId.slice(0, 8).toUpperCase();

    const customer = { name, phone, email, comment };
    const text = createOrderText(
      orderNumber,
      customer,
      items,
      total,
      hasUnknownPrices,
    );
    const delivery = await Promise.allSettled([
      sendTelegram(text),
      sendEmail(customer, text, orderNumber),
    ]);

    if (delivery.some((result) => result.status === "rejected")) {
      console.error("Order notification delivery failed", {
        orderId,
        delivery,
      });
    }

    return NextResponse.json(
      {
        ok: true,
        orderNumber,
        message: `Дякуємо! Замовлення №${orderNumber} прийнято.`,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Order request failed", error);
    return NextResponse.json(
      { message: "Сталася помилка. Спробуйте ще раз пізніше." },
      { status: 500 },
    );
  }
}
