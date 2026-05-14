import type { Metadata } from "next";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import CartPageClient from "./cart-page-client";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your cart, update quantities, and continue to checkout.",
};

export default function CartPage() {
  return (
    <>
      <SiteHeader />
      <CartPageClient />
      <SiteFooter />
    </>
  );
}
