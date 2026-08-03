import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import AdminHeader from "../../components/AdminHeader";
import ProductForm from "../../components/ProductForm";

export default async function NewProductPage() {
  const { supabase, user } = await requireAdmin();
  const { data: brandRows } = await supabase
    .from("brands")
    .select("name")
    .eq("is_published", true)
    .order("sort_order")
    .order("name");
  const brands = (brandRows || []).map((item) => item.name);

  return (
    <main className="min-h-screen bg-[#080c14] pb-16 text-white">
      <AdminHeader email={user.email} />
      <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white"
        >
          <ArrowLeft size={18} />
          До списку товарів
        </Link>
        <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Додати товар</h1>
        <p className="mt-3 text-slate-400">
          Заповніть інформацію, додайте фотографію та опублікуйте товар.
        </p>
        <ProductForm brands={brands} />
      </section>
    </main>
  );
}
