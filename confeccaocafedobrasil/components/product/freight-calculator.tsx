'use client'

import { useState } from 'react'
import { Loader2, MapPin, Truck } from 'lucide-react'
import type { Product } from '@/lib/types'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { motion, AnimatePresence } from 'framer-motion'

interface ShippingQuote {
  id: number
  name: string
  price: string
  delivery_time: number
  company: { name: string; picture: string }
}

interface Props {
  product: Product
}

function formatCep(v: string) {
  const digits = v.replace(/\D/g, '').slice(0, 8)
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits
}

export function FreightCalculator({ product }: Props) {
  const [cep, setCep] = useState('')
  const [loading, setLoading] = useState(false)
  const [quotes, setQuotes] = useState<ShippingQuote[] | null>(null)
  const [error, setError] = useState('')

  async function handleCalculate() {
    const cleanCep = cep.replace(/\D/g, '')
    if (cleanCep.length !== 8) {
      setError('CEP inválido. Use 8 dígitos.')
      return
    }
    setError('')
    setLoading(true)
    setQuotes(null)

    try {
      const res = await fetch('/api/shipping/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cep: cleanCep,
          items: [{ weight: product.weight, height: product.height, width: product.width, length: product.length }],
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setQuotes(data.quotes ?? [])
    } catch {
      setError('Não foi possível calcular o frete. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#E8E0D5]">
      <div className="flex items-center gap-2 mb-4">
        <Truck size={16} className="text-[#3B5249]" />
        <p className="font-semibold text-[#2C1A0E] text-sm font-sans">Calcular frete</p>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
          <Input
            type="text"
            placeholder="00000-000"
            value={cep}
            onChange={(e) => setCep(formatCep(e.target.value))}
            onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
            className="pl-9 border-[#E8E0D5] bg-[#FAFAF8] font-sans text-sm"
            maxLength={9}
          />
        </div>
        <Button
          onClick={handleCalculate}
          disabled={loading}
          className="bg-[#2C1A0E] hover:bg-[#3d2510] text-[#F7F3EE] shrink-0"
          size="sm"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : 'Calcular'}
        </Button>
      </div>

      {error && (
        <p className="text-red-600 text-xs mt-2 font-sans">{error}</p>
      )}

      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-2 mt-4"
          >
            {[1, 2].map((i) => <Skeleton key={i} className="h-12 w-full rounded-xl" />)}
          </motion.div>
        )}

        {quotes && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-2 mt-4"
          >
            {quotes.length === 0 && (
              <p className="text-xs text-[#999] font-sans">Nenhuma opção disponível para este CEP.</p>
            )}
            {quotes.map((q) => (
              <div
                key={q.id}
                className="flex items-center justify-between bg-[#FAFAF8] rounded-xl px-4 py-3 border border-[#E8E0D5]"
              >
                <div className="flex items-center gap-3">
                  <Truck size={14} className="text-[#3B5249]" />
                  <div>
                    <p className="text-sm font-semibold text-[#2C1A0E] font-sans">{q.name}</p>
                    <p className="text-xs text-[#999] font-sans">{q.delivery_time} dia{q.delivery_time !== 1 ? 's' : ''} úteis</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-[#2C1A0E] font-sans">
                  {parseFloat(q.price) === 0 ? 'Grátis' : `R$ ${parseFloat(q.price).toFixed(2).replace('.', ',')}`}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
