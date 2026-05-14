import type { Metadata } from "next";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import type { ProductCategory } from "@/lib/products";
import ShopCatalog from "./shop-catalog";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse all products, filter by category, sort, and search.",
};

type SearchParams = Record<string, string | string[] | undefined>;

function first(param: string | string[] | undefined) {
  if (Array.isArray(param)) return param[0];
  return param;
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const sp = (await searchParams) ?? {};
  const cat = first(sp.category) as ProductCategory | "all" | undefined;
  const initialCategory =
    cat &&
    ["audio", "wearables", "home", "accessories", "office", "all"].includes(
      cat,
    )
      ? cat
      : "all";
  const initialSort = first(sp.sort) ?? "featured";
  const initialQuery = first(sp.q) ?? "";

  return (
    <>
      <SiteHeader />
      <ShopCatalog
        initialCategory={initialCategory}
        initialSort={initialSort}
        initialQuery={initialQuery}
      />
      <SiteFooter />
    </>
  );
}
