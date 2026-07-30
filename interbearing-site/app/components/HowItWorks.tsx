import {
  ClipboardCheck,
  MessageSquareText,
  SearchCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";

type ProcessStep = {
  number: string;
  title: string;
  text: string;
  icon: LucideIcon;
};

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Залишаєте заявку",
    text: "Повідомляєте артикул, розміри або описуєте обладнання, для якого потрібен підшипник.",
    icon: MessageSquareText,
  },
  {
    number: "02",
    title: "Підбираємо рішення",
    text: "Перевіряємо параметри та пропонуємо оригінальний підшипник або надійний аналог.",
    icon: SearchCheck,
  },
  {
    number: "03",
    title: "Узгоджуємо замовлення",
    text: "Підтверджуємо виробника, наявність, вартість, спосіб оплати та термін відправлення.",
    icon: ClipboardCheck,
  },
  {
    number: "04",
    title: "Доставляємо товар",
    text: "Надійно пакуємо замовлення та відправляємо обраною службою доставки по Україні.",
    icon: Truck,
  },
];

export default function HowItWorks() {
  return (
    <section
      aria-labelledby="process-title"
      className="relative overflow-hidden bg-[#101624] py-24 text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[88%] -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-400/25 to-transparent"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-44 bottom-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
            Простий процес замовлення
          </span>

          <h2
            id="process-title"
            className="mt-6 text-4xl font-black tracking-tight sm:text-5xl"
          >
            Як ми працюємо
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">
            Від першого звернення до отримання товару — зрозуміло, оперативно
            та з технічною підтримкою на кожному етапі.
          </p>
        </div>

        <ol className="relative mt-16 grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-gradient-to-r from-blue-500/20 via-blue-400/55 to-blue-500/20 xl:block"
          />

          {processSteps.map((step) => {
            const Icon = step.icon;

            return (
              <li
                key={step.number}
                className="group relative flex h-full min-h-72 flex-col rounded-3xl border border-white/10 bg-[#151D2B] p-7 transition duration-300 hover:-translate-y-2 hover:border-blue-400/45 hover:shadow-2xl hover:shadow-blue-950/35"
              >
                <div className="relative z-10 flex items-center justify-between gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-blue-400/35 bg-[#0B0F19] text-sm font-black tracking-[0.1em] text-blue-300 shadow-[0_0_24px_rgba(37,99,235,0.18)]">
                    {step.number}
                  </span>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 transition duration-300 group-hover:scale-110 group-hover:bg-blue-500/15">
                    <Icon aria-hidden="true" size={25} strokeWidth={1.8} />
                  </div>
                </div>

                <h3 className="mt-8 text-2xl font-bold tracking-tight">
                  {step.title}
                </h3>

                <p className="mt-4 flex-1 leading-7 text-slate-400">
                  {step.text}
                </p>

                <div className="mt-7 h-px bg-gradient-to-r from-blue-400/35 to-transparent" />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}