/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getPublishedBrands } from "@/lib/brands";

export default async function BrandsPage() {
  const brands = await getPublishedBrands();
  return <><Navbar/><main className="min-h-screen bg-[#0B0F19] pt-32 text-white"><section className="mx-auto max-w-7xl px-6 pb-20"><h1 className="text-center text-4xl font-bold sm:text-5xl">Наші бренди</h1><p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-gray-400">Працюємо з перевіреними світовими виробниками та допомагаємо підібрати продукцію для вашого обладнання.</p>
    {brands.length === 0 ? <p className="mt-14 rounded-2xl border border-white/10 bg-[#151D2B] p-8 text-center text-slate-400">Список брендів оновлюється.</p> : <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{brands.map((brand) => <Link key={brand.id} href={`/catalog?brand=${encodeURIComponent(brand.name)}`} className="group flex flex-col rounded-3xl border border-white/10 bg-[#151D2B] p-7 transition hover:-translate-y-2 hover:border-blue-500"><div className="flex h-28 items-center justify-center rounded-2xl bg-white p-5">{brand.logo_url ? <img src={brand.logo_url} alt={`Логотип ${brand.name}`} className="h-20 w-auto max-w-full object-contain"/> : <span className="text-4xl font-black text-slate-800">{brand.name}</span>}</div><h2 className="mt-7 text-3xl font-bold group-hover:text-blue-400">{brand.name}</h2><p className="mt-4 flex-1 leading-7 text-gray-400">{brand.description || "Підшипники та комплектуючі для промислового застосування."}</p><p className="mt-6 text-sm text-slate-300">{brand.country || "Міжнародний бренд"}{brand.founded_year ? ` · з ${brand.founded_year} року` : ""}</p><span className="mt-7 rounded-xl bg-blue-600 py-4 text-center font-semibold group-hover:bg-blue-500">Переглянути товари</span></Link>)}</div>}
  </section></main><Footer/></>;
}
