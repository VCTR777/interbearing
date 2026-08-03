import { createClient } from "@/lib/supabase/server";

export type BrandRecord = {
  id: string;
  name: string;
  slug: string;
  country: string;
  founded_year: number | null;
  description: string;
  logo_url: string | null;
  is_published: boolean;
  show_on_home: boolean;
  sort_order: number;
};

export async function getPublishedBrands() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("brands")
    .select("id, name, slug, country, founded_year, description, logo_url, is_published, show_on_home, sort_order")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) return [];
  return (data || []) as BrandRecord[];
}
