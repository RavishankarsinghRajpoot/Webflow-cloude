import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import ProductCard from "@/components/product-card";
import {
  categoryOptions,
  getFeaturedProducts,
  getTrendingProducts,
  products,
} from "@/lib/products";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover featured electronics, wearables, and home essentials with a fast, responsive storefront.",
};

const testimonials = [
  {
    quote: "Checkout was smooth and the product pages load instantly on mobile.",
    name: "Alex Rivera",
    role: "Product designer",
  },
  {
    quote: "Finally a catalog that makes comparing specs simple. Support was helpful too.",
    name: "Priya Desai",
    role: "Engineering lead",
  },
  {
    quote: "Great packaging and honest delivery estimates. I'll be back for accessories.",
    name: "Marcus Chen",
    role: "Small business owner",
  },
];

export default function Home() {
  const featured = getFeaturedProducts();
  const trending = getTrendingProducts();
  const categories = categoryOptions.filter((c) => c.value !== "all");

  return (
    <>
      <SiteHeader />
      <main>
        <section className="store-hero" aria-labelledby="hero-heading">
          <div className="af-shell store-hero-grid">
            <div>
              <p className="store-eyebrow">Curated for modern life</p>
              <h1 id="hero-heading" className="store-hero-title">
                Premium gear, thoughtful design, effortless checkout.
              </h1>
              <p className="store-hero-lead">
                Shop audio, wearables, home, office, and accessories with responsive layouts, crisp
                product storytelling, and a cart that stays in sync across visits.
              </p>
              <div className="store-hero-actions">
                <Link href="/shop" className="store-btn store-btn-primary">
                  Shop the collection
                </Link>
                <a
                  href="https://developers.webflow.com/webflow-cloud/getting-started"
                  className="store-btn store-btn-secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Webflow Cloud docs
                </a>
              </div>
            </div>
            <div className="store-hero-card" aria-hidden>
              <div className="store-hero-stat">
                <span className="store-hero-stat-label">Free shipping</span>
                <span className="store-hero-stat-value">$150+</span>
              </div>
              <div className="store-hero-stat">
                <span className="store-hero-stat-label">Happy customers</span>
                <span className="store-hero-stat-value">12k+</span>
              </div>
              <div className="store-hero-stat">
                <span className="store-hero-stat-label">Avg. rating</span>
                <span className="store-hero-stat-value">4.7★</span>
              </div>
            </div>
          </div>
        </section>

        <section className="store-section" id="featured" aria-labelledby="featured-heading">
          <div className="af-shell">
            <div className="store-section-head">
              <h2 id="featured-heading" className="store-section-title">
                Featured products
              </h2>
              <Link href="/shop" className="store-text-link">
                View all
              </Link>
            </div>
            <div className="store-grid">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        <section className="store-section store-section-muted" aria-labelledby="categories-heading">
          <div className="af-shell">
            <h2 id="categories-heading" className="store-section-title">
              Product categories
            </h2>
            <p className="store-section-sub">
              Jump into a category—filters and sorting are ready on the shop page.
            </p>
            <div className="store-cat-grid">
              {categories.map((c) => (
                <Link
                  key={c.value}
                  href={`/shop?category=${c.value}`}
                  className="store-cat-card"
                >
                  <span className="store-cat-label">{c.label}</span>
                  <span className="store-cat-meta">
                    {products.filter((p) => p.category === c.value).length} products
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="store-section" aria-labelledby="trending-heading">
          <div className="af-shell">
            <div className="store-section-head">
              <h2 id="trending-heading" className="store-section-title">
                Best sellers &amp; trending
              </h2>
              <Link href="/shop?sort=bestsellers" className="store-text-link">
                Shop bestsellers
              </Link>
            </div>
            <div className="store-grid">
              {trending.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        <section className="store-promo" aria-labelledby="promo-heading">
          <div className="af-shell store-promo-inner">
            <div>
              <h2 id="promo-heading" className="store-promo-title">
                Members save on bundles this week.
              </h2>
              <p className="store-promo-copy">
                Combine audio and wearables for an extra 10% off at checkout with code{" "}
                <strong>SAVE10</strong>.
              </p>
            </div>
            <Link href="/shop" className="store-btn store-btn-on-dark">
              Explore bundles
            </Link>
          </div>
        </section>

        <section className="store-section store-section-muted" id="testimonials" aria-labelledby="reviews-heading">
          <div className="af-shell">
            <h2 id="reviews-heading" className="store-section-title">
              What customers say
            </h2>
            <div className="store-testimonial-grid">
              {testimonials.map((t) => (
                <figure key={t.name} className="store-testimonial">
                  <blockquote className="store-testimonial-quote">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption>
                    <span className="store-testimonial-name">{t.name}</span>
                    <span className="store-testimonial-role">{t.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="store-section" aria-labelledby="nl-heading">
          <div className="af-shell store-nl-banner">
            <div>
              <h2 id="nl-heading" className="store-section-title">
                Newsletter
              </h2>
              <p className="store-section-sub">
                Product drops and exclusive offers. The full form lives in the site footer—scroll down
                or use the <em>Newsletter</em> link in the header.
              </p>
            </div>
            <a href="#newsletter" className="store-btn store-btn-primary">
              Jump to subscribe
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
