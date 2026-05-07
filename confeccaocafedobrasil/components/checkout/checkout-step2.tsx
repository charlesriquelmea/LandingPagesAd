'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import type { CheckoutFormData } from '@/lib/types'

const schema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  cpf: z.string().min(11, 'CPF inválido'),
  cep: z.string().min(8, 'CEP inválido'),
  street: z.string().min(2, 'Logradouro obrigatório'),
  number: z.string().min(1, 'Número obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, 'Bairro obrigatório'),
  city: z.string().min(2, 'Cidade obrigatória'),
  state: z.string().length(2, 'Use a sigla do estado (ex: MG)'),
})

type FormData = z.infer<typeof schema>

interface Props {
  onNext: (data: Partial<CheckoutFormData>) => void
  onBack: () => void
  formData: Partial<CheckoutFormData>
}

function formatCpf(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11)
  return d.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}
function formatPhone(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11)
  return d.length > 10 ? d.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') : d.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
}
function formatCep(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 8)
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d
}

export function CheckoutStep2({ onNext, onBack, formData }: Props) {
  const [fetchingCep, setFetchingCep] = useState(false)

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: formData.name ?? '',
      email: formData.email ?? '',
      phone: formData.phone ?? '',
      cpf: formData.cpf ?? '',
      cep: formData.cep ?? '',
      street: formData.street ?? '',
      number: formData.number ?? '',
      complement: formData.complement ?? '',
      neighborhood: formData.neighborhood ?? '',
      city: formData.city ?? '',
      state: formData.state ?? '',
    },
  })

  async function lookupCep(cep: string) {
    const clean = cep.replace(/\D/g, '')
    if (clean.length !== 8) return
    setFetchingCep(true)
    try {
      const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`)
      const data = await res.json()
      if (!data.erro) {
        setValue('street', data.logradouro ?? '')
        setValue('neighborhood', data.bairro ?? '')
        setValue('city', data.localidade ?? '')
        setValue('state', data.uf ?? '')
      }
    } catch { /* ignore */ } finally {
      setFetchingCep(false)
    }
  }

  function onSubmit(data: FormData) {
    onNext({
      name: data.name,
      email: data.email,
      phone: data.phone.replace(/\D/g, ''),
      cpf: data.cpf.replace(/\D/g, ''),
      cep: data.cep.replace(/\D/g, ''),
      street: data.street,
      number: data.number,
      complement: data.complement,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
    } as Partial<CheckoutFormData>)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
      <h2 className="font-serif text-2xl font-bold text-[#2C1A0E]">Seus dados</h2>

      {/* Personal */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E0D5] flex flex-col gap-4">
        <p className="text-xs text-[#C8A96E] tracking-[0.2em] uppercase font-sans font-semibold">Dados pessoais</p>
        <FieldRow label="Nome completo" error={errors.name?.message}>
          <Input {...register('name')} placeholder="Maria Silva" className="border-[#E8E0D5]" />
        </FieldRow>
        <FieldRow label="E-mail" error={errors.email?.message}>
          <Input {...register('email')} type="email" placeholder="maria@email.com" className="border-[#E8E0D5]" />
        </FieldRow>
        <div className="grid grid-cols-2 gap-4">
          <FieldRow label="Telefone / WhatsApp" error={errors.phone?.message}>
            <Input
              {...register('phone')}
              placeholder="(31) 99999-9999"
              onChange={(e) => setValue('phone', formatPhone(e.target.value))}
              className="border-[#E8E0D5]"
            />
          </FieldRow>
          <FieldRow label="CPF" error={errors.cpf?.message}>
            <Input
              {...register('cpf')}
              placeholder="000.000.000-00"
              onChange={(e) => setValue('cpf', formatCpf(e.target.value))}
              className="border-[#E8E0D5]"
            />
          </FieldRow>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E0D5] flex flex-col gap-4">
        <p className="text-xs text-[#C8A96E] tracking-[0.2em] uppercase font-sans font-semibold">Endereço de entrega</p>
        <div className="flex gap-2">
          <FieldRow label="CEP" error={errors.cep?.message} className="flex-1">
            <Input
              {...register('cep')}
              placeholder="00000-000"
              maxLength={9}
              onChange={(e) => {
                const v = formatCep(e.target.value)
                setValue('cep', v)
                if (v.replace(/\D/g, '').length === 8) lookupCep(v)
              }}
              className="border-[#E8E0D5]"
            />
          </FieldRow>
          {fetchingCep && <Loader2 size={16} className="text-[#C8A96E] animate-spin self-end mb-3" />}
        </div>
        <FieldRow label="Logradouro" error={errors.street?.message}>
          <Input {...register('street')} placeholder="Rua das Fazendas" className="border-[#E8E0D5]" />
        </FieldRow>
        <div className="grid grid-cols-2 gap-4">
          <FieldRow label="Número" error={errors.number?.message}>
            <Input {...register('number')} placeholder="100" className="border-[#E8E0D5]" />
          </FieldRow>
          <FieldRow label="Complemento" error={errors.complement?.message}>
            <Input {...register('complement')} placeholder="Apto 10" className="border-[#E8E0D5]" />
          </FieldRow>
        </div>
        <FieldRow label="Bairro" error={errors.neighborhood?.message}>
          <Input {...register('neighborhood')} placeholder="Centro" className="border-[#E8E0D5]" />
        </FieldRow>
        <div className="grid grid-cols-3 gap-4">
          <FieldRow label="Cidade" error={errors.city?.message} className="col-span-2">
            <Input {...register('city')} placeholder="Poços de Caldas" className="border-[#E8E0D5]" />
          </FieldRow>
          <FieldRow label="Estado" error={errors.state?.message}>
            <Input {...register('state')} placeholder="MG" maxLength={2} className="border-[#E8E0D5] uppercase" />
          </FieldRow>
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="button" onClick={onBack} variant="outline" className="flex-1 border-[#E8E0D5] text-[#555]">
          ← Voltar
        </Button>
        <Button type="submit" className="flex-1 bg-[#2C1A0E] hover:bg-[#3d2510] text-[#F7F3EE] font-semibold rounded-full">
          Continuar →
        </Button>
      </div>
    </form>
  )
}

function FieldRow({ label, error, children, className = '' }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <Label className="text-xs font-semibold text-[#555] font-sans">{label}</Label>
      {children}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  )
}
