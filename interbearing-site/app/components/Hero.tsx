import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0B0F19] pt-32 pb-24">
      {/* Синее свечение */}
      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 lg:flex-row lg:justify-between">

        {/* Левая часть */}
        <div className="max-w-2xl">

          <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
            Надійний постачальник підшипників
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-7xl">
            INTER<span className="text-blue-500">BEARING</span>
          </h1>

          <p className="mt-6 text-2xl text-gray-300">
            Надійність у кожному оберті
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Постачаємо якісні підшипники для промисловості,
            аграрної техніки, автомобілів та виробничого обладнання.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <button className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold transition hover:bg-blue-700">
              Каталог продукції
            </button>

            <button className="rounded-xl border border-blue-600 px-8 py-4 text-lg font-semibold transition hover:bg-blue-600">
              Отримати консультацію
            </button>

          </div>

        </div>

        {/* Правая часть */}
        <div className="relative flex justify-center">

          <div className="absolute h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-3xl"></div>

          <Image
            src="/images/bearing.png"
            alt="Підшипник"
            width={500}
            height={500}
            priority
            className="relative z-10 object-contain transition duration-700 hover:rotate-12"
          />

        </div>

      </div>
    </section>
  );
}