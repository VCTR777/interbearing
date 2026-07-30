import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
} from "lucide-react";

export default function ContactsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0B0F19] pt-32 text-white">

        <section className="mx-auto max-w-7xl px-6">

          <div className="text-center">
            <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
              Контакти
            </span>

            <h1 className="mt-6 text-5xl font-bold">
              Зв'яжіться з нами
            </h1>

            <p className="mt-4 text-lg text-gray-400">
              Ми допоможемо підібрати потрібні підшипники та комплектуючі.
            </p>
          </div>

          <div className="mt-20 grid gap-10 lg:grid-cols-2">

            <div className="space-y-6">

              <div className="flex items-start gap-5 rounded-2xl border border-white/10 bg-white/5 p-6">
                <Phone className="text-blue-500" size={28} />
                <div>
                  <h3 className="text-xl font-semibold">Телефон</h3>
                  <p className="mt-2 text-gray-400">
                    +38 (50) 453-40-26
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 rounded-2xl border border-white/10 bg-white/5 p-6">
                <Mail className="text-blue-500" size={28} />
                <div>
                  <h3 className="text-xl font-semibold">Email</h3>
                  <p className="mt-2 text-gray-400">
                    svistun0609@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 rounded-2xl border border-white/10 bg-white/5 p-6">
                <MapPin className="text-blue-500" size={28} />
                <div>
                  <h3 className="text-xl font-semibold">Адреса</h3>
                  <p className="mt-2 text-gray-400">
                    49034, м. Дніпро, вул. Любарського, 143, оф. 207
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 rounded-2xl border border-white/10 bg-white/5 p-6">
                <Clock className="text-blue-500" size={28} />
                <div>
                  <h3 className="text-xl font-semibold">Графік роботи</h3>
                  <p className="mt-2 text-gray-400">
                    Пн–Пт: 09:00–18:00
                  </p>
                </div>
              </div>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

              <h2 className="text-3xl font-bold">
                Залишити заявку
              </h2>

              <div className="mt-8 space-y-5">

                <input
                  placeholder="Ваше ім'я"
                  className="w-full rounded-xl border border-white/10 bg-[#111827] p-4 outline-none focus:border-blue-500"
                />

                <input
                  placeholder="Телефон"
                  className="w-full rounded-xl border border-white/10 bg-[#111827] p-4 outline-none focus:border-blue-500"
                />

                <input
                  placeholder="Email"
                  className="w-full rounded-xl border border-white/10 bg-[#111827] p-4 outline-none focus:border-blue-500"
                />

                <textarea
                  rows={5}
                  placeholder="Ваше повідомлення"
                  className="w-full rounded-xl border border-white/10 bg-[#111827] p-4 outline-none focus:border-blue-500"
                />

                <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 py-4 font-semibold transition hover:bg-blue-700">
                  <Send size={20} />
                  Надіслати заявку
                </button>

              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}