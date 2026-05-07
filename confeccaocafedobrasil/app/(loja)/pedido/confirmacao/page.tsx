import type { Metadata } from 'next'
import { OrderConfirmation } from '@/components/checkout/order-confirmation'

export const metadata: Metadata = {
  title: 'Pedido confirmado — Confecção Café do Brasil',
  description: 'Seu pedido foi recebido! Obrigado por comprar conosco.',
  robots: { index: false, follow: false },
}

export default function OrderConfirmationPage() {
  return <OrderConfirmation />
}
