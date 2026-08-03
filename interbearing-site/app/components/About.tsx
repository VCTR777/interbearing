import Link from "next/link";
import { getPublishedBrands } from "@/lib/brands";
import AboutLogoCard from "./AboutLogoCard";
import {
  Award,
  Boxes,
  Factory,
  Handshake,
  Headset,
  ShieldCheck,
  Truck,
} from "lucide-react";

const statistics = [
  { value: "10+", label: "років досвіду" },
  { value: "1000+", label: "позицій продукції" },
  { value: "500+", label: "постійних клієнтів" },
  { value: "24/7", label: "консультаційна підтримка" },
];

const advantages = [
  {
    icon: Award,
    title: "Перевірена якість",
    text: "Пропонуємо продукцію від відомих виробників та ретельно підходимо до підбору рішень.",
  },
  {
    icon: Headset,
    title: "Технічна підтримка",
    text: "Допомагаємо підібрати підшипники та комплектуючі для конкретного обладнання.",
  },
  {
    icon: Truck,
    title: "Оперативна доставка",
    text: "Організовуємо швидке відправлення замовлень по всій Україні.",
  },
  {
    icon: Boxes,
    title: "Широкий асортимент",
    text: "Підшипники, корпусні вузли, ущільнення та супутні комплектуючі.",
  },
  {
    icon: Handshake,
    title: "Індивідуальний підхід",
    text: "Працюємо як з промисловими підприємствами, так і з приватними клієнтами.",
  },
  {
    icon: ShieldCheck,
    title: "Надійне партнерство",
    text: "Будуємо довгострокову співпрацю на основі відповідальності та довіри.",
  },
];

const fallbackBrands = ["SKF", "FAG", "INA", "NSK", "NTN", "KOYO", "TIMKEN", "SNR"];

export default async function About() {
  const brandRows = await getPublishedBrands();
  const brands = brandRows.length ? brandRows.map((brand) => brand.name) : fallbackBrands;
  return (
    <section id="about" className="overflow-hidden bg-[#0B0F19] py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Hero */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
              Про компанію
            </span>

            <h1 className="mt-7 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Надійний партнер у світі{" "}
              <span className="text-blue-500">підшипників</span>
            </h1>

            <p className="mt-7 text-lg leading-8 text-slate-300">
              INTERBEARING — українська компанія, що спеціалізується на
              постачанні підшипників, корпусних вузлів, ущільнень і технічних
              комплектуючих для промисловості, автомобільної та аграрної техніки.
            </p>

            <p className="mt-5 text-lg leading-8 text-slate-400">
              Ми допомагаємо клієнтам підібрати оптимальне рішення для
              обладнання, забезпечуючи професійну консультацію, широкий вибір
              продукції та оперативну доставку.
            </p>

            <Link
              href="/contacts"
              className="mt-9 inline-flex rounded-xl bg-blue-600 px-7 py-4 font-semibold transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30"
            >
              Отримати консультацію
            </Link>
          </div>

          <AboutLogoCard />
        </div>

        {/* Mission and vision */}
        <div className="mt-24 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-[#151D2B] p-8 sm:p-10">
            <Factory className="text-blue-500" size={42} />
            <h2 className="mt-6 text-3xl font-bold">Наша місія</h2>
            <p className="mt-4 leading-8 text-slate-400">
              Забезпечувати підприємства України якісними підшипниками та
              комплектуючими, допомагаючи обладнанню працювати стабільно,
              ефективно та безперебійно.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-[#151D2B] p-8 sm:p-10">
            <Handshake className="text-blue-400" size={42} />
            <h2 className="mt-6 text-3xl font-bold">Наше бачення</h2>
            <p className="mt-4 leading-8 text-slate-400">
              Бути надійним постачальником для бізнесу, поєднуючи сучасний
              сервіс, широкий асортимент, технічну експертизу та індивідуальний
              підхід до кожного клієнта.
            </p>
          </article>
        </div>

        {/* Statistics */}
        <div className="mt-24 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-[#151D2B] p-7 text-center"
            >
              <p className="text-4xl font-black text-blue-500">{item.value}</p>
              <p className="mt-3 text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Overview */}
        <div className="mt-24 rounded-3xl border border-white/10 bg-[#151D2B] p-8 sm:p-12">
          <span className="text-sm font-medium text-blue-400">Досвід та підхід</span>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold sm:text-4xl">
            Рішення для промисловості, техніки та виробництва
          </h2>

          <div className="mt-7 grid gap-6 text-lg leading-8 text-slate-400 lg:grid-cols-2">
            <p>
              INTERBEARING спеціалізується на комплексному постачанні
              підшипникової продукції для різних сфер застосування. Ми
              допомагаємо знайти необхідні комплектуючі як для великих
              підприємств, так і для локальних технічних задач.
            </p>
            <p>
              Наш пріоритет — довгострокове партнерство. Саме тому ми приділяємо
              увагу якості продукції, точності підбору, прозорій комунікації та
              швидкому виконанню замовлень.
            </p>
          </div>
        </div>

        {/* Advantages */}
        <div className="mt-24">
          <div className="max-w-2xl">
            <span className="text-sm font-medium text-blue-400">Наші переваги</span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Чому обирають INTERBEARING
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {advantages.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group rounded-2xl border border-white/10 bg-[#151D2B] p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-500/70"
                >
                  <Icon
                    size={38}
                    className="text-blue-500 transition duration-300 group-hover:scale-110"
                  />
                  <h3 className="mt-6 text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-400">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>

        {/* Brands */}
        <div className="mt-24 rounded-3xl border border-white/10 bg-[#101725] p-8 sm:p-12">
          <div className="text-center">
            <span className="text-sm font-medium text-blue-400">Партнерські бренди</span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Світові виробники підшипників
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
              Допомагаємо підібрати продукцію перевірених міжнародних брендів
              відповідно до потреб вашого обладнання.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {brands.map((brand) => (
              <Link
                key={brand}
                href={`/catalog?brand=${encodeURIComponent(brand)}`}
                aria-label={`Переглянути товари бренду ${brand}`}
                className="flex min-h-24 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 text-center text-xl font-bold tracking-wider text-slate-200 transition hover:border-blue-500 hover:text-blue-400"
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="relative mt-24 overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-r from-blue-700 to-blue-600 p-8 sm:p-12">
          <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <h2 className="text-3xl font-black sm:text-5xl">Готові до співпраці?</h2>
            <p className="mt-5 text-lg leading-8 text-blue-100">
              Наші спеціалісти допоможуть підібрати підшипники та комплектуючі
              саме для вашого обладнання.
            </p>

            <Link
              href="/contacts"
              className="mt-8 inline-flex rounded-xl bg-white px-7 py-4 font-semibold text-blue-700 transition hover:bg-slate-100"
            >
              Залишити заявку
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
