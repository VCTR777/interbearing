import {
  Car,
  Factory,
  Tractor,
  Cog,
  Wrench,
  Package,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    icon: Car,
    title: "Автомобільні підшипники",
    text: "Для легкових та вантажних автомобілів.",
  },
  {
    icon: Factory,
    title: "Промислові підшипники",
    text: "Для виробничого обладнання та механізмів.",
  },
  {
    icon: Tractor,
    title: "Аграрна техніка",
    text: "Підшипники для тракторів, комбайнів та спецтехніки.",
  },
  {
    icon: Cog,
    title: "Корпусні вузли",
    text: "Готові рішення для промисловості.",
  },
  {
    icon: Wrench,
    title: "Ущільнення",
    text: "Манжети, сальники та кільця.",
  },
  {
    icon: Package,
    title: "Комплектуючі",
    text: "Додаткові деталі та аксесуари.",
  },
];

export default function Categories() {
  return (
    <section className="bg-[#0B0F19] py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
            Каталог
          </span>

          <h2 className="mt-6 text-5xl font-bold">
            Категорії продукції
          </h2>

          <p className="mt-4 text-lg text-gray-400">
            Великий вибір підшипників та комплектуючих для будь-яких потреб
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {categories.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-500"
              >
                <Icon
                  size={50}
                  className="mb-6 text-blue-500 transition group-hover:scale-110"
                />

                <h3 className="text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-400">
                  {item.text}
                </p>

                <button className="mt-8 flex items-center gap-2 font-semibold text-blue-400 transition hover:text-blue-300">
                  Детальніше
                  <ArrowRight size={18} />
                </button>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}