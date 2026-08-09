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
          privacyConsent: formData.get("privacyConsent") === "on",
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
      <main className="flex min-h-[75vh] items-center bg-[#0B0F19] px-4 pb-12 pt-24 text-white sm:px-6 sm:pt-28">
        <div className="mx-auto w-full max-w-2xl rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-5 text-center sm:p-10">
          <CheckCircle2 className="mx-auto text-emerald-400" size={52} />
          <h1 className="mt-6 text-2xl font-bold sm:text-3xl">Замовлення надіслано</h1>
          <p className="mt-4 leading-7 text-gray-300">{message}</p>
          <Link
            href="/catalog"
            className="mt-8 inline-flex w-full justify-center rounded-xl bg-blue-600 px-7 py-4 font-semibold hover:bg-blue-500 sm:w-auto"
          >
            Повернутися до каталогу
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0F19] pb-16 pt-24 text-white sm:pb-24 sm:pt-32">
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end sm:gap-5">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-blue-400">
              Ваше замовлення
            </span>
            <h1 className="mt-3 text-3xl font-black sm:text-4xl md:text-5xl">Кошик</h1>
          </div>
          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 px-4 text-sm font-semibold text-gray-400 hover:border-red-400/30 hover:text-red-400"
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
          <div className="mt-8 grid items-start gap-6 sm:mt-12 lg:grid-cols-[1.35fr_0.85fr] lg:gap-8">
            <div className="space-y-4">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 rounded-2xl border border-white/10 bg-[#111827] p-3 sm:grid-cols-[120px_minmax(0,1fr)_auto] sm:gap-5 sm:rounded-3xl sm:p-5"
                >
                  <div className="flex h-24 items-center justify-center overflow-hidden rounded-xl bg-white sm:h-28 sm:rounded-2xl">
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

                  <div className="min-w-0">
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

                  <div className="col-span-2 flex flex-row-reverse items-center justify-between gap-4 border-t border-white/10 pt-3 sm:col-span-1 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Видалити ${item.article}`}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-gray-500 hover:border-red-400/30 hover:text-red-400"
                    >
                      <Trash2 aria-hidden="true" size={19} />
                    </button>
                    <div className="flex min-h-11 items-center rounded-xl border border-white/10 bg-[#0B0F19]">
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
              className="min-w-0 rounded-2xl border border-white/10 bg-[#111827] p-4 sm:rounded-3xl sm:p-7 lg:sticky lg:top-28"
            >
              <h2 className="text-xl font-bold sm:text-2xl">Оформити замовлення</h2>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
                <span className="text-gray-400">Сума</span>
                <strong className="break-words text-xl sm:text-2xl">
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
                  className="min-h-12 w-full rounded-xl border border-white/10 bg-[#0B0F19] p-3.5 outline-none focus:border-blue-500 sm:p-4"
                />
                <input
                  name="phone"
                  type="tel"
                  required
                  minLength={7}
                  maxLength={40}
                  autoComplete="tel"
                  placeholder="Телефон *"
                  className="min-h-12 w-full rounded-xl border border-white/10 bg-[#0B0F19] p-3.5 outline-none focus:border-blue-500 sm:p-4"
                />
                <input
                  name="email"
                  type="email"
                  maxLength={120}
                  autoComplete="email"
                  placeholder="Email"
                  className="min-h-12 w-full rounded-xl border border-white/10 bg-[#0B0F19] p-3.5 outline-none focus:border-blue-500 sm:p-4"
                />
                <textarea
                  name="comment"
                  rows={4}
                  maxLength={500}
                  placeholder="Коментар до замовлення"
                  className="w-full resize-y rounded-xl border border-white/10 bg-[#0B0F19] p-3.5 outline-none focus:border-blue-500 sm:p-4"
                />
                <div
                  aria-hidden="true"
                  className="absolute -left-[10000px] h-px w-px overflow-hidden"
                >
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </div>
                <label className="flex items-start gap-3 text-sm leading-6 text-gray-400">
                  <input name="privacyConsent" type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-blue-600" />
                  <span>Я погоджуюся на обробку персональних даних відповідно до <Link href="/privacy" target="_blank" className="font-medium text-blue-400 hover:text-blue-300">Політики конфіденційності</Link>.</span>
                </label>
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
