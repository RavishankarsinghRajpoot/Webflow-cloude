"use client";

import { Section, Block, Link } from "@/devlink/_Builtin";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <Section
        tag="section"
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1rem",
        }}
      >
        <Block tag="div" className="container">
          <Block
            tag="div"
            className="hero-split"
            style={{
              textAlign: "center",
              maxWidth: "760px",
              margin: "0 auto",
            }}
          >
            <p className="af-kicker">The bank of the future.</p>
            <h1
              className="margin-bottom-24px"
              style={{
                fontSize: "2.5rem",
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              Embrace a new era of financial management.
            </h1>
            <Block tag="p" className="margin-bottom-24px">
              Smart budgeting, seamless integration, and personalized insights
              in one clean dashboard.
            </Block>
            <div style={{ marginTop: "12px", display: "flex", gap: "12px", justifyContent: "center" }}>
              <Link
                button={true}
                options={{
                  href: "https://developers.webflow.com/webflow-cloud/getting-started",
                }}
                className="button-primary"
                style={{
                  borderRadius: "8px",
                  background: "#146ef5",
                  color: "#ffffff",
                  padding: "0.75rem 1.2rem",
                }}
              >
                Get started
              </Link>
              <a href="#" className="af-secondary-btn">
                Learn more
              </a>
            </div>
          </Block>
        </Block>
      </Section>
      <SiteFooter />
    </>
  );
}
