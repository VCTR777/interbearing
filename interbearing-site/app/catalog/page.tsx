import { Suspense } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { createClient } from "@/lib/supabase/server";
import CatalogClient, { type CatalogProduct } from "./CatalogClient";

export default async function CatalogPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, slug, brand, article, title, description, image_url, stock_status, sort_order",
    )
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0B0F19] pt-28 text-white">
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
              Каталог INTERBEARING
            </span>
            <h1 className="mt-6 text-4xl font-bold md:text-6xl">
              Каталог підшипників
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-400">
              Підшипники провідних світових виробників для промисловості,
              автомобільної техніки та виробничого обладнання.
            </p>
          </div>

          {error ? (
            <p className="mt-10 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-red-300">
              Не вдалося завантажити каталог. Спробуйте оновити сторінку.
            </p>
          ) : (
            <Suspense
              fallback={
                <p className="mt-10 text-gray-400">Завантаження каталогу…</p>
              }
            >
              <CatalogClient products={(data || []) as CatalogProduct[]} />
            </Suspense>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
