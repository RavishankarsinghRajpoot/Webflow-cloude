"use client";

import Link from "next/link";
import { useCart } from "@/context/cart-context";
import type { Product } from "@/lib/products";

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  const mainImage = product.images[0];

  return (
    <article className="store-card">
      <Link href={`/shop/${product.slug}`} className="store-card-image-wrap">
        <img
          src={mainImage}
          alt=""
          className="store-card-image"
          width={400}
          height={400}
        />
      </Link>
      <div className="store-card-body">
        <p className="store-card-meta">{product.categoryLabel}</p>
        <Link href={`/shop/${product.slug}`} className="store-card-title">
          {product.name}
        </Link>
        <div className="store-card-rating" aria-label={`${product.rating} out of 5 stars`}>
          <span className="store-stars" aria-hidden>
            {"★".repeat(Math.round(product.rating))}
            {"☆".repeat(5 - Math.round(product.rating))}
          </span>
          <span className="store-card-reviews">({product.reviewCount})</span>
        </div>
        <div className="store-card-price-row">
          {product.compareAtPrice != null ? (
            <>
              <span className="store-price">${product.price}</span>
              <span className="store-price-compare">${product.compareAtPrice}</span>
            </>
          ) : (
            <span className="store-price">${product.price}</span>
          )}
        </div>
        <div className="store-card-actions">
          <button
            type="button"
            className="store-btn store-btn-primary"
            onClick={() =>
              addItem({
                productId: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: mainImage,
                quantity: 1,
                color: product.colors[0],
                size: product.sizes[0],
              })
            }
          >
            Add to cart
          </button>
          <Link href={`/shop/${product.slug}`} className="store-btn store-btn-ghost">
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
