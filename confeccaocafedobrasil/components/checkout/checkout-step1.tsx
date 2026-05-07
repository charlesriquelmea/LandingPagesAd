'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Loader2, Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatPrice } from '@/lib/products'
import { useCart } from '@/hooks/use-cart'
import type { CartItem, ShippingQuote } from '@/lib/types'

interface Props {
  items: CartItem[]
  subtotal: number
  onNext: (shipping: ShippingQuote) => void
  formData: Record<string, unknown>
}

function formatCep(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 8)
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d
}

export function CheckoutStep1({ items, subtotal, onNext }: Props) {
  const { updateQuantity, removeItem } = useCart()
  const [cep, setCep] = useState('')
  const [loading, setLoading] = useState(false)
  const [quotes, setQuotes] = useState<ShippingQuote[] | null>(null)
  const [selected, setSelected] = useState<ShippingQuote | null>(null)
  const [error, setError] = useState('')

  async function handleQuote() {
    const clean = cep.replace(/\D/g, '')
    if (clean.length !== 8) { setError('CEP inválido'); return }
    setError(''); setLoading(true); setQuotes(null); setSelected(null)
    try {
      const res = await fetch('/api/shipping/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cep: clean,
          items: items.map((i) => ({ weight: i.weight, height: i.height, width: i.width, length: i.length })),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setQuotes(data.quotes ?? [])
      if (data.quotes?.length) setSelected(data.quotes[0])
    } catch {
      setError('Não foi possível calcular o frete.')
    } finally {
      setLoading(false)
    }
  }

  const shippingCents = selected ? Math.round(parseFloat(selected.price) * 100) : 0
  const total = subtotal + shippingCents

  return (
    <div className="flex flex-col gap-8">
      <h2 className="font-serif text-2xl font-bold text-[#2C1A0E]">Resumo do pedido</h2>

      {/* Cart items */}
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.productId} className="flex gap-4 bg-white rounded-2xl p-4 border border-[#E8E0D5]">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#EDE8E0]">
              <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <p className="font-serif font-semibold text-[#2C1A0E] text-sm">{item.name}</p>
              <p className="font-bold text-[#2C1A0E] text-base">{formatPrice(item.price)}</p>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="w-7 h-7 rounded-full border border-[#E8E0D5] flex items-center justify-center hover:bg-[#F7F3EE]">
                  <Minus size={12} />
                </button>
                <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="w-7 h-7 rounded-full border border-[#E8E0D5] flex items-center justify-center hover:bg-[#F7F3EE]">
                  <Plus size={12} />
                </button>
                <button onClick={() => removeItem(item.productId)} className="ml-2 text-red-400 hover:text-red-600 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Freight */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E0D5]">
        <p className="font-semibold text-[#2C1A0E] text-sm font-sans mb-3">Calcular frete</p>
        <div className="flex gap-2">
          <Input
            placeholder="00000-000"
            value={cep}
            onChange={(e) => setCep(formatCep(e.target.value))}
            onKeyDown={(e) => e.key === 'Enter' && handleQuote()}
            className="border-[#E8E0D5]"
            maxLength={9}
          />
          <Button onClick={handleQuote} disabled={loading} className="bg-[#2C1A0E] text-[#F7F3EE] shrink-0">
            {loading ? <Loader2 size={14} className="animate-spin" /> : 'Calcular'}
          </Button>
        </div>
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

        {quotes && (
          <div className="flex flex-col gap-2 mt-4">
            {quotes.map((q) => (
              <label key={q.id} className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${selected?.id === q.id ? 'border-[#2C1A0E] bg-[#2C1A0E]/5' : 'border-[#E8E0D5]'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="shipping" checked={selected?.id === q.id} onChange={() => setSelected(q)} className="accent-[#2C1A0E]" />
                  <div>
                    <p className="text-sm font-semibold text-[#2C1A0E]">{q.name}</p>
                    <p className="text-xs text-[#999]">{q.delivery_time} dia{q.delivery_time !== 1 ? 's' : ''} úteis</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-[#2C1A0E]">
                  {parseFloat(q.price) === 0 ? 'Grátis' : `R$ ${parseFloat(q.price).toFixed(2).replace('.', ',')}`}
                </p>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Order summary */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E0D5] flex flex-col gap-2">
        <div className="flex justify-between text-sm font-sans text-[#555]">
          <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm font-sans text-[#555]">
          <span>Frete</span>
          <span>{selected ? (shippingCents === 0 ? 'Grátis' : formatPrice(shippingCents)) : '—'}</span>
        </div>
        <div className="flex justify-between font-bold text-base text-[#2C1A0E] border-t border-[#E8E0D5] pt-2 mt-1">
          <span>Total</span><span>{formatPrice(total)}</span>
        </div>
      </div>

      <Button
        onClick={() => selected && onNext(selected)}
        disabled={!selected}
        className="w-full py-4 bg-[#2C1A0E] hover:bg-[#3d2510] text-[#F7F3EE] text-base font-semibold rounded-full"
      >
        Continuar →
      </Button>
    </div>
  )
}
