import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import AdminHeader from "../../components/AdminHeader";
import ProductForm from "../../components/ProductForm";

export default async function NewProductPage() {
  const { user } = await requireAdmin();

  return (
    <main className="min-h-screen bg-[#080c14] pb-16 text-white">
      <AdminHeader email={user.email} />
      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-6">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white"
        >
          <ArrowLeft size={18} />
          До списку товарів
        </Link>
        <h1 className="mt-6 text-4xl font-bold">Додати товар</h1>
        <p className="mt-3 text-slate-400">
          Заповніть інформацію, додайте фотографію та опублікуйте товар.
        </p>
        <ProductForm />
      </section>
    </main>
  );
}
