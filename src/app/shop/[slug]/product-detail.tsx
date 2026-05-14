"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ProductCard from "@/components/product-card";
import { useCart } from "@/context/cart-context";
import type { Product } from "@/lib/products";

const sampleReviews = [
  {
    id: "r1",
    author: "Jordan M.",
    rating: 5,
    title: "Exceeded expectations",
    body: "Shipping was quick and the product feels premium in hand. Would buy again.",
    date: "April 2, 2026",
  },
  {
    id: "r2",
    author: "Samira K.",
    rating: 4,
    title: "Solid daily driver",
    body: "Great value for the price. Minor nit: packaging could be more recyclable.",
    date: "March 18, 2026",
  },
  {
    id: "r3",
    author: "Chris P.",
    rating: 5,
    title: "Flawless experience",
    body: "Checkout was smooth and support answered a sizing question within an hour.",
    date: "March 2, 2026",
  },
];

type Props = {
  product: Product;
  related: Product[];
};

export default function ProductDetail({ product, related }: Props) {
  const { addItem } = useCart();
  const [imageIndex, setImageIndex] = useState(0);
  const [color, setColor] = useState(product.colors[0] ?? "");
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [qty, setQty] = useState(1);

  const activeImage = product.images[imageIndex] ?? product.images[0];

  const structuredJsonLd = useMemo(
    () =>
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: product.images,
        description: product.description,
        sku: product.id,
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: product.price,
          availability: "https://schema.org/InStock",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewCount,
        },
      }),
    [product],
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredJsonLd }}
      />
      <main className="store-main">
        <nav className="store-breadcrumb af-shell" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden className="store-bc-sep">
            /
          </span>
          <Link href="/shop">Shop</Link>
          <span aria-hidden className="store-bc-sep">
            /
          </span>
          <span className="store-bc-current">{product.name}</span>
        </nav>

        <section className="store-section store-section-tight">
          <div className="af-shell store-pdp-grid">
            <div className="store-gallery">
              <div className="store-gallery-main">
                <img src={activeImage} alt={product.name} width={720} height={720} />
              </div>
              <div className="store-gallery-thumbs" role="tablist" aria-label="Product images">
                {product.images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    className={`store-thumb${i === imageIndex ? " is-active" : ""}`}
                    onClick={() => setImageIndex(i)}
                    aria-pressed={i === imageIndex}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={src} alt="" width={96} height={96} />
                  </button>
                ))}
              </div>
            </div>

            <div className="store-pdp-info">
              <p className="store-eyebrow">{product.categoryLabel}</p>
              <h1 className="store-pdp-title">{product.name}</h1>
              <div className="store-card-rating" aria-label={`${product.rating} out of 5 stars`}>
                <span className="store-stars" aria-hidden>
                  {"★".repeat(Math.round(product.rating))}
                  {"☆".repeat(5 - Math.round(product.rating))}
                </span>
                <span className="store-card-reviews">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
              <div className="store-pdp-price">
                {product.compareAtPrice != null ? (
                  <>
                    <span className="store-price-lg">${product.price}</span>
                    <span className="store-price-compare">${product.compareAtPrice}</span>
                  </>
                ) : (
                  <span className="store-price-lg">${product.price}</span>
                )}
              </div>
              <p className="store-pdp-desc">{product.longDescription}</p>

              <div className="store-variations">
                {product.colors.length > 0 ? (
                  <fieldset className="store-fieldset">
                    <legend className="store-label">Color</legend>
                    <div className="store-chip-row">
                      {product.colors.map((c) => (
                        <button
                          key={c}
                          type="button"
                          className={`store-chip${c === color ? " is-active" : ""}`}
                          onClick={() => setColor(c)}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                ) : null}
                {product.sizes.length > 0 ? (
                  <fieldset className="store-fieldset">
                    <legend className="store-label">Size</legend>
                    <div className="store-chip-row">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          className={`store-chip${s === size ? " is-active" : ""}`}
                          onClick={() => setSize(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                ) : null}
              </div>

              <div className="store-qty-row">
                <label className="store-field store-field-inline">
                  <span className="store-label">Quantity</span>
                  <input
                    className="store-input store-input-narrow"
                    type="number"
                    min={1}
                    max={99}
                    value={qty}
                    onChange={(e) => {
                      const n = Number(e.target.value);
                      if (Number.isFinite(n)) setQty(Math.min(99, Math.max(1, Math.floor(n))));
                    }}
                  />
                </label>
                <button
                  type="button"
                  className="store-btn store-btn-primary store-btn-grow"
                  onClick={() =>
                    addItem({
                      productId: product.id,
                      slug: product.slug,
                      name: product.name,
                      price: product.price,
                      image: product.images[0],
                      quantity: qty,
                      color,
                      size,
                    })
                  }
                >
                  Add to cart
                </button>
              </div>
              <Link href="/cart" className="store-inline-link">
                View cart
              </Link>
            </div>
          </div>
        </section>

        <section className="store-section store-section-muted" aria-labelledby="specs-heading">
          <div className="af-shell">
            <h2 id="specs-heading" className="store-section-title">
              Specifications
            </h2>
            <dl className="store-specs">
              {product.specs.map((row) => (
                <div key={row.label} className="store-spec-row">
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="store-section" aria-labelledby="reviews-heading">
          <div className="af-shell">
            <h2 id="reviews-heading" className="store-section-title">
              Customer reviews
            </h2>
            <div className="store-review-list">
              {sampleReviews.map((r) => (
                <article key={r.id} className="store-review-card">
                  <div className="store-review-top">
                    <p className="store-review-author">{r.author}</p>
                    <time className="store-review-date" dateTime={r.date}>
                      {r.date}
                    </time>
                  </div>
                  <p className="store-stars" aria-label={`${r.rating} of 5`}>
                    {"★".repeat(r.rating)}
                    {"☆".repeat(5 - r.rating)}
                  </p>
                  <h3 className="store-review-title">{r.title}</h3>
                  <p className="store-review-body">{r.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="store-section store-section-muted" aria-labelledby="related-heading">
          <div className="af-shell">
            <h2 id="related-heading" className="store-section-title">
              Related products
            </h2>
            {related.length === 0 ? (
              <p className="store-muted">
                <Link href="/shop" className="store-inline-link">
                  Browse the full catalog
                </Link>
              </p>
            ) : (
              <div className="store-grid">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
