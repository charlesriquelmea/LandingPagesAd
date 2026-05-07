'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { Search, ExternalLink, RefreshCw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/products'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const PAYMENT_COLOR: Record<string, string> = {
  PENDING: 'bg-yellow-500/15 text-yellow-400',
  PAID: 'bg-green-500/15 text-green-400',
  FAILED: 'bg-red-500/15 text-red-400',
  REFUNDED: 'bg-blue-500/15 text-blue-400',
}
const PAYMENT_LABEL: Record<string, string> = { PENDING: 'Aguardando', PAID: 'Pago', FAILED: 'Falhou', REFUNDED: 'Reembolsado' }
const SHIP_LABEL: Record<string, string> = { PENDING: 'A despachar', LABEL_CREATED: 'Etiqueta', SHIPPED: 'Enviado', DELIVERED: 'Entregue', RETURNED: 'Devolvido' }
const SHIP_COLOR: Record<string, string> = { PENDING: 'text-[#F7F3EE]/30', LABEL_CREATED: 'text-yellow-400', SHIPPED: 'text-blue-400', DELIVERED: 'text-green-400', RETURNED: 'text-red-400' }

export function AdminOrders() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const { data, mutate } = useSWR(
    `/api/admin/orders?search=${encodeURIComponent(search)}&status=${status}&limit=50`,
    fetcher,
    { refreshInterval: 15000 },
  )
  const orders = data?.orders ?? []

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[#C8A96E] text-xs tracking-[0.25em] uppercase font-sans mb-1">Gestão</p>
          <h1 className="font-serif text-3xl font-bold text-[#F7F3EE]">Pedidos</h1>
        </div>
        <Button variant="outline" onClick={() => mutate()} className="border-[#C8A96E]/20 text-[#F7F3EE]/60 hover:text-[#F7F3EE] bg-transparent gap-2">
          <RefreshCw size={14} /> Atualizar
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F7F3EE]/30" />
          <Input
            placeholder="Buscar por nome ou e-mail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-[#2C1A0E] border-[#C8A96E]/20 text-[#F7F3EE] placeholder:text-[#F7F3EE]/20"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-[#2C1A0E] border border-[#C8A96E]/20 rounded-md px-3 py-2 text-sm text-[#F7F3EE]/70 font-sans"
        >
          <option value="">Todos</option>
          <option value="PENDING">Aguardando</option>
          <option value="PAID">Pagos</option>
          <option value="FAILED">Falhou</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#2C1A0E] rounded-2xl border border-[#C8A96E]/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="border-b border-[#C8A96E]/10 text-[#F7F3EE]/40">
                {['ID', 'Data', 'Cliente', 'E-mail', 'Total', 'Pagamento', 'Envio', 'Rastreio'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-14 text-[#F7F3EE]/20">
                    {data ? 'Nenhum pedido encontrado' : 'Carregando...'}
                  </td>
                </tr>
              ) : (
                orders.map((o: {
                  id: string; createdAt: string; customerName: string; customerEmail: string;
                  totalAmount: number; paymentStatus: string; shippingStatus: string;
                  trackingCode: string | null; infinitePayLink: string | null;
                }) => (
                  <tr key={o.id} className="border-b border-[#C8A96E]/5 hover:bg-[#C8A96E]/5 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-[#C8A96E]">{o.id.slice(0, 10)}…</td>
                    <td className="px-4 py-3 text-[#F7F3EE]/40 whitespace-nowrap">
                      {new Date(o.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-4 py-3 text-[#F7F3EE]/80 whitespace-nowrap">{o.customerName}</td>
                    <td className="px-4 py-3 text-[#F7F3EE]/50 text-xs">{o.customerEmail}</td>
                    <td className="px-4 py-3 text-[#F7F3EE] font-semibold whitespace-nowrap">{formatPrice(o.totalAmount)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${PAYMENT_COLOR[o.paymentStatus] ?? ''}`}>
                        {PAYMENT_LABEL[o.paymentStatus] ?? o.paymentStatus}
                      </span>
                    </td>
                    <td className={`px-4 py-3 text-xs font-medium ${SHIP_COLOR[o.shippingStatus] ?? 'text-[#F7F3EE]/30'}`}>
                      {SHIP_LABEL[o.shippingStatus] ?? o.shippingStatus}
                    </td>
                    <td className="px-4 py-3">
                      {o.trackingCode ? (
                        <span className="text-xs font-mono text-[#C8A96E]">{o.trackingCode}</span>
                      ) : o.infinitePayLink ? (
                        <a href={o.infinitePayLink} target="_blank" rel="noopener noreferrer" className="text-[#C8A96E]/60 hover:text-[#C8A96E] transition-colors">
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span className="text-[#F7F3EE]/20">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
