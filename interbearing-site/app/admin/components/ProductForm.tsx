"use client";

import { ImagePlus, LoaderCircle, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export type ProductFormValue = {
  id: string;
  brand: string;
  article: string;
  title: string;
  description: string;
  category: string;
  sections: string[] | null;
  image_url: string | null;
  specifications: unknown;
  stock_status: string;
  stock_quantity: number | null;
  low_stock_threshold: number;
  price: number | null;
  is_published: boolean;
  is_popular: boolean;
  sort_order: number;
};

const SECTION_OPTIONS = [
  { value: "industrial", label: "Промислові підшипники" },
  { value: "automotive", label: "Автомобільні підшипники" },
  { value: "agriculture", label: "Підшипники для агротехніки" },
  { value: "housings", label: "Корпусні вузли" },
  { value: "seals", label: "Ущільнення" },
  { value: "components", label: "Комплектуючі" },
] as const;

function specsToText(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string").join("\n")
    : "";
}

function createSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9а-яіїєґ]+/gi, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ProductForm({
  product,
}: {
  product?: ProductFormValue;
}) {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const isEditing = Boolean(product);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const form = new FormData(event.currentTarget);
    const rawPriceInput = priceInputRef.current?.value || "";
    const article = String(form.get("article") || "").trim();
    const title = String(form.get("title") || "").trim();
    const brand = String(form.get("brand") || "").trim().toUpperCase();

    if (!article || !title || !brand) {
      setError("Заповніть бренд, артикул і назву товару.");
      setIsSubmitting(false);
      return;
    }

    if (!isEditing && !imageFile) {
      setError("Додайте фотографію товару.");
      setIsSubmitting(false);
      return;
    }

    if (imageFile && imageFile.size > 5 * 1024 * 1024) {
      setError("Фотографія не повинна перевищувати 5 МБ.");
      setIsSubmitting(false);
      return;
    }

    const supabase = createClient();
    let imageUrl = product?.image_url || null;
    let uploadedPath: string | null = null;

    if (imageFile) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Сесія завершилася. Увійдіть ще раз.");
        setIsSubmitting(false);
        return;
      }

      const extension =
        imageFile.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") ||
        "jpg";
      uploadedPath = `${user.id}/${crypto.randomUUID()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(uploadedPath, imageFile, {
          cacheControl: "3600",
          contentType: imageFile.type,
          upsert: false,
        });

      if (uploadError) {
        setError(`Не вдалося завантажити фото: ${uploadError.message}`);
        setIsSubmitting(false);
        return;
      }

      imageUrl = supabase.storage
        .from("product-images")
        .getPublicUrl(uploadedPath).data.publicUrl;
    }

    const sortOrder = Number(form.get("sort_order") || 0);
    const stockQuantityText = String(
      form.get("stock_quantity") || "",
    ).trim();
    const stockQuantity = stockQuantityText
      ? Number(stockQuantityText)
      : null;
    const lowStockThresholdText = String(
      form.get("low_stock_threshold") || "3",
    ).trim();
    const lowStockThreshold = Number(lowStockThresholdText);
    const priceText = rawPriceInput
      .trim()
      .replace(/\s+/g, "")
      .replace(/грн/gi, "")
      .replace(",", ".");
    const price = priceText ? Number(priceText) : null;
    const sections = form
      .getAll("sections")
      .map(String)
      .filter((value) =>
        SECTION_OPTIONS.some((section) => section.value === value),
      );

    if (price !== null && (!Number.isFinite(price) || price < 0)) {
      setError("Вкажіть коректну ціну або залиште поле порожнім.");
      setIsSubmitting(false);
      return;
    }

    if (
      stockQuantity !== null &&
      (!Number.isInteger(stockQuantity) || stockQuantity < 0)
    ) {
      setError(
        "Кількість на складі повинна бути цілим невід’ємним числом.",
      );
      setIsSubmitting(false);
      return;
    }

    if (!Number.isInteger(lowStockThreshold) || lowStockThreshold < 0) {
      setError("Мінімальний залишок повинен бути цілим невід’ємним числом.");
      setIsSubmitting(false);
      return;
    }

    const manualStockStatus =
      String(form.get("stock_status") || "").trim() || "В наявності";
    const stockStatus =
      stockQuantity === null
        ? manualStockStatus
        : stockQuantity === 0
          ? "Немає в наявності"
          : "В наявності";

    const values = {
      slug: createSlug(article),
      brand,
      article,
      title,
      description: String(form.get("description") || "").trim(),
      category: sections[0] || "Підшипники",
      sections,
      image_url: imageUrl,
      specifications: String(form.get("specifications") || "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      stock_status: stockStatus,
      stock_quantity: stockQuantity,
      low_stock_threshold: lowStockThreshold,
      price,
      is_published: form.get("is_published") === "on",
      is_popular: form.get("is_popular") === "on",
      sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
      updated_at: new Date().toISOString(),
    };

    const result = product
      ? await supabase
          .from("products")
          .update(values)
          .eq("id", product.id)
          .select("id, price, stock_quantity")
          .single()
      : await supabase
          .from("products")
          .insert(values)
          .select("id, price, stock_quantity")
          .single();

    if (result.error) {
      if (uploadedPath) {
        await supabase.storage.from("product-images").remove([uploadedPath]);
      }
      setError(
        result.error.code === "23505"
          ? "Товар із таким артикулом уже існує."
          : `Не вдалося зберегти товар: ${result.error.message}`,
      );
      setIsSubmitting(false);
      return;
    }

    if (
      price !== null &&
      (result.data?.price === null ||
        result.data?.price === undefined ||
        Number(result.data.price) !== price)
    ) {
      setError(
        "Товар збережено, але Supabase не підтвердив ціну. Перевірте колонку price у таблиці products.",
      );
      setIsSubmitting(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  const input =
    "mt-2 h-13 w-full rounded-xl border border-white/10 bg-[#0b1220] px-4 text-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5 sm:mt-8 sm:space-y-8">
      <section className="rounded-2xl border border-white/10 bg-[#111827] p-4 sm:rounded-3xl sm:p-8">
        <h2 className="text-xl font-bold">Основна інформація</h2>
        <div className="mt-5 grid gap-4 md:mt-6 md:grid-cols-2 md:gap-5">
          <label className="text-sm font-medium text-slate-300">
            Бренд *
            <input
              name="brand"
              required
              defaultValue={product?.brand}
              placeholder="SKF"
              className={input}
            />
          </label>
          <label className="text-sm font-medium text-slate-300">
            Артикул *
            <input
              name="article"
              required
              defaultValue={product?.article}
              placeholder="6205-2RS"
              className={input}
            />
          </label>
          <label className="text-sm font-medium text-slate-300 md:col-span-2">
            Назва товару *
            <input
              name="title"
              required
              defaultValue={product?.title}
              placeholder="Кульковий підшипник"
              className={input}
            />
          </label>
          <label className="text-sm font-medium text-slate-300">
            Наявність
            <select
              name="stock_status"
              defaultValue={product?.stock_status || "В наявності"}
              className={input}
            >
              <option>В наявності</option>
              <option>Під замовлення</option>
              <option>Немає в наявності</option>
            </select>
          </label>
          <label className="text-sm font-medium text-slate-300">
            Кількість на складі
            <input
              name="stock_quantity"
              type="number"
              min="0"
              step="1"
              defaultValue={product?.stock_quantity ?? ""}
              placeholder="Наприклад: 25"
              className={input}
            />
            <span className="mt-2 block text-xs leading-5 text-slate-500">
              Залиште порожнім, якщо точний залишок поки не ведеться.
              Значення 0 автоматично встановить статус «Немає в наявності».
            </span>
          </label>
          <label className="text-sm font-medium text-slate-300">
            Мінімальний залишок
            <input
              name="low_stock_threshold"
              type="number"
              min="0"
              step="1"
              required
              defaultValue={product?.low_stock_threshold ?? 3}
              className={input}
            />
            <span className="mt-2 block text-xs leading-5 text-slate-500">
              При цьому залишку товар буде позначено як такий, що закінчується.
            </span>
          </label>
          <div className="md:col-span-2">
            <p className="text-sm font-medium text-slate-300">
              Секції каталогу
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Позначте одну або кілька секцій, у яких потрібно показувати товар.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SECTION_OPTIONS.map((section) => (
                <label
                  key={section.value}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-[#0b1220] px-3 py-3.5 text-sm text-slate-300 transition hover:border-blue-500/40 sm:px-4 sm:py-4"
                >
                  <input
                    name="sections"
                    type="checkbox"
                    value={section.value}
                    defaultChecked={product?.sections?.includes(section.value)}
                    className="h-5 w-5 shrink-0 accent-blue-600"
                  />
                  {section.label}
                </label>
              ))}
            </div>
          </div>
          <label className="text-sm font-medium text-slate-300">
            Ціна, грн
            <input
              name="price"
              ref={priceInputRef}
              type="text"
              inputMode="decimal"
              defaultValue={product?.price ?? ""}
              placeholder="Наприклад: 1250 або 1250,50"
              className={input}
            />
            <span className="mt-2 block text-xs text-slate-500">
              Залиште порожнім, щоб показувати «Ціну уточнюйте».
            </span>
          </label>
          <label className="text-sm font-medium text-slate-300 md:col-span-2">
            Опис
            <textarea
              name="description"
              defaultValue={product?.description}
              rows={5}
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-[#111827] p-4 sm:rounded-3xl sm:p-8">
        <h2 className="text-xl font-bold">Фото та характеристики</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-blue-400/30 bg-blue-500/[0.05] px-4 text-center hover:bg-blue-500/10 sm:min-h-48 sm:px-5">
            <ImagePlus className="text-blue-400" size={34} />
            <span className="mt-3 font-semibold">
              {imageFile
                ? imageFile.name
                : isEditing
                  ? "Замінити фотографію"
                  : "Вибрати фотографію"}
            </span>
            <span className="mt-2 text-sm text-slate-500">
              JPG, PNG або WebP, максимум 5 МБ
            </span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={(event) => setImageFile(event.target.files?.[0] || null)}
            />
          </label>
          <label className="text-sm font-medium text-slate-300">
            Характеристики
            <textarea
              name="specifications"
              defaultValue={specsToText(product?.specifications)}
              rows={8}
              placeholder={
                "Внутрішній діаметр: 25 мм\nЗовнішній діаметр: 52 мм\nШирина: 15 мм"
              }
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1220] px-4 py-3 text-white outline-none focus:border-blue-500"
            />
            <span className="mt-2 block text-xs text-slate-500">
              Кожна характеристика — з нового рядка.
            </span>
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-[#111827] p-4 sm:rounded-3xl sm:p-8">
        <div className="grid gap-5 md:grid-cols-3">
          <label className="flex items-center gap-3 text-sm text-slate-300">
            <input
              name="is_published"
              type="checkbox"
              defaultChecked={product?.is_published ?? true}
              className="h-5 w-5 accent-blue-600"
            />
            Опублікувати товар
          </label>
          <label className="flex items-center gap-3 text-sm text-slate-300">
            <input
              name="is_popular"
              type="checkbox"
              defaultChecked={product?.is_popular ?? false}
              className="h-5 w-5 accent-blue-600"
            />
            Популярний товар
          </label>
          <label className="text-sm text-slate-300">
            Порядок показу
            <input
              name="sort_order"
              type="number"
              defaultValue={product?.sort_order ?? 0}
              className={input}
            />
          </label>
        </div>
      </section>

      {error && (
        <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-red-300">
          {error}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="h-13 w-full rounded-xl border border-white/10 px-6 font-semibold text-slate-300 sm:w-auto"
        >
          Скасувати
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 font-semibold hover:bg-blue-500 disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? (
            <LoaderCircle className="animate-spin" size={20} />
          ) : (
            <Save size={20} />
          )}
          {isSubmitting
            ? "Збереження…"
            : isEditing
              ? "Зберегти зміни"
              : "Додати товар"}
        </button>
      </div>
    </form>
  );
}
