import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Каталог підшипників",
  description: "Каталог промислових, автомобільних та аграрних підшипників. Пошук за брендом і артикулом.",
  alternates: { canonical: "/catalog" },
};

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
