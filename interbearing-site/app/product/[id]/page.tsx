import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { createClient } from "@/lib/supabase/server";

type Product = {
  id: string;
  slug: string;
  brand: string;
  article: string;
  title: string;
  description: string;
  image_url: string | null;
  specifications: unknown;
  stock_status: string;
};

function getSpecifications(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, slug, brand, article, title, description, image_url, specifications, stock_status",
    )
    .eq("slug", id)
    .eq("is_published", true)
    .single();

  if (error || !data) notFound();
  const product = data as Product;

  const { data: related } = await supabase
    .from("products")
    .select("id, slug, brand, article, title, image_url")
    .eq("is_published", true)
    .neq("id", product.id)
    .limit(3);

  const contactHref = `/contacts?product=${encodeURIComponent(
    `${product.brand} ${product.article}`,
  )}`;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0B0F19] pt-28 text-white">
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <nav className="mb-8 flex gap-2 text-sm text-gray-500">
            <Link href="/">Головна</Link>
            <span>/</span>
            <Link href="/catalog">Каталог</Link>
            <span>/</span>
            <span className="text-gray-300">{product.article}</span>
          </nav>

          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-[#151D2B] p-5 md:p-8">
              <div className="flex min-h-96 items-center justify-center overflow-hidden rounded-2xl bg-white md:min-h-[520px]">
                {product.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.image_url}
                    alt={`${product.brand} ${product.article}`}
                    className="h-full max-h-[520px] w-full object-contain p-8"
                  />
                ) : (
                  <span className="text-gray-400">Фото відсутнє</span>
                )}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold">
                  {product.brand}
                </span>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400">
                  {product.stock_status}
                </span>
              </div>
              <h1 className="mt-6 text-4xl font-bold md:text-5xl">
                {product.title}
              </h1>
              <p className="mt-4 text-xl text-gray-400">
                Артикул:{" "}
                <span className="font-semibold text-white">{product.article}</span>
              </p>
              <p className="mt-8 text-lg leading-8 text-gray-300">
                {product.description}
              </p>

              <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[#151D2B]">
                <div className="border-b border-white/10 px-6 py-5">
                  <h2 className="text-2xl font-bold">Характеристики</h2>
                </div>
                <ul className="divide-y divide-white/10">
                  {getSpecifications(product.specifications).map((spec) => (
                    <li key={spec} className="px-6 py-4 text-gray-300">
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 rounded-3xl border border-blue-500/20 bg-blue-600/10 p-7">
                <h2 className="text-2xl font-bold">
                  Потрібна ціна або консультація?
                </h2>
                <p className="mt-3 leading-7 text-gray-400">
                  Надішліть запит щодо {product.brand} {product.article}.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={contactHref}
                    className="flex-1 rounded-xl bg-blue-600 px-7 py-4 text-center font-semibold hover:bg-blue-500"
                  >
                    Запросити ціну
                  </Link>
                  <Link
                    href="/catalog"
                    className="flex-1 rounded-xl border border-white/15 px-7 py-4 text-center font-semibold hover:bg-white/5"
                  >
                    До каталогу
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {(related || []).length > 0 && (
          <section className="border-y border-white/10 bg-[#111827] py-20">
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="text-3xl font-bold">Схожі товари</h2>
              <div className="mt-10 grid gap-7 md:grid-cols-3">
                {(related || []).map((item) => (
                  <Link
                    key={item.id}
                    href={`/product/${item.slug}`}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-[#151D2B] hover:border-blue-500/60"
                  >
                    <div className="flex h-56 items-center justify-center bg-white">
                      {item.image_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.image_url}
                          alt=""
                          className="h-full w-full object-contain p-6"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <span className="text-sm font-bold text-blue-400">
                        {item.brand} · {item.article}
                      </span>
                      <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
