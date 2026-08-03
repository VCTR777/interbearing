import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const brands = [
  {
    name: "SKF",
    country: "Швеція",
    year: "1907",
    text: "Світовий лідер у виробництві підшипників та рішень для промисловості.",
  },
  {
    name: "FAG",
    country: "Німеччина",
    year: "1883",
    text: "Високоточні підшипники для промислового та автомобільного сектору.",
  },
  {
    name: "INA",
    country: "Німеччина",
    year: "1946",
    text: "Інноваційні рішення для машинобудування та автоматизації.",
  },
  {
    name: "NSK",
    country: "Японія",
    year: "1916",
    text: "Японська якість і довговічність для найскладніших умов.",
  },
  {
    name: "KOYO",
    country: "Японія",
    year: "1921",
    text: "Надійні підшипники для автомобільної та промислової техніки.",
  },
  {
    name: "NTN",
    country: "Японія",
    year: "1918",
    text: "Один із найбільших світових виробників підшипникової продукції.",
  },
];

export default function BrandsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0B0F19] pt-32 text-white">

        <section className="mx-auto max-w-7xl px-6">

          <h1 className="text-center text-5xl font-bold">
            Наші бренди
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-center text-xl leading-8 text-gray-400">
            Ми працюємо лише з офіційними постачальниками світових виробників
            підшипників, гарантуючи якість, довговічність та оригінальність
            кожної одиниці продукції.
          </p>

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {brands.map((brand) => (

              <Link
                key={brand.name}
                href={`/catalog?brand=${encodeURIComponent(brand.name)}`}
                aria-label={`Переглянути товари бренду ${brand.name}`}
                className="group rounded-3xl border border-white/10 bg-[#151D2B] p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20"
              >

                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-blue-600 text-3xl font-black">
                  {brand.name}
                </div>

                <h2 className="mt-8 text-3xl font-bold">
                  {brand.name}
                </h2>

                <p className="mt-4 text-gray-400">
                  {brand.text}
                </p>

                <div className="mt-8 space-y-2">

                  <p>
                    🌍 <span className="text-gray-400">Країна:</span> {brand.country}
                  </p>

                  <p>
                    📅 <span className="text-gray-400">Засновано:</span> {brand.year}
                  </p>

                </div>

                <span className="mt-10 block w-full rounded-xl bg-blue-600 py-4 text-center font-semibold transition group-hover:bg-blue-700">
                  Переглянути товари
                </span>

              </Link>

            ))}

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}
