'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/hooks/use-cart'
import { CheckoutStep1 } from '@/components/checkout/checkout-step1'
import { CheckoutStep2 } from '@/components/checkout/checkout-step2'
import { CheckoutStep3 } from '@/components/checkout/checkout-step3'
import type { CheckoutFormData, ShippingQuote } from '@/lib/types'

const STEP_LABELS = ['Resumo', 'Seus dados', 'Pagamento']

export function CheckoutFlow() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Partial<CheckoutFormData>>({})
  const [selectedShipping, setSelectedShipping] = useState<ShippingQuote | null>(null)
  const [loading, setLoading] = useState(false)
  const { items, total, clearCart } = useCart()

  const subtotal = total()

  function handleStep1Next(shipping: ShippingQuote) {
    setSelectedShipping(shipping)
    setStep(2)
  }

  function handleStep2Next(data: Partial<CheckoutFormData>) {
    setFormData((prev) => ({ ...prev, ...data }))
    setStep(3)
  }

  async function handlePay() {
    if (!selectedShipping) return
    setLoading(true)

    try {
      const payload = {
        ...formData,
        shippingServiceId: selectedShipping.id,
        shippingPrice: Math.round(parseFloat(selectedShipping.price) * 100),
        shippingName: selectedShipping.name,
        shippingDays: selectedShipping.delivery_time,
        items: items.map((i) => ({
          productId: i.productId,
          slug: i.slug,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
      }

      const res = await fetch('/api/payments/create-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Erro ao criar pagamento')

      clearCart()
      window.location.href = data.url
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro inesperado')
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F7F3EE] pt-24 flex flex-col items-center justify-center gap-6 px-6">
        <p className="font-serif text-3xl text-[#2C1A0E] font-bold text-center">Seu carrinho está vazio</p>
        <p className="text-[#777] font-sans text-center">Adicione uma de nossas bolsas artesanais para continuar.</p>
        <a href="/#produtos" className="bg-[#2C1A0E] text-[#F7F3EE] px-8 py-3 rounded-full font-semibold hover:bg-[#3d2510] transition-colors">
          Ver produtos
        </a>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F3EE] pt-16">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex justify-between mb-3">
            {STEP_LABELS.map((label, i) => (
              <div key={label} className="flex flex-col items-center gap-1 flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-sans transition-all ${
                    step > i + 1
                      ? 'bg-[#3B5249] text-[#F7F3EE]'
                      : step === i + 1
                      ? 'bg-[#2C1A0E] text-[#F7F3EE]'
                      : 'bg-[#E8E0D5] text-[#999]'
                  }`}
                >
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span className={`text-xs font-sans ${step === i + 1 ? 'text-[#2C1A0E] font-semibold' : 'text-[#999]'}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div className="relative h-1 bg-[#E8E0D5] rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-[#C8A96E] rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${((step - 1) / 2) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
          </div>
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CheckoutStep1
                items={items}
                subtotal={subtotal}
                onNext={handleStep1Next}
                formData={formData}
              />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CheckoutStep2
                onNext={handleStep2Next}
                onBack={() => setStep(1)}
                formData={formData}
              />
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CheckoutStep3
                items={items}
                subtotal={subtotal}
                shipping={selectedShipping}
                formData={formData}
                onBack={() => setStep(2)}
                onPay={handlePay}
                loading={loading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
