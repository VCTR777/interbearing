import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
  privacyConsent?: unknown;
};

type ContactData = {
  name: string;
  phone: string;
  email: string;
  message: string;
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

function validatePayload(payload: ContactPayload):
  | { ok: true; data: ContactData }
  | { ok: false; message: string } {
  const name = cleanText(payload.name, 80);
  const phone = cleanText(payload.phone, 40);
  const email = cleanText(payload.email, 120);
  const message = cleanText(payload.message, 1500);
  const website = cleanText(payload.website, 200);

  if (website) {
    return { ok: false, message: "Не вдалося надіслати заявку." };
  }

  if (payload.privacyConsent !== true) {
    return {
      ok: false,
      message: "Підтвердьте згоду з Політикою конфіденційності.",
    };
  }

  if (name.length < 2) {
    return { ok: false, message: "Вкажіть ваше ім’я." };
  }

  if (phone.length < 7) {
    return { ok: false, message: "Вкажіть коректний номер телефону." };
  }

  if (email && !EMAIL_PATTERN.test(email)) {
    return { ok: false, message: "Перевірте адресу електронної пошти." };
  }

  if (message.length < 5) {
    return {
      ok: false,
      message: "Опишіть, який підшипник або комплектуючі вас цікавлять.",
    };
  }

  return {
    ok: true,
    data: {
      name,
      phone,
      email,
      message,
    },
  };
}

async function sendTelegramMessage(data: ContactData) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("Telegram environment variables are not configured.");
  }

  const text = [
    "🔵 Нова заявка з сайту INTERBEARING",
    "",
    `Ім’я: ${data.name}`,
    `Телефон: ${data.phone}`,
    `Email: ${data.email || "не вказано"}`,
    "",
    "Повідомлення:",
    data.message,
  ].join("\n");

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Telegram request failed: ${response.status} ${details}`);
  }
}

async function sendEmail(data: ContactData, requestId: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from =
    process.env.CONTACT_FROM_EMAIL ||
    "INTERBEARING <onboarding@resend.dev>";

  if (!apiKey || !to) {
    throw new Error("Email environment variables are not configured.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `interbearing-contact-${requestId}`,
      "User-Agent": "interbearing-site/1.0",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email || undefined,
      subject: `Нова заявка INTERBEARING — ${data.name}`,
      text: [
        "Нова заявка з сайту INTERBEARING",
        "",
        `Ім’я: ${data.name}`,
        `Телефон: ${data.phone}`,
        `Email: ${data.email || "не вказано"}`,
        "",
        "Повідомлення:",
        data.message,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
          <h1 style="font-size:22px">Нова заявка з сайту INTERBEARING</h1>
          <p><strong>Ім’я:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>Телефон:</strong> ${escapeHtml(data.phone)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email || "не вказано")}</p>
          <p><strong>Повідомлення:</strong></p>
          <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
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
    const rateLimit = await checkRateLimit(request, "contact", 5, 600);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          message:
            "Забагато спроб. Зачекайте кілька хвилин і спробуйте ще раз.",
        },
        {
          status: 429,
          headers: { "Retry-After": String(rateLimit.retryAfter) },
        },
      );
    }

    const contentType = request.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { message: "Непідтримуваний формат запиту." },
        { status: 415 },
      );
    }

    const payload = (await request.json()) as ContactPayload;
    const validation = validatePayload(payload);

    if (!validation.ok) {
      return NextResponse.json(
        { message: validation.message },
        { status: 400 },
      );
    }

    const requestId = crypto.randomUUID();
    const [telegramResult, emailResult] = await Promise.allSettled([
      sendTelegramMessage(validation.data),
      sendEmail(validation.data, requestId),
    ]);

    const telegramFailed = telegramResult.status === "rejected";
    const emailFailed = emailResult.status === "rejected";

    if (telegramFailed || emailFailed) {
      console.error("Contact delivery failed", {
        requestId,
        telegram:
          telegramResult.status === "rejected"
            ? telegramResult.reason
            : "delivered",
        email:
          emailResult.status === "rejected"
            ? emailResult.reason
            : "delivered",
      });

    }

    if (telegramFailed && emailFailed) {
      return NextResponse.json(
        {
          message:
            "Не вдалося доставити заявку всіма каналами. Спробуйте ще раз або зв’яжіться з нами телефоном.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      message:
        telegramFailed || emailFailed
          ? "Дякуємо! Заявку прийнято. Наш менеджер зв’яжеться з вами найближчим часом."
          : "Дякуємо! Заявку надіслано. Наш менеджер зв’яжеться з вами найближчим часом.",
    });
  } catch (error) {
    console.error("Contact request failed", error);

    return NextResponse.json(
      {
        message:
          "Сталася помилка під час надсилання. Спробуйте ще раз пізніше.",
      },
      { status: 500 },
    );
  }
}
