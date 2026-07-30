import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Globe2,
  ShieldCheck,
} from "lucide-react";

const brands = [
  {
    name: "SKF",
    logo: "/brands/skf.svg",
    country: "Швеція",
    year: "1907",
    description:
      "Світовий лідер у виробництві підшипників та інженерних рішень для промисловості.",
  },
  {
    name: "FAG",
    logo: "/brands/fag.svg",
    country: "Німеччина",
    year: "1883",
    description:
      "Високоточні підшипники для промислового обладнання й автомобільного сектору.",
  },
  {
    name: "INA",
    logo: "/brands/ina.svg",
    country: "Німеччина",
    year: "1946",
    description:
      "Інноваційні рішення для машинобудування, автоматизації та промисловості.",
  },
  {
    name: "NSK",
    logo: "/brands/nsk.svg",
    country: "Японія",
    year: "1916",
    description:
      "Японська якість і довговічність для складних умов експлуатації.",
  },
  {
    name: "KOYO",
    logo: "/brands/koyo.svg",
    country: "Японія",
    year: "1921",
    description:
      "Надійні підшипники для автомобільної, аграрної та промислової техніки.",
  },
  {
    name: "NTN",
    logo: "/brands/ntn.svg",
    country: "Японія",
    year: "1918",
    description:
      "Один із найбільших світових виробників підшипникової продукції.",
  },
];

export default function Brands() {
  return (
    <section id="brands" className="bg-[#0B0F19] py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-5 py-2 text-sm text-blue-400">
            Наші партнери
          </span>

          <h2 className="mt-6 text-5xl font-bold">Світові бренди</h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            Ми співпрацюємо з перевіреними світовими виробниками,
            гарантуючи якість та оригінальність продукції.
          </p>
        </div>

        <div className="mt-20 grid items-stretch gap-8 md:grid-cols-2 xl:grid-cols-3">
          {brands.map((brand) => (
            <article
              key={brand.name}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#151D2B] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/20"
            >
              <div className="flex h-28 items-center justify-center rounded-2xl bg-white p-5">
                <Image
                  src={brand.logo}
                  alt={`Логотип ${brand.name}`}
                  width={220}
                  height={90}
                  className="h-20 w-auto object-contain transition duration-300 group-hover:scale-110"
                />
              </div>

              <h3 className="mt-8 text-3xl font-bold">{brand.name}</h3>

              <p className="mt-4 min-h-[96px] leading-8 text-gray-400">
                {brand.description}
              </p>

              <div className="mt-8 mb-8 border-t border-white/10 pt-6 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <Globe2 size={18} className="shrink-0 text-blue-400" />
                  <span>
                    Країна:{" "}
                    <strong className="font-semibold text-white">
                      {brand.country}
                    </strong>
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <CalendarDays
                    size={18}
                    className="shrink-0 text-blue-400"
                  />
                  <span>
                    Засновано:{" "}
                    <strong className="font-semibold text-white">
                      {brand.year}
                    </strong>
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <ShieldCheck
                    size={18}
                    className="shrink-0 text-blue-400"
                  />
                  <span>Оригінальна продукція та гарантія виробника</span>
                </div>
              </div>

              <Link
                href={`/catalog?brand=${brand.name}`}
                className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 font-semibold transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30"
              >
                Переглянути товари
                <ArrowRight size={18} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}