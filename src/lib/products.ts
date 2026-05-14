export type ProductCategory =
  | "audio"
  | "wearables"
  | "home"
  | "accessories"
  | "office";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  categoryLabel: string;
  images: string[];
  rating: number;
  reviewCount: number;
  specs: { label: string; value: string }[];
  colors: string[];
  sizes: string[];
  featured: boolean;
  trending: boolean;
  bestseller: boolean;
};

export const products: Product[] = [
  {
    id: "p1",
    slug: "aurora-studio-headphones",
    name: "Aurora Studio Headphones",
    description: "Noise-cancelling over-ear headphones tuned for clarity.",
    longDescription:
      "Aurora Studio delivers a wide soundstage, adaptive noise cancellation, and 40 hours of playback. Memory-foam ear cushions and a fold-flat design make travel effortless.",
    price: 249,
    compareAtPrice: 299,
    category: "audio",
    categoryLabel: "Audio",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&h=900&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=900&h=900&fit=crop",
    ],
    rating: 4.8,
    reviewCount: 214,
    specs: [
      { label: "Driver", value: "40mm dynamic" },
      { label: "ANC", value: "Hybrid adaptive" },
      { label: "Battery", value: "40 hours (ANC on)" },
      { label: "Weight", value: "265g" },
    ],
    colors: ["Midnight", "Silver", "Sand"],
    sizes: ["One size"],
    featured: true,
    trending: true,
    bestseller: true,
  },
  {
    id: "p2",
    slug: "pulse-smartwatch",
    name: "Pulse Smartwatch",
    description: "Health tracking, GPS, and a week of battery life.",
    longDescription:
      "Pulse tracks heart rate, sleep, and workouts with precision. Water-resistant to 50m, always-on display, and seamless notifications from your phone.",
    price: 189,
    category: "wearables",
    categoryLabel: "Wearables",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&h=900&fit=crop",
      "https://images.unsplash.com/photo-1434493789847-2f02dc06ca35?w=900&h=900&fit=crop",
    ],
    rating: 4.6,
    reviewCount: 532,
    specs: [
      { label: "Display", value: "1.4\" AMOLED" },
      { label: "GPS", value: "Multi-band" },
      { label: "Battery", value: "7 days typical" },
      { label: "Water rating", value: "5 ATM" },
    ],
    colors: ["Graphite", "Rose", "Arctic"],
    sizes: ["40mm", "44mm"],
    featured: true,
    trending: true,
    bestseller: true,
  },
  {
    id: "p3",
    slug: "lumen-desk-lamp",
    name: "Lumen Desk Lamp",
    description: "Warm-to-cool LED with wireless charging base.",
    longDescription:
      "Lumen blends minimal design with practical lighting presets. The base charges compatible phones at 15W while you work.",
    price: 129,
    compareAtPrice: 149,
    category: "office",
    categoryLabel: "Office",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900&h=900&fit=crop",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=900&h=900&fit=crop",
    ],
    rating: 4.5,
    reviewCount: 128,
    specs: [
      { label: "Brightness", value: "800 lumens" },
      { label: "CCT", value: "2700K–6500K" },
      { label: "Wireless charge", value: "Qi 15W" },
      { label: "Materials", value: "Aluminum, glass" },
    ],
    colors: ["Matte black", "White"],
    sizes: ["Standard"],
    featured: true,
    trending: false,
    bestseller: true,
  },
  {
    id: "p4",
    slug: "orbit-travel-backpack",
    name: "Orbit Travel Backpack",
    description: "Weather-sealed carry-on with laptop sleeve.",
    longDescription:
      "Orbit keeps gear dry with sealed zippers and a recycled shell. Dedicated 16\" laptop pocket, luggage pass-through, and expandable volume.",
    price: 159,
    category: "accessories",
    categoryLabel: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&h=900&fit=crop",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=900&h=900&fit=crop",
    ],
    rating: 4.7,
    reviewCount: 301,
    specs: [
      { label: "Capacity", value: "28L (expandable to 34L)" },
      { label: "Laptop", value: "Up to 16\"" },
      { label: "Shell", value: "Recycled ripstop" },
      { label: "Weight", value: "1.1kg" },
    ],
    colors: ["Slate", "Olive"],
    sizes: ["One size"],
    featured: false,
    trending: true,
    bestseller: true,
  },
  {
    id: "p5",
    slug: "ember-smart-mug",
    name: "Ember Smart Mug",
    description: "Keeps coffee at your ideal temperature for 90 minutes.",
    longDescription:
      "Set your preferred temperature in the companion app. Auto sleep when empty and a ceramic-coated interior preserve flavor.",
    price: 99,
    category: "home",
    categoryLabel: "Home",
    images: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900&h=900&fit=crop",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&h=900&fit=crop",
    ],
    rating: 4.3,
    reviewCount: 89,
    specs: [
      { label: "Volume", value: "10 oz" },
      { label: "Temp range", value: "120°F–145°F" },
      { label: "Battery", value: "90 min unplugged" },
      { label: "Dishwasher", value: "Lid only" },
    ],
    colors: ["Black", "White", "Copper"],
    sizes: ["10 oz", "14 oz"],
    featured: true,
    trending: true,
    bestseller: false,
  },
  {
    id: "p6",
    slug: "vertex-mechanical-keyboard",
    name: "Vertex Mechanical Keyboard",
    description: "Hot-swap switches, gasket mount, RGB optional.",
    longDescription:
      "Vertex is tuned for a soft typing feel with factory-lubed stabilizers. Bluetooth and USB-C, three device slots, and Mac/Windows keycaps included.",
    price: 179,
    category: "office",
    categoryLabel: "Office",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&h=900&fit=crop",
      "https://images.unsplash.com/photo-1618384887929-f16e1379c1b3?w=900&h=900&fit=crop",
    ],
    rating: 4.9,
    reviewCount: 672,
    specs: [
      { label: "Layout", value: "75% compact" },
      { label: "Switches", value: "Hot-swap MX" },
      { label: "Connectivity", value: "BT 5.1 / USB-C" },
      { label: "Battery", value: "4000mAh" },
    ],
    colors: ["Graphite", "Ivory"],
    sizes: ["One size"],
    featured: false,
    trending: true,
    bestseller: true,
  },
  {
    id: "p7",
    slug: "nimbus-air-purifier",
    name: "Nimbus Air Purifier",
    description: "HEPA H13 for rooms up to 400 sq ft.",
    longDescription:
      "Nimbus runs whisper-quiet on low speeds and includes a real-time air quality ring. Filter life reminders in the app.",
    price: 219,
    category: "home",
    categoryLabel: "Home",
    images: [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=900&h=900&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=900&fit=crop",
    ],
    rating: 4.4,
    reviewCount: 156,
    specs: [
      { label: "CADR", value: "220 CFM" },
      { label: "Filter", value: "HEPA H13 + carbon" },
      { label: "Noise", value: "24–48 dB" },
      { label: "Coverage", value: "Up to 400 sq ft" },
    ],
    colors: ["White", "Charcoal"],
    sizes: ["One size"],
    featured: false,
    trending: false,
    bestseller: false,
  },
  {
    id: "p8",
    slug: "stride-running-shoes",
    name: "Stride Running Shoes",
    description: "Responsive foam and breathable mesh upper.",
    longDescription:
      "Stride balances cushion and energy return for daily miles. Reflective details and a durable outsole grip wet pavement.",
    price: 139,
    compareAtPrice: 159,
    category: "accessories",
    categoryLabel: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&h=900&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=900&h=900&fit=crop",
    ],
    rating: 4.6,
    reviewCount: 903,
    specs: [
      { label: "Drop", value: "8mm" },
      { label: "Weight", value: "265g (men's 9)" },
      { label: "Upper", value: "Engineered mesh" },
      { label: "Midsole", value: "EVA blend" },
    ],
    colors: ["Black/White", "Navy", "Coral"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    featured: true,
    trending: true,
    bestseller: true,
  },
];

export const categoryOptions: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "All categories" },
  { value: "audio", label: "Audio" },
  { value: "wearables", label: "Wearables" },
  { value: "home", label: "Home" },
  { value: "accessories", label: "Accessories" },
  { value: "office", label: "Office" },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(slug: string, limit = 4): Product[] {
  const current = getProductBySlug(slug);
  if (!current) return products.slice(0, limit);
  return products.filter((p) => p.slug !== slug && p.category === current.category).slice(0, limit);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getTrendingProducts(): Product[] {
  return products.filter((p) => p.trending || p.bestseller).slice(0, 4);
}
