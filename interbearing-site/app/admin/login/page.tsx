import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import LoginForm from "./LoginForm";

export default async function AdminLoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080c14] px-5 py-12 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(37,99,235,0.16),transparent_32rem)]" />

      <section className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#111827]/95 p-7 shadow-2xl shadow-black/30 backdrop-blur sm:p-9">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-wide transition hover:opacity-80"
        >
          INTER<span className="text-blue-500">BEARING</span>
        </Link>

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          Панель керування
        </p>
        <h1 className="mt-3 text-3xl font-bold">Вхід адміністратора</h1>
        <p className="mt-3 leading-7 text-slate-400">
          Використовуйте облікові дані адміністратора, створені в Supabase.
        </p>

        <LoginForm />

        <Link
          href="/"
          className="mt-6 block text-center text-sm text-slate-400 transition hover:text-white"
        >
          ← Повернутися на сайт
        </Link>
      </section>
    </main>
  );
}
