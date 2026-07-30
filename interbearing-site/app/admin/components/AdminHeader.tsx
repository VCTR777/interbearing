import Link from "next/link";
import LogoutButton from "../LogoutButton";

export default function AdminHeader({ email }: { email?: string }) {
  return (
    <header className="border-b border-white/10 bg-[#0b111d]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <Link href="/admin" className="transition hover:opacity-85">
            <p className="text-xl font-extrabold tracking-wide text-white">
              INTER<span className="text-blue-500">BEARING</span>
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Панель адміністратора{email ? ` · ${email}` : ""}
            </p>
          </Link>

          <nav className="flex items-center gap-2">
            <Link
              href="/admin"
              className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
            >
              Товари
            </Link>
            <Link
              href="/admin/orders"
              className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"
            >
              Замовлення
            </Link>
          </nav>
        </div>
        <LogoutButton />
      </div>
    </header>
  );
}
