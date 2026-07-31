"use client";

import {
  Download,
  FileSpreadsheet,
  LoaderCircle,
  Upload,
} from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type CsvRow = Record<string, string>;

const HEADERS = [
  "brand",
  "article",
  "title",
  "description",
  "sections",
  "image_url",
  "specifications",
  "stock_status",
  "stock_quantity",
  "price",
  "is_published",
  "is_popular",
  "sort_order",
] as const;

const ALLOWED_SECTIONS = new Set([
  "industrial",
  "automotive",
  "agriculture",
  "housings",
  "seals",
  "components",
]);

function csvCell(value: unknown) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function detectDelimiter(text: string) {
  const firstLine = text.split(/\r?\n/, 1)[0] || "";
  const semicolons = (firstLine.match(/;/g) || []).length;
  const commas = (firstLine.match(/,/g) || []).length;
  return semicolons >= commas ? ";" : ",";
}

function parseCsv(text: string): string[][] {
  const delimiter = detectDelimiter(text);
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"') {
      if (quoted && next === '"') {
        cell += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
      continue;
    }

    if (char === delimiter && !quoted) {
      row.push(cell.trim());
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  row.push(cell.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function toBoolean(value: string, fallback: boolean) {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return fallback;
  return ["1", "true", "так", "yes", "y"].includes(normalized);
}

function createSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9а-яіїєґ]+/gi, "-")
    .replace(/^-+|-+$/g, "");
}

