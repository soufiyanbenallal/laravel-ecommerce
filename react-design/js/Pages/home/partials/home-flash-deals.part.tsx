import { useState, useEffect } from "react";
import { ProductCardPart } from "@/Components/shared/product-card.part";
import { ProductModelType } from "@/types/ecommerce.types";

type FlashDealsPropsType = {
  products: ProductModelType[];
};

export const HomeFlashDealsPart = ({ products }: FlashDealsPropsType) => {
  const [timeLeft, setTimeLeft] = useState(8 * 3600 + 47 * 60 + 22);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft((p) => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;

  const Digit = ({ val, label }: { val: number; label: string }) => (
    <div className="text-center">
      <div className="bg-foreground text-white font-heading font-extrabold text-2xl w-14.5 h-15.5 rounded-xl flex items-center justify-center">
        {String(val).padStart(2, "0")}
      </div>
      <div className="text-[9px] font-bold text-gray-400 mt-1.5 tracking-widest uppercase">{label}</div>
    </div>
  );

  return (
    <section className="py-22 bg-linear-to-b from-background to-[#FFF6EE]">
      <div className="max-w-[1340px] mx-auto px-7">
        {/* Header */}
        <div className="flex items-center justify-between mb-11 flex-wrap gap-6">
          <div>
            <div className="text-[11px] font-bold text-primary tracking-[0.14em] uppercase mb-2.5">Limité dans le temps</div>
            <h2 className="font-heading font-extrabold text-[clamp(1.9rem,3.5vw,2.9rem)] text-foreground flex items-center gap-3 leading-[1.1]">
              <span className="text-4xl">⚡</span> Offres Flash
            </h2>
            <p className="text-gray-500 text-sm mt-1.5">Prix écrasés — quantités limitées — profitez vite !</p>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-3.5">
            <div className="text-[13px] font-semibold text-gray-500 hidden sm:block">Se termine dans :</div>
            <div className="flex items-center gap-1.5">
              <Digit val={h} label="HRS" />
              <span className="font-heading font-extrabold text-2xl text-primary mb-4">:</span>
              <Digit val={m} label="MIN" />
              <span className="font-heading font-extrabold text-2xl text-primary mb-4">:</span>
              <Digit val={s} label="SEC" />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCardPart key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-3.5 px-13 rounded-full text-sm transition-all hover:-translate-y-0.5">
            Voir toutes les offres flash →
          </button>
        </div>
      </div>
    </section>
  );
};
