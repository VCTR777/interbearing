import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0b101a] text-white">
      <header className="border-b border-white/10 bg-[#0b101a]/95">
        <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-6">
          <Link href="/" className="text-xl font-black tracking-wide sm:text-2xl">
            INTER<span className="text-blue-500">BEARING</span>
          </Link>

          <Link
            href="/catalog"
            className="rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold transition hover:border-blue-400/60 hover:bg-blue-500/10"
          >
            Каталог
          </Link>
        </div>
      </header>

      <main className="relative flex flex-1 items-center overflow-hidden px-4 py-16 sm:px-6">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(37,99,235,0.18),transparent_40%)]"
        />

        <section className="relative mx-auto w-full max-w-3xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-blue-400/25 bg-blue-500/10 text-blue-400 shadow-2xl shadow-blue-950/40 sm:h-24 sm:w-24">
            <SearchX aria-hidden="true" className="h-10 w-10 sm:h-12 sm:w-12" />
          </div>

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.28em] text-blue-400">
            Помилка 404
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            Сторінку не знайдено
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
            Можливо, адресу введено неправильно або сторінку було переміщено.
            Поверніться на головну сторінку чи скористайтеся каталогом.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-bold transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <ArrowLeft aria-hidden="true" className="h-5 w-5" />
              На головну
            </Link>

            <Link
              href="/catalog"
              className="inline-flex min-h-14 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 py-4 font-bold transition hover:border-blue-400/50 hover:bg-blue-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              Перейти до каталогу
            </Link>
          </div>

          <p className="mt-8 text-sm text-slate-500">
            Потрібна допомога? Телефонуйте за номером{" "}
            <a
              href="tel:+380504534026"
              className="font-semibold text-slate-300 transition hover:text-blue-400"
            >
              +38 (050) 453-40-26
            </a>
          </p>
        </section>
      </main>

      <footer className="border-t border-white/10 px-5 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} INTERBEARING
      </footer>
    </div>
  );
}
