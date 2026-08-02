import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Бренди підшипників",
  description: "Підшипники SKF, FAG, INA, NSK, KOYO, NTN та інших світових виробників.",
  alternates: { canonical: "/brands" },
};

export default function BrandsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
