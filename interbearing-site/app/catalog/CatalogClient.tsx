"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import AddToCartButton from "../components/AddToCartButton";

export type CatalogProduct = {
  id: string;
  slug: string;
  brand: string;
  article: string;
  title: string;
  description: string;
  image_url: string | null;
  stock_status: string;
  price: number | null;
  sections: string[] | null;
};

export default function CatalogClient({
  products,
}: {
  products: CatalogProduct[];
}) {
  const searchParams = useSearchParams();
  const brands = useMemo(
    () => ["Усі", ...Array.from(new Set(products.map((item) => item.brand)))],
    [products],
  );
  const requestedBrand = searchParams.get("brand")?.toUpperCase() || "Усі";
  const requestedSection = searchParams.get("section") || "";
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(
    brands.includes(requestedBrand) ? requestedBrand : "Усі",
  );

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesBrand =
        selectedBrand === "Усі" || product.brand === selectedBrand;
      const matchesSearch =
        !query ||
        product.brand.toLowerCase().includes(query) ||
        product.article.toLowerCase().includes(query) ||
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);
      const matchesSection =
        !requestedSection ||
        (product.sections || []).includes(requestedSection);
      return matchesBrand && matchesSearch && matchesSection;
    });
  }, [products, requestedSection, search, selectedBrand]);

  return (
    <>
      <div className="mt-12 rounded-3xl border border-white/10 bg-[#111827] p-5 md:p-7">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto]">
          <label className="text-sm font-medium text-gray-300">
            Пошук товару
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Введіть бренд, артикул або назву..."
              className="mt-2 h-14 w-full rounded-xl border border-white/10 bg-[#0B0F19] px-5 text-white outline-none focus:border-blue-500"
            />
          </label>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-300">Виробник</p>
            <div className="flex flex-wrap gap-2">
              {brands.map((brand) => (
                <button
                  key={brand}
                  type="button"
                  onClick={() => setSelectedBrand(brand)}
                  className={`h-14 rounded-xl px-5 font-semibold transition ${
                    selectedBrand === brand
                      ? "bg-blue-600 text-white"
                      : "border border-white/10 bg-[#0B0F19] text-gray-300 hover:border-blue-500"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between gap-4">
        <div>
          {requestedSection && (
            <p className="mb-2 text-sm font-semibold text-blue-400">
              Активна секція каталогу
            </p>
          )}
          <p className="text-gray-400">
            Знайдено товарів:{" "}
            <span className="font-semibold text-white">
              {filteredProducts.length}
            </span>
          </p>
        </div>
        {(search || selectedBrand !== "Усі") && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedBrand("Усі");
            }}
            className="text-sm font-semibold text-blue-400"
          >
            Скинути фільтри
          </button>
        )}
      </div>

      {filteredProducts.length ? (
        <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group flex overflow-hidden rounded-3xl border border-white/10 bg-[#151D2B] transition duration-300 hover:-translate-y-2 hover:border-blue-500/60"
            >
              <div className="flex w-full flex-col">
                <Link
                  href={`/product/${product.slug}`}
                  className="flex h-64 items-center justify-center overflow-hidden bg-white"
                >
                  {product.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.image_url}
                      alt={`${product.brand} ${product.article}`}
                      className="h-full w-full object-contain p-7 transition duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <span className="text-gray-400">Фото відсутнє</span>
                  )}
                </Link>

                <div className="flex min-h-80 flex-1 flex-col p-7">
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full bg-blue-600/15 px-3 py-1 text-sm font-bold text-blue-400">
                      {product.brand}
                    </span>
                    <span className="text-sm text-gray-500">
                      {product.article}
                    </span>
                  </div>

                  <Link href={`/product/${product.slug}`}>
                    <h2 className="mt-5 text-2xl font-bold transition hover:text-blue-400">
                      {product.title}
                    </h2>
                  </Link>

                  <p className="mt-4 line-clamp-3 leading-7 text-gray-400">
                    {product.description}
                  </p>
                  <p className="mt-5 text-xl font-bold text-white">
                    {product.price === null
                      ? "Ціну уточнюйте"
                      : `${Number(product.price).toLocaleString("uk-UA")} грн`}
                  </p>

                  <div className="mt-auto pt-7">
                    <div className="mb-4 flex items-center justify-between">
                      <Link
                        href={`/product/${product.slug}`}
                        className="font-semibold text-blue-400 hover:text-blue-300"
                      >
                        Детальніше →
                      </Link>
                      <span className="text-xs text-emerald-400">
                        {product.stock_status}
                      </span>
                    </div>
                    <AddToCartButton
                      product={{
                        id: product.id,
                        slug: product.slug,
                        brand: product.brand,
                        article: product.article,
                        title: product.title,
                        imageUrl: product.image_url,
                        price: product.price,
                      }}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-3xl border border-white/10 bg-[#151D2B] px-6 py-20 text-center">
          <h2 className="text-2xl font-bold">Товари не знайдено</h2>
          <p className="mt-3 text-gray-400">
            Змініть пошуковий запит або виберіть іншого виробника.
          </p>
        </div>
      )}
    </>
  );
}
