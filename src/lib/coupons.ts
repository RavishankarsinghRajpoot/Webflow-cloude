/** Uppercase keys. Percent as decimal (0.1 = 10%). */
export const COUPON_RATES: Record<string, number> = {
  SAVE10: 0.1,
  WELCOME15: 0.15,
};

export function couponRate(code: string | null | undefined): number {
  if (!code) return 0;
  return COUPON_RATES[code] ?? 0;
}

export function discountForSubtotal(
  subtotal: number,
  code: string | null | undefined,
): number {
  const rate = couponRate(code);
  return Math.round(subtotal * rate * 100) / 100;
}

export function normalizeCouponCode(raw: string): string | null {
  const c = raw.trim().toUpperCase();
  if (c && COUPON_RATES[c] != null) return c;
  return null;
}
