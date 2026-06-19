import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import { useCart, cartTotal } from "@/lib/cart-store";
import { Link } from "@inertiajs/react";


export function CartDrawer() {
  const { items, isOpen, close, setQty, remove } = useCart();
  const total = cartTotal(items);

  return (
    <Sheet open={isOpen} onOpenChange={(o) => !o && close()}>
      <SheetContent className="flex w-full flex-col gap-0 bg-background p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border/60 px-6 py-5">
          <SheetTitle className="font-display text-xl">Your Bag ({items.length})</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="font-display text-2xl">Your bag is empty.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Begin somewhere. We suggest the new arrivals.
              </p>
              <Button asChild className="mt-6" onClick={close}>
                <Link href="/catalog">Explore the shop</Link>
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-border/60">
              {items.map((i) => (
                <li key={`${i.id}-${i.color}-${i.size ?? ""}`} className="flex gap-4 py-5">
                  <img
                    src={i.image}
                    alt={i.name}
                    className="h-24 w-20 flex-none rounded-sm object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <div>
                        <div className="text-sm font-medium">{i.name}</div>
                        <div className="mt-0.5 text-xs text-muted-foreground">
                          {i.color}{i.size ? ` · ${i.size}` : ""}
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
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => setQty(i.id, i.color, i.size, i.qty - 1)}
                          className="px-2 py-1 hover:bg-secondary"
                          aria-label="Decrease"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{i.qty}</span>
                        <button
                          onClick={() => setQty(i.id, i.color, i.size, i.qty + 1)}
                          className="px-2 py-1 hover:bg-secondary"
                          aria-label="Increase"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="text-sm font-medium">${i.price * i.qty}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border/60 bg-secondary/40 px-6 py-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-display text-xl">${total}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button asChild variant="outline" onClick={close}>
                <Link href="/cart">View Bag</Link>
              </Button>
              <Button asChild className="bg-foreground text-background hover:bg-foreground/90" onClick={close}>
                <Link href="/checkout">Checkout</Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
