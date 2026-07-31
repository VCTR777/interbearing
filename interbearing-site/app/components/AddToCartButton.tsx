"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "./CartProvider";
import type { CartProduct } from "./CartProvider";

export default function AddToCartButton({
  product,
  className = "",
}: {
  product: CartProduct;
  className?: string;
}) {
  const { items, addItem, setQuantity } = useCart();
  const cartItem = items.find((item) => item.id === product.id);
  const isOutOfStock = product.stockQuantity === 0;
  const reachedMaximum =
    product.stockQuantity !== null &&
    Boolean(cartItem) &&
    cartItem!.quantity >= product.stockQuantity;

  if (!cartItem) {
    return (
      <button
        type="button"
        disabled={isOutOfStock}
        onClick={() => addItem(product)}
        className={`inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-center font-semibold transition ${
          isOutOfStock
            ? "cursor-not-allowed bg-slate-700 text-slate-400"
            : "bg-blue-600 hover:bg-blue-500"
        } ${className}`}
      >
        <ShoppingCart aria-hidden="true" size={20} />
        {isOutOfStock ? "Немає в наявності" : "Замовити"}
      </button>
    );
  }

  return (
    <div
      className={`flex min-h-14 items-center justify-between overflow-hidden rounded-xl border border-blue-500/40 bg-blue-500/10 ${className}`}
      aria-label={`Кількість товару ${product.article}`}
    >
      <button
        type="button"
        onClick={() => setQuantity(product.id, cartItem.quantity - 1)}
        aria-label="Зменшити кількість"
        className="flex min-h-14 flex-1 items-center justify-center text-blue-300 transition hover:bg-blue-600 hover:text-white"
      >
        <Minus aria-hidden="true" size={21} />
      </button>

      <div className="flex min-w-20 flex-col items-center justify-center border-x border-blue-500/25 px-4">
        <span className="text-lg font-black text-white">{cartItem.quantity}</span>
        <span className="text-[10px] uppercase tracking-wider text-blue-300">
          у кошику
        </span>
      </div>

      <button
        type="button"
        disabled={reachedMaximum}
        onClick={() => setQuantity(product.id, cartItem.quantity + 1)}
        aria-label="Збільшити кількість"
        title={reachedMaximum ? "Досягнуто доступний залишок" : undefined}
        className="flex min-h-14 flex-1 items-center justify-center text-blue-300 transition hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:text-slate-600 disabled:hover:bg-transparent"
      >
        <Plus aria-hidden="true" size={21} />
      </button>
    </div>
  );
}
