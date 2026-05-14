import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false, follow: false },
};

type SearchParams = Record<string, string | string[] | undefined>;

function first(param: string | string[] | undefined) {
  if (Array.isArray(param)) return param[0];
  return param;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const sp = (await searchParams) ?? {};
  const ref = first(sp.ref) ?? "ORD-DEMO";
  const emailRaw = first(sp.email) ?? "your inbox";
  const email =
    emailRaw === "your inbox"
      ? emailRaw
      : (() => {
          try {
            return decodeURIComponent(emailRaw);
          } catch {
            return emailRaw;
          }
        })();
  const payment = first(sp.payment) ?? "stripe";

  const paymentLabel: Record<string, string> = {
    stripe: "Stripe",
    razorpay: "Razorpay",
    paypal: "PayPal",
    cod: "Cash on delivery",
  };

  return (
    <>
      <SiteHeader />
      <main className="store-main">
        <section className="store-section">
          <div className="af-shell store-success">
            <p className="store-eyebrow">Thank you</p>
            <h1 className="store-hero-title">Order confirmed</h1>
            <p className="store-hero-lead">
              Reference <strong>{ref}</strong>. A confirmation has been queued to{" "}
              <strong>{email}</strong> using <strong>{paymentLabel[payment] ?? payment}</strong>.
            </p>
            <p className="store-muted">
              In production, connect your payment provider webhooks and transactional email service (for
              example SendGrid or Resend) to deliver receipts automatically.
            </p>
            <div className="store-success-actions">
              <Link href="/shop" className="store-btn store-btn-primary">
                Keep shopping
              </Link>
              <Link href="/" className="store-btn store-btn-ghost">
                Back to home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
