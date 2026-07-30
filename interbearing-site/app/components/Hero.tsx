"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";

const productRoutes: Record<string, string> = {
  "6205-2RS": "6205-2rs",
  "6308-C3": "6308-c3",
  "NK45-20": "nk45-20",
  "NK45/20": "nk45-20",
  "22210": "22210",
  "30205": "30205",
  "6004ZZ": "6004zz",
};

const statistics = [
  { value: "10+", label: "років досвіду" },
  { value: "1 000+", label: "позицій продукції" },
  { value: "6", label: "світових брендів" },
];

export default function Hero() {
  const router = useRouter();
  const [article, setArticle] = useState("");
  const [searchError, setSearchError] = useState("");

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedArticle = article.trim().toUpperCase();

    if (!normalizedArticle) {
      setSearchError("Введіть артикул підшипника");
      return;
    }

    const productId = productRoutes[normalizedArticle];

    if (productId) {
      setSearchError("");
      router.push(`/product/${productId}`);
      return;
    }

    setSearchError("");
    router.push(`/catalog?search=${encodeURIComponent(article.trim())}`);
  }

  return (
    <section className="relative isolate overflow-hidden bg-[#0B0F19] pb-20 pt-32 text-white md:pb-28 md:pt-40">
      {/* Фонове оформлення */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_75%_35%,rgba(37,99,235,0.18),transparent_34%),radial-gradient(circle_at_15%_80%,rgba(14,165,233,0.08),transparent_28%)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:64px_64px]"
      />

      <div
        aria-hidden="true"
        className="absolute right-[-180px] top-20 -z-10 h-[620px] w-[620px] rounded-full bg-blue-600/20 blur-[150px]"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[1.08fr_0.92fr]">
        {/* Ліва частина */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_14px_rgba(96,165,250,0.9)]" />
            Надійний постачальник підшипників
          </span>

          <h1 className="mt-7 text-5xl font-black leading-[0.96] tracking-[-0.04em] sm:text-6xl md:text-7xl">
            INTER
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              BEARING
            </span>
          </h1>

          <p className="mt-6 text-2xl font-medium text-gray-200 md:text-3xl">
            Надійність у кожному оберті
          </p>

          <p className="mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
            Постачаємо підшипники світових брендів для промисловості,
            аграрної та автомобільної техніки. Допомагаємо підібрати
            оригінал або надійний аналог.
          </p>

          {/* Пошук за артикулом */}
          <form
            onSubmit={handleSearch}
            className="mt-9 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.06] p-2 shadow-2xl shadow-black/30 backdrop-blur-xl"
          >
            <label htmlFor="hero-article-search" className="sr-only">
              Пошук за артикулом
            </label>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex min-h-14 flex-1 items-center gap-3 rounded-xl bg-[#080D17]/80 px-4">
                <Search
                  aria-hidden="true"
                  size={21}
                  className="shrink-0 text-blue-400"
                />

                <input
                  id="hero-article-search"
                  type="search"
                  value={article}
                  onChange={(event) => {
                    setArticle(event.target.value);
                    setSearchError("");
                  }}
                  placeholder="Введіть артикул: 6205-2RS"
                  className="h-14 w-full bg-transparent text-white outline-none placeholder:text-gray-600"
                />
              </div>

              <button
                type="submit"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 font-semibold transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Знайти
                <ArrowRight aria-hidden="true" size={19} />
              </button>
            </div>
          </form>

          <div className="mt-3 min-h-6">
            {searchError ? (
              <p className="text-sm text-red-400">{searchError}</p>
            ) : (
              <p className="text-sm text-gray-500">
                Наприклад: 6205-2RS, 6308-C3 або NK45-20
              </p>
            )}
          </div>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold transition hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-600/20"
            >
              Каталог продукції
              <ArrowRight aria-hidden="true" size={20} />
            </Link>

            <Link
              href="/contacts"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-8 py-4 text-lg font-semibold transition hover:-translate-y-0.5 hover:border-blue-400/60 hover:bg-blue-500/10"
            >
              Отримати консультацію
            </Link>
          </div>
        </div>

        {/* Преміальна зона зображення */}
        <div className="relative mx-auto w-full max-w-[560px]">
          <div
            aria-hidden="true"
            className="absolute inset-[8%] rounded-full bg-blue-500/25 blur-[90px]"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-blue-400/10"
          />

          <div
            aria-hidden="true"
            className="absolute inset-[9%] rounded-full border border-blue-400/15"
          />

          <div
            aria-hidden="true"
            className="absolute inset-[18%] rounded-full border border-dashed border-blue-300/20"
          />

          <div className="relative aspect-square overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.02] p-6 shadow-[0_35px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-10">
            <div className="relative h-full w-full">
              <Image
                src="/images/bearing.png"
                alt="Промисловий підшипник INTERBEARING"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)] transition duration-700 hover:scale-105 hover:rotate-6"
              />
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/10 bg-[#08101D]/80 px-5 py-4 backdrop-blur-xl">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-blue-400">
                  Світові виробники
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-200 sm:text-base">
                  SKF · FAG · INA · NSK · KOYO · NTN
                </p>
              </div>

              <span className="hidden h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-xl sm:flex">
                ✓
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div className="mx-auto mt-16 max-w-7xl px-6">
        <div className="grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl sm:grid-cols-3">
          {statistics.map((item, index) => (
            <div
              key={item.label}
              className={`px-6 py-6 text-center sm:py-7 ${
                index > 0
                  ? "border-t border-white/10 sm:border-l sm:border-t-0"
                  : ""
              }`}
            >
              <p className="text-3xl font-black text-blue-400">
                {item.value}
              </p>
              <p className="mt-2 text-sm text-gray-400">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}