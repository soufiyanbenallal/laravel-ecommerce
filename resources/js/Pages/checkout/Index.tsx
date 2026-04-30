import { Head, Link, useForm } from "@inertiajs/react"
import { Check, Info, Loader2, Lock, Tag } from "lucide-react"
import { useMemo, useState, type ReactNode } from "react"

import { Button } from "@/Components/ui/button"
import type { CheckoutCartItem, CheckoutTotals, PaymentMethodItem } from "@/types/travel"

interface CheckoutProps {
  cartItems: CheckoutCartItem[]
  paymentMethods: PaymentMethodItem[]
  totals: CheckoutTotals
}

type PaymentBehavior = "on_site" | "partial_on_site" | "stripe" | "paypal" | "custom"

interface CheckoutPaymentOption {
  id: number
  slug: string
  title: string
  description: string
  behavior: PaymentBehavior
}

function formatPrice(value: number, currency: string) {
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value)
}

function resolveBehavior(method: PaymentMethodItem): PaymentBehavior {
  const haystack = `${method.slug} ${method.title} ${method.description ?? ""}`.toLowerCase()

  if (haystack.includes("paypal")) return "paypal"
  if (haystack.includes("stripe") || haystack.includes("card") || haystack.includes("carte")) return "stripe"
  if (haystack.includes("partial") || haystack.includes("deposit") || haystack.includes("acompte")) return "partial_on_site"
  if (haystack.includes("on_site") || haystack.includes("on site") || haystack.includes("cash") || haystack.includes("arrival")) {
    return "on_site"
  }

  return "custom"
}

function FloatInput({
  label,
  type = "text",
  value,
  onChange,
  required,
}: {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  required?: boolean
}) {
  const filled = value.length > 0

  return (
    <div className="relative rounded-[5px] border border-neutral-300 bg-white transition-all duration-150 focus-within:border-neutral-900 focus-within:shadow-[0_0_0_3px_rgba(26,26,26,0.06)]">
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder=" "
        className={`w-full bg-transparent text-sm text-neutral-900 outline-none transition-all duration-150 ${filled ? "px-3 pb-1.5 pt-5" : "px-3 pb-3.5 pt-3.5"}`}
      />
      <span
        className={`pointer-events-none absolute left-3 text-neutral-500 transition-all duration-150 ${filled ? "top-1.5 text-[10px]" : "top-1/2 -translate-y-1/2 text-sm"}`}
      >
        {label}
        {required ? <span className="ml-0.5 text-red-400">*</span> : null}
      </span>
    </div>
  )
}

function PaymentRow({
  option,
  selected,
  onSelect,
  badge,
  children,
}: {
  option: CheckoutPaymentOption
  selected: boolean
  onSelect: () => void
  badge?: ReactNode
  children?: ReactNode
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onSelect}
        className={`flex w-full items-center gap-3 border-b border-neutral-100 px-4 py-3.5 text-left transition-colors duration-100 last:border-b-0 ${selected ? "bg-neutral-50" : "bg-white hover:bg-neutral-50/60"}`}
      >
        <div
          className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-150 ${selected ? "border-neutral-900" : "border-neutral-300"}`}
        >
          <div
            className={`h-2 w-2 rounded-full bg-neutral-900 transition-all duration-150 ${selected ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-neutral-900">{option.title}</p>
          <p className="mt-0.5 text-xs text-neutral-500">{option.description}</p>
        </div>

        {badge ? <div className="shrink-0">{badge}</div> : null}
      </button>

      {selected && children ? <div className="border-b border-neutral-100 bg-white px-4 py-3.5">{children}</div> : null}
    </div>
  )
}

function Breadcrumb({ step, onBack }: { step: number; onBack?: () => void }) {
  const crumbs = ["Cart", "Information", "Payment", "Confirmation"]

  return (
    <nav className="mb-7 flex flex-wrap items-center gap-1.5 text-xs text-neutral-400">
      {crumbs.map((crumb, index) => (
        <span key={crumb} className="flex items-center gap-1.5">
          {index > 0 ? <span className="text-neutral-300">&gt;</span> : null}
          <span
            className={
              index === step
                ? "font-medium text-neutral-900"
                : index < step
                  ? "cursor-pointer text-neutral-400 hover:underline"
                  : "text-neutral-300"
            }
            onClick={index < step && index === 1 && onBack ? onBack : undefined}
          >
            {crumb}
          </span>
        </span>
      ))}
    </nav>
  )
}

