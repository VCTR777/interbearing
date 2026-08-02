import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Про компанію",
  description: "INTERBEARING — надійний постачальник підшипників і комплектуючих для українського бізнесу.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
