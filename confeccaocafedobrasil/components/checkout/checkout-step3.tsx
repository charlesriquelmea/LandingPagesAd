'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { Loader2, Lock, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/products'
import { trackInitiateCheckout } from '@/lib/pixel'
import type { CartItem, ShippingQuote, CheckoutFormData } from '@/lib/types'

interface Props {
  items: CartItem[]
  subtotal: number
  shipping: ShippingQuote | null
  formData: Partial<CheckoutFormData>
  onBack: () => void
  onPay: () => void
  loading: boolean
}

export function CheckoutStep3({ items, subtotal, shipping, formData, onBack, onPay, loading }: Props) {
  const shippingCents = shipping ? Math.round(parseFloat(shipping.price) * 100) : 0
  const total = subtotal + shippingCents

  /*   
  // Antes, rompia ver el carrito de compras
  useEffect(() => {
      pixelInitiateCheckout(
        items.map((i) => i.productId),
        total,
        items.reduce((s, i) => s + i.quantity, 0),
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) */

  useEffect(() => {
    trackInitiateCheckout(total
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col gap-7">
      <h2 className="font-serif text-2xl font-bold text-[#2C1A0E]">Confirmar pagamento</h2>

      {/* Order items */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E0D5]">
        <p className="text-xs text-[#C8A96E] tracking-[0.2em] uppercase font-sans font-semibold mb-4">Itens</p>
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div key={item.productId} className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[#EDE8E0] shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#2C1A0E]">{item.name}</p>
                <p className="text-xs text-[#999]">Qtd: {item.quantity}</p>
              </div>
              <p className="text-sm font-bold text-[#2C1A0E]">{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Customer data */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E0D5]">
        <p className="text-xs text-[#C8A96E] tracking-[0.2em] uppercase font-sans font-semibold mb-3">Seus dados</p>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm font-sans">
          <dt className="text-[#999]">Nome</dt><dd className="text-[#2C1A0E] font-medium">{formData.name}</dd>
          <dt className="text-[#999]">E-mail</dt><dd className="text-[#2C1A0E] font-medium truncate">{formData.email}</dd>
          <dt className="text-[#999]">Entrega</dt>
          <dd className="text-[#2C1A0E] font-medium text-xs">
            {formData.street}, {formData.number} — {formData.city}/{formData.state}
          </dd>
          {shipping && (
            <>
              <dt className="text-[#999]">Frete</dt>
              <dd className="text-[#2C1A0E] font-medium">{shipping.name} ({shipping.delivery_time}d úteis)</dd>
            </>
          )}
        </dl>
      </div>

      {/* Totals */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E0D5] flex flex-col gap-2">
        <div className="flex justify-between text-sm font-sans text-[#555]">
          <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm font-sans text-[#555]">
          <span>Frete ({shipping?.name})</span>
          <span>{shippingCents === 0 ? 'Grátis' : formatPrice(shippingCents)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg text-[#2C1A0E] border-t border-[#E8E0D5] pt-2 mt-1">
          <span>Total a pagar</span><span>{formatPrice(total)}</span>
        </div>
      </div>

      {/* Security badge */}
      <div className="flex items-center gap-3 text-xs text-[#777] font-sans">
        <ShieldCheck size={16} className="text-[#3B5249] shrink-0" />
        <span>Pagamento seguro via <strong>InfinitePay</strong>. Seus dados são protegidos por criptografia SSL.</span>
      </div>

      <div className="flex gap-3">
        <Button type="button" onClick={onBack} variant="outline" className="flex-1 border-[#E8E0D5] text-[#555]" disabled={loading}>
          ← Voltar
        </Button>
        <motion.button
          onClick={onPay}
          disabled={loading}
          whileTap={{ scale: 0.97 }}
          className="flex-1 bg-[#C8A96E] hover:bg-[#B8976A] text-[#2C1A0E] font-bold py-4 rounded-full flex items-center justify-center gap-2 text-base transition-colors disabled:opacity-60"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <>
              <Lock size={16} />
              Pagar agora
            </>
          )}
        </motion.button>
      </div>
    </div>
  )
}
