/* eslint-disable @next/next/no-img-element */
import { Edit3, ImageIcon, Plus } from "lucide-react";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import AdminHeader from "../components/AdminHeader";
import DeleteBrandButton from "../components/DeleteBrandButton";

type Brand = { id:string; name:string; country:string; founded_year:number|null; logo_url:string|null; is_published:boolean; show_on_home:boolean; sort_order:number };

export default async function AdminBrandsPage() {
  const { supabase, user } = await requireAdmin();
  const { data, error } = await supabase.from("brands").select("id, name, country, founded_year, logo_url, is_published, show_on_home, sort_order").order("sort_order").order("name");
  const brands = (data || []) as Brand[];
  return (
    <main className="min-h-screen bg-[#080c14] pb-16 text-white">
      <AdminHeader email={user.email} />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">Панель керування</p><h1 className="mt-3 text-3xl font-bold sm:text-4xl">Бренди</h1><p className="mt-3 text-slate-400">У базі: {brands.length}</p></div>
          <Link href="/admin/brands/new" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold hover:bg-blue-500"><Plus size={20} />Додати бренд</Link>
        </div>
        {error && <p className="mt-8 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">Не вдалося завантажити бренди: {error.message}</p>}
        {!error && brands.length === 0 && <div className="mt-10 rounded-3xl border border-dashed border-white/15 bg-[#111827] px-6 py-20 text-center"><ImageIcon className="mx-auto text-blue-400" size={42}/><h2 className="mt-5 text-2xl font-bold">Брендів поки немає</h2></div>}
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {brands.map((brand) => <article key={brand.id} className="rounded-3xl border border-white/10 bg-[#111827] p-5">
            <div className="flex h-28 items-center justify-center overflow-hidden rounded-2xl bg-white p-4">{brand.logo_url ? <img src={brand.logo_url} alt={`Логотип ${brand.name}`} className="h-full w-full object-contain"/> : <span className="text-3xl font-black text-slate-800">{brand.name}</span>}</div>
            <div className="mt-5 flex items-start justify-between gap-4"><div><h2 className="text-2xl font-bold">{brand.name}</h2><p className="mt-2 text-sm text-slate-400">{brand.country || "Країну не вказано"}{brand.founded_year ? ` · ${brand.founded_year}` : ""}</p></div><span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-300">№ {brand.sort_order}</span></div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs"><span className={brand.is_published ? "rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-300" : "rounded-full bg-amber-500/10 px-3 py-1 text-amber-300"}>{brand.is_published ? "Опубліковано" : "Приховано"}</span>{brand.show_on_home && <span className="rounded-full bg-blue-500/10 px-3 py-1 text-blue-300">На головній</span>}</div>
            <div className="mt-6 grid grid-cols-2 gap-2"><Link href={`/admin/brands/${brand.id}/edit`} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 text-sm font-semibold hover:bg-blue-500/10"><Edit3 size={17}/>Редагувати</Link><DeleteBrandButton id={brand.id} name={brand.name}/></div>
          </article>)}
        </div>
      </section>
    </main>
  );
}
