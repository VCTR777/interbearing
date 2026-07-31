import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";

import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const companyAddress = "49034, м. Дніпро, вул. Любарського, 143, оф. 207";
const encodedAddress = encodeURIComponent(companyAddress);
const mapEmbedUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;

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
    value: companyAddress,
    href: directionsUrl,
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

          <section className="mt-16 overflow-hidden rounded-3xl border border-white/10 bg-[#111827]">
            <div className="flex flex-col gap-5 border-b border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <MapPin aria-hidden="true" size={23} />
                  </div>
                  <h2 className="text-2xl font-bold">Ми на карті</h2>
                </div>
                <p className="mt-4 leading-7 text-gray-400">
                  {companyAddress}
                </p>
              </div>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-500"
              >
                <Navigation aria-hidden="true" size={19} />
                Прокласти маршрут
              </a>
            </div>

            <div className="relative h-[360px] bg-[#0b1220] sm:h-[460px]">
              <iframe
                title="INTERBEARING на Google Maps"
                src={mapEmbedUrl}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </>
  );
}
