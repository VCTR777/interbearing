import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const popularProducts = [
  {
    id: "6205-2rs",
    brand: "SKF",
    article: "6205-2RS",
    title: "Кульковий підшипник",
    image: "/images/products/6205.jpg",
    description:
      "Універсальний радіальний підшипник із двостороннім гумовим ущільненням.",
  },
  {
    id: "6308-c3",
    brand: "FAG",
    article: "6308-C3",
    title: "Радіальний підшипник",
    image: "/images/products/6308.jpg",
    description:
      "Надійне рішення з підвищеним внутрішнім зазором для складних умов роботи.",
  },
  {
    id: "nk45-20",
    brand: "INA",
    article: "NK45-20",
    title: "Голчастий підшипник",
    image: "/images/products/nk45-20.jpg",
    description:
      "Компактний підшипник для точних механізмів і роботи в обмеженому просторі.",
  },
];

export default function PopularProducts() {
  return (
    <section
      aria-labelledby="popular-products-title"
      className="relative overflow-hidden bg-[#101624] py-24 text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-16 h-96 w-96 rounded-full bg-blue-600/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
              Популярні позиції
            </span>

            <h2
              id="popular-products-title"
              className="mt-6 text-4xl font-black tracking-tight sm:text-5xl"
            >
              Найчастіше замовляють
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              Затребувані моделі від перевірених виробників. Для уточнення
              наявності та ціни залиште заявку.
            </p>
          </div>

          <Link
            href="/catalog"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-600/20"
          >
            Переглянути весь каталог
            <ArrowRight aria-hidden="true" size={19} />
          </Link>
        </div>

        <div className="mt-14 grid items-stretch gap-7 md:grid-cols-2 xl:grid-cols-3">
          {popularProducts.map((product) => (
            <article
              key={product.id}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#151D2B] transition duration-300 hover:-translate-y-2 hover:border-blue-400/45 hover:shadow-2xl hover:shadow-blue-950/35"
            >
              <Link
                href={`/product/${product.id}`}
                aria-label={`${product.brand} ${product.article}`}
                className="relative block h-64 overflow-hidden bg-white"
              >
                <Image
                  src={product.image}
                  alt={`${product.brand} ${product.article}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-contain p-7 transition duration-500 group-hover:scale-110"
                />

                <span className="absolute left-5 top-5 rounded-full bg-[#0B0F19]/90 px-4 py-2 text-sm font-bold text-blue-300 shadow-lg backdrop-blur">
                  {product.brand}
                </span>
              </Link>

              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-300">
                    {product.article}
                  </p>

                  <span className="inline-flex items-center gap-1.5 text-sm text-emerald-400">
                    <CheckCircle2 aria-hidden="true" size={16} />
                    Уточнюйте наявність
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-bold tracking-tight">
                  {product.title}
                </h3>

                <p className="mt-4 flex-1 leading-7 text-slate-400">
                  {product.description}
                </p>

                <Link
                  href={`/product/${product.id}`}
                  className="mt-7 inline-flex items-center justify-between rounded-xl border border-blue-400/25 bg-blue-500/10 px-5 py-4 font-semibold text-white transition hover:border-blue-400/55 hover:bg-blue-600"
                >
                  Детальніше про товар
                  <ArrowRight
                    aria-hidden="true"
                    size={19}
                    className="text-blue-300 transition group-hover:translate-x-1 group-hover:text-white"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}