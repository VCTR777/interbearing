"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const products = [
  {
    id: "6205-2rs",
    brand: "SKF",
    article: "6205-2RS",
    title: "Кульковий підшипник",
    image: "/images/products/6205.jpg",
    description:
      "Надійний кульковий підшипник із гумовими ущільненнями.",
  },
  {
    id: "6308-c3",
    brand: "FAG",
    article: "6308-C3",
    title: "Радіальний підшипник",
    image: "/images/products/6308.jpg",
    description:
      "Радіальний підшипник із підвищеним внутрішнім зазором.",
  },
  {
    id: "nk45-20",
    brand: "INA",
    article: "NK45-20",
    title: "Голчастий підшипник",
    image: "/images/products/nk45-20.jpg",
    description:
      "Компактний голчастий підшипник для промислового обладнання.",
  },
  {
    id: "22210",
    brand: "NSK",
    article: "22210",
    title: "Сферичний роликовий підшипник",
    image: "/images/products/22210.jpg",
    description:
      "Підшипник для великих навантажень і компенсації перекосів.",
  },
  {
    id: "30205",
    brand: "KOYO",
    article: "30205",
    title: "Конічний роликовий підшипник",
    image: "/images/products/30205.jpg",
    description:
      "Підшипник для радіальних та осьових навантажень.",
  },
  {
    id: "6004zz",
    brand: "NTN",
    article: "6004ZZ",
    title: "Підшипник закритого типу",
    image: "/images/products/6004.jpg",
    description:
      "Кульковий підшипник із металевими захисними шайбами.",
  },
];

const brands = ["Усі", "SKF", "FAG", "INA", "NSK", "KOYO", "NTN"];

function CatalogContent() {
  const searchParams = useSearchParams();

  const brandFromUrl = searchParams.get("brand")?.toUpperCase() || "Усі";

  const validBrand = brands.includes(brandFromUrl)
    ? brandFromUrl
    : "Усі";

  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(validBrand);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesBrand =
        selectedBrand === "Усі" || product.brand === selectedBrand;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.brand.toLowerCase().includes(normalizedSearch) ||
        product.article.toLowerCase().includes(normalizedSearch) ||
        product.title.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch);

      return matchesBrand && matchesSearch;
    });
  }, [search, selectedBrand]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0B0F19] pt-28 text-white">
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
              Каталог INTERBEARING
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
              Каталог підшипників
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-400">
              Підшипники від провідних світових виробників для промисловості,
              автомобільної техніки та виробничого обладнання.
            </p>
          </div>

          <div className="mt-12 rounded-3xl border border-white/10 bg-[#111827] p-5 md:p-7">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto]">
              <div>
                <label
                  htmlFor="catalog-search"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Пошук товару
                </label>

                <input
                  id="catalog-search"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Введіть бренд, артикул або назву..."
                  className="h-14 w-full rounded-xl border border-white/10 bg-[#0B0F19] px-5 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500"
                />
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-gray-300">
                  Виробник
                </p>

                <div className="flex flex-wrap gap-2">
                  {brands.map((brand) => {
                    const isActive = selectedBrand === brand;

                    return (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => setSelectedBrand(brand)}
                        className={`h-14 rounded-xl px-5 font-semibold transition ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "border border-white/10 bg-[#0B0F19] text-gray-300 hover:border-blue-500 hover:text-white"
                        }`}
                      >
                        {brand}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between gap-4">
            <p className="text-gray-400">
              Знайдено товарів:{" "}
              <span className="font-semibold text-white">
                {filteredProducts.length}
              </span>
            </p>

            {(search || selectedBrand !== "Усі") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedBrand("Усі");
                }}
                className="text-sm font-semibold text-blue-400 transition hover:text-blue-300"
              >
                Скинути фільтри
              </button>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-[#151D2B] transition duration-300 hover:-translate-y-2 hover:border-blue-500/60 hover:shadow-2xl hover:shadow-blue-950/30"
                >
                  <div className="relative h-64 overflow-hidden bg-white">
                    <Image
                      src={product.image}
                      alt={`${product.brand} ${product.article}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-7 transition duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex min-h-[285px] flex-col p-7">
                    <div className="flex items-center justify-between gap-4">
                      <span className="rounded-full bg-blue-600/15 px-3 py-1 text-sm font-bold text-blue-400">
                        {product.brand}
                      </span>

                      <span className="text-sm text-gray-500">
                        {product.article}
                      </span>
                    </div>

                    <h2 className="mt-5 text-2xl font-bold transition group-hover:text-blue-400">
                      {product.title}
                    </h2>

                    <p className="mt-4 leading-7 text-gray-400">
                      {product.description}
                    </p>

                    <div className="mt-auto pt-7">
                      <span className="inline-flex items-center gap-2 font-semibold text-blue-400">
                        Переглянути товар
                        <span className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border border-white/10 bg-[#151D2B] px-6 py-20 text-center">
              <div className="text-5xl">🔍</div>

              <h2 className="mt-6 text-2xl font-bold">
                Товари не знайдено
              </h2>

              <p className="mt-3 text-gray-400">
                Спробуйте змінити пошуковий запит або вибрати іншого виробника.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedBrand("Усі");
                }}
                className="mt-7 rounded-xl bg-blue-600 px-7 py-3 font-semibold transition hover:bg-blue-700"
              >
                Показати всі товари
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

function CatalogLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B0F19] px-6 text-white">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-blue-500" />

        <p className="mt-5 text-gray-400">
          Завантаження каталогу...
        </p>
      </div>
    </main>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<CatalogLoading />}>
      <CatalogContent />
    </Suspense>
  );
}
