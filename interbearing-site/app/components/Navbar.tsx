"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CartLink from "./CartLink";
import ThemeToggle from "./ThemeToggle";
import BrandLogo from "./BrandLogo";

const navigation = [
  { label: "Головна", href: "/" },
  { label: "Каталог", href: "/catalog" },
  { label: "Бренди", href: "/brands" },
  { label: "Про компанію", href: "/about" },
  { label: "Контакти", href: "/contacts" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0B0F19]/90 text-white shadow-lg shadow-black/10 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6">
        <Link
          href="/"
          aria-label="INTERBEARING — головна сторінка"
          className="inline-flex shrink-0 items-center transition hover:opacity-90"
        >
          <BrandLogo />
        </Link>

        <nav
          aria-label="Основна навігація"
          className="hidden items-center gap-7 lg:flex"
        >
          {navigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-2 text-sm font-medium transition ${
                  isActive
                    ? "text-blue-400"
                    : "text-gray-300 hover:text-blue-400"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-blue-500" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <CartLink />
          <Link
            href="/contacts"
            className="hidden rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/25 sm:inline-flex lg:px-6"
          >
            Залишити заявку
          </Link>
          <button
            type="button"
            aria-label={isMenuOpen ? "Закрити меню" : "Відкрити меню"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white transition hover:border-blue-400/40 hover:bg-blue-500/10 lg:hidden"
          >
            {isMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`fixed inset-x-0 top-20 h-[calc(100dvh-5rem)] border-t border-white/10 bg-[#0B0F19]/98 backdrop-blur-xl transition duration-300 lg:hidden ${
          isMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-3 opacity-0"
        }`}
      >
        <nav
          aria-label="Мобільна навігація"
          className="mx-auto flex h-full max-w-7xl flex-col px-5 py-6 sm:px-6"
        >
          <div className="space-y-2">
            {navigation.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-2xl px-5 py-4 text-lg font-semibold transition ${
                    isActive
                      ? "bg-blue-500/15 text-blue-300"
                      : "text-gray-200 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  {item.label}
                  <span aria-hidden="true">→</span>
                </Link>
              );
            })}
            <Link
              href="/cart"
              className="flex items-center justify-between rounded-2xl px-5 py-4 text-lg font-semibold text-gray-200 hover:bg-white/[0.05]"
            >
              Кошик
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="mt-auto border-t border-white/10 pt-6">
            <Link
              href="/contacts"
              className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-4 text-base font-semibold transition hover:bg-blue-500"
            >
              Залишити заявку
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
