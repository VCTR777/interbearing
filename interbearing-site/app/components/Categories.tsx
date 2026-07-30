import {
  Boxes,
  CarFront,
  Factory,
  Package,
  Settings,
  Tractor,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

type Category = {
  title: string;
  text: string;
  label: string;
  icon: LucideIcon;
  section: string;
};

const categories: Category[] = [
  {
    title: "Промислові підшипники",
    text: "Рішення для верстатів, приводів, електродвигунів і виробничих ліній.",
    label: "Промисловість",
    icon: Factory,
    section: "industrial",
  },
  {
    title: "Автомобільні підшипники",
    text: "Підшипники та вузли для легкового, вантажного й комерційного транспорту.",
    label: "Автотранспорт",
    icon: CarFront,
    section: "automotive",
  },
  {
    title: "Підшипники для агротехніки",
    text: "Комплектуючі для тракторів, комбайнів, сівалок та іншої аграрної техніки.",
    label: "Агротехніка",
    icon: Tractor,
    section: "agriculture",
  },
  {
    title: "Корпусні вузли",
    text: "Готові підшипникові вузли для швидкого монтажу та надійної експлуатації.",
    label: "Готові рішення",
    icon: Settings,
    section: "housings",
  },
  {
    title: "Ущільнення",
    text: "Манжети, сальники та ущільнювальні елементи для захисту механізмів.",
    label: "Захист вузлів",
    icon: Boxes,
    section: "seals",
  },
  {
    title: "Комплектуючі",
    text: "Супутні деталі й аксесуари для обслуговування підшипникових систем.",
    label: "Супутні товари",
    icon: Package,
    section: "components",
  },
];

export default function Categories() {
  return (
    <section
      aria-labelledby="categories-title"
      className="relative overflow-hidden bg-[#0B0F19] py-24 text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-44 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
              Каталог продукції
            </span>

            <h2
              id="categories-title"
              className="mt-6 text-4xl font-black tracking-tight sm:text-5xl"
            >
              Рішення для різних галузей
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              Підбираємо підшипники та комплектуючі відповідно до умов
              експлуатації, навантаження й типу обладнання.
            </p>
          </div>

          <Link
            href="/catalog"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-blue-400/30 bg-blue-500/10 px-6 py-3 font-semibold text-blue-300 transition hover:border-blue-400/60 hover:bg-blue-500/20 hover:text-white"
          >
            Відкрити весь каталог
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                href={`/catalog?section=${category.section}`}
                className="group relative flex min-h-72 flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#151D2B] p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-400/45 hover:shadow-2xl hover:shadow-blue-950/35"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/0 to-transparent transition duration-300 group-hover:via-blue-400/70"
                />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-400 transition duration-300 group-hover:scale-110 group-hover:bg-blue-500/15">
                    <Icon aria-hidden="true" size={29} strokeWidth={1.75} />
                  </div>

                  <span className="text-sm font-bold tracking-[0.16em] text-white/20">
                    0{index + 1}
                  </span>
                </div>

                <p className="mt-7 text-sm font-semibold uppercase tracking-[0.12em] text-blue-300">
                  {category.label}
                </p>

                <h3 className="mt-3 text-2xl font-bold tracking-tight transition group-hover:text-blue-300">
                  {category.title}
                </h3>

                <p className="mt-4 flex-1 leading-7 text-slate-400">
                  {category.text}
                </p>

                <div className="mt-7 border-t border-white/10 pt-5">
                  <span className="inline-flex items-center gap-2 font-semibold text-white">
                    Переглянути продукцію
                    <span
                      aria-hidden="true"
                      className="text-blue-400 transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
