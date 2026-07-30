import Image from "next/image";
import Link from "next/link";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

type Product = {
  brand: string;
  name: string;
  article: string;
  image: string;
  description: string;
  specs: Array<{
    label: string;
    value: string;
  }>;
};

const products = {
  "6205-2rs": {
    brand: "SKF",
    name: "Кульковий підшипник",
    article: "6205-2RS",
    image: "/images/products/6205.jpg",
    description:
      "Надійний кульковий підшипник для промислового обладнання, автомобільної техніки та виробничих механізмів.",
    specs: [
      { label: "Внутрішній діаметр", value: "25 мм" },
      { label: "Зовнішній діаметр", value: "52 мм" },
      { label: "Ширина", value: "15 мм" },
      { label: "Тип ущільнення", value: "2RS" },
      { label: "Матеріал", value: "Підшипникова сталь" },
      { label: "Країна бренду", value: "Швеція" },
    ],
  },

  "6308-c3": {
    brand: "FAG",
    name: "Радіальний підшипник",
    article: "6308-C3",
    image: "/images/products/6308.jpg",
    description:
      "Радіальний підшипник із підвищеним внутрішнім зазором для стабільної роботи при високих навантаженнях і температурах.",
    specs: [
      { label: "Внутрішній діаметр", value: "40 мм" },
      { label: "Зовнішній діаметр", value: "90 мм" },
      { label: "Ширина", value: "23 мм" },
      { label: "Клас внутрішнього зазору", value: "C3" },
      { label: "Матеріал", value: "Підшипникова сталь" },
      { label: "Країна бренду", value: "Німеччина" },
    ],
  },

  "nk45-20": {
    brand: "INA",
    name: "Голчастий підшипник",
    article: "NK45-20",
    image: "/images/products/nk45-20.jpg",
    description:
      "Компактний голчастий підшипник для точних механізмів, промислового обладнання та роботи в обмеженому просторі.",
    specs: [
      { label: "Тип", value: "Голчастий" },
      { label: "Внутрішній діаметр", value: "45 мм" },
      { label: "Ширина", value: "20 мм" },
      { label: "Точність", value: "Висока" },
      { label: "Матеріал", value: "Загартована сталь" },
      { label: "Країна бренду", value: "Німеччина" },
    ],
  },

  "22210": {
    brand: "NSK",
    name: "Сферичний роликовий підшипник",
    article: "22210",
    image: "/images/products/22210.jpg",
    description:
      "Сферичний роликовий підшипник для великих радіальних навантажень і компенсації перекосів валу.",
    specs: [
      { label: "Внутрішній діаметр", value: "50 мм" },
      { label: "Зовнішній діаметр", value: "90 мм" },
      { label: "Ширина", value: "23 мм" },
      { label: "Тип", value: "Сферичний роликовий" },
      { label: "Вантажопідйомність", value: "Висока" },
      { label: "Країна бренду", value: "Японія" },
    ],
  },

  "30205": {
    brand: "KOYO",
    name: "Конічний роликовий підшипник",
    article: "30205",
    image: "/images/products/30205.jpg",
    description:
      "Конічний роликовий підшипник для одночасного сприйняття радіальних та осьових навантажень.",
    specs: [
      { label: "Внутрішній діаметр", value: "25 мм" },
      { label: "Зовнішній діаметр", value: "52 мм" },
      { label: "Ширина", value: "16,25 мм" },
      { label: "Тип", value: "Конічний роликовий" },
      { label: "Матеріал", value: "Підшипникова сталь" },
      { label: "Країна бренду", value: "Японія" },
    ],
  },

  "6004zz": {
    brand: "NTN",
    name: "Підшипник закритого типу",
    article: "6004ZZ",
    image: "/images/products/6004.jpg",
    description:
      "Закритий кульковий підшипник із металевими захисними шайбами для тривалої експлуатації без частого обслуговування.",
    specs: [
      { label: "Внутрішній діаметр", value: "20 мм" },
      { label: "Зовнішній діаметр", value: "42 мм" },
      { label: "Ширина", value: "12 мм" },
      { label: "Тип захисту", value: "ZZ" },
      { label: "Захисні елементи", value: "Металеві шайби" },
      { label: "Країна бренду", value: "Японія" },
    ],
  },
} satisfies Record<string, Product>;

type ProductId = keyof typeof products;

