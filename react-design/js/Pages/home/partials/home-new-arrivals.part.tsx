import { useState } from "react";
import { ProductCardPart } from "@/Components/shared/product-card.part";
import { ProductModelType } from "@/types/ecommerce.types";
import { Link } from "@inertiajs/react";

type NewArrivalsPropsType = {
  products: ProductModelType[];
};

const TABS = ["Tous", "Smartphones", "Maison", "Auto", "Gaming", "Mode", "Sport"];

export const HomeNewArrivalsPart = ({ products }: NewArrivalsPropsType) => {
  const [activeTab, setActiveTab] = useState("Tous");

  return (
    <section className="py-22 bg-background">
      <div className="max-w-[1340px] mx-auto px-7">
        <div className="flex items-end justify-between mb-7 flex-wrap gap-5">
          <div>
            <div className="text-[11px] font-bold text-primary tracking-[0.14em] uppercase mb-2.5">Nouveautés</div>
            <h2 className="font-heading font-extrabold text-[clamp(1.9rem,3.5vw,2.9rem)] text-foreground leading-[1.12]">
              Derniers <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">Arrivages</span>
            </h2>
          </div>
          <Link href="/nouveautes" className="no-underline text-primary font-bold text-sm hover:translate-x-1 transition-transform">
            Tout voir →
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-9 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4.5 py-2 rounded-full text-[13px] font-semibold cursor-pointer border-2 font-sans transition-all duration-200 ${
                activeTab === tab
                  ? "border-primary bg-primary text-white"
                  : "border-black/5 bg-transparent text-gray-500 hover:border-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4.5">
          {products.map((product) => (
            <ProductCardPart key={product.id} product={product} variant="minimal" />
          ))}
        </div>
      </div>
    </section>
  );
};
