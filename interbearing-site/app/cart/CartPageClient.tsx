"use client";

import {
  CheckCircle2,
  LoaderCircle,
  Minus,
  Plus,
  Send,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useCart } from "../components/CartProvider";

function formatPrice(price: number) {
  return `${price.toLocaleString("uk-UA")} грн`;
}

export default function CartPageClient() {
  const { items, setQuantity, removeItem, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const knownTotal = items.reduce(
    (total, item) => total + (item.price ?? 0) * item.quantity,
    0,
  );
  const hasUnknownPrices = items.some((item) => item.price === null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!items.length || isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const customerComment = String(formData.get("comment") || "").trim();

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          comment: customerComment,
          items: items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
          website: formData.get("website"),
          startedAt: Date.now() - 5000,
        }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Не вдалося надіслати замовлення.");
      }

      clearCart();
      setIsSuccess(true);
      setMessage(
        result.message ||
          "Дякуємо! Замовлення надіслано. Ми зв’яжемося з вами.",
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Сталася помилка. Спробуйте ще раз.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <main className="flex min-h-[75vh] items-center bg-[#0B0F19] px-4 pt-28 text-white sm:px-6">
        <div className="mx-auto w-full max-w-2xl rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-6 text-center sm:p-10">
          <CheckCircle2 className="mx-auto text-emerald-400" size={52} />
          <h1 className="mt-6 text-3xl font-bold">Замовлення надіслано</h1>
          <p className="mt-4 leading-7 text-gray-300">{message}</p>
          <Link
            href="/catalog"
            className="mt-8 inline-flex rounded-xl bg-blue-600 px-7 py-4 font-semibold hover:bg-blue-500"
          >
            Повернутися до каталогу
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0F19] pb-24 pt-32 text-white">
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-blue-400">
              Ваше замовлення
            </span>
            <h1 className="mt-3 text-4xl font-black md:text-5xl">Кошик</h1>
          </div>
          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-red-400"
            >
              <Trash2 aria-hidden="true" size={18} />
              Очистити кошик
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-white/15 bg-[#111827] px-5 py-14 text-center sm:mt-12 sm:px-6 sm:py-20">
            <ShoppingCart className="mx-auto text-blue-400" size={50} />
            <h2 className="mt-6 text-2xl font-bold sm:text-3xl">Кошик порожній</h2>
            <p className="mt-3 text-gray-400">
              Додайте потрібні підшипники з каталогу.
            </p>
            <Link
              href="/catalog"
              className="mt-8 inline-flex rounded-xl bg-blue-600 px-7 py-4 font-semibold hover:bg-blue-500"
            >
              Перейти до каталогу
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid items-start gap-8 sm:mt-12 lg:grid-cols-[1.35fr_0.85fr]">
            <div className="space-y-4">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="grid gap-5 rounded-3xl border border-white/10 bg-[#111827] p-4 sm:grid-cols-[120px_1fr_auto] sm:p-5"
                >
                  <div className="flex h-28 items-center justify-center overflow-hidden rounded-2xl bg-white">
                    {item.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.imageUrl}
                        alt={`${item.brand} ${item.article}`}
                        className="h-full w-full object-contain p-3"
                      />
                    ) : (
                      <ShoppingCart className="text-gray-400" />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-bold text-blue-400">
                      {item.brand} · {item.article}
                    </p>
                    <Link
                      href={`/product/${item.slug}`}
                      className="mt-2 block break-words text-lg font-bold hover:text-blue-400 sm:text-xl"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-3 font-semibold">
                      {item.price === null
                        ? "Ціну уточнюйте"
                        : formatPrice(item.price)}
                    </p>
                    {item.stockQuantity !== null && (
                      <p
                        className={`mt-2 text-sm ${
                          item.stockQuantity === 0
                            ? "text-red-400"
                            : "text-emerald-400"
                        }`}
                      >
                        Доступно: {item.stockQuantity} шт.
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Видалити ${item.article}`}
                      className="text-gray-500 hover:text-red-400"
                    >
                      <Trash2 aria-hidden="true" size={19} />
                    </button>
                    <div className="flex items-center rounded-xl border border-white/10 bg-[#0B0F19]">
                      <button
                        type="button"
                        onClick={() => setQuantity(item.id, item.quantity - 1)}
                        className="p-3 hover:text-blue-400"
                        aria-label="Зменшити кількість"
                      >
                        <Minus aria-hidden="true" size={17} />
                      </button>
                      <span className="min-w-10 text-center font-bold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        disabled={
                          item.stockQuantity !== null &&
                          item.quantity >= item.stockQuantity
                        }
                        onClick={() => setQuantity(item.id, item.quantity + 1)}
                        className="p-3 hover:text-blue-400 disabled:cursor-not-allowed disabled:text-slate-700"
                        aria-label="Збільшити кількість"
                        title={
                          item.stockQuantity !== null &&
                          item.quantity >= item.stockQuantity
                            ? "Досягнуто доступний залишок"
                            : undefined
                        }
                      >
                        <Plus aria-hidden="true" size={17} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/10 bg-[#111827] p-5 sm:p-7 lg:sticky lg:top-28"
            >
              <h2 className="text-2xl font-bold">Оформити замовлення</h2>
              <div className="mt-5 flex items-center justify-between border-b border-white/10 pb-5">
                <span className="text-gray-400">Сума</span>
                <strong className="text-xl sm:text-2xl">
                  {knownTotal > 0 ? formatPrice(knownTotal) : "Уточнюється"}
                </strong>
              </div>
              {hasUnknownPrices && (
                <p className="mt-4 text-sm leading-6 text-amber-300">
                  Остаточну суму підтвердить менеджер, оскільки не для всіх
                  позицій указана ціна.
                </p>
              )}

              <div className="mt-6 space-y-4">
                <input
                  name="name"
                  required
                  minLength={2}
                  maxLength={80}
                  autoComplete="name"
                  placeholder="Ваше ім’я *"
                  className="w-full rounded-xl border border-white/10 bg-[#0B0F19] p-4 outline-none focus:border-blue-500"
                />
                <input
                  name="phone"
                  type="tel"
                  required
                  minLength={7}
                  maxLength={40}
                  autoComplete="tel"
                  placeholder="Телефон *"
                  className="w-full rounded-xl border border-white/10 bg-[#0B0F19] p-4 outline-none focus:border-blue-500"
                />
                <input
                  name="email"
                  type="email"
                  maxLength={120}
                  autoComplete="email"
                  placeholder="Email"
                  className="w-full rounded-xl border border-white/10 bg-[#0B0F19] p-4 outline-none focus:border-blue-500"
                />
                <textarea
                  name="comment"
                  rows={4}
                  maxLength={500}
                  placeholder="Коментар до замовлення"
                  className="w-full resize-y rounded-xl border border-white/10 bg-[#0B0F19] p-4 outline-none focus:border-blue-500"
                />
                <div
                  aria-hidden="true"
                  className="absolute -left-[10000px] h-px w-px overflow-hidden"
                >
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold hover:bg-blue-500 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle className="animate-spin" size={20} />
                      Надсилання...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Надіслати замовлення
                    </>
                  )}
                </button>
                {message && (
                  <p className="text-sm leading-6 text-red-400">{message}</p>
                )}
              </div>
            </form>
          </div>
        )}
      </section>
    </main>
  );
}
