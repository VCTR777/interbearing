import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("products")
      .select("brand, article, title, description, image_url")
      .eq("slug", id)
      .eq("is_published", true)
      .single();

    if (!data) return { title: "Товар не знайдено", robots: { index: false } };

    const title = `${data.brand} ${data.article} — ${data.title}`;
    const description = data.description
      ? String(data.description).slice(0, 155)
      : `Підшипник ${data.brand} ${data.article}. Характеристики, наявність і замовлення в INTERBEARING.`;

    return {
      title,
      description,
      alternates: { canonical: `/product/${id}` },
      openGraph: {
        type: "website",
        title,
        description,
        url: `/product/${id}`,
        images: data.image_url ? [{ url: data.image_url, alt: title }] : undefined,
      },
    };
  } catch {
    return {
      title: "Підшипник",
      alternates: { canonical: `/product/${id}` },
    };
  }
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
