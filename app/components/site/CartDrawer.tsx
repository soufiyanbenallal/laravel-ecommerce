import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { Link } from "react-router";
import { CartForm, Image, Money, useOptimisticCart } from "@shopify/hydrogen";

type CartDrawerPropsType = {
  cart: any; // Shopify Cart API query result
};

export function CartDrawer({ cart: originalCart }: CartDrawerPropsType) {
  const { isOpen, close } = useCart();
  const cart = useOptimisticCart(originalCart);
  const lines = cart?.lines?.nodes ?? [];
  const totalQuantity = cart?.totalQuantity ?? 0;

  // Group line items children map (e.g. for bundles, if any)
  const childrenMap: Record<string, any[]> = {};
  for (const line of lines) {
    if (line.parentRelationship?.parent) {
      const parentId = line.parentRelationship.parent.id;
      if (!childrenMap[parentId]) childrenMap[parentId] = [];
      childrenMap[parentId].push(line);
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={(o) => !o && close()}>
      <SheetContent className="flex w-full flex-col gap-0 bg-background p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border/60 px-6 py-5">
          <SheetTitle className="font-display text-xl">Your Bag ({totalQuantity})</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="font-display text-2xl">Your bag is empty.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Begin somewhere. We suggest the new arrivals.
              </p>
              <Button asChild className="mt-6" onClick={close}>
                <Link to="/catalog">Explore the shop</Link>
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-border/60">
              {lines.map((line: any) => {
                // Skip rendering nested child lines at root
                if (line.parentRelationship?.parent) {
                  return null;
                }

                const { id, quantity, merchandise, cost, isOptimistic } = line;
                const { product, image, selectedOptions } = merchandise;
                const optionsString = selectedOptions
                  ?.map((o: any) => o.value)
                  .join(" · ");

                const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
                const nextQuantity = Number((quantity + 1).toFixed(0));

                return (
                  <li key={id} className="flex gap-4 py-5">
                    {image && (
                      <Image
                        data={image}
                        aspectRatio="4/5"
                        width={80}
                        height={100}
                        alt={product.title}
                        className="h-24 w-20 flex-none rounded-sm object-cover bg-secondary"
                      />
                    )}
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <div>
                          <Link
                            to={`/products/${product.handle}`}
                            onClick={close}
                            className="text-sm font-medium hover:text-accent transition-colors"
                          >
                            {product.title}
                          </Link>
                          {optionsString && (
                            <div className="mt-0.5 text-xs text-muted-foreground">
                              {optionsString}
                            </div>
                          )}
                        </div>
                        
                        {/* Remove item button */}
                        <CartForm
                          route="/cart"
                          action={CartForm.ACTIONS.LinesRemove}
                          inputs={{ lineIds: [id] }}
                        >
                          <button
                            type="submit"
                            disabled={!!isOptimistic}
                            aria-label="Remove"
                            className="text-muted-foreground hover:text-foreground cursor-pointer disabled:opacity-50"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </CartForm>
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        {/* Quantity updates */}
                        <div className="flex items-center border border-border">
                          <CartForm
                            route="/cart"
                            action={CartForm.ACTIONS.LinesUpdate}
                            inputs={{ lines: [{ id, quantity: prevQuantity }] }}
                          >
                            <button
                              type="submit"
                              disabled={quantity <= 1 || !!isOptimistic}
                              className="px-2 py-1 hover:bg-secondary cursor-pointer disabled:opacity-30"
                              aria-label="Decrease"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                          </CartForm>

                          <span className="w-8 text-center text-sm">{quantity}</span>

                          <CartForm
                            route="/cart"
                            action={CartForm.ACTIONS.LinesUpdate}
                            inputs={{ lines: [{ id, quantity: nextQuantity }] }}
                          >
                            <button
                              type="submit"
                              disabled={!!isOptimistic}
                              className="px-2 py-1 hover:bg-secondary cursor-pointer disabled:opacity-30"
                              aria-label="Increase"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </CartForm>
                        </div>

                        {/* Price */}
                        <div className="text-sm font-medium">
                          {cost?.totalAmount ? (
                            <Money data={cost.totalAmount} />
                          ) : (
                            "-"
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-border/60 bg-secondary/40 px-6 py-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-display text-xl">
                {cart?.cost?.subtotalAmount ? (
                  <Money data={cart.cost.subtotalAmount} />
                ) : (
                  "-"
                )}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button asChild variant="outline" onClick={close}>
                <Link to="/cart">View Bag</Link>
              </Button>
              {cart?.checkoutUrl ? (
                <Button asChild className="bg-foreground text-background hover:bg-foreground/90" onClick={close}>
                  <a href={cart.checkoutUrl} target="_self">Checkout</a>
                </Button>
              ) : (
                <Button disabled className="bg-foreground text-background opacity-55">
                  Checkout
                </Button>
              )}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
