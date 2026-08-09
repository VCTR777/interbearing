import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0B0F19]">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-10 md:grid-cols-3">

          <div>
            <h2 className="text-3xl font-bold text-white">
              INTER<span className="text-blue-500">BEARING</span>
            </h2>

            <p className="mt-4 text-gray-400 leading-7">
              Надійний постачальник підшипників для промисловості,
              автомобільної та аграрної техніки.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white">
              Навігація
            </h3>

            <ul className="mt-4 space-y-3 text-gray-400">
              <li><Link href="/">Головна</Link></li>
              <li><Link href="/catalog">Каталог</Link></li>
              <li><Link href="/contacts">Контакти</Link></li>
              <li><Link href="/privacy">Політика конфіденційності</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white">
              Контакти
            </h3>

            <ul className="mt-4 space-y-3 text-gray-400">
              <li>📞 +38 (50) 453-40-26</li>
              <li>✉️ svistun0609@gmail.com</li>
              <li>🕒 Пн–Пт 09:00–18:00</li>
            </ul>
          </div>

        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} INTERBEARING. Усі права захищені.</p>
          <Link className="mt-2 inline-block hover:text-blue-400" href="/privacy">Політика конфіденційності</Link>
        </div>

      </div>
    </footer>
  );
}
