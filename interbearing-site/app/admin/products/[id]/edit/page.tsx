import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import AdminHeader from "../../../components/AdminHeader";
import ProductForm, {
  type ProductFormValue,
} from "../../../components/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase, user } = await requireAdmin();
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  const { data: brandRows } = await supabase
    .from("brands")
    .select("name")
    .eq("is_published", true)
    .order("sort_order")
    .order("name");
  const brands = (brandRows || []).map((item) => item.name);

  if (error || !product) notFound();

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
        <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Редагувати товар</h1>
        <p className="mt-3 text-slate-400">
          Змініть інформацію або завантажте нову фотографію.
        </p>
        <ProductForm product={product as ProductFormValue} brands={brands} />
      </section>
    </main>
  );
}
