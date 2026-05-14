"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/context/cart-context";
import { normalizeCouponCode } from "@/lib/coupons";

export default function CartPageClient() {
  const {
    items,
    subtotal,
    couponDiscount,
    appliedCoupon,
    setAppliedCoupon,
    updateQuantity,
    removeLine,
  } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponError, setCouponError] = useState(false);

  useEffect(() => {
    if (appliedCoupon) setCoupon(appliedCoupon);
  }, [appliedCoupon]);

  const total = useMemo(
    () => Math.max(0, subtotal - couponDiscount),
    [subtotal, couponDiscount],
  );

  function applyCoupon() {
    const raw = coupon.trim();
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

  function removeCoupon() {
    setAppliedCoupon(null);
    setCoupon("");
    setCouponError(false);
  }

  return (
    <main className="store-main">
      <section className="store-hero store-hero-compact" aria-labelledby="cart-heading">
        <div className="af-shell">
          <p className="store-eyebrow">Your bag</p>
          <h1 id="cart-heading" className="store-hero-title">
            Shopping cart
          </h1>
          <p className="store-hero-lead">Review items, apply a coupon, and head to checkout.</p>
        </div>
      </section>

      <section className="store-section">
        <div className="af-shell store-cart-layout">
          <div className="store-cart-lines">
            {items.length === 0 ? (
              <div className="store-empty-card">
                <p>Your cart is empty.</p>
                <Link href="/shop" className="store-btn store-btn-primary">
                  Continue shopping
                </Link>
              </div>
            ) : (
              <ul className="store-line-list">
                {items.map((line) => (
                  <li key={line.lineId} className="store-line-item">
                    <img
                      className="store-line-thumb"
                      src={line.image}
                      alt=""
                      width={96}
                      height={96}
                    />
                    <div className="store-line-body">
                      <div className="store-line-top">
                        <Link href={`/shop/${line.slug}`} className="store-line-title">
                          {line.name}
                        </Link>
                        <button
                          type="button"
                          className="store-line-remove"
                          onClick={() => removeLine(line.lineId)}
                        >
                          Remove
                        </button>
                      </div>
                      {(line.color || line.size) && (
                        <p className="store-line-meta">
                          {[line.color, line.size].filter(Boolean).join(" · ")}
                        </p>
                      )}
                      <div className="store-line-bottom">
                        <label className="store-qty-inline">
                          <span className="sr-only">Quantity</span>
                          <input
                            type="number"
                            min={1}
                            max={99}
                            className="store-input store-input-narrow"
                            value={line.quantity}
                            onChange={(e) => {
                              const n = Number(e.target.value);
                              if (Number.isFinite(n))
                                updateQuantity(line.lineId, Math.floor(n));
                            }}
                          />
                        </label>
                        <p className="store-line-price">
                          ${(line.price * line.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <aside className="store-cart-summary" aria-labelledby="summary-heading">
            <h2 id="summary-heading" className="store-summary-title">
              Order summary
            </h2>
            <dl className="store-summary-rows">
              <div className="store-summary-row">
                <dt>Subtotal</dt>
                <dd>${subtotal.toFixed(2)}</dd>
              </div>
              <div className="store-summary-row">
                <dt>Discount</dt>
                <dd>
                  {couponDiscount > 0 && appliedCoupon
                    ? `-${couponDiscount.toFixed(2)} (${appliedCoupon})`
                    : "—"}
                </dd>
              </div>
              <div className="store-summary-row store-summary-total">
                <dt>Total</dt>
                <dd>${total.toFixed(2)}</dd>
              </div>
            </dl>

            <div className="store-coupon">
              <label className="store-field">
                <span className="store-label">Coupon code</span>
                <div className="store-coupon-row">
                  <input
                    className="store-input"
                    placeholder="SAVE10 or WELCOME15"
                    value={coupon}
                    onChange={(e) => {
                      setCoupon(e.target.value);
                      setCouponError(false);
                    }}
                  />
                  <button
                    type="button"
                    className="store-btn store-btn-secondary"
                    onClick={applyCoupon}
                  >
                    Apply
                  </button>
                </div>
              </label>
              {appliedCoupon && couponDiscount > 0 ? (
                <p className="store-coupon-note" role="status">
                  Applied <strong>{appliedCoupon}</strong> — saved ${couponDiscount.toFixed(2)}.{" "}
                  <button type="button" className="store-btn-unstyled" onClick={removeCoupon}>
                    Remove
                  </button>
                </p>
              ) : couponError && items.length > 0 ? (
                <p className="store-coupon-note store-coupon-warn" role="status">
                  Code not recognized. Try SAVE10 or WELCOME15.
                </p>
              ) : null}
            </div>

            <div className="store-summary-actions">
              <Link href="/shop" className="store-btn store-btn-ghost">
                Continue shopping
              </Link>
              <Link
                href={items.length ? "/checkout" : "#"}
                className="store-btn store-btn-primary"
                aria-disabled={items.length === 0}
                onClick={(e) => {
                  if (items.length === 0) e.preventDefault();
                }}
              >
                Proceed to checkout
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
