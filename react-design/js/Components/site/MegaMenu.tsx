import { Link } from "@inertiajs/react";
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
          { label: "New Arrivals", to: "/catalog" },
          { label: "Bestsellers", to: "/catalog" },
          { label: "The Edit", to: "/collections" },
          { label: "Sale", to: "/catalog" },
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
          { label: "New Arrivals", to: "/catalog" },
          { label: "Bestsellers", to: "/catalog" },
          { label: "The Edit", to: "/collections" },
          { label: "Sale", to: "/catalog" },
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
    <div className="absolute left-0 right-0 top-full z-50 border-b border-border/50 bg-background/95 backdrop-blur-xl shadow-[0_24px_48px_-20px_rgba(28,25,23,0.18)]">
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-10 px-6 py-10">
        {/* Feature image */}
        <div className="col-span-5">
          <Link href={group.feature.href} className="group block overflow-hidden bg-secondary cursor-pointer">
            <img
              src={group.feature.image}
              alt={group.feature.title}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </Link>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.26em] text-accent">Featured</div>
              <div className="mt-1 font-display text-xl font-light">{group.feature.title}</div>
            </div>
            <Link
              href={group.feature.href}
              className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.16em] text-foreground/60 hover:text-accent transition-colors duration-200"
            >
              Shop <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Link columns */}
        <div className="col-span-7 grid grid-cols-3 gap-8">
          {group.columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                {col.heading}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => {
                  const href = l.params ? l.to.replace("$slug", l.params.slug) : l.to;
                  return (
                    <li key={l.label}>
                      <Link
                        href={href}
                        className="text-[13px] font-light text-foreground/70 transition-colors duration-200 hover:text-accent"
                      >
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