export default function CheckoutIndex({ cartItems, paymentMethods, totals }: CheckoutProps) {
  const checkoutMethods = useMemo<CheckoutPaymentOption[]>(() => {
    if (paymentMethods.length > 0) {
      return paymentMethods.map((method) => ({
        id: method.id,
        slug: method.slug,
        title: method.title,
        description: method.description ?? "Secure payment option",
        behavior: resolveBehavior(method),
      }))
    }

    return [
      {
        id: 1,
        slug: "on_site",
        title: "Pay on arrival",
        description: "Book now and pay at the activity location",
        behavior: "on_site",
      },
    ]
  }, [paymentMethods])

  const [step, setStep] = useState(1)
  const [newsletter, setNewsletter] = useState(false)

  const form = useForm({
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    nationality: "",
    guests: "2",
    street_address: "",
    postal_code: "",
    city: "",
    country_name: "Morocco",
    special_notes: "",
    payment_method_slug: checkoutMethods[0]?.slug ?? "",
    promo_code: "",
    terms_accepted: false,
  })
  const cartError = (form.errors as Record<string, string | undefined>).cart

  const selectedMethod = checkoutMethods.find((method) => method.slug === form.data.payment_method_slug) ?? checkoutMethods[0]
  const selectedBehavior = selectedMethod?.behavior ?? "on_site"
  const subtotal = totals.subtotal
  const discount = form.data.promo_code.trim().toUpperCase() === "MARRAKECH10" ? Math.round(subtotal * 0.1 * 100) / 100 : 0
  const total = Math.max(subtotal - discount, 0)
  const deposit = Math.round(total * 0.3 * 100) / 100
  const amountNow =
    selectedBehavior === "on_site"
      ? 0
      : selectedBehavior === "partial_on_site"
        ? deposit
        : total
  const canContinue = Boolean(
    form.data.email &&
      form.data.first_name &&
      form.data.last_name &&
      form.data.phone &&
      form.data.street_address &&
      form.data.postal_code &&
      form.data.city &&
      form.data.country_name &&
      cartItems.length > 0
  )

  const dueLabel =
    selectedBehavior === "on_site"
      ? "Due today"
      : selectedBehavior === "partial_on_site"
        ? "Deposit now"
        : "Pay now"

  const submitOrder = () => {
    form.post("/checkout")
  }

  const SummaryPanel = () => (
    <div className="border-l border-neutral-200 bg-[#fafafa] px-8 py-10 lg:px-10">
      {cartItems.length > 0 ? (
        <div className="mb-4 border-b border-neutral-100 pb-4">
          {cartItems.map((item) => (
            <div key={item.id} className="mb-3 flex items-start gap-3.5 last:mb-0">
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 shrink-0 rounded-md border border-neutral-200 object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium leading-snug text-neutral-900">{item.name}</p>
                <p className="mt-0.5 text-[12px] text-neutral-500">Qty {item.quantity}</p>
              </div>
              <p className="whitespace-nowrap text-[13px] font-medium text-neutral-900">{formatPrice(item.totalPrice, totals.currency)}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-4 rounded-[5px] border border-neutral-200 bg-white px-4 py-3 text-[13px] text-neutral-500">
          Your cart is empty. Please add at least one activity from the activities page.
        </div>
      )}

      <div className="mb-1.5 flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Discount code"
            value={form.data.promo_code}
            onChange={(event) => form.setData("promo_code", event.target.value)}
            className="h-11 w-full rounded-[5px] border border-neutral-200 bg-white pl-9 pr-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-900"
          />
        </div>
      </div>

      {discount > 0 ? (
        <p className="mb-3 flex items-center gap-1 text-xs text-emerald-600">
          <Check className="h-3 w-3" />
          Code applied - 10% off
        </p>
      ) : null}

      <div className="space-y-2.5 border-t border-neutral-200 pt-4">
        <div className="flex justify-between text-[13px]">
          <span className="text-neutral-500">Subtotal</span>
          <span className="font-medium text-neutral-900">{formatPrice(subtotal, totals.currency)}</span>
        </div>
        {discount > 0 ? (
          <div className="flex justify-between text-[13px]">
            <span className="font-medium text-emerald-600">Discount (10%)</span>
            <span className="font-medium text-emerald-600">-{formatPrice(discount, totals.currency)}</span>
          </div>
        ) : null}
        <div className="flex justify-between text-[13px]">
          <span className="text-neutral-500">Service fee</span>
          <span className="font-medium text-emerald-600">Included</span>
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between border-t border-neutral-200 pt-4">
        <span className="text-base font-semibold text-neutral-900">Total</span>
        <span className="text-2xl font-semibold text-neutral-900">{formatPrice(total, totals.currency)}</span>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-[5px] border border-neutral-200 bg-white px-4 py-3">
        <div>
          <p className="mb-0.5 text-[12px] text-neutral-500">{dueLabel}</p>
          {selectedBehavior === "partial_on_site" ? (
            <p className="text-[11px] text-neutral-400">Remaining {formatPrice(total - deposit, totals.currency)} on site</p>
          ) : null}
        </div>
        <span className={`text-lg font-semibold ${selectedBehavior === "on_site" ? "text-emerald-600" : "text-neutral-900"}`}>
          {formatPrice(amountNow, totals.currency)}
        </span>
      </div>
    </div>
  )

  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_38%]">
      <Head title="Checkout" />

      <div className="order-2 border-r border-neutral-200 bg-white px-8 py-10 sm:px-14 lg:order-1">
        <Link href="/" className="mb-7 inline-flex items-center gap-2 text-xl font-bold text-neutral-900 no-underline">
          Marrakech Evasion
        </Link>

        <Breadcrumb step={step} onBack={() => setStep(1)} />

        {step === 1 ? (
          <>
            <div className="mb-6">
              <h2 className="mb-3 text-base font-semibold text-neutral-900">Contact</h2>
              <FloatInput label="Email address" type="email" value={form.data.email} onChange={(value) => form.setData("email", value)} required />
              {form.errors.email ? <p className="mt-1.5 text-[11px] text-red-500">{form.errors.email}</p> : null}
              <p className="mt-1.5 text-[11px] text-neutral-400">Confirmation details will be sent here</p>

              <div className="mt-3 flex cursor-pointer items-center gap-2.5" onClick={() => setNewsletter((value) => !value)}>
                <div
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border-2 transition-all ${newsletter ? "border-neutral-900 bg-neutral-900" : "border-neutral-300"}`}
                >
                  {newsletter ? <Check className="h-2.5 w-2.5 text-white" /> : null}
                </div>
                <span className="text-[13px] text-neutral-700">Send me exclusive travel offers</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="mb-3 text-base font-semibold text-neutral-900">Traveler information</h2>
              <div className="mb-2.5 grid grid-cols-2 gap-2.5">
                <FloatInput label="First name" value={form.data.first_name} onChange={(value) => form.setData("first_name", value)} required />
                <FloatInput label="Last name" value={form.data.last_name} onChange={(value) => form.setData("last_name", value)} required />
              </div>
              <div className="mb-2.5">
                <FloatInput label="Phone number" type="tel" value={form.data.phone} onChange={(value) => form.setData("phone", value)} required />
              </div>
              <div className="mb-2.5 grid grid-cols-2 gap-2.5">
                <FloatInput
                  label="Street address"
                  value={form.data.street_address}
                  onChange={(value) => form.setData("street_address", value)}
                  required
                />
                <FloatInput
                  label="Postal code"
                  value={form.data.postal_code}
                  onChange={(value) => form.setData("postal_code", value)}
                  required
                />
              </div>
              <div className="mb-2.5 grid grid-cols-2 gap-2.5">
                <FloatInput label="City" value={form.data.city} onChange={(value) => form.setData("city", value)} required />
                <FloatInput
                  label="Country"
                  value={form.data.country_name}
                  onChange={(value) => form.setData("country_name", value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <FloatInput label="Nationality" value={form.data.nationality} onChange={(value) => form.setData("nationality", value)} />
                <FloatInput label="Participants" value={form.data.guests} onChange={(value) => form.setData("guests", value)} />
              </div>
            </div>

            <div className="mb-8">
              <h2 className="mb-3 text-base font-semibold text-neutral-900">
                Special requests <span className="text-sm font-normal text-neutral-400">(optional)</span>
              </h2>
              <div className="rounded-[5px] border border-neutral-300 focus-within:border-neutral-900 focus-within:shadow-[0_0_0_3px_rgba(26,26,26,0.06)]">
                <textarea
                  rows={3}
                  placeholder="Allergies, pickup area, preferred time, or any extra details"
                  value={form.data.special_notes}
                  onChange={(event) => form.setData("special_notes", event.target.value)}
                  className="w-full resize-none border-0 bg-transparent px-3 py-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
                />
              </div>
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={!canContinue}
              className="h-12 w-full rounded-[5px] bg-neutral-900 text-[15px] font-medium text-white transition-colors hover:bg-neutral-700 disabled:opacity-40"
            >
              Continue to payment
            </Button>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-5">
              {["Secure SSL checkout", "Free cancellation 24h", "Fast confirmation"].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                  <div className="h-1.5 w-1.5 rounded-full bg-neutral-500" />
                  {item}
                </div>
              ))}
            </div>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <div className="mb-6 rounded-[5px] border border-neutral-200 bg-neutral-50 px-4 py-3">
              <div className="mb-0.5 flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">Contact</span>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="cursor-pointer border-0 bg-transparent text-[12px] text-neutral-500 underline underline-offset-2 hover:text-neutral-800"
                >
                  Edit
                </button>
              </div>
              <p className="text-[13px] text-neutral-700">{form.data.email} - {form.data.first_name} {form.data.last_name} - {form.data.phone}</p>
            </div>

            <h2 className="mb-3 text-base font-semibold text-neutral-900">Payment method</h2>

            <div className="mb-5 overflow-hidden rounded-[5px] border border-neutral-200">
              {checkoutMethods.map((method) => {
                const isSelected = form.data.payment_method_slug === method.slug
                const badge =
                  method.behavior === "on_site"
                    ? <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">NO FEE</span>
                    : method.behavior === "partial_on_site"
                      ? <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[9px] font-semibold text-amber-700">30%</span>
                      : null

                return (
                  <PaymentRow
                    key={method.id}
                    option={method}
                    selected={isSelected}
                    onSelect={() => form.setData("payment_method_slug", method.slug)}
                    badge={badge}
                  >
                    {method.behavior === "on_site" ? (
                      <div className="flex gap-2.5 rounded-[5px] border border-emerald-200 bg-emerald-50 p-3">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        <p className="text-xs leading-relaxed text-emerald-800">
                          No payment today. Your reservation is held and payment is made directly at the activity.
                        </p>
                      </div>
                    ) : null}

                    {method.behavior === "partial_on_site" ? (
                      <div className="flex gap-2.5 rounded-[5px] border border-amber-200 bg-amber-50 p-3">
                        <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                        <p className="text-xs leading-relaxed text-amber-800">
                          You pay {formatPrice(deposit, totals.currency)} now and the remaining {formatPrice(total - deposit, totals.currency)} on site.
                        </p>
                      </div>
                    ) : null}
                  </PaymentRow>
                )
              })}
            </div>

            {cartError ? <p className="mb-4 text-sm text-red-500">{cartError}</p> : null}

            <div
              className="mb-5 flex cursor-pointer items-start gap-2.5 border-t border-neutral-100 py-3.5"
              onClick={() => form.setData("terms_accepted", !form.data.terms_accepted)}
            >
              <div
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border-2 transition-all ${form.data.terms_accepted ? "border-neutral-900 bg-neutral-900" : "border-neutral-300"}`}
              >
                {form.data.terms_accepted ? <Check className="h-2.5 w-2.5 text-white" /> : null}
              </div>
              <span className="text-[13px] leading-relaxed text-neutral-700">
                I agree to the terms and cancellation policy.
              </span>
            </div>
            {form.errors.terms_accepted ? <p className="mb-4 text-sm text-red-500">{form.errors.terms_accepted}</p> : null}

            <Button
              onClick={submitOrder}
              disabled={!form.data.terms_accepted || form.processing || cartItems.length === 0}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-[5px] bg-neutral-900 text-[15px] font-medium text-white transition-colors hover:bg-neutral-700 disabled:opacity-40"
            >
              {form.processing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Processing...
                </>
              ) : (
                <>
                  <Lock className="h-3.5 w-3.5" />
                  {selectedBehavior === "on_site" ? "Confirm reservation" : `Pay ${formatPrice(amountNow, totals.currency)}`}
                </>
              )}
            </Button>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="cursor-pointer border-0 bg-transparent text-[13px] text-neutral-400 transition-colors hover:text-neutral-700"
              >
                Back to information
              </button>
            </div>
          </>
        ) : null}
      </div>

      <SummaryPanel />
    </div>
  )
}
