import {
  Headphones,
  PackageCheck,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";

type Feature = {
  title: string;
  text: string;
  icon: LucideIcon;
  accent: string;
};

const features: Feature[] = [
  {
    title: "Перевірена якість",
    text: "Постачаємо оригінальну продукцію перевірених світових виробників підшипників.",
    icon: ShieldCheck,
    accent: "від виробника",
  },
  {
    title: "Швидка доставка",
    text: "Оперативно відправляємо замовлення по всій Україні з надійним пакуванням.",
    icon: Truck,
    accent: "по всій Україні",
  },
  {
    title: "Технічна підтримка",
    text: "Допомагаємо підібрати підшипник за артикулом, розмірами або типом обладнання.",
    icon: Headphones,
    accent: "професійний підбір",
  },
  {
    title: "Широкий асортимент",
    text: "Пропонуємо підшипники та комплектуючі для промисловості, транспорту й агротехніки.",
    icon: PackageCheck,
    accent: "понад 1 000 позицій",
  },
];

export default function Features() {
  return (
    <section
      aria-labelledby="features-title"
      className="relative overflow-hidden bg-[#101624] py-24 text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[88%] -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-400/25 to-transparent"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
            Переваги INTERBEARING
          </span>

          <h2
            id="features-title"
            className="mt-6 text-4xl font-black tracking-tight sm:text-5xl"
          >
            Чому клієнти обирають нас
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">
            Надійне постачання, професійний підбір і сервіс для стабільної
            роботи вашого обладнання.
          </p>
        </div>

        <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="group relative flex h-full min-h-72 flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-7 shadow-lg shadow-black/10 backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:border-blue-400/45 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-blue-950/30"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/0 to-transparent transition duration-300 group-hover:via-blue-400/70"
                />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-400 transition duration-300 group-hover:scale-110 group-hover:border-blue-400/40 group-hover:bg-blue-500/15">
                    <Icon aria-hidden="true" size={28} strokeWidth={1.8} />
                  </div>

                  <span className="text-sm font-bold tracking-[0.16em] text-white/20">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-7 text-2xl font-bold tracking-tight">
                  {item.title}
                </h3>

                <p className="mt-4 flex-1 leading-7 text-slate-400">
                  {item.text}
                </p>

                <div className="mt-7 border-t border-white/10 pt-5">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]"
                    />
                    {item.accent}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}