import Link from "next/link";
import {
  CalendarClock,
  CheckCircle2,
  CircleX,
  Clock3,
  Mail,
  PackageCheck,
  Phone,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { requireAdmin } from "@/lib/admin";
import AdminHeader from "../components/AdminHeader";
import DeleteOrderButton from "./DeleteOrderButton";
import ExportOrdersButton from "./ExportOrdersButton";
import OrderStatusSelect from "./OrderStatusSelect";

type OrderItem = {
  product_id: string;
  brand: string;
  article: string;
  title: string;
  price: number | null;
  quantity: number;
  line_total: number | null;
};

type Order = {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  comment: string | null;
  items: unknown;
  total: number | null;
  has_unknown_prices: boolean;
  status: string;
  created_at: string;
};

type OrdersPageProps = {
  searchParams: Promise<{
    q?: string | string[];
    status?: string | string[];
  }>;
};

const statusStyles: Record<string, string> = {
  new: "border-blue-500/25 bg-blue-500/10 text-blue-300",
  processing: "border-amber-500/25 bg-amber-500/10 text-amber-300",
  completed: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
  cancelled: "border-red-500/25 bg-red-500/10 text-red-300",
};

const statusOptions = [
  { value: "all", label: "Усі статуси" },
  { value: "new", label: "Нові" },
  { value: "processing", label: "В роботі" },
  { value: "completed", label: "Завершені" },
  { value: "cancelled", label: "Скасовані" },
];

function getItems(value: unknown): OrderItem[] {
  return Array.isArray(value) ? (value as OrderItem[]) : [];
}

function getParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

function formatPrice(value: number) {
  return `${value.toLocaleString("uk-UA")} грн`;
}

export default async function OrdersPage({
  searchParams,
}: OrdersPageProps) {
  const { supabase, user } = await requireAdmin();
  const params = await searchParams;
  const query = getParam(params.q).trim();
  const requestedStatus = getParam(params.status);
  const selectedStatus = statusOptions.some(
    (option) => option.value === requestedStatus,
  )
    ? requestedStatus
    : "all";

  const { data, error } = await supabase
    .from("orders")
    .select(
      "id, customer_name, customer_phone, customer_email, comment, items, total, has_unknown_prices, status, created_at",
    )
    .order("created_at", { ascending: false });

  const orders = (data || []) as Order[];
  const normalizedQuery = query.toLocaleLowerCase("uk-UA");

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;

    if (!matchesStatus) return false;
    if (!normalizedQuery) return true;

    const items = getItems(order.items);
    const searchableText = [
      order.id,
      order.id.slice(0, 8),
      order.customer_name,
      order.customer_phone,
      order.customer_email || "",
      order.comment || "",
      ...items.flatMap((item) => [
        item.brand,
        item.article,
        item.title,
      ]),
    ]
      .join(" ")
      .toLocaleLowerCase("uk-UA");

    return searchableText.includes(normalizedQuery);
  });

  const stats = {
    new: orders.filter((order) => order.status === "new").length,
    processing: orders.filter((order) => order.status === "processing").length,
    completed: orders.filter((order) => order.status === "completed").length,
    cancelled: orders.filter((order) => order.status === "cancelled").length,
  };

  const filtersActive = Boolean(query || selectedStatus !== "all");

  return (
    <main className="min-h-screen bg-[#080c14] pb-16 text-white">
      <AdminHeader email={user.email} />

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Панель керування
            </p>
            <h1 className="mt-3 text-4xl font-bold">Замовлення</h1>
            <p className="mt-3 text-slate-400">
              Усього замовлень: {orders.length}
            </p>
          </div>
          <ExportOrdersButton orders={filteredOrders} />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Нові",
              value: stats.new,
              icon: Clock3,
              color: "text-blue-400",
            },
            {
              label: "В роботі",
              value: stats.processing,
              icon: CalendarClock,
              color: "text-amber-400",
            },
            {
              label: "Завершені",
              value: stats.completed,
              icon: CheckCircle2,
              color: "text-emerald-400",
            },
            {
              label: "Скасовані",
              value: stats.cancelled,
              icon: CircleX,
              color: "text-red-400",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-[#111827] p-5"
              >
                <Icon className={item.color} size={23} />
                <p className="mt-4 text-3xl font-black">{item.value}</p>
                <p className="mt-1 text-sm text-slate-500">{item.label}</p>
              </div>
            );
          })}
        </div>

        <form
          action="/admin/orders"
          method="get"
          className="mt-8 rounded-2xl border border-white/10 bg-[#111827] p-4 sm:p-5"
        >
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-300">
            <SlidersHorizontal size={18} className="text-blue-400" />
            Пошук і фільтри
          </div>

          <div className="grid gap-3 lg:grid-cols-[1fr_230px_auto]">
            <label className="relative block">
              <span className="sr-only">Пошук замовлення</span>
              <Search
                aria-hidden="true"
                size={19}
                className="pointer-events-none absolute left-4 top-3.5 text-slate-500"
              />
              <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Номер, ім’я, телефон, email або товар"
                className="h-12 w-full rounded-xl border border-white/10 bg-[#0b1220] pl-12 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
              />
            </label>

            <label>
              <span className="sr-only">Статус замовлення</span>
              <select
                name="status"
                defaultValue={selectedStatus}
                className="h-12 w-full rounded-xl border border-white/10 bg-[#0b1220] px-4 text-sm font-semibold text-white outline-none focus:border-blue-500"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              className="h-12 rounded-xl bg-blue-600 px-6 text-sm font-bold transition hover:bg-blue-500"
            >
              Застосувати
            </button>
          </div>

          {filtersActive && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-400">
                Знайдено замовлень:{" "}
                <span className="font-bold text-white">
                  {filteredOrders.length}
                </span>
              </p>
              <Link
                href="/admin/orders"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
              >
                <X size={17} />
                Скинути фільтри
              </Link>
            </div>
          )}
        </form>

        {error && (
          <p className="mt-8 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-red-300">
            Не вдалося завантажити замовлення: {error.message}
          </p>
        )}

        {!error && orders.length === 0 && (
          <div className="mt-10 rounded-3xl border border-dashed border-white/15 bg-[#111827] px-6 py-20 text-center">
            <ShoppingBag className="mx-auto text-blue-400" size={46} />
            <h2 className="mt-5 text-2xl font-bold">
              Замовлень поки немає
            </h2>
            <p className="mt-3 text-slate-400">
              Нові замовлення з кошика з’являться на цій сторінці.
            </p>
          </div>
        )}

        {!error && orders.length > 0 && filteredOrders.length === 0 && (
          <div className="mt-10 rounded-3xl border border-dashed border-white/15 bg-[#111827] px-6 py-16 text-center">
            <Search className="mx-auto text-blue-400" size={42} />
            <h2 className="mt-5 text-2xl font-bold">
              Нічого не знайдено
            </h2>
            <p className="mt-3 text-slate-400">
              Спробуйте змінити запит або вибрати інший статус.
            </p>
            <Link
              href="/admin/orders"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold transition hover:bg-blue-500"
            >
              Показати всі замовлення
            </Link>
          </div>
        )}

        <div className="mt-10 space-y-6">
          {filteredOrders.map((order) => {
            const items = getItems(order.items);
            const orderNumber = order.id.slice(0, 8).toUpperCase();

            return (
              <article
                key={order.id}
                className={`overflow-hidden rounded-3xl border bg-[#111827] ${
                  statusStyles[order.status] || "border-white/10"
                }`}
              >
                <div className="grid gap-5 border-b border-white/10 px-6 py-6 lg:grid-cols-[1fr_220px] lg:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-white/5 px-3 py-1 text-sm font-bold text-blue-300">
                        №{orderNumber}
                      </span>
                      <span className="text-sm text-slate-500">
                        {new Intl.DateTimeFormat("uk-UA", {
                          dateStyle: "medium",
                          timeStyle: "short",
                          timeZone: "Europe/Kyiv",
                        }).format(new Date(order.created_at))}
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-bold">
                      {order.customer_name}
                    </h2>

                    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
                      <a
                        href={`tel:${order.customer_phone}`}
                        className="inline-flex items-center gap-2 hover:text-white"
                      >
                        <Phone size={16} />
                        {order.customer_phone}
                      </a>

                      {order.customer_email && (
                        <a
                          href={`mailto:${order.customer_email}`}
                          className="inline-flex items-center gap-2 hover:text-white"
                        >
                          <Mail size={16} />
                          {order.customer_email}
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <OrderStatusSelect id={order.id} status={order.status} />
                    <DeleteOrderButton
                      id={order.id}
                      orderNumber={orderNumber}
                    />
                  </div>
                </div>

                <div className="grid gap-7 px-6 py-6 lg:grid-cols-[1fr_280px]">
                  <div>
                    <h3 className="flex items-center gap-2 font-bold">
                      <PackageCheck size={19} className="text-blue-400" />
                      Товари
                    </h3>

                    <div className="mt-4 divide-y divide-white/10 rounded-2xl border border-white/10">
                      {items.map((item) => (
                        <div
                          key={`${order.id}-${item.product_id}`}
                          className="grid gap-2 px-4 py-4 sm:grid-cols-[1fr_auto] sm:items-center"
                        >
                          <div>
                            <p className="font-semibold">
                              {item.brand} {item.article}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                              {item.title}
                            </p>
                          </div>

                          <p className="text-sm text-slate-300">
                            {item.quantity} шт. ·{" "}
                            {item.price === null
                              ? "ціна уточнюється"
                              : formatPrice(item.price)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-5">
                    <p className="text-sm text-slate-500">
                      Сума замовлення
                    </p>
                    <p className="mt-2 text-2xl font-black">
                      {order.total === null
                        ? "Уточнюється"
                        : formatPrice(Number(order.total))}
                    </p>

                    {order.has_unknown_prices && (
                      <p className="mt-3 text-xs leading-5 text-amber-300">
                        Є товари без указаної ціни.
                      </p>
                    )}

                    {order.comment && (
                      <>
                        <p className="mt-6 text-sm font-semibold text-slate-300">
                          Коментар
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {order.comment}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
