import { Edit3, ImageIcon, PackagePlus } from "lucide-react";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import AdminHeader from "./components/AdminHeader";
import DeleteProductButton from "./components/DeleteProductButton";
import ProductCsvTools from "./components/ProductCsvTools";

type Product = {
  id: string;
  brand: string;
  article: string;
  title: string;
  image_url: string | null;
  stock_status: string;
  stock_quantity: number | null;
  price: number | null;
  is_published: boolean;
};

function stockTextColor(status: string) {
  if (status === "Немає в наявності") return "text-red-300";
  if (status === "Під замовлення") return "text-amber-300";
  return "text-emerald-300";
}

export default async function AdminPage() {
  const { supabase, user } = await requireAdmin();
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, brand, article, title, image_url, stock_status, stock_quantity, price, is_published, sort_order",
    )
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });
  const products = (data || []) as Product[];

  return (
    <main className="min-h-screen bg-[#080c14] pb-16 text-white">
      <AdminHeader email={user.email} />
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Панель керування
            </p>
            <h1 className="mt-3 text-4xl font-bold">Товари</h1>
            <p className="mt-3 text-slate-400">У базі: {products.length}</p>
          </div>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold hover:bg-blue-500"
          >
            <PackagePlus size={20} />
            Додати товар
          </Link>
        </div>

        <ProductCsvTools />

        {error && (
          <p className="mt-8 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-red-300">
            Не вдалося завантажити список: {error.message}
          </p>
        )}

        {!error && products.length === 0 && (
          <div className="mt-10 rounded-3xl border border-dashed border-white/15 bg-[#111827] px-6 py-20 text-center">
            <PackagePlus className="mx-auto text-blue-400" size={42} />
            <h2 className="mt-5 text-2xl font-bold">Товарів поки немає</h2>
            <p className="mt-3 text-slate-400">
              Додайте перший товар через кабінет адміністратора.
            </p>
          </div>
        )}

        {products.length > 0 && (
          <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[#111827]">
            <div className="divide-y divide-white/10">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="grid gap-5 px-5 py-5 lg:grid-cols-[80px_1fr_170px_140px_220px] lg:items-center lg:px-6"
                >
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl bg-white">
                    {product.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.image_url}
                        alt=""
                        className="h-full w-full object-contain p-2"
                      />
                    ) : (
                      <ImageIcon className="text-slate-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-300">
                        {product.brand}
                      </span>
                      <span className="text-sm text-slate-500">
                        {product.article}
                      </span>
                    </div>
                    <h2 className="mt-3 text-lg font-bold">{product.title}</h2>
                    <p className="mt-2 font-semibold text-blue-300">
                      {product.price === null
                        ? "Ціну уточнюйте"
                        : `${Number(product.price).toLocaleString("uk-UA")} грн`}
                    </p>
                  </div>
                  <div>
                      <p
                        className={`text-sm font-semibold ${stockTextColor(
                          product.stock_status,
                        )}`}
                      >
                        {product.stock_status}
                      </p>
                    <p
                      className={`mt-2 text-sm font-semibold ${
                        product.stock_quantity === 0
                          ? "text-red-300"
                          : product.stock_quantity === null
                            ? "text-slate-500"
                            : "text-emerald-300"
                      }`}
                    >
                      {product.stock_quantity === null
                        ? "Залишок не вказано"
                        : `На складі: ${product.stock_quantity} шт.`}
                    </p>
                  </div>
                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                      product.is_published
                        ? "bg-emerald-500/10 text-emerald-300"
                        : "bg-amber-500/10 text-amber-300"
                    }`}
                  >
                    {product.is_published ? "Опубліковано" : "Приховано"}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 px-4 text-sm font-semibold text-slate-300 hover:bg-blue-500/10"
                    >
                      <Edit3 size={17} />
                      Редагувати
                    </Link>
                    <DeleteProductButton
                      id={product.id}
                      title={product.title}
                      imageUrl={product.image_url}
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
