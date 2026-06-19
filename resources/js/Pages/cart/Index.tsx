import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { useCart, cartTotal } from "@/lib/cart-store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — Atelier Nord" },
      { name: "description", content: "Review the objects in your bag." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove } = useCart();
  const subtotal = cartTotal(items);
  const shipping = subtotal > 250 || subtotal === 0 ? 0 : 18;

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Bag</p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl">Your selection</h1>

      {items.length === 0 ? (
        <div className="mt-20 flex flex-col items-center text-center">
          <p className="font-display text-3xl">There is nothing here yet.</p>
          <p className="mt-3 max-w-md text-muted-foreground">
            Start with something small — a pair of napkins, a vase. The catalogue is short and considered.
          </p>
          <Link
            to="/shop"
            className="mt-8 bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-accent"
          >
            Browse the shop
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-16 lg:grid-cols-3">
          <ul className="divide-y divide-border/60 lg:col-span-2">
            {items.map((i) => (
              <li key={`${i.id}-${i.color}-${i.size ?? ""}`} className="flex gap-6 py-6">
                <img src={i.image} alt={i.name} className="h-36 w-28 flex-none object-cover" />
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link to="/product/$id" params={{ id: i.id }} className="font-display text-xl hover:text-accent">
                        {i.name}
                      </Link>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {i.color}{i.size ? ` · Size ${i.size}` : ""}
                      </div>
                    </div>
                    <button
                      onClick={() => remove(i.id, i.color, i.size)}
                      aria-label="Remove"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center border border-border">
                      <button onClick={() => setQty(i.id, i.color, i.size, i.qty - 1)} className="p-2 hover:bg-secondary">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-10 text-center text-sm">{i.qty}</span>
                      <button onClick={() => setQty(i.id, i.color, i.size, i.qty + 1)} className="p-2 hover:bg-secondary">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="font-display text-xl">${i.price * i.qty}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit border border-border/60 bg-secondary/40 p-8">
            <h2 className="font-display text-2xl">Order summary</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="tabular-nums">${subtotal}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="tabular-nums">{shipping === 0 ? "Free" : `$${shipping}`}</dd>
              </div>
              <div className="flex justify-between border-t border-border/60 pt-4 text-base">
                <dt>Total</dt>
                <dd className="font-display text-xl">${subtotal + shipping}</dd>
              </div>
            </dl>
            <Link to="/checkout" className="mt-8 block w-full bg-foreground py-4 text-center text-sm font-medium text-background hover:bg-accent">
              Proceed to checkout
            </Link>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Secure checkout · Duties included to most regions
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
