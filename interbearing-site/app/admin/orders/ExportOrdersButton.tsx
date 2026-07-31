"use client";

import { Download } from "lucide-react";

type ExportOrderItem = {
  brand?: string;
  article?: string;
  title?: string;
  price?: number | null;
  quantity?: number;
};

type ExportOrder = {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  comment: string | null;
  items: unknown;
  total: number | null;
  has_unknown_prices: boolean;
  status: string;
  created_at: string;
};

const statusLabels: Record<string, string> = {
  new: "Нове",
  processing: "В роботі",
  completed: "Завершене",
  cancelled: "Скасоване",
};

function csvCell(value: unknown) {
  const text = String(value ?? "").replace(/\r?\n/g, " ");
  return `"${text.replace(/"/g, '""')}"`;
}

function getItems(value: unknown): ExportOrderItem[] {
  return Array.isArray(value) ? (value as ExportOrderItem[]) : [];
}

export default function ExportOrdersButton({
  orders,
}: {
  orders: ExportOrder[];
}) {
  function exportOrders() {
    const header = [
      "Номер",
      "Дата",
      "Статус",
      "Клієнт",
      "Телефон",
      "Email",
      "Товари",
      "Сума, грн",
      "Є товари без ціни",
      "Коментар",
    ];

    const rows = orders.map((order) => {
      const items = getItems(order.items)
        .map((item) => {
          const price =
            item.price === null || item.price === undefined
              ? "ціна уточнюється"
              : `${item.price} грн`;
          return `${item.brand || ""} ${item.article || ""} — ${
            item.title || ""
          } (${item.quantity || 0} шт., ${price})`;
        })
        .join(" | ");

      return [
        order.id.slice(0, 8).toUpperCase(),
        new Intl.DateTimeFormat("uk-UA", {
          dateStyle: "medium",
          timeStyle: "short",
          timeZone: "Europe/Kyiv",
        }).format(new Date(order.created_at)),
        statusLabels[order.status] || order.status,
        order.customer_name,
        order.customer_phone,
        order.customer_email || "",
        items,
        order.total ?? "",
        order.has_unknown_prices ? "Так" : "Ні",
        order.comment || "",
      ];
    });

    const csv = [header, ...rows]
      .map((row) => row.map(csvCell).join(";"))
      .join("\r\n");
    const blob = new Blob(["\uFEFF", csv], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const date = new Date().toISOString().slice(0, 10);

    link.href = url;
    link.download = `interbearing-orders-${date}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      disabled={orders.length === 0}
      onClick={exportOrders}
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#111827] px-5 text-sm font-bold text-slate-200 transition hover:border-blue-500/40 hover:bg-blue-500/10 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
    >
      <Download size={18} />
      Експорт CSV ({orders.length})
    </button>
  );
}
