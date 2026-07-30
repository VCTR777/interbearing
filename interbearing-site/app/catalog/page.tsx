"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import BrandFilter from "../components/BrandFilter";

const products = [
  {
    id: "6205-2rs",
    brand: "SKF",
    article: "6205-2RS",
    title: "Кульковий підшипник",
    image: "/images/products/6205.jpg",
  },
  {
    id: "6308-c3",
    brand: "FAG",
    article: "6308-C3",
    title: "Радіальний підшипник",
    image: "/images/products/6308.jpg",
  },
  {
    id: "nk45-20",
    brand: "INA",
    article: "NK45-20",
    title: "Голчастий підшипник",
    image: "/images/products/NK45-20.jpg",
  },
  {
    id: "22210",
    brand: "NSK",
    article: "22210",
    title: "Сферичний роликовий",
    image: "/images/products/22210.jpg",
  },
  {
    id: "30205",
    brand: "KOYO",
    article: "30205",
    title: "Конічний підшипник",
    image: "/images/products/30205.jpg",
  },
  {
    id: "6004zz",
    brand: "NTN",
    article: "6004ZZ",
    title: "Підшипник закритого типу",
    image: "/images/products/6004.jpg",
  },
];

export default function CatalogPage() {
  const searchParams = useSearchParams();
  const brandFromUrl = searchParams.get("brand");

  const [search, setSearch] = useState("");
  const [activeBrand, setActiveBrand] = useState(
    brandFromUrl && products.some((product) => product.brand === brandFromUrl)
      ? brandFromUrl
      : "Усі",
  );

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(query) ||
        product.article.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query);

      const matchesBrand =
        activeBrand === "Усі" || product.brand === activeBrand;

      return matchesSearch && matchesBrand;
    });
  }, [activeBrand, search]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0B0F19] pt-32 text-white">
        <section className="mx-auto max-w-7xl px-6">
          <h1 className="text-center text-5xl font-bold">
            Каталог продукції
          </h1>

          <p className="mt-4 text-center text-gray-400">
            Знайдіть потрібний підшипник за назвою, брендом або артикулом
          </p>

          <div className="mt-14">
            <SearchBar search={search} setSearch={setSearch} />

            <BrandFilter
              active={activeBrand}
              setActive={setActiveBrand}
            />
          </div>

          <p className="mb-8 text-sm text-gray-400">
            Знайдено товарів: {filteredProducts.length}
          </p>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#151D2B] transition duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/15"
              >
                <div className="relative h-56 bg-white">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-6 transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-8">
                  <span className="inline-block rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold">
                    {product.brand}
                  </span>

                  <h2 className="mt-5 text-2xl font-bold">
                    {product.title}
                  </h2>

                  <p className="mt-3 text-gray-400">
                    Артикул: {product.article}
                  </p>

                  <Link
                    href={`/product/${product.id}`}
                    className="mt-8 block w-full rounded-xl border border-blue-600 py-3 text-center font-semibold transition hover:bg-blue-600"
                  >
                    Детальніше
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-24 text-center">
              <h2 className="text-3xl font-bold">Нічого не знайдено</h2>

              <p className="mt-4 text-gray-400">
                Спробуйте змінити пошуковий запит або обрати інший бренд.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}