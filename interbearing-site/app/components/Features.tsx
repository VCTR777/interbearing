const features = [
  {
    title: "Якість",
    text: "Працюємо тільки з перевіреними світовими виробниками підшипників.",
    icon: "🏆",
  },
  {
    title: "Швидка доставка",
    text: "Відправляємо замовлення по всій Україні у найкоротші терміни.",
    icon: "🚚",
  },
  {
    title: "Консультація",
    text: "Допомагаємо підібрати підшипники під будь-яке обладнання.",
    icon: "💬",
  },
  {
    title: "Наявність",
    text: "Великий асортимент продукції постійно є на складі.",
    icon: "📦",
  },
];

export default function Features() {
  return (
    <section className="bg-[#101624] py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold">
            Наші переваги
          </h2>

          <p className="mt-4 text-gray-400">
            Чому клієнти обирають InterBearing
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-500 hover:bg-white/10"
            >
              <div className="mb-5 text-5xl">{item.icon}</div>

              <h3 className="mb-3 text-2xl font-bold">
                {item.title}
              </h3>

              <p className="text-gray-400 leading-7">
                {item.text}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}