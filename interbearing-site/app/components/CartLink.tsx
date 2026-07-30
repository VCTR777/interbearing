"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "./CartProvider";

export default function CartLink() {
  const { totalQuantity } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={`Кошик, товарів: ${totalQuantity}`}
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white transition hover:border-blue-400/40 hover:bg-blue-500/10"
    >
      <ShoppingCart aria-hidden="true" size={21} />
      {totalQuantity > 0 && (
        <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-blue-600 px-1.5 text-xs font-bold text-white">
          {totalQuantity > 99 ? "99+" : totalQuantity}
        </span>
      )}
    </Link>
  );
}
