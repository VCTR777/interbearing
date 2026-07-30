import { Clock, Mail, MapPin, Phone } from "lucide-react";

import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const contactItems = [
  {
    title: "Телефон",
    value: "+38 (50) 453-40-26",
    href: "tel:+380504534026",
    icon: Phone,
  },
  {
    title: "Email",
    value: "svistun0609@gmail.com",
    href: "mailto:svistun0609@gmail.com",
    icon: Mail,
  },
  {
    title: "Адреса",
    value: "49034, м. Дніпро, вул. Любарського, 143, оф. 207",
    href: null,
    icon: MapPin,
  },
  {
    title: "Графік роботи",
    value: "Пн–Пт: 09:00–18:00",
    href: null,
    icon: Clock,
  },
];

export default function ContactsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0B0F19] pb-24 pt-32 text-white">
        <section className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
              Контакти
            </span>

            <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
              Зв’яжіться з нами
            </h1>

            <p className="mt-5 text-base leading-7 text-gray-400 sm:text-lg">
              Допоможемо підібрати підшипники та комплектуючі для вашого
              обладнання.
            </p>
          </div>

          <div className="mt-16 grid items-start gap-10 lg:grid-cols-2">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                      <Icon aria-hidden="true" size={25} />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold">{item.title}</h2>
                      <p className="mt-2 leading-7 text-gray-400">
                        {item.value}
                      </p>
                    </div>
                  </>
                );

                return item.href ? (
                  <a
                    key={item.title}
                    href={item.href}
                    className="flex items-start gap-5 rounded-2xl border border-white/10 bg-white/[0.05] p-6 transition hover:border-blue-400/40 hover:bg-white/[0.07]"
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={item.title}
                    className="flex items-start gap-5 rounded-2xl border border-white/10 bg-white/[0.05] p-6"
                  >
                    {content}
                  </div>
                );
              })}

              <div className="rounded-2xl border border-blue-400/20 bg-blue-500/10 p-6">
                <h2 className="text-xl font-bold">
                  Потрібен швидкий підбір?
                </h2>

                <p className="mt-3 leading-7 text-gray-300">
                  Вкажіть у повідомленні артикул, розміри або модель
                  обладнання — це допоможе швидше підготувати відповідь.
                </p>
              </div>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
