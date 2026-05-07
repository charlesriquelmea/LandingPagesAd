'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Clock, Loader2, Package } from 'lucide-react'
import { formatPrice } from '@/lib/products'

interface OrderSummary {
  id: string
  customerName: string
  totalAmount: number
  shippingAmount: number
  paymentStatus: string
  paymentMethod: string | null
  items: { name: string; quantity: number; unitPrice: number }[]
}

export function OrderConfirmation() {
  const params = useSearchParams()
  const orderId = params.get('order')
  const [order, setOrder] = useState<OrderSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [polling, setPolling] = useState(true)

  const checkOrder = useCallback(async () => {
    if (!orderId) { setLoading(false); return }
    try {
      const res = await fetch(`/api/payments/check/${orderId}`)
      const data = await res.json()
      if (res.ok) {
        setOrder(data.order)
        if (data.order.paymentStatus === 'PAID' || data.order.paymentStatus === 'FAILED') {
          setPolling(false)
        }
      }
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }, [orderId])

  useEffect(() => {
    checkOrder()
  }, [checkOrder])

  useEffect(() => {
    if (!polling) return
    const id = setInterval(checkOrder, 5000)
    return () => clearInterval(id)
  }, [polling, checkOrder])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F3EE] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#C8A96E]" size={40} />
      </div>
    )
  }

  if (!orderId) {
    return (
      <div className="min-h-screen bg-[#F7F3EE] flex flex-col items-center justify-center gap-4 px-6">
        <p className="font-serif text-2xl text-[#2C1A0E] font-bold">Pedido não encontrado</p>
        <Link href="/" className="text-[#C8A96E] underline text-sm font-sans">Voltar à loja</Link>
      </div>
    )
  }

  const isPaid = order?.paymentStatus === 'PAID'
  const isPending = order?.paymentStatus === 'PENDING'

  return (
    <main className="min-h-screen bg-[#F7F3EE] pt-16">
      <div className="max-w-xl mx-auto px-6 py-16 flex flex-col items-center text-center">
        {/* Status icon */}
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isPaid ? 'bg-[#3B5249]' : 'bg-[#E8E0D5]'}`}>
          {isPaid
            ? <CheckCircle size={36} className="text-[#F7F3EE]" />
            : <Clock size={36} className="text-[#C8A96E]" />
          }
        </div>

        {isPaid ? (
          <>
            <h1 className="font-serif text-3xl font-bold text-[#2C1A0E] mb-3">Pagamento confirmado!</h1>
            <p className="text-[#666] font-sans leading-relaxed mb-2">
              Obrigado{order?.customerName ? `, ${order.customerName.split(' ')[0]}` : ''}! Seu pedido foi aprovado e já está em preparo.
            </p>
            <p className="text-[#999] text-sm font-sans mb-8">
              Você receberá um e-mail de confirmação com os detalhes.
            </p>
          </>
        ) : isPending ? (
          <>
            <h1 className="font-serif text-3xl font-bold text-[#2C1A0E] mb-3">Aguardando pagamento...</h1>
            <p className="text-[#666] font-sans leading-relaxed mb-2">
              Estamos aguardando a confirmação do seu pagamento. Essa página atualiza automaticamente.
            </p>
            <div className="flex items-center gap-2 text-[#C8A96E] text-sm font-sans mb-8">
              <Loader2 size={14} className="animate-spin" />
              Verificando...
            </div>
          </>
        ) : (
          <>
            <h1 className="font-serif text-3xl font-bold text-[#2C1A0E] mb-3">Pagamento não confirmado</h1>
            <p className="text-[#666] font-sans mb-8">Houve um problema com o seu pagamento. Entre em contato conosco.</p>
          </>
        )}

        {/* Order details */}
        {order && (
          <div className="w-full bg-white rounded-2xl border border-[#E8E0D5] p-6 text-left mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Package size={16} className="text-[#C8A96E]" />
              <p className="text-xs font-semibold text-[#999] font-sans uppercase tracking-wider">Pedido {order.id}</p>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm font-sans">
                  <span className="text-[#444]">{item.quantity}× {item.name}</span>
                  <span className="text-[#2C1A0E] font-medium">{formatPrice(item.unitPrice * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#E8E0D5] pt-3 flex flex-col gap-1">
              <div className="flex justify-between text-sm font-sans text-[#666]">
                <span>Frete</span>
                <span>{formatPrice(order.shippingAmount)}</span>
              </div>
              <div className="flex justify-between font-bold text-base text-[#2C1A0E]">
                <span>Total</span>
                <span>{formatPrice(order.totalAmount)}</span>
              </div>
            </div>
          </div>
        )}

        <Link
          href="/"
          className="bg-[#2C1A0E] text-[#F7F3EE] font-semibold px-10 py-4 rounded-full text-base hover:bg-[#3d2510] transition-colors"
        >
          Voltar à loja
        </Link>
      </div>
    </main>
  )
}
