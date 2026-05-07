import type { Metadata } from 'next'
import { CheckoutFlow } from '@/components/checkout/checkout-flow'

export const metadata: Metadata = {
  title: 'Checkout — Confecção Café do Brasil',
  description: 'Finalize sua compra',
  robots: { index: false, follow: false },
}

export default function CheckoutPage() {
  return <CheckoutFlow />
}
