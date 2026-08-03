"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartProduct = {
  id: string;
  slug: string;
  brand: string;
  article: string;
  title: string;
  imageUrl: string | null;
  price: number | null;
  stockQuantity: number | null;
};

export type CartItem = CartProduct & {
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  totalQuantity: number;
  addItem: (product: CartProduct) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "interbearing-cart-v1";
const CartContext = createContext<CartContextValue | null>(null);

function readStoredCart(): CartItem[] {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed)
      ? parsed.map((item) => ({
          ...item,
          stockQuantity:
            typeof item?.stockQuantity === "number"
              ? item.stockQuantity
              : null,
        }))
      : [];
  } catch {
    return [];
  }
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setItems(readStoredCart());
      setIsReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (isReady) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [isReady, items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalQuantity: items.reduce((total, item) => total + item.quantity, 0),
      addItem(product) {
        if (product.stockQuantity === 0) return;

        setItems((current) => {
          const existing = current.find((item) => item.id === product.id);
          const maximum = product.stockQuantity ?? 99;

          if (existing) {
            return current.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    ...product,
                    quantity: Math.min(item.quantity + 1, maximum),
                  }
                : item,
            );
          }

          return [...current, { ...product, quantity: 1 }];
        });
      },
      setQuantity(id, quantity) {
        if (quantity < 1) {
          setItems((current) => current.filter((item) => item.id !== id));
          return;
        }

        setItems((current) =>
          current.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: Math.min(
                    quantity,
                    item.stockQuantity ?? 99,
                  ),
                }
              : item,
          ),
        );
      },
      removeItem(id) {
        setItems((current) => current.filter((item) => item.id !== id));
      },
      clearCart() {
        setItems([]);
      },
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
