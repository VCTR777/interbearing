import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Boxes,
  RefreshCw,
} from "lucide-react";
import { requireAdmin } from "@/lib/admin";
import AdminHeader from "../components/AdminHeader";

type StockMovement = {
  id: string;
  product_brand: string;
  product_article: string;
  product_title: string;
  movement_type: "sale" | "return" | "adjustment";
  quantity_change: number;
  quantity_before: number | null;
  quantity_after: number | null;
  order_id: string | null;
  created_at: string;
};

const movementLabels = {
  sale: "Продаж",
  return: "Повернення",
  adjustment: "Коригування",
} as const;

function movementStyle(type: StockMovement["movement_type"]) {
  if (type === "sale") {
    return {
      icon: ArrowUpFromLine,
      badge: "bg-red-500/10 text-red-300",
      iconBox: "bg-red-500/10 text-red-300",
    };
  }

  if (type === "return") {
    return {
      icon: ArrowDownToLine,
      badge: "bg-emerald-500/10 text-emerald-300",
      iconBox: "bg-emerald-500/10 text-emerald-300",
    };
  }

  return {
    icon: RefreshCw,
    badge: "bg-amber-500/10 text-amber-300",
    iconBox: "bg-amber-500/10 text-amber-300",
  };
}

function quantityText(value: number | null) {
  return value === null ? "Не ведеться" : `${value} шт.`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("uk-UA", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Kyiv",
  }).format(new Date(value));
}

export default async function AdminStockPage() {
  const { supabase, user } = await requireAdmin();
  const { data, error } = await supabase
    .from("stock_movements")
    .select(
      "id, product_brand, product_article, product_title, movement_type, quantity_change, quantity_before, quantity_after, order_id, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(200);

  const movements = (data || []) as StockMovement[];
  const totalAdded = movements.reduce(
    (sum, item) => sum + Math.max(item.quantity_change, 0),
    0,
  );
  const totalRemoved = movements.reduce(
    (sum, item) => sum + Math.abs(Math.min(item.quantity_change, 0)),
    0,
  );

  return (
    <main className="min-h-screen bg-[#080c14] pb-16 text-white">
      <AdminHeader email={user.email} />

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Облік залишків
          </p>
          <h1 className="mt-3 text-4xl font-bold">Рух товарів</h1>
          <p className="mt-3 max-w-2xl text-slate-400">
            Продажі, повернення після скасування та ручні зміни залишків.
            Показано останні 200 операцій.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">
            <p className="text-sm text-slate-400">Операцій</p>
            <p className="mt-2 text-3xl font-bold">{movements.length}</p>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <p className="text-sm text-emerald-300">Додано</p>
            <p className="mt-2 text-3xl font-bold text-emerald-300">
              +{totalAdded} шт.
            </p>
          </div>
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
            <p className="text-sm text-red-300">Списано</p>
            <p className="mt-2 text-3xl font-bold text-red-300">
              −{totalRemoved} шт.
            </p>
          </div>
        </div>

        {error && (
          <p className="mt-8 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-red-300">
            Не вдалося завантажити журнал: {error.message}
          </p>
        )}

        {!error && movements.length === 0 && (
          <div className="mt-10 rounded-3xl border border-dashed border-white/15 bg-[#111827] px-6 py-20 text-center">
            <Boxes className="mx-auto text-blue-400" size={44} />
            <h2 className="mt-5 text-2xl font-bold">Операцій поки немає</h2>
            <p className="mt-3 text-slate-400">
              Змініть залишок товару або створіть нове замовлення.
            </p>
          </div>
        )}

        {movements.length > 0 && (
          <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[#111827]">
            <div className="divide-y divide-white/10">
              {movements.map((movement) => {
                const style = movementStyle(movement.movement_type);
                const Icon = style.icon;

                return (
                  <article
                    key={movement.id}
                    className="grid gap-5 px-5 py-5 md:grid-cols-[48px_1fr_auto] md:items-center lg:px-6"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${style.iconBox}`}
                    >
                      <Icon size={21} />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${style.badge}`}
                        >
                          {movementLabels[movement.movement_type]}
                        </span>
                        <span className="text-sm font-semibold text-blue-300">
                          {movement.product_brand} {movement.product_article}
                        </span>
                        <span className="text-xs text-slate-500">
                          {formatDate(movement.created_at)}
                        </span>
                      </div>
                      <h2 className="mt-2 font-semibold text-white">
                        {movement.product_title}
                      </h2>
                      {movement.order_id && (
                        <p className="mt-1 text-xs text-slate-500">
                          Замовлення №{movement.order_id.slice(0, 8).toUpperCase()}
                        </p>
                      )}
                    </div>

                    <div className="text-left md:text-right">
                      <p
                        className={`text-xl font-bold ${
                          movement.quantity_change > 0
                            ? "text-emerald-300"
                            : movement.quantity_change < 0
                              ? "text-red-300"
                              : "text-slate-300"
                        }`}
                      >
                        {movement.quantity_change > 0 ? "+" : ""}
                        {movement.quantity_change} шт.
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {quantityText(movement.quantity_before)} →{" "}
                        {quantityText(movement.quantity_after)}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
