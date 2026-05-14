"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  categoryOptions,
  products,
  type Product,
  type ProductCategory,
} from "@/lib/products";
import ProductCard from "@/components/product-card";

const PAGE_SIZE = 4;

type Props = {
  initialCategory: ProductCategory | "all";
  initialSort: string;
  initialQuery: string;
};

function matchesQuery(p: Product, q: string) {
  if (!q.trim()) return true;
  const s = q.toLowerCase();
  return (
    p.name.toLowerCase().includes(s) ||
    p.description.toLowerCase().includes(s) ||
    p.categoryLabel.toLowerCase().includes(s)
  );
}

export default function ShopCatalog({
  initialCategory,
  initialSort,
  initialQuery,
}: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<ProductCategory | "all">(
    initialCategory,
  );
  const [sort, setSort] = useState(initialSort || "featured");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    let list = products.filter((p) =>
      category === "all" ? true : p.category === category,
    );
    list = list.filter((p) => matchesQuery(p, query));
    const next = [...list];
    if (sort === "price-asc") next.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") next.sort((a, b) => b.price - a.price);
    else if (sort === "rating") next.sort((a, b) => b.rating - a.rating);
    else if (sort === "bestsellers")
      next.sort((a, b) => Number(b.bestseller) - Number(a.bestseller));
    else next.sort((a, b) => Number(b.featured) - Number(a.featured));
    return next;
  }, [category, query, sort]);

  const slice = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const resetPaging = useCallback(() => setVisible(PAGE_SIZE), []);

  return (
    <main className="store-main">
      <section className="store-hero store-hero-compact" aria-labelledby="shop-heading">
        <div className="af-shell">
          <p className="store-eyebrow">Catalog</p>
          <h1 id="shop-heading" className="store-hero-title">
            Shop all products
          </h1>
          <p className="store-hero-lead">
            Filter by category, sort by price or rating, and search the full range.
          </p>
        </div>
      </section>

      <section className="store-section" id="categories" aria-labelledby="filters-heading">
        <div className="af-shell">
          <h2 id="filters-heading" className="sr-only">
            Filters and search
          </h2>
          <div className="store-filters">
            <label className="store-field">
              <span className="store-label">Search</span>
              <input
                type="search"
                className="store-input"
                placeholder="Search products…"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  resetPaging();
                }}
                autoComplete="off"
              />
            </label>
            <label className="store-field">
              <span className="store-label">Category</span>
              <select
                className="store-select"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value as ProductCategory | "all");
                  resetPaging();
                }}
              >
                {categoryOptions.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="store-field">
              <span className="store-label">Sort</span>
              <select
                className="store-select"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  resetPaging();
                }}
              >
                <option value="featured">Featured</option>
                <option value="bestsellers">Best sellers</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
            </label>
          </div>

          <p className="store-results-count" role="status">
            Showing {slice.length} of {filtered.length} products
          </p>

          <div className="store-grid">
            {slice.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="store-empty">
              No products match your filters.{" "}
              <Link href="/shop" className="store-inline-link">
                Reset catalog
              </Link>
            </p>
          ) : null}

          {hasMore ? (
            <div className="store-load-more-wrap">
              <button
                type="button"
                className="store-btn store-btn-secondary"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
              >
                Load more
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
