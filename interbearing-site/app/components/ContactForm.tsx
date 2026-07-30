"use client";

import { CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { FormEvent, useRef, useState } from "react";

type FormStatus =
  | { type: "idle"; message: "" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>({
    type: "idle",
    message: "",
  });
  const [startedAt, setStartedAt] = useState(() => Date.now());

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          message: formData.get("message"),
          website: formData.get("website"),
          startedAt,
        }),
      });

      const result = (await response.json()) as {
        message?: string;
      };

      if (!response.ok) {
        throw new Error(
          result.message || "Не вдалося надіслати заявку.",
        );
      }

      setStatus({
        type: "success",
        message:
          result.message ||
          "Дякуємо! Заявку успішно надіслано.",
      });
      formRef.current?.reset();
      setStartedAt(Date.now());
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Сталася помилка. Спробуйте ще раз.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 sm:p-8"
    >
      <h2 className="text-3xl font-bold">Залишити заявку</h2>

      <p className="mt-3 leading-7 text-gray-400">
        Заповніть форму — заявка надійде менеджеру в Telegram та на email.
      </p>

      <div className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Ваше ім’я *
          </label>

          <input
            id="contact-name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={80}
            autoComplete="name"
            placeholder="Віктор"
            className="w-full rounded-xl border border-white/10 bg-[#111827] p-4 outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
          />
        </div>

        <div>
          <label
            htmlFor="contact-phone"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Телефон *
          </label>

          <input
            id="contact-phone"
            name="phone"
            type="tel"
            required
            minLength={7}
            maxLength={40}
            autoComplete="tel"
            inputMode="tel"
            placeholder="+38 (___) ___-__-__"
            className="w-full rounded-xl border border-white/10 bg-[#111827] p-4 outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Email
          </label>

          <input
            id="contact-email"
            name="email"
            type="email"
            maxLength={120}
            autoComplete="email"
            placeholder="name@example.com"
            className="w-full rounded-xl border border-white/10 bg-[#111827] p-4 outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
          />
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Що потрібно? *
          </label>

          <textarea
            id="contact-message"
            name="message"
            required
            minLength={5}
            maxLength={1500}
            rows={6}
            placeholder="Вкажіть артикул, розміри або опишіть обладнання"
            className="w-full resize-y rounded-xl border border-white/10 bg-[#111827] p-4 outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute -left-[10000px] h-px w-px overflow-hidden"
        >
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 py-4 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle
                aria-hidden="true"
                size={20}
                className="animate-spin"
              />
              Надсилання...
            </>
          ) : (
            <>
              <Send aria-hidden="true" size={20} />
              Надіслати заявку
            </>
          )}
        </button>

        <div aria-live="polite" className="min-h-7">
          {status.type === "success" && (
            <p className="flex items-start gap-2 text-sm leading-6 text-emerald-400">
              <CheckCircle2
                aria-hidden="true"
                size={19}
                className="mt-0.5 shrink-0"
              />
              {status.message}
            </p>
          )}

          {status.type === "error" && (
            <p className="text-sm leading-6 text-red-400">
              {status.message}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
