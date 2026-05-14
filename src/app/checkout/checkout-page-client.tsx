"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useCart } from "@/context/cart-context";
import { normalizeCouponCode } from "@/lib/coupons";

type PaymentMethod = "stripe" | "razorpay" | "paypal" | "cod";

export default function CheckoutPageClient() {
  const router = useRouter();
  const {
    items,
    subtotal,
    couponDiscount,
    appliedCoupon,
    setAppliedCoupon,
    clearCart,
  } = useCart();
  const [payment, setPayment] = useState<PaymentMethod>("stripe");
  const [submitting, setSubmitting] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState(false);

  useEffect(() => {
    if (appliedCoupon) setCouponInput(appliedCoupon);
  }, [appliedCoupon]);

  const discountedSubtotal = useMemo(
    () => Math.max(0, subtotal - couponDiscount),
    [subtotal, couponDiscount],
  );

  const tax = useMemo(
    () => Math.round(discountedSubtotal * 0.08 * 100) / 100,
    [discountedSubtotal],
  );
  const shipping = subtotal > 0 ? (discountedSubtotal > 150 ? 0 : 12) : 0;
  const total = discountedSubtotal + tax + shipping;

  function applyCheckoutCoupon() {
    const raw = couponInput.trim();
    if (!raw) {
      setCouponError(false);
      return;
    }
    const code = normalizeCouponCode(raw);
    if (code) {
      setAppliedCoupon(code);
      setCouponError(false);
    } else {
      setCouponError(true);
    }
  }

  function removeCheckoutCoupon() {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError(false);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    window.setTimeout(() => {
      clearCart();
      const ref = `ORD-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;
      const params = new URLSearchParams({
        ref,
        email: encodeURIComponent(email || "customer@example.com"),
        payment,
      });
      router.push(`/checkout/success?${params.toString()}`);
    }, 600);
  }

  if (items.length === 0) {
    return (
      <main className="store-main">
        <section className="store-section">
          <div className="af-shell store-empty-card">
            <h1 className="store-hero-title">Checkout</h1>
            <p className="store-muted">Your cart is empty. Add products before checking out.</p>
            <Link href="/shop" className="store-btn store-btn-primary">
              Browse shop
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="store-main">
      <section className="store-hero store-hero-compact" aria-labelledby="checkout-heading">
        <div className="af-shell">
          <p className="store-eyebrow">Secure checkout</p>
          <h1 id="checkout-heading" className="store-hero-title">
            Complete your order
          </h1>
          <p className="store-hero-lead">
            Billing and shipping details below. Payment options are demo-only (no charges).
          </p>
        </div>
      </section>

      <section className="store-section">
        <div className="af-shell store-checkout-grid">
          <form className="store-checkout-form" onSubmit={onSubmit}>
            <fieldset className="store-fieldset-block">
              <legend className="store-section-title">Contact</legend>
              <label className="store-field">
                <span className="store-label">Email (for confirmation)</span>
                <input className="store-input" name="email" type="email" required placeholder="you@example.com" />
              </label>
            </fieldset>

            <fieldset className="store-fieldset-block">
              <legend className="store-section-title">Billing</legend>
              <div className="store-form-grid">
                <label className="store-field">
                  <span className="store-label">Full name</span>
                  <input className="store-input" name="billingName" required autoComplete="name" />
                </label>
                <label className="store-field">
                  <span className="store-label">Phone</span>
                  <input className="store-input" name="billingPhone" type="tel" autoComplete="tel" />
                </label>
                <label className="store-field store-field-span2">
                  <span className="store-label">Address</span>
                  <input className="store-input" name="billingAddress" required autoComplete="street-address" />
                </label>
                <label className="store-field">
                  <span className="store-label">City</span>
                  <input className="store-input" name="billingCity" required autoComplete="address-level2" />
                </label>
                <label className="store-field">
                  <span className="store-label">ZIP / Postal</span>
                  <input className="store-input" name="billingZip" required autoComplete="postal-code" />
                </label>
              </div>
            </fieldset>

            <fieldset className="store-fieldset-block">
              <legend className="store-section-title">Shipping</legend>
              <label className="store-check">
                <input type="checkbox" name="sameAsBilling" defaultChecked />
                <span>Same as billing address</span>
              </label>
              <div className="store-form-grid">
                <label className="store-field store-field-span2">
                  <span className="store-label">Recipient name</span>
                  <input className="store-input" name="shipName" autoComplete="shipping name" />
                </label>
                <label className="store-field store-field-span2">
                  <span className="store-label">Shipping address</span>
                  <input className="store-input" name="shipAddress" autoComplete="shipping street-address" />
                </label>
                <label className="store-field">
                  <span className="store-label">City</span>
                  <input className="store-input" name="shipCity" autoComplete="shipping address-level2" />
                </label>
                <label className="store-field">
                  <span className="store-label">ZIP / Postal</span>
                  <input className="store-input" name="shipZip" autoComplete="shipping postal-code" />
                </label>
              </div>
            </fieldset>

            <fieldset className="store-fieldset-block">
              <legend className="store-section-title">Payment method</legend>
              <p className="store-muted store-field-hint">
                Integrations (Stripe, Razorpay, PayPal) can be wired here. This demo records your choice only.
              </p>
              <div className="store-pay-options">
                {(
                  [
                    ["stripe", "Stripe"],
                    ["razorpay", "Razorpay"],
                    ["paypal", "PayPal"],
                    ["cod", "Cash on delivery"],
                  ] as const
                ).map(([id, label]) => (
                  <label key={id} className="store-pay-card">
                    <input
                      type="radio"
                      name="payment"
                      value={id}
                      checked={payment === id}
                      onChange={() => setPayment(id)}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="store-checkout-actions">
              <Link href="/cart" className="store-btn store-btn-ghost">
                Back to cart
              </Link>
              <button type="submit" className="store-btn store-btn-primary" disabled={submitting}>
                {submitting ? "Placing order…" : "Place order"}
              </button>
            </div>
          </form>

          <aside className="store-checkout-summary" aria-labelledby="order-summary-heading">
            <h2 id="order-summary-heading" className="store-summary-title">
              Order summary
            </h2>
            <ul className="store-mini-lines">
              {items.map((line) => (
                <li key={line.lineId} className="store-mini-line">
                  <span>
                    {line.name} × {line.quantity}
                  </span>
                  <span>${(line.price * line.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="store-coupon store-coupon-compact">
              <label className="store-field">
                <span className="store-label">Coupon</span>
                <div className="store-coupon-row">
                  <input
                    className="store-input"
                    placeholder="SAVE10 or WELCOME15"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value);
                      setCouponError(false);
                    }}
                  />
                  <button type="button" className="store-btn store-btn-secondary" onClick={applyCheckoutCoupon}>
                    Apply
                  </button>
                </div>
              </label>
              {appliedCoupon && couponDiscount > 0 ? (
                <p className="store-coupon-note" role="status">
                  <strong>{appliedCoupon}</strong> (−${couponDiscount.toFixed(2)}){" "}
                  <button type="button" className="store-btn-unstyled" onClick={removeCheckoutCoupon}>
                    Remove
                  </button>
                </p>
              ) : couponError ? (
                <p className="store-coupon-note store-coupon-warn" role="status">
                  Code not recognized. Try SAVE10 or WELCOME15.
                </p>
              ) : null}
            </div>
            <dl className="store-summary-rows">
              <div className="store-summary-row">
                <dt>Subtotal</dt>
                <dd>${subtotal.toFixed(2)}</dd>
              </div>
              {couponDiscount > 0 ? (
                <div className="store-summary-row">
                  <dt>Coupon</dt>
                  <dd>−${couponDiscount.toFixed(2)}</dd>
                </div>
              ) : null}
              <div className="store-summary-row">
                <dt>Estimated tax</dt>
                <dd>${tax.toFixed(2)}</dd>
              </div>
              <div className="store-summary-row">
                <dt>Shipping</dt>
                <dd>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</dd>
              </div>
              <div className="store-summary-row store-summary-total">
                <dt>Total</dt>
                <dd>${total.toFixed(2)}</dd>
              </div>
            </dl>
            <p className="store-muted store-field-hint">
              Email notifications: order confirmation is simulated on the next screen for this demo build.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
