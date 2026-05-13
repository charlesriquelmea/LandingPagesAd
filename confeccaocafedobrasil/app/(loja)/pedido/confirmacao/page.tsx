import { Suspense } from 'react'
import type { Metadata } from 'next'
import { OrderConfirmation } from '@/components/checkout/order-confirmation'

export const metadata: Metadata = {
  title: 'Pedido confirmado — Confecção Café do Brasil',
  description: 'Seu pedido foi recebido! Obrigado por comprar conosco.',
  robots: { index: false, follow: false },
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7F3EE] pt-24 text-center font-sans text-[#777]">Carregando...</div>}>
      <OrderConfirmation />
    </Suspense>
  )
}
