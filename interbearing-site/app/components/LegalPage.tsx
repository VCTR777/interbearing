import Link from "next/link";
import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

type LegalSection = {
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
};

export default function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0B0F19] pb-20 pt-28 text-white sm:pt-32">
        <section className="mx-auto max-w-4xl px-4 sm:px-6">
          <Link
            href="/"
            className="text-sm font-semibold text-blue-400 hover:text-blue-300"
          >
            ← Повернутися на головну
          </Link>

          <article className="mt-6 rounded-3xl border border-white/10 bg-[#111827] p-5 sm:p-8 md:p-10">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-blue-400">
              {eyebrow}
            </span>
            <h1 className="mt-3 text-3xl font-black sm:text-4xl md:text-5xl">
              {title}
            </h1>
            <p className="mt-5 leading-7 text-gray-400">{intro}</p>

            <div className="mt-10 space-y-9">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-xl font-bold sm:text-2xl">
                    {section.title}
                  </h2>
                  <div className="mt-3 leading-7 text-gray-300 [&_a]:text-blue-400 [&_a]:hover:text-blue-300 [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}

