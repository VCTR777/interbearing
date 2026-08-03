/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowRight, CalendarDays, Globe2, ShieldCheck } from "lucide-react";
import { getPublishedBrands, type BrandRecord } from "@/lib/brands";

const fallback: BrandRecord[] = [
  { id:"skf",name:"SKF",slug:"skf",country:"Швеція",founded_year:1907,description:"Світовий лідер у виробництві підшипників та інженерних рішень для промисловості.",logo_url:"/brands/skf.svg",is_published:true,show_on_home:true,sort_order:10 },
  { id:"fag",name:"FAG",slug:"fag",country:"Німеччина",founded_year:1883,description:"Високоточні підшипники для промислового обладнання й автомобільного сектору.",logo_url:"/brands/fag.svg",is_published:true,show_on_home:true,sort_order:20 },
  { id:"ina",name:"INA",slug:"ina",country:"Німеччина",founded_year:1946,description:"Інноваційні рішення для машинобудування, автоматизації та промисловості.",logo_url:"/brands/ina.svg",is_published:true,show_on_home:true,sort_order:30 },
  { id:"nsk",name:"NSK",slug:"nsk",country:"Японія",founded_year:1916,description:"Японська якість і довговічність для складних умов експлуатації.",logo_url:"/brands/nsk.svg",is_published:true,show_on_home:true,sort_order:40 },
  { id:"koyo",name:"KOYO",slug:"koyo",country:"Японія",founded_year:1921,description:"Надійні підшипники для автомобільної, аграрної та промислової техніки.",logo_url:"/brands/koyo.svg",is_published:true,show_on_home:true,sort_order:50 },
  { id:"ntn",name:"NTN",slug:"ntn",country:"Японія",founded_year:1918,description:"Один із найбільших світових виробників підшипникової продукції.",logo_url:"/brands/ntn.svg",is_published:true,show_on_home:true,sort_order:60 },
];

export default async function Brands() {
  const rows = await getPublishedBrands();
  const brands = (rows.length ? rows : fallback).filter((brand) => brand.show_on_home).slice(0, 12);
  return <section id="brands" className="bg-[#0B0F19] py-24 text-white"><div className="mx-auto max-w-7xl px-6">
    <div className="text-center"><span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-5 py-2 text-sm text-blue-400">Наші партнери</span><h2 className="mt-6 text-4xl font-bold sm:text-5xl">Світові бренди</h2><p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">Ми співпрацюємо з перевіреними світовими виробниками, гарантуючи якість та оригінальність продукції.</p></div>
    <div className="mt-16 grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">{brands.map((brand) => <article key={brand.id} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#151D2B] p-7 transition hover:-translate-y-2 hover:border-blue-500">
      <div className="flex h-28 items-center justify-center rounded-2xl bg-white p-5">{brand.logo_url ? <img src={brand.logo_url} alt={`Логотип ${brand.name}`} className="h-20 w-auto max-w-full object-contain transition group-hover:scale-105"/> : <span className="text-4xl font-black text-slate-800">{brand.name}</span>}</div>
      <h3 className="mt-7 text-3xl font-bold">{brand.name}</h3><p className="mt-4 flex-1 leading-7 text-gray-400">{brand.description || "Підшипники та комплектуючі для промислового й автомобільного застосування."}</p>
      <div className="my-7 space-y-3 border-t border-white/10 pt-5 text-sm text-gray-300">{brand.country && <div className="flex items-center gap-3"><Globe2 size={18} className="text-blue-400"/>Країна: <strong className="text-white">{brand.country}</strong></div>}{brand.founded_year && <div className="flex items-center gap-3"><CalendarDays size={18} className="text-blue-400"/>Засновано: <strong className="text-white">{brand.founded_year}</strong></div>}<div className="flex items-center gap-3"><ShieldCheck size={18} className="text-blue-400"/>Оригінальна продукція</div></div>
      <Link href={`/catalog?brand=${encodeURIComponent(brand.name)}`} className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 font-semibold hover:bg-blue-500">Переглянути товари<ArrowRight size={18}/></Link>
    </article>)}</div>
    <div className="mt-10 text-center"><Link href="/brands" className="inline-flex rounded-xl border border-white/10 px-6 py-3 font-semibold text-slate-200 hover:border-blue-500 hover:text-blue-300">Усі бренди</Link></div>
  </div></section>;
}
