import type { Metadata } from "next";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import CheckoutPageClient from "./checkout-page-client";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Enter billing and shipping details and choose a payment method.",
};

export default function CheckoutPage() {
  return (
    <>
      <SiteHeader />
      <CheckoutPageClient />
      <SiteFooter />
    </>
  );
}
