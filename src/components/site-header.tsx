"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { basePath } from "@/lib/basePath";
import { useCart } from "@/context/cart-context";

const navItems: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/shop#categories" },
  { label: "Reviews", href: "/#testimonials" },
  { label: "Newsletter", href: "/#newsletter" },
];

export default function SiteHeader() {
  const { itemCount } = useCart();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="af-header">
      <div className="af-shell af-header-row">
        <Link href="/" className="af-brand" aria-label="AstralFund Store home">
          <img
            src={`${basePath}/AstralFund-Logo.svg`}
            alt="AstralFund"
            className="af-logo"
          />
        </Link>
        <button
          type="button"
          className="af-nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="af-nav-toggle-icon" aria-hidden />
          <span className="af-nav-toggle-label">Menu</span>
        </button>
        <div
          className={`af-header-nav-main${menuOpen ? " af-header-nav-open" : ""}`}
          id="primary-navigation"
        >
          <nav aria-label="Primary">
            <ul className="af-nav-list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="af-nav-link" onClick={closeMenu}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="af-header-actions">
            <Link
              href="/cart"
              className="af-cart-link"
              aria-label={`Shopping cart, ${itemCount} items`}
              onClick={closeMenu}
            >
              <span className="af-cart-icon" aria-hidden>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6 6h15l-1.5 9h-12L6 6Zm0 0L5 3H2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="9" cy="20" r="1.6" fill="currentColor" />
                  <circle cx="17" cy="20" r="1.6" fill="currentColor" />
                </svg>
              </span>
              {itemCount > 0 ? (
                <span className="af-cart-badge">{itemCount > 99 ? "99+" : itemCount}</span>
              ) : null}
            </Link>
            <Link href="/shop" className="af-cta" onClick={closeMenu}>
              Shop now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
