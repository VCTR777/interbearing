import {
  CalendarClock,
  CheckCircle2,
  CircleX,
  Clock3,
  Mail,
  PackageCheck,
  Phone,
  ShoppingBag,
} from "lucide-react";
import { requireAdmin } from "@/lib/admin";
import AdminHeader from "../components/AdminHeader";
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

const statusStyles: Record<string, string> = {
  new: "border-blue-500/25 bg-blue-500/10 text-blue-300",
  processing: "border-amber-500/25 bg-amber-500/10 text-amber-300",
  completed: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
  cancelled: "border-red-500/25 bg-red-500/10 text-red-300",
};

function getItems(value: unknown): OrderItem[] {
  return Array.isArray(value) ? (value as OrderItem[]) : [];
}

function formatPrice(value: number) {
  return `${value.toLocaleString("uk-UA")} грн`;
}

export default async function OrdersPage() {
  const { supabase, user } = await requireAdmin();
  const { data, error } = await supabase
    .from("orders")
    .select(
      "id, customer_name, customer_phone, customer_email, comment, items, total, has_unknown_prices, status, created_at",
    )
    .order("created_at", { ascending: false });
  const orders = (data || []) as Order[];

  const stats = {
    new: orders.filter((order) => order.status === "new").length,
    processing: orders.filter((order) => order.status === "processing").length,
    completed: orders.filter((order) => order.status === "completed").length,
    cancelled: orders.filter((order) => order.status === "cancelled").length,
  };

  return (
    <main className="min-h-screen bg-[#080c14] pb-16 text-white">
      <AdminHeader email={user.email} />
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Панель керування
          </p>
          <h1 className="mt-3 text-4xl font-bold">Замовлення</h1>
          <p className="mt-3 text-slate-400">
            Усього замовлень: {orders.length}
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Нові", value: stats.new, icon: Clock3, color: "text-blue-400" },
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

        <div className="mt-10 space-y-6">
          {orders.map((order) => {
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
                  <OrderStatusSelect id={order.id} status={order.status} />
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
                    <p className="text-sm text-slate-500">Сума замовлення</p>
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
