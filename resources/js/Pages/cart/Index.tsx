import { Head, Link, router } from "@inertiajs/react"

import { Button } from "@/Components/ui/button"
import type { CheckoutCartItem, CheckoutTotals } from "@/types/travel"

interface CartIndexProps {
  cartItems: CheckoutCartItem[]
  totals: CheckoutTotals
}

function formatPrice(value: number, currency: string) {
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value)
}

export default function CartIndex({ cartItems, totals }: CartIndexProps) {
  const updateQty = (productId: number, quantity: number) => {
    router.patch(`/cart/items/${productId}`, { quantity })
  }

  const removeItem = (productId: number) => {
    router.delete(`/cart/items/${productId}`)
  }

  return (
    <>
      <Head title="Your cart" />

      <div className="min-h-screen bg-stone-50 px-6 py-10 text-stone-900 lg:px-10">
       
      </div>
    </>
  )
}
