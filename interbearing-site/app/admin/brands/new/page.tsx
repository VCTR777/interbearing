import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import AdminHeader from "../../components/AdminHeader";
import BrandForm from "../../components/BrandForm";

export default async function NewBrandPage() {
  const { user } = await requireAdmin();
  return <main className="min-h-screen bg-[#080c14] pb-16 text-white"><AdminHeader email={user.email}/><section className="mx-auto max-w-5xl px-4 py-8 sm:px-6"><Link href="/admin/brands" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white"><ArrowLeft size={18}/>До брендів</Link><h1 className="mt-6 text-3xl font-bold">Додати бренд</h1><BrandForm/></section></main>;
}
