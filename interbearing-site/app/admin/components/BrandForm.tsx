"use client";

import { ImagePlus, LoaderCircle, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export type BrandFormValue = {
  id: string;
  name: string;
  slug: string;
  country: string;
  founded_year: number | null;
  description: string;
  logo_url: string | null;
  is_published: boolean;
  show_on_home: boolean;
  sort_order: number;
};

function createSlug(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export default function BrandForm({ brand }: { brand?: BrandFormValue }) {
  const router = useRouter();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim().toUpperCase();
    if (!name) {
      setError("Вкажіть назву бренду.");
      setIsSubmitting(false);
      return;
    }
    if (logoFile && logoFile.size > 3 * 1024 * 1024) {
      setError("Логотип не повинен перевищувати 3 МБ.");
      setIsSubmitting(false);
      return;
    }

    const supabase = createClient();
    let logoUrl = brand?.logo_url || null;
    let uploadedPath: string | null = null;

    if (logoFile) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError("Сесія завершилася. Увійдіть ще раз.");
        setIsSubmitting(false);
        return;
      }
      const extension = logoFile.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "svg";
      uploadedPath = `${user.id}/${crypto.randomUUID()}.${extension}`;
      const { error: uploadError } = await supabase.storage
        .from("brand-logos")
        .upload(uploadedPath, logoFile, { cacheControl: "3600", contentType: logoFile.type, upsert: false });
      if (uploadError) {
        setError(`Не вдалося завантажити логотип: ${uploadError.message}`);
        setIsSubmitting(false);
        return;
      }
      logoUrl = supabase.storage.from("brand-logos").getPublicUrl(uploadedPath).data.publicUrl;
    }

    const yearText = String(form.get("founded_year") || "").trim();
    const foundedYear = yearText ? Number(yearText) : null;
    if (foundedYear !== null && (!Number.isInteger(foundedYear) || foundedYear < 1000 || foundedYear > new Date().getFullYear())) {
      setError("Перевірте рік заснування.");
      setIsSubmitting(false);
      return;
    }

    const values = {
      name,
      slug: createSlug(name),
      country: String(form.get("country") || "").trim(),
      founded_year: foundedYear,
      description: String(form.get("description") || "").trim(),
      logo_url: logoUrl,
      is_published: form.get("is_published") === "on",
      show_on_home: form.get("show_on_home") === "on",
      sort_order: Number(form.get("sort_order") || 0) || 0,
      updated_at: new Date().toISOString(),
    };

    const result = brand
      ? await supabase.from("brands").update(values).eq("id", brand.id)
      : await supabase.from("brands").insert(values);

    if (result.error) {
      if (uploadedPath) await supabase.storage.from("brand-logos").remove([uploadedPath]);
      setError(result.error.code === "23505" ? "Такий бренд уже існує." : `Не вдалося зберегти бренд: ${result.error.message}`);
      setIsSubmitting(false);
      return;
    }

    router.push("/admin/brands");
    router.refresh();
  }

  const input = "mt-2 h-13 w-full rounded-xl border border-white/10 bg-[#0b1220] px-4 text-white outline-none focus:border-blue-500";

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <section className="rounded-3xl border border-white/10 bg-[#111827] p-5 sm:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="text-sm font-medium text-slate-300">Назва *<input name="name" required defaultValue={brand?.name} placeholder="SKF" className={input} /></label>
          <label className="text-sm font-medium text-slate-300">Країна<input name="country" defaultValue={brand?.country} placeholder="Швеція" className={input} /></label>
          <label className="text-sm font-medium text-slate-300">Рік заснування<input name="founded_year" type="number" defaultValue={brand?.founded_year ?? ""} className={input} /></label>
          <label className="text-sm font-medium text-slate-300">Порядок показу<input name="sort_order" type="number" defaultValue={brand?.sort_order ?? 0} className={input} /></label>
        </div>
        <label className="mt-5 block text-sm font-medium text-slate-300">Опис<textarea name="description" defaultValue={brand?.description} rows={5} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1220] p-4 text-white outline-none focus:border-blue-500" /></label>
        <label className="mt-5 block text-sm font-medium text-slate-300">
          <span className="inline-flex items-center gap-2"><ImagePlus size={18} /> Логотип (SVG, PNG, JPG або WebP)</span>
          <input type="file" accept="image/svg+xml,image/png,image/jpeg,image/webp" onChange={(event) => setLogoFile(event.target.files?.[0] || null)} className="mt-3 block w-full rounded-xl border border-dashed border-white/15 bg-[#0b1220] p-4" />
        </label>
        {brand?.logo_url && <p className="mt-2 text-sm text-slate-500">Поточний логотип збережеться, якщо не вибирати новий файл.</p>}
        <div className="mt-6 flex flex-wrap gap-6">
          <label className="flex items-center gap-3"><input name="is_published" type="checkbox" defaultChecked={brand?.is_published ?? true} className="h-5 w-5 accent-blue-600" /> Опублікувати</label>
          <label className="flex items-center gap-3"><input name="show_on_home" type="checkbox" defaultChecked={brand?.show_on_home ?? true} className="h-5 w-5 accent-blue-600" /> Показувати на головній</label>
        </div>
      </section>
      {error && <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-300">{error}</p>}
      <div className="flex justify-end">
        <button type="submit" disabled={isSubmitting} className="inline-flex min-w-52 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold hover:bg-blue-500 disabled:opacity-60">
          {isSubmitting ? <LoaderCircle className="animate-spin" size={20} /> : <Save size={20} />}
          {isSubmitting ? "Збереження…" : "Зберегти бренд"}
        </button>
      </div>
    </form>
  );
}
