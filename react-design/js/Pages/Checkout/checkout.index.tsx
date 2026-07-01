import { useState } from "react";
import { Check, Lock, ShieldCheck, Truck } from "lucide-react";
import { useCart, cartTotal } from "@/lib/cart-store";
import { toast } from "sonner";
import { Link } from "@inertiajs/react";


const steps = ["Contact", "Shipping", "Payment"] as const;

export default function Checkout() {
  const { items, clear } = useCart();
  const subtotal = cartTotal(items);
  const shipping = subtotal > 250 || subtotal === 0 ? 0 : 18;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  if (items.length === 0 && !done) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl">Your bag is empty.</h1>
        <Link to="/shop" className="mt-6 inline-block bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-accent">
          Browse the shop
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Check className="h-7 w-7" strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 font-display text-5xl">Thank you.</h1>
        <p className="mt-3 text-muted-foreground">
          Order <span className="font-medium text-foreground">#AN-{Math.floor(Math.random() * 90000 + 10000)}</span> confirmed. A note is on its way to your inbox.
        </p>
        <Link to="/shop" className="mt-10 inline-block bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-accent">
          Continue browsing
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl md:px-6 px-2 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">Checkout</h1>
        <Link to="/cart" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
          ← Back to bag
        </Link>
      </div>

      {/* Stepper */}
      <ol className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.18em]">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-3">
            <span
              className={
                "flex h-6 w-6 items-center justify-center rounded-full border " +
                (i <= step ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground")
              }
            >
              {i + 1}
            </span>
            <span className={i <= step ? "text-foreground" : "text-muted-foreground"}>{s}</span>
            {i < steps.length - 1 && <span className="ml-3 h-px w-10 bg-border" />}
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-12 lg:grid-cols-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (step < 2) {
              setStep(step + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              toast.success("Order placed");
              clear();
              setDone(true);
            }
          }}
          className="space-y-8 lg:col-span-2"
        >
          {step === 0 && (
            <Section title="Contact information">
              <Field label="Email"><input type="email" required placeholder="you@example.com" className={inputCls} /></Field>
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-foreground" />
                Email me with news and offers
              </label>
            </Section>
          )}

          {step === 1 && (
            <Section title="Shipping address">
              <div className="grid grid-cols-2 gap-4">
                <Field label="First name"><input required className={inputCls} /></Field>
                <Field label="Last name"><input required className={inputCls} /></Field>
              </div>
              <Field label="Address"><input required className={inputCls} /></Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="City"><input required className={inputCls} /></Field>
                <Field label="Postal code"><input required className={inputCls} /></Field>
              </div>
              <Field label="Country">
                <select className={inputCls} defaultValue="US">
                  <option>United States</option><option>United Kingdom</option><option>France</option><option>Japan</option>
                </select>
              </Field>

              <div className="space-y-2 pt-4">
                <div className="text-sm font-medium">Delivery method</div>
                {[
                  { name: "Standard", days: "3–5 business days", price: shipping },
                  { name: "Express", days: "1–2 business days", price: 28 },
                ].map((m, i) => (
                  <label key={m.name} className="flex cursor-pointer items-center justify-between border border-border p-4">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="ship" defaultChecked={i === 0} className="h-4 w-4 accent-foreground" />
                      <div>
                        <div className="text-sm font-medium">{m.name}</div>
                        <div className="text-xs text-muted-foreground">{m.days}</div>
                      </div>
                    </div>
                    <div className="text-sm tabular-nums">{m.price === 0 ? "Free" : `$${m.price}`}</div>
                  </label>
                ))}
              </div>
            </Section>
          )}

          {step === 2 && (
            <Section title="Payment">
              <p className="text-xs text-muted-foreground inline-flex items-center gap-2">
                <Lock className="h-3.5 w-3.5" /> All transactions are encrypted and secure.
              </p>
              <Field label="Card number"><input required placeholder="1234 1234 1234 1234" className={inputCls} /></Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Expiry"><input required placeholder="MM / YY" className={inputCls} /></Field>
                <Field label="CVC"><input required placeholder="123" className={inputCls} /></Field>
              </div>
              <Field label="Name on card"><input required className={inputCls} /></Field>
            </Section>
          )}

          <div className="flex items-center justify-between pt-4">
            {step > 0 ? (
              <button type="button" onClick={() => setStep(step - 1)} className="text-sm underline-offset-4 hover:underline">
                ← Back
              </button>
            ) : <span />}
            <button type="submit" className="bg-foreground px-8 py-4 text-sm font-medium tracking-wide text-background hover:bg-accent">
              {step < 2 ? "Continue" : `Place order — $${total}`}
            </button>
          </div>
        </form>

        <aside className="h-fit border border-border/60 bg-secondary/40 p-6">
          <h2 className="font-display text-xl">Order summary</h2>
          <ul className="mt-5 divide-y divide-border/60">
            {items.map((i) => (
              <li key={`${i.id}-${i.color}-${i.size ?? ""}`} className="flex gap-3 py-4">
                <img src={i.image} alt={i.name} className="h-16 w-14 flex-none object-cover" />
                <div className="flex-1 text-sm">
                  <div>{i.name}</div>
                  <div className="text-xs text-muted-foreground">{i.color}{i.size ? ` · ${i.size}` : ""} · ×{i.qty}</div>
                </div>
                <div className="text-sm tabular-nums">${i.price * i.qty}</div>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-border/60 pt-4 text-sm">
            <Row k="Subtotal" v={`$${subtotal}`} />
            <Row k="Shipping" v={shipping === 0 ? "Free" : `$${shipping}`} />
            <Row k="Tax" v={`$${tax}`} />
            <div className="flex justify-between border-t border-border/60 pt-3 text-base">
              <dt>Total</dt>
              <dd className="font-display text-xl">${total}</dd>
            </div>
          </dl>
          <div className="mt-6 space-y-2 text-xs text-muted-foreground">
            <p className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5" /> Buyer protection guaranteed</p>
            <p className="flex items-center gap-2"><Truck className="h-3.5 w-3.5" /> Carbon-neutral delivery</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

const inputCls = "h-11 w-full border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-foreground";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-2xl">{title}</h2>
      {children}
    </section>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="tabular-nums">{v}</dd>
    </div>
  );
}
