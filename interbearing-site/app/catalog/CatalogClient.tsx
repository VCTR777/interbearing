"use client";

import { RotateCcw, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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

const SECTION_OPTIONS = [
  { value: "", label: "Усі секції" },
  { value: "industrial", label: "Промислові підшипники" },
  { value: "automotive", label: "Автомобільні підшипники" },
  { value: "agriculture", label: "Для агротехніки" },
  { value: "housings", label: "Корпусні вузли" },
  { value: "seals", label: "Ущільнення" },
  { value: "components", label: "Комплектуючі" },
] as const;

type SortValue =
  | "default"
  | "price-asc"
  | "price-desc"
  | "title-asc"
  | "article-asc";

function parsePrice(value: string) {
  const normalized = value.trim().replace(/\s+/g, "").replace(",", ".");
  if (!normalized) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

export default function CatalogClient({
  products,
}: {
  products: CatalogProduct[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const brands = useMemo(
    () => ["Усі бренди", ...Array.from(new Set(products.map((item) => item.brand)))],
    [products],
  );
  const stockStatuses = useMemo(
    () => [
      "Будь-яка наявність",
      ...Array.from(
        new Set(products.map((item) => item.stock_status).filter(Boolean)),
      ),
    ],
    [products],
  );

  const requestedBrand = searchParams.get("brand")?.toUpperCase() || "";
  const requestedSection = searchParams.get("section") || "";
  const initialBrand = brands.includes(requestedBrand)
    ? requestedBrand
    : "Усі бренди";
  const initialSection = SECTION_OPTIONS.some(
    (section) => section.value === requestedSection,
  )
    ? requestedSection
    : "";

  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedSection, setSelectedSection] = useState(initialSection);
  const [selectedStock, setSelectedStock] = useState("Будь-яка наявність");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [priceMode, setPriceMode] = useState("all");
  const [sort, setSort] = useState<SortValue>("default");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const minimum = parsePrice(minPrice);
    const maximum = parsePrice(maxPrice);

    const result = products.filter((product) => {
      const matchesBrand =
        selectedBrand === "Усі бренди" || product.brand === selectedBrand;
      const matchesSection =
        !selectedSection ||
        (product.sections || []).includes(selectedSection);
      const matchesStock =
        selectedStock === "Будь-яка наявність" ||
        product.stock_status === selectedStock;
      const matchesSearch =
        !query ||
        product.brand.toLowerCase().includes(query) ||
        product.article.toLowerCase().includes(query) ||
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);
      const matchesPriceMode =
        priceMode === "all" ||
        (priceMode === "with-price" && product.price !== null) ||
        (priceMode === "without-price" && product.price === null);
      const matchesMinimum =
        minimum === null || (product.price !== null && product.price >= minimum);
      const matchesMaximum =
        maximum === null || (product.price !== null && product.price <= maximum);

      return (
        matchesBrand &&
        matchesSection &&
        matchesStock &&
        matchesSearch &&
        matchesPriceMode &&
        matchesMinimum &&
        matchesMaximum
      );
    });

    return [...result].sort((first, second) => {
      if (sort === "price-asc") {
        if (first.price === null) return 1;
        if (second.price === null) return -1;
        return first.price - second.price;
      }
      if (sort === "price-desc") {
        if (first.price === null) return 1;
        if (second.price === null) return -1;
        return second.price - first.price;
      }
      if (sort === "title-asc") {
        return first.title.localeCompare(second.title, "uk");
      }
      if (sort === "article-asc") {
        return first.article.localeCompare(second.article, "uk", {
          numeric: true,
        });
      }
      return 0;
    });
  }, [
    maxPrice,
    minPrice,
    priceMode,
    products,
    search,
    selectedBrand,
    selectedSection,
    selectedStock,
    sort,
  ]);

  const activeFilters =
    Number(Boolean(search)) +
    Number(selectedBrand !== "Усі бренди") +
    Number(Boolean(selectedSection)) +
    Number(selectedStock !== "Будь-яка наявність") +
    Number(Boolean(minPrice)) +
    Number(Boolean(maxPrice)) +
    Number(priceMode !== "all") +
    Number(sort !== "default");

  function resetFilters() {
    setSearch("");
    setSelectedBrand("Усі бренди");
    setSelectedSection("");
    setSelectedStock("Будь-яка наявність");
    setMinPrice("");
    setMaxPrice("");
    setPriceMode("all");
    setSort("default");
    router.replace("/catalog", { scroll: false });
  }

  const controlClass =
    "mt-2 h-13 w-full rounded-xl border border-white/10 bg-[#0B0F19] px-4 text-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

  return (
    <>
      <section className="mt-12 rounded-3xl border border-white/10 bg-[#111827] p-5 md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <SlidersHorizontal aria-hidden="true" size={21} />
            </span>
            <div>
              <h2 className="text-xl font-bold">Фільтри каталогу</h2>
              <p className="mt-1 text-sm text-gray-500">
                Активних фільтрів: {activeFilters}
              </p>
            </div>
          </div>
          {activeFilters > 0 && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-gray-300 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300"
            >
              <RotateCcw aria-hidden="true" size={17} />
              Скинути всі
            </button>
          )}
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <label className="text-sm font-medium text-gray-300 md:col-span-2">
            Пошук товару
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Бренд, артикул або назва..."
              className={controlClass}
            />
          </label>

          <label className="text-sm font-medium text-gray-300">
            Секція
            <select
              value={selectedSection}
              onChange={(event) => setSelectedSection(event.target.value)}
              className={controlClass}
            >
              {SECTION_OPTIONS.map((section) => (
                <option key={section.value} value={section.value}>
                  {section.label}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-medium text-gray-300">
            Бренд
            <select
              value={selectedBrand}
              onChange={(event) => setSelectedBrand(event.target.value)}
              className={controlClass}
            >
              {brands.map((brand) => (
                <option key={brand}>{brand}</option>
              ))}
            </select>
          </label>

          <label className="text-sm font-medium text-gray-300">
            Наявність
            <select
              value={selectedStock}
              onChange={(event) => setSelectedStock(event.target.value)}
              className={controlClass}
            >
              {stockStatuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </label>

          <label className="text-sm font-medium text-gray-300">
            Показувати за ціною
            <select
              value={priceMode}
              onChange={(event) => setPriceMode(event.target.value)}
              className={controlClass}
            >
              <option value="all">Усі товари</option>
              <option value="with-price">З указаною ціною</option>
              <option value="without-price">Ціна уточнюється</option>
            </select>
          </label>

          <label className="text-sm font-medium text-gray-300">
            Ціна від, грн
            <input
              type="text"
              inputMode="decimal"
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
              placeholder="0"
              className={controlClass}
            />
          </label>

          <label className="text-sm font-medium text-gray-300">
            Ціна до, грн
            <input
              type="text"
              inputMode="decimal"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              placeholder="10000"
              className={controlClass}
            />
          </label>
        </div>
      </section>

      <div className="mt-8 flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center">
        <p className="text-gray-400">
          Знайдено товарів:{" "}
          <span className="font-semibold text-white">
            {filteredProducts.length}
          </span>
        </p>
        <label className="flex items-center gap-3 text-sm text-gray-400">
          Сортування
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortValue)}
            className="h-11 rounded-xl border border-white/10 bg-[#111827] px-4 text-white outline-none focus:border-blue-500"
          >
            <option value="default">За замовчуванням</option>
            <option value="price-asc">Від дешевих до дорогих</option>
            <option value="price-desc">Від дорогих до дешевих</option>
            <option value="title-asc">За назвою</option>
            <option value="article-asc">За артикулом</option>
          </select>
        </label>
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
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <Link
                        href={`/product/${product.slug}`}
                        className="font-semibold text-blue-400 hover:text-blue-300"
                      >
                        Детальніше →
                      </Link>
                      <span className="text-right text-xs text-emerald-400">
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
            Змініть параметри пошуку або скиньте активні фільтри.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-7 rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500"
          >
            Показати всі товари
          </button>
        </div>
      )}
    </>
  );
}
