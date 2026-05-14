"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { discountForSubtotal } from "@/lib/coupons";

export type CartLine = {
  lineId: string;
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  size?: string;
};

type PersistedV2 = {
  items: CartLine[];
  appliedCoupon: string | null;
};

type CartContextValue = {
  items: CartLine[];
  itemCount: number;
  subtotal: number;
  appliedCoupon: string | null;
  couponDiscount: number;
  setAppliedCoupon: (code: string | null) => void;
  addItem: (input: {
    productId: string;
    slug: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    color?: string;
    size?: string;
  }) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeLine: (lineId: string) => void;
  clearCart: () => void;
};

const STORAGE_KEY_V2 = "astralfund-store-state";
const STORAGE_KEY_LEGACY = "astralfund-store-cart";

const CartContext = createContext<CartContextValue | null>(null);

function makeLineId(
  productId: string,
  color?: string,
  size?: string,
): string {
  return [productId, color ?? "", size ?? ""].join("::");
}

function persistState(items: CartLine[], appliedCoupon: string | null) {
  try {
    const payload: PersistedV2 = { items, appliedCoupon };
    localStorage.setItem(STORAGE_KEY_V2, JSON.stringify(payload));
  } catch {
    /* ignore */
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [appliedCoupon, setAppliedCouponState] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const rawV2 = localStorage.getItem(STORAGE_KEY_V2);
      if (rawV2) {
        const parsed = JSON.parse(rawV2) as PersistedV2;
        if (parsed && Array.isArray(parsed.items)) {
          setItems(parsed.items);
          setAppliedCouponState(
            typeof parsed.appliedCoupon === "string" ? parsed.appliedCoupon : null,
          );
        }
      } else {
        const legacy = localStorage.getItem(STORAGE_KEY_LEGACY);
        if (legacy) {
          const arr = JSON.parse(legacy) as unknown;
          if (Array.isArray(arr)) setItems(arr as CartLine[]);
        }
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    persistState(items, appliedCoupon);
  }, [items, appliedCoupon, hydrated]);

  const setAppliedCoupon = useCallback((code: string | null) => {
    setAppliedCouponState(code);
  }, []);

  const addItem = useCallback(
    (input: {
      productId: string;
      slug: string;
      name: string;
      price: number;
      image: string;
      quantity: number;
      color?: string;
      size?: string;
    }) => {
      const lineId = makeLineId(input.productId, input.color, input.size);
      setItems((prev) => {
        const idx = prev.findIndex((l) => l.lineId === lineId);
        if (idx === -1) {
          return [
            ...prev,
            {
              lineId,
              productId: input.productId,
              slug: input.slug,
              name: input.name,
              price: input.price,
              image: input.image,
              quantity: input.quantity,
              color: input.color,
              size: input.size,
            },
          ];
        }
        const next = [...prev];
        next[idx] = {
          ...next[idx],
          quantity: next[idx].quantity + input.quantity,
        };
        return next;
      });
    },
    [],
  );

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    setItems((prev) => {
      if (quantity < 1) return prev.filter((l) => l.lineId !== lineId);
      return prev.map((l) =>
        l.lineId === lineId ? { ...l, quantity } : l,
      );
    });
  }, []);

  const removeLine = useCallback((lineId: string) => {
    setItems((prev) => prev.filter((l) => l.lineId !== lineId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCouponState(null);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((sum, l) => sum + l.quantity, 0);
    const subtotal = items.reduce(
      (sum, l) => sum + l.price * l.quantity,
      0,
    );
    const couponDiscount = discountForSubtotal(subtotal, appliedCoupon);
    return {
      items,
      itemCount,
      subtotal,
      appliedCoupon,
      couponDiscount,
      setAppliedCoupon,
      addItem,
      updateQuantity,
      removeLine,
      clearCart,
    };
  }, [
    items,
    appliedCoupon,
    setAppliedCoupon,
    addItem,
    updateQuantity,
    removeLine,
    clearCart,
  ]);

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
