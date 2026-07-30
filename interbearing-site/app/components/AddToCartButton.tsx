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

  if (!cartItem) {
    return (
      <button
        type="button"
        onClick={() => addItem(product)}
        className={`inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 text-center font-semibold transition hover:bg-blue-500 ${className}`}
      >
        <ShoppingCart aria-hidden="true" size={20} />
        Замовити
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
        onClick={() => setQuantity(product.id, cartItem.quantity + 1)}
        aria-label="Збільшити кількість"
        className="flex min-h-14 flex-1 items-center justify-center text-blue-300 transition hover:bg-blue-600 hover:text-white"
      >
        <Plus aria-hidden="true" size={21} />
      </button>
    </div>
  );
}
