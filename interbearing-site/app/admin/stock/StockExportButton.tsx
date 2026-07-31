"use client";

import { Download } from "lucide-react";

type ExportMovement = {
  product_brand: string;
  product_article: string;
  product_title: string;
  movement_type: "sale" | "return" | "adjustment";
  quantity_change: number;
  quantity_before: number | null;
  quantity_after: number | null;
  order_id: string | null;
  created_at: string;
};

const typeLabels = {
  sale: "Продаж",
  return: "Повернення",
  adjustment: "Коригування",
};

function csvCell(value: string | number | null) {
  const text = value === null ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

export default function StockExportButton({
  movements,
}: {
  movements: ExportMovement[];
}) {
  function exportCsv() {
    const header = [
      "Дата",
      "Тип операції",
      "Бренд",
      "Артикул",
      "Назва",
      "Зміна, шт.",
      "Було, шт.",
      "Стало, шт.",
      "ID замовлення",
    ];

    const rows = movements.map((item) => [
      new Date(item.created_at).toLocaleString("uk-UA"),
      typeLabels[item.movement_type],
      item.product_brand,
      item.product_article,
      item.product_title,
      item.quantity_change,
      item.quantity_before,
      item.quantity_after,
      item.order_id,
    ]);

    const csv = [header, ...rows]
      .map((row) => row.map(csvCell).join(";"))
      .join("\r\n");
    const blob = new Blob(["\uFEFF", csv], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `interbearing-stock-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={exportCsv}
      disabled={movements.length === 0}
      className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Download size={18} />
      Експорт CSV ({movements.length})
    </button>
  );
}