export function generateStaticParams() {
  return Object.keys(products).map((id) => ({ id }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products[id as ProductId];

  if (!product) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-screen items-center justify-center bg-[#0B0F19] px-6 pt-20 text-white">
          <div className="max-w-xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
              Помилка 404
            </p>

            <h1 className="mt-5 text-4xl font-bold md:text-5xl">
              Товар не знайдено
            </h1>

            <p className="mt-5 leading-7 text-gray-400">
              Можливо, товар було видалено або адреса сторінки вказана
              неправильно.
            </p>

            <Link
              href="/catalog"
              className="mt-8 inline-flex rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700"
            >
              Повернутися до каталогу
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const relatedProducts = Object.entries(products)
    .filter(([productId]) => productId !== id)
    .slice(0, 3);

  const contactHref = `/contacts?product=${encodeURIComponent(
    `${product.brand} ${product.article}`,
  )}`;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0B0F19] pt-28 text-white">
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <nav
            aria-label="Навігаційний ланцюжок"
            className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500"
          >
            <Link href="/" className="transition hover:text-blue-400">
              Головна
            </Link>

            <span>/</span>

            <Link href="/catalog" className="transition hover:text-blue-400">
              Каталог
            </Link>

            <span>/</span>

            <span className="text-gray-300">{product.article}</span>
          </nav>

          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div className="lg:sticky lg:top-28">
              <div className="rounded-3xl border border-white/10 bg-[#151D2B] p-5 shadow-2xl shadow-black/20 md:p-8">
                <div className="relative min-h-[360px] overflow-hidden rounded-2xl bg-white md:min-h-[520px]">
                  <Image
                    src={product.image}
                    alt={`${product.brand} ${product.article}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-6 transition duration-500 hover:scale-105 md:p-10"
                  />
                </div>
              </div>

              <p className="mt-4 text-center text-sm text-gray-500">
                Зображення товару може відрізнятися залежно від модифікації.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold">
                  {product.brand}
                </span>

                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400">
                  Доступність уточнюйте
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
                {product.name}
              </h1>

              <p className="mt-4 text-xl text-gray-400">
                Артикул:{" "}
                <span className="font-semibold text-white">
                  {product.article}
                </span>
              </p>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-300">
                {product.description}
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  ["✓", "Оригінальна продукція"],
                  ["→", "Доставка по Україні"],
                  ["◆", "Гарантія якості"],
                  ["?", "Професійний підбір"],
                ].map(([icon, text]) => (
                  <div
                    key={text}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#151D2B] p-5"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/15 font-bold text-blue-400">
                      {icon}
                    </span>

                    <span className="font-medium text-gray-200">{text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[#151D2B]">
                <div className="border-b border-white/10 px-6 py-5 md:px-8">
                  <h2 className="text-2xl font-bold">Характеристики</h2>

                  <p className="mt-2 text-sm text-gray-400">
                    Основні параметри моделі {product.article}
                  </p>
                </div>

                <dl>
                  {product.specs.map((spec, index) => (
                    <div
                      key={spec.label}
                      className={`grid gap-2 px-6 py-4 sm:grid-cols-2 md:px-8 ${
                        index % 2 === 0 ? "bg-white/[0.025]" : ""
                      }`}
                    >
                      <dt className="text-gray-400">{spec.label}</dt>

                      <dd className="font-semibold text-white sm:text-right">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-10 rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/15 to-transparent p-6 md:p-8">
                <h2 className="text-2xl font-bold">
                  Потрібна ціна або консультація?
                </h2>

                <p className="mt-3 leading-7 text-gray-400">
                  Надішліть запит щодо {product.brand} {product.article}. Наш
                  спеціаліст перевірить доступність і зв’яжеться з вами.
                </p>

                <div className="mt-7 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href={contactHref}
                    className="flex-1 rounded-xl bg-blue-600 px-8 py-4 text-center text-lg font-semibold transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25"
                  >
                    Запросити ціну
                  </Link>

                  <Link
                    href="/catalog"
                    className="flex-1 rounded-xl border border-white/15 px-8 py-4 text-center text-lg font-semibold transition hover:border-blue-500 hover:bg-white/5"
                  >
                    До каталогу
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#111827] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
                  Каталог
                </p>

                <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                  Схожі товари
                </h2>
              </div>

              <Link
                href="/catalog"
                className="font-semibold text-blue-400 transition hover:text-blue-300"
              >
                Переглянути весь каталог →
              </Link>
            </div>

            <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map(([relatedId, relatedProduct]) => (
                <Link
                  key={relatedId}
                  href={`/product/${relatedId}`}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-[#151D2B] transition duration-300 hover:-translate-y-2 hover:border-blue-500/60 hover:shadow-2xl hover:shadow-blue-950/30"
                >
                  <div className="relative h-56 bg-white">
                    <Image
                      src={relatedProduct.image}
                      alt={`${relatedProduct.brand} ${relatedProduct.article}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain p-6 transition duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-7">
                    <div className="flex items-center justify-between gap-4">
                      <span className="rounded-full bg-blue-600/15 px-3 py-1 text-sm font-bold text-blue-400">
                        {relatedProduct.brand}
                      </span>

                      <span className="text-sm text-gray-500">
                        {relatedProduct.article}
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-bold transition group-hover:text-blue-400">
                      {relatedProduct.name}
                    </h3>

                    <span className="mt-6 inline-flex font-semibold text-blue-400">
                      Детальніше →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="rounded-3xl border border-white/10 bg-[#151D2B] p-8 md:p-10">
            <h2 className="text-3xl font-bold">
              Чому обирають INTERBEARING?
            </h2>

            <div className="mt-10 grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="text-xl font-semibold">
                  Оригінальна продукція
                </h3>

                <p className="mt-3 leading-7 text-gray-400">
                  Підшипники від перевірених світових виробників: SKF, FAG,
                  INA, NSK, KOYO, NTN та інших.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">Швидка доставка</h3>

                <p className="mt-3 leading-7 text-gray-400">
                  Відправляємо замовлення по всій Україні у найкоротші
                  терміни.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  Допомога спеціалістів
                </h3>

                <p className="mt-3 leading-7 text-gray-400">
                  Підберемо потрібний підшипник за розмірами, артикулом,
                  виробником або сферою застосування.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}