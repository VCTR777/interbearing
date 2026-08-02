import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакти",
  description: "Контакти INTERBEARING у Дніпрі. Залиште заявку на підбір і постачання підшипників.",
  alternates: { canonical: "/contacts" },
};

export default function ContactsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
