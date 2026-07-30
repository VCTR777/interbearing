import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-[#0B0F19]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        <Link
          href="/"
          className="text-3xl font-extrabold tracking-wide transition hover:scale-105"
        >
          INTER<span className="text-blue-500">BEARING</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">

          <Link
            href="/"
            className="text-gray-300 transition hover:text-blue-400"
          >
            Головна
          </Link>

          <Link
            href="/catalog"
            className="text-gray-300 transition hover:text-blue-400"
          >
            Каталог
          </Link>

          <Link
            href="/brands"
            className="text-gray-300 transition hover:text-blue-400"
          >
            Бренди
          </Link>

          <Link
            href="/about"
            className="text-gray-300 transition hover:text-blue-400"
          >
            Про компанію
          </Link>

          <Link
            href="/contacts"
            className="text-gray-300 transition hover:text-blue-400"
          >
            Контакти
          </Link>

        </nav>

        <Link
          href="/contacts"
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition duration-300 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30"
        >
          Залишити заявку
        </Link>

      </div>
    </header>
  );
}