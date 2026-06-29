import { CollectionModelType } from "@/types/ecommerce.types";

type CollectionsSectionPropsType = {
  collections: CollectionModelType[];
};

export const HomeCollectionsPart = ({ collections }: CollectionsSectionPropsType) => {
  if (!collections || collections.length < 4) return null;

  return (
    <section className="py-22 bg-background">
      <div className="max-w-[1340px] mx-auto px-7">
        <div className="text-center mb-10">
          <div className="text-[11px] font-bold text-primary tracking-[0.14em] uppercase mb-2.5">Collections Exclusives</div>
          <h2 className="font-heading font-extrabold text-[clamp(1.9rem,3.5vw,2.9rem)] text-foreground leading-[1.12]">
            Nos <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">Collections</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] lg:grid-rows-[290px_290px] gap-4">
          {/* Large Card */}
          <div className="relative group bg-white rounded-4xl overflow-hidden border-1.5 border-black/5 p-8 flex flex-col justify-end lg:row-span-2 transition-all hover:scale-[1.01] hover:shadow-2xl">
            <div className="text-7xl mb-auto mt-7 leading-none group-hover:scale-110 transition-transform duration-500">{collections[0].metadata?.emoji || "⚡"}</div>
            
            <div className="relative z-10">
              <div className="text-[11px] font-bold text-primary tracking-[0.1em] mb-2">{collections[0].products_count} produits</div>
              <h3 className="font-heading font-extrabold text-3xl text-foreground mb-1.5 leading-tight">{collections[0].name}</h3>
              <p className="text-gray-500 text-sm mb-6 max-w-[300px]">{collections[0].description}</p>
              <button className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6.5 rounded-full text-[13px] transition-all">
                Explorer →
              </button>
            </div>
            
            {/* Decor */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Right Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {collections.slice(1, 4).map((c, i) => (
              <div 
                key={c.id} 
                className={`relative group bg-white rounded-3xl overflow-hidden border-1.5 border-black/5 p-6 flex flex-col justify-between transition-all hover:scale-[1.02] hover:shadow-xl ${i === 2 ? "sm:col-span-2" : ""}`}
              >
                <div className="text-[42px] group-hover:rotate-12 transition-transform">{c.metadata?.emoji || "🏡"}</div>
                <div>
                  <div className="text-[11px] font-bold text-primary tracking-[0.1em] mb-1.5">{c.products_count} produits</div>
                  <h3 className={`font-heading font-extrabold text-foreground mb-1 ${i === 2 ? "text-2xl" : "text-xl"}`}>{c.name}</h3>
                  <p className="text-gray-500 text-[13px]">{c.description}</p>
                </div>
                {/* Decor */}
                <div className="absolute inset-0 bg-linear-to-br from-gray-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
