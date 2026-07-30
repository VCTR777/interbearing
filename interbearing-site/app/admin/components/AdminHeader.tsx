import Link from "next/link";
import LogoutButton from "../LogoutButton";

export default function AdminHeader({ email }: { email?: string }) {
  return (
    <header className="border-b border-white/10 bg-[#0b111d]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-6">
        <Link href="/admin" className="transition hover:opacity-85">
          <p className="text-xl font-extrabold tracking-wide text-white">
            INTER<span className="text-blue-500">BEARING</span>
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Панель адміністратора{email ? ` · ${email}` : ""}
          </p>
        </Link>
        <LogoutButton />
      </div>
    </header>
  );
}
