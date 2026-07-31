import Link from "next/link";
import LogoutButton from "../LogoutButton";

export default function AdminHeader({ email }: { email?: string }) {
  const navigation = [
    { href: "/admin", label: "Товари" },
    { href: "/admin/orders", label: "Замовлення" },
    { href: "/admin/stock", label: "Склад" },
  ];

  return (
    <header className="border-b border-white/10 bg-[#0b111d]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 sm:py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <Link href="/admin" className="transition hover:opacity-85">
            <p className="text-xl font-extrabold tracking-wide text-white">
              INTER<span className="text-blue-500">BEARING</span>
            </p>
            <p className="mt-1 break-words text-sm text-slate-500">
              Панель адміністратора{email ? ` · ${email}` : ""}
            </p>
          </Link>

          <nav className="-mx-1 flex w-full flex-nowrap items-center gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:w-auto sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <LogoutButton />
      </div>
    </header>
  );
}
