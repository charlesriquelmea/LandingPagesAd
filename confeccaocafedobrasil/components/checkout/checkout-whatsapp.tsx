'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { Loader2, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatPrice } from '@/lib/products'
import { isValidCPF, formatCPF } from '@/lib/cpf'
import { useCart } from '@/hooks/use-cart'
import type { CartItem } from '@/lib/types'

function formatCEP(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 5) return digits
  return `${digits.slice(0, 5)}-${digits.slice(5)}`
}

function isValidCEP(value: string): boolean {
  const digits = value.replace(/\D/g, '')
  return /^\d{8}$/.test(digits)
}

function formatWhatsApp(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 13)
  if (digits.startsWith('55')) {
    if (digits.length <= 4) return `+${digits}`
    if (digits.length <= 6) return `+${digits.slice(0, 4)} ${digits.slice(4)}`
    if (digits.length <= 11) return `+${digits.slice(0, 4)} ${digits.slice(4, 6)} ${digits.slice(6)}`
    return `+${digits.slice(0, 4)} ${digits.slice(4, 6)} ${digits.slice(6, 7)}${digits.slice(7, 11)}-${digits.slice(11)}`
  }
  return digits
}

function isValidWhatsApp(value: string): boolean {
  const digits = value.replace(/\D/g, '')
  return /^(\+55|55)?(\d{2})(9?\d{8})$/.test(digits)
}

const WHATSAPP_NUMBER = '5511999999999'

export function CheckoutWhatsApp() {
  const { items, total, clearCart } = useCart()
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [cep, setCep] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const subtotal = total()

  const validate = useCallback(() => {
    const errs: Record<string, string> = {}

    if (!nome.trim()) errs.nome = 'Nome é obrigatório'

    const cpfRaw = cpf.replace(/\D/g, '')
    if (cpfRaw.length !== 11) {
      errs.cpf = 'CPF deve ter 11 dígitos'
    } else if (!isValidCPF(cpf)) {
      errs.cpf = 'CPF inválido — verifique os dígitos'
    }

    const cepRaw = cep.replace(/\D/g, '')
    if (cepRaw.length !== 8) {
      errs.cep = 'CEP deve ter 8 dígitos'
    } else if (!isValidCEP(cep)) {
      errs.cep = 'CEP inválido'
    }

    const wppRaw = whatsapp.replace(/\D/g, '')
    if (wppRaw.length < 12) {
      errs.whatsapp = 'WhatsApp inválido — use +55 + DDD + número'
    } else if (!isValidWhatsApp(whatsapp)) {
      errs.whatsapp = 'WhatsApp inválido — formato: +55 (DD) 9XXXX-XXXX'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }, [nome, cpf, cep, whatsapp])

  function handleSubmit() {
    if (!validate()) return
    setLoading(true)

    const itemsText = items
      .map(
        (i: CartItem) =>
          `• [ID: ${i.sku}] ${i.name}\n  Quantidade: ${i.quantity} — ${formatPrice(i.price)}`,
      )
      .join('\n')

    const mensagem =
      `🛒 *Nuevo pedido*\n\n` +
      `${itemsText}\n\n` +
      `*Total: ${formatPrice(subtotal)}*\n\n` +
      `👤 *Cliente:* ${nome.trim()}\n` +
      `🪪 *CPF:* ${cpf}\n` +
      `📍 *CEP:* ${cep}\n` +
      `📱 *WhatsApp:* ${whatsapp}`

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`
    window.open(url, '_blank')
    setLoading(false)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#d4cec7] pt-24 flex flex-col items-center justify-center gap-6 px-6">
        <p className="font-serif text-3xl text-[#2C1A0E] font-bold text-center">Seu carrinho está vazio</p>
        <p className="text-[#777] font-sans text-center">Adicione uma de nossas bolsas artesanais para continuar.</p>
        <a
          href="/#produtos"
          className="bg-[#2C1A0E] text-[#F7F3EE] px-8 py-3 rounded-full font-semibold hover:bg-[#3d2510] transition-colors"
        >
          Ver produtos
        </a>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#d4cec7] pt-16">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="font-serif text-3xl font-bold text-[#2C1A0E] mb-8">Finalizar pedido</h1>

        {/* Cart items */}
        <div className="flex flex-col gap-4 mb-8">
          <h2 className="font-serif text-xl font-bold text-[#2C1A0E]">Itens</h2>
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex gap-4 bg-white rounded-2xl p-4 border border-[#E8E0D5]"
            >
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#EDE8E0]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="font-serif font-semibold text-[#2C1A0E] text-sm">
                    {item.name}
                  </p>
                  <p className="text-xs text-[#999] font-sans mt-0.5">
                    ID: {item.sku}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-[#2C1A0E] text-base">
                    {formatPrice(item.price)}
                  </p>
                  <p className="text-sm text-[#555] font-sans">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order total */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E0D5] mb-8">
          <div className="flex justify-between font-bold text-lg text-[#2C1A0E]">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </div>

        {/* Customer form */}
        <div className="flex flex-col gap-5">
          <h2 className="font-serif text-xl font-bold text-[#2C1A0E]">Seus dados</h2>

          {/* Nome */}
          <div>
            <label className="block text-sm font-semibold text-[#2C1A0E] font-sans mb-1.5">
              Nome completo *
            </label>
            <Input
              placeholder="João Silva"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={`border ${errors.nome ? 'border-red-400' : 'border-[#E8E0D5]'}`}
            />
            {errors.nome && (
              <p className="text-red-500 text-xs mt-1">{errors.nome}</p>
            )}
          </div>

          {/* CPF */}
          <div>
            <label className="block text-sm font-semibold text-[#2C1A0E] font-sans mb-1.5">
              CPF *
            </label>
            <Input
              placeholder="123.456.789-09"
              value={cpf}
              onChange={(e) => setCpf(formatCPF(e.target.value))}
              maxLength={14}
              className={`border ${errors.cpf ? 'border-red-400' : 'border-[#E8E0D5]'}`}
            />
            <p className="text-xs text-[#999] mt-1 flex items-center gap-1">
              💡 Informe seu CPF para emissão do DC-e
            </p>
            {errors.cpf && (
              <p className="text-red-500 text-xs mt-1">{errors.cpf}</p>
            )}
          </div>

          {/* CEP */}
          <div>
            <label className="block text-sm font-semibold text-[#2C1A0E] font-sans mb-1.5">
              CEP *
            </label>
            <Input
              placeholder="01310-100"
              value={cep}
              onChange={(e) => setCep(formatCEP(e.target.value))}
              maxLength={9}
              className={`border ${errors.cep ? 'border-red-400' : 'border-[#E8E0D5]'}`}
            />
            {errors.cep && (
              <p className="text-red-500 text-xs mt-1">{errors.cep}</p>
            )}
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-sm font-semibold text-[#2C1A0E] font-sans mb-1.5">
              WhatsApp *
            </label>
            <Input
              placeholder="+55 11 91234-5678"
              value={whatsapp}
              onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
              maxLength={19}
              className={`border ${errors.whatsapp ? 'border-red-400' : 'border-[#E8E0D5]'}`}
            />
            {errors.whatsapp && (
              <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>
            )}
          </div>

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 bg-[#2C1A0E] hover:bg-[#3d2510] 
            text-[#F7F3EE] text-base font-semibold rounded-full 
            mt-4 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <ShoppingBag size={18} />
            )}
            Enviar pedido por WhatsApp
          </Button>
        </div>
      </div>
    </div>
  )
}
