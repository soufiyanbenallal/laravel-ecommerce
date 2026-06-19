import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import catWomen from "@/assets/cat-women.jpg";
import catMen from "@/assets/cat-men.jpg";
import catShoes from "@/assets/cat-shoes.jpg";

type Group = {
  label: string;
  feature: { title: string; href: string; image: string };
  columns: { heading: string; links: { label: string; to: string; params?: Record<string, string> }[] }[];
};

export const megaMenus: Record<string, Group> = {
  Women: {
    label: "Women",
    feature: { title: "Autumn — Volume 07", href: "/collection/autumn-volume-07", image: catWomen },
    columns: [
      {
        heading: "Clothing",
        links: [
          { label: "Coats & Jackets", to: "/category/$slug", params: { slug: "apparel" } },
          { label: "Knitwear", to: "/category/$slug", params: { slug: "apparel" } },
          { label: "Shirts & Blouses", to: "/category/$slug", params: { slug: "apparel" } },
          { label: "Trousers", to: "/category/$slug", params: { slug: "apparel" } },
        ],
      },
      {
        heading: "Shoes & Bags",
        links: [
          { label: "Boots", to: "/category/$slug", params: { slug: "footwear" } },
          { label: "Loafers", to: "/category/$slug", params: { slug: "footwear" } },
          { label: "Totes", to: "/category/$slug", params: { slug: "bags" } },
          { label: "Crossbody", to: "/category/$slug", params: { slug: "bags" } },
        ],
      },
      {
        heading: "Discover",
        links: [
          { label: "New Arrivals", to: "/shop" },
          { label: "Bestsellers", to: "/shop" },
          { label: "The Edit", to: "/collections" },
          { label: "Sale", to: "/shop" },
        ],
      },
    ],
  },
  Men: {
    label: "Men",
    feature: { title: "The Tailoring Edit", href: "/collection/everyday-essentials", image: catMen },
    columns: [
      {
        heading: "Clothing",
        links: [
          { label: "Overcoats", to: "/category/$slug", params: { slug: "apparel" } },
          { label: "Shirts", to: "/category/$slug", params: { slug: "apparel" } },
          { label: "Trousers", to: "/category/$slug", params: { slug: "apparel" } },
          { label: "Tees & Sweats", to: "/category/$slug", params: { slug: "apparel" } },
        ],
      },
      {
        heading: "Shoes & Bags",
        links: [
          { label: "Loafers", to: "/category/$slug", params: { slug: "footwear" } },
          { label: "Boots", to: "/category/$slug", params: { slug: "footwear" } },
          { label: "Briefcases", to: "/category/$slug", params: { slug: "bags" } },
          { label: "Wallets", to: "/category/$slug", params: { slug: "accessories" } },
        ],
      },
      {
        heading: "Discover",
        links: [
          { label: "New Arrivals", to: "/shop" },
          { label: "Bestsellers", to: "/shop" },
          { label: "The Edit", to: "/collections" },
          { label: "Sale", to: "/shop" },
        ],
      },
    ],
  },
  Shoes: {
    label: "Shoes",
    feature: { title: "Built to be resoled", href: "/category/footwear", image: catShoes },
    columns: [
      {
        heading: "Silhouettes",
        links: [
          { label: "Loafers", to: "/category/$slug", params: { slug: "footwear" } },
          { label: "Chelsea Boots", to: "/category/$slug", params: { slug: "footwear" } },
          { label: "Derbies", to: "/category/$slug", params: { slug: "footwear" } },
          { label: "Sneakers", to: "/category/$slug", params: { slug: "footwear" } },
        ],
      },
      {
        heading: "Materials",
        links: [
          { label: "Box Calf", to: "/category/$slug", params: { slug: "footwear" } },
          { label: "Suede", to: "/category/$slug", params: { slug: "footwear" } },
          { label: "Cordovan", to: "/category/$slug", params: { slug: "footwear" } },
        ],
      },
      {
        heading: "Care",
        links: [
          { label: "Shoe Trees", to: "/category/$slug", params: { slug: "accessories" } },
          { label: "Polish", to: "/category/$slug", params: { slug: "accessories" } },
          { label: "Resoling Service", to: "/about" },
        ],
      },
    ],
  },
};

export function MegaMenuPanel({ group }: { group: Group }) {
  return (
    <div className="absolute left-0 right-0 top-full z-50 border-b border-border/60 bg-background shadow-[0_20px_40px_-30px_rgba(0,0,0,0.25)]">
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-10 px-6 py-10">
        <div className="col-span-5">
          <Link to={group.feature.href} className="group block overflow-hidden bg-secondary">
            <img
              src={group.feature.image}
              alt={group.feature.title}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </Link>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Featured</div>
              <div className="mt-1 font-display text-xl">{group.feature.title}</div>
            </div>
            <Link to={group.feature.href} className="inline-flex items-center gap-2 text-sm text-accent hover:underline">
              Shop <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="col-span-7 grid grid-cols-3 gap-8">
          {group.columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {col.heading}
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.params ? (
                      <Link to={l.to} params={l.params as never} className="text-foreground/80 transition-colors hover:text-accent">
                        {l.label}
                      </Link>
                    ) : (
                      <Link to={l.to} className="text-foreground/80 transition-colors hover:text-accent">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