function downloadText(filename: string, content: string) {
  const blob = new Blob(["\uFEFF", content], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default function ProductCsvTools() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function downloadTemplate() {
    const example = [
      "SKF",
      "6205-2RS",
      "Кульковий підшипник",
      "Опис товару",
      "industrial|automotive",
      "",
      "Внутрішній діаметр: 25 мм|Зовнішній діаметр: 52 мм",
      "В наявності",
      "25",
      "1250",
      "true",
      "false",
      "10",
    ];
    const csv = [HEADERS, example]
      .map((row) => row.map(csvCell).join(";"))
      .join("\r\n");
    downloadText("interbearing-products-template.csv", csv);
  }

  async function importFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setMessage("");
    setError("");

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Виберіть файл у форматі CSV.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("CSV-файл не повинен перевищувати 2 МБ.");
      return;
    }

    setIsImporting(true);

    try {
      const matrix = parseCsv((await file.text()).replace(/^\uFEFF/, ""));
      if (matrix.length < 2) {
        throw new Error("У файлі немає товарів.");
      }

      const headers = matrix[0].map((header) => header.trim().toLowerCase());
      const missingHeaders = ["brand", "article", "title"].filter(
        (header) => !headers.includes(header),
      );
      if (missingHeaders.length > 0) {
        throw new Error(
          `Відсутні обов’язкові колонки: ${missingHeaders.join(", ")}.`,
        );
      }

      if (matrix.length - 1 > 500) {
        throw new Error("За один раз можна імпортувати не більше 500 товарів.");
      }

      const rows: CsvRow[] = matrix.slice(1).map((values) =>
        Object.fromEntries(
          headers.map((header, index) => [header, values[index] || ""]),
        ),
      );

      const articles = new Set<string>();
      rows.forEach((row, index) => {
        row.brand = row.brand.trim().toUpperCase();
        row.article = row.article.trim();
        row.title = row.title.trim();

        if (!row.brand || !row.article || !row.title) {
          throw new Error(
            `Рядок ${index + 2}: заповніть brand, article і title.`,
          );
        }

        const articleKey = row.article.toLowerCase();
        if (articles.has(articleKey)) {
          throw new Error(
            `Рядок ${index + 2}: артикул ${row.article} повторюється у файлі.`,
          );
        }
        articles.add(articleKey);
      });

      const supabase = createClient();
      const { data: existingProducts, error: loadError } = await supabase
        .from("products")
        .select("id, article, image_url, stock_quantity");

      if (loadError) {
        throw new Error(`Не вдалося перевірити товари: ${loadError.message}`);
      }

      const existingByArticle = new Map<
        string,
        {
          id: string;
          imageUrl: string | null;
          stockQuantity: number | null;
        }
      >(
        (existingProducts || []).map((product) => [
          String(product.article).toLowerCase(),
          {
            id: String(product.id),
            imageUrl:
              typeof product.image_url === "string"
                ? product.image_url
                : null,
            stockQuantity:
              typeof product.stock_quantity === "number"
                ? product.stock_quantity
                : null,
          },
        ]),
      );

      let created = 0;
      let updated = 0;

      for (const [index, row] of rows.entries()) {
        const priceText = row.price
          .replace(/\s+/g, "")
          .replace(/грн/gi, "")
          .replace(",", ".");
        const price = priceText ? Number(priceText) : null;
        const stockQuantityText = (row.stock_quantity || "").trim();
        const importedStockQuantity = stockQuantityText
          ? Number(stockQuantityText)
          : null;
        const sortOrder = row.sort_order ? Number(row.sort_order) : 0;
        const sections = row.sections
          .split("|")
          .map((value) => value.trim())
          .filter((value) => ALLOWED_SECTIONS.has(value));

        if (price !== null && (!Number.isFinite(price) || price < 0)) {
          throw new Error(`Рядок ${index + 2}: некоректна ціна.`);
        }
        if (
          importedStockQuantity !== null &&
          (!Number.isInteger(importedStockQuantity) ||
            importedStockQuantity < 0)
        ) {
          throw new Error(
            `Рядок ${index + 2}: некоректна кількість на складі.`,
          );
        }
        if (!Number.isFinite(sortOrder)) {
          throw new Error(`Рядок ${index + 2}: некоректний порядок показу.`);
        }

        const existingProduct = existingByArticle.get(
          row.article.toLowerCase(),
        );
        const stockQuantity =
          stockQuantityText === ""
            ? existingProduct?.stockQuantity ?? null
            : importedStockQuantity;
        const manualStockStatus =
          row.stock_status?.trim() || "В наявності";
        const stockStatus =
          stockQuantity === null
            ? manualStockStatus
            : stockQuantity === 0
              ? "Немає в наявності"
              : "В наявності";
        const values = {
          slug: createSlug(row.article),
          brand: row.brand,
          article: row.article,
          title: row.title,
          description: row.description?.trim() || "",
          category: sections[0] || "Підшипники",
          sections,
          image_url:
            row.image_url?.trim() || existingProduct?.imageUrl || null,
          specifications: (row.specifications || "")
            .split("|")
            .map((value) => value.trim())
            .filter(Boolean),
          stock_status: stockStatus,
          stock_quantity: stockQuantity,
          price,
          is_published: toBoolean(row.is_published || "", true),
          is_popular: toBoolean(row.is_popular || "", false),
          sort_order: sortOrder,
          updated_at: new Date().toISOString(),
        };

        const result = existingProduct
          ? await supabase
              .from("products")
              .update(values)
              .eq("id", existingProduct.id)
          : await supabase.from("products").insert(values);

        if (result.error) {
          throw new Error(
            `Рядок ${index + 2} (${row.article}): ${result.error.message}`,
          );
        }

        if (existingProduct) updated += 1;
        else created += 1;
      }

      setMessage(`Готово: додано ${created}, оновлено ${updated} товарів.`);
      router.refresh();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Не вдалося імпортувати файл.",
      );
    } finally {
      setIsImporting(false);
    }
  }

  return (
    <section className="mt-8 rounded-2xl border border-white/10 bg-[#111827] p-5">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-2 font-bold">
            <FileSpreadsheet size={20} className="text-emerald-400" />
            Масовий імпорт товарів
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Завантажте шаблон, заповніть його в Excel і імпортуйте CSV.
            Існуючі товари оновлюються за артикулом, нові — додаються.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={downloadTemplate}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 px-5 text-sm font-bold text-slate-200 transition hover:border-emerald-500/40 hover:bg-emerald-500/10"
          >
            <Download size={18} />
            Завантажити шаблон
          </button>

          <button
            type="button"
            disabled={isImporting}
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-500 disabled:cursor-wait disabled:opacity-60"
          >
            {isImporting ? (
              <LoaderCircle size={18} className="animate-spin" />
            ) : (
              <Upload size={18} />
            )}
            {isImporting ? "Імпортування…" : "Імпортувати CSV"}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            onChange={importFile}
            className="sr-only"
          />
        </div>
      </div>

      {message && (
        <p className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          {message}
        </p>
      )}

      {error && (
        <p className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}
    </section>
  );
}
