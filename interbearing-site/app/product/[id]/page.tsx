import Image from "next/image";
import Link from "next/link";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const products = {
  "6205-2rs": {
    brand: "SKF",
    name: "Кульковий підшипник",
    article: "6205-2RS",
    image: "/images/products/6205.jpg",
    description:
      "Надійний кульковий підшипник для промислового обладнання, автомобільної техніки та виробничих механізмів.",
    specs: [
      "Внутрішній діаметр: 25 мм",
      "Зовнішній діаметр: 52 мм",
      "Ширина: 15 мм",
      "Тип ущільнення: 2RS",
      "Матеріал: підшипникова сталь",
      "Країна бренду: Швеція",
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
      "Внутрішній діаметр: 40 мм",
      "Зовнішній діаметр: 90 мм",
      "Ширина: 23 мм",
      "Клас внутрішнього зазору: C3",
      "Матеріал: підшипникова сталь",
      "Країна бренду: Німеччина",
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
      "Тип: голчастий",
      "Внутрішній діаметр: 45 мм",
      "Ширина: 20 мм",
      "Висока точність",
      "Матеріал: загартована сталь",
      "Країна бренду: Німеччина",
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
      "Внутрішній діаметр: 50 мм",
      "Зовнішній діаметр: 90 мм",
      "Ширина: 23 мм",
      "Тип: сферичний роликовий",
      "Висока вантажопідйомність",
      "Країна бренду: Японія",
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
      "Внутрішній діаметр: 25 мм",
      "Зовнішній діаметр: 52 мм",
      "Ширина: 16,25 мм",
      "Тип: конічний роликовий",
      "Матеріал: підшипникова сталь",
      "Країна бренду: Японія",
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
      "Внутрішній діаметр: 20 мм",
      "Зовнішній діаметр: 42 мм",
      "Ширина: 12 мм",
      "Тип захисту: ZZ",
      "Металеві захисні шайби",
      "Країна бренду: Японія",
    ],
  },
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = products[id as keyof typeof products];

  if (!product) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-screen items-center justify-center bg-[#0B0F19] px-6 pt-20 text-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Товар не знайдено</h1>

            <p className="mt-4 text-gray-400">
              Можливо, товар було видалено або адреса сторінки неправильна.
            </p>

            <Link
              href="/catalog"
              className="mt-8 inline-block rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700"
            >
              Повернутися до каталогу
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0B0F19] pt-32 text-white">
        <section className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">

            <div className="rounded-3xl border border-white/10 bg-[#151D2B] p-6 md:p-10">
              <div className="relative min-h-[380px] overflow-hidden rounded-2xl bg-white md:min-h-[520px]">
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

            <div>
              <span className="inline-flex rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold">
                {product.brand}
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
                {product.name}
              </h1>

              <p className="mt-4 text-xl text-gray-400">
                Артикул: {product.article}
              </p>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-300">
                {product.description}
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-[#151D2B] p-5">
                  ✅ Оригінальна продукція
                </div>

                <div className="rounded-xl border border-white/10 bg-[#151D2B] p-5">
                  🚚 Швидка доставка
                </div>

                <div className="rounded-xl border border-white/10 bg-[#151D2B] p-5">
                  🛡️ Гарантія якості
                </div>

                <div className="rounded-xl border border-white/10 bg-[#151D2B] p-5">
                  💬 Консультація спеціаліста
                </div>
              </div>
                            <div className="mt-10 rounded-3xl border border-white/10 bg-[#151D2B] p-8">
                <h2 className="mb-6 text-2xl font-bold">
                  Характеристики
                </h2>

                <ul className="space-y-4">
                  {product.specs.map((spec) => (
                    <li
                      key={spec}
                      className="flex items-center gap-3 border-b border-white/5 pb-4 text-gray-300 last:border-none last:pb-0"
                    >
                      <span className="text-blue-500">✔</span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contacts"
                  className="flex-1 rounded-xl bg-blue-600 px-8 py-4 text-center text-lg font-semibold transition hover:bg-blue-700"
                >
                  Запросити ціну
                </Link>

                <Link
                  href="/catalog"
                  className="flex-1 rounded-xl border border-white/10 px-8 py-4 text-center text-lg font-semibold transition hover:border-blue-500 hover:bg-[#151D2B]"
                >
                  Повернутися до каталогу
                </Link>
              </div>

            </div>
          </div>

          <section className="mt-24 rounded-3xl border border-white/10 bg-[#151D2B] p-10">
            <h2 className="text-3xl font-bold">
              Чому обирають INTERBEARING?
            </h2>

            <div className="mt-10 grid gap-8 md:grid-cols-3">

              <div>
                <h3 className="text-xl font-semibold">
                  Оригінальна продукція
                </h3>

                <p className="mt-3 leading-7 text-gray-400">
                  Постачаємо підшипники лише від перевірених світових виробників:
                  SKF, FAG, INA, NSK, KOYO, NTN та інших.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  Швидка доставка
                </h3>

                <p className="mt-3 leading-7 text-gray-400">
                  Відправляємо замовлення по всій Україні у найкоротші терміни.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  Допомога спеціалістів
                </h3>

                <p className="mt-3 leading-7 text-gray-400">
                  Допоможемо підібрати потрібний підшипник за розмірами,
                  артикулом або виробником.
                </p>
              </div>

            </div>
          </section>

        </section>
      </main>

      <Footer />
    </>
  );
}