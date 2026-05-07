'use client'

import useSWR from 'swr'
import { TrendingUp, ShoppingBag, Package, Clock, CheckCircle, Truck } from 'lucide-react'
import { formatPrice } from '@/lib/products'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function StatCard({ label, value, icon: Icon, sub }: { label: string; value: string; icon: React.ElementType; sub?: string }) {
  return (
    <div className="bg-[#2C1A0E] rounded-2xl p-5 border border-[#C8A96E]/10 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-[#F7F3EE]/50 text-xs font-sans uppercase tracking-wider">{label}</p>
        <div className="w-8 h-8 rounded-lg bg-[#C8A96E]/10 flex items-center justify-center">
          <Icon size={14} className="text-[#C8A96E]" />
        </div>
      </div>
      <p className="font-serif text-2xl font-bold text-[#F7F3EE]">{value}</p>
      {sub && <p className="text-[#F7F3EE]/30 text-xs font-sans">{sub}</p>}
    </div>
  )
}

export function AdminDashboard() {
  const { data } = useSWR('/api/admin/financials', fetcher, { refreshInterval: 30000 })
  const { data: ordersData } = useSWR('/api/admin/orders?limit=5', fetcher, { refreshInterval: 30000 })

  const stats = data?.stats
  const recentOrders = ordersData?.orders ?? []

  const statusLabel: Record<string, string> = {
    PENDING: 'Aguardando',
    PAID: 'Pago',
    FAILED: 'Falhou',
    REFUNDED: 'Reembolsado',
  }
  const statusColor: Record<string, string> = {
    PENDING: 'text-yellow-400',
    PAID: 'text-green-400',
    FAILED: 'text-red-400',
    REFUNDED: 'text-blue-400',
  }
  const shippingLabel: Record<string, string> = {
    PENDING: 'A despachar',
    LABEL_CREATED: 'Etiqueta criada',
    SHIPPED: 'Enviado',
    DELIVERED: 'Entregue',
    RETURNED: 'Devolvido',
  }

  return (
    <div className="p-6 md:p-8 flex flex-col gap-8">
      <div>
        <p className="text-[#C8A96E] text-xs tracking-[0.25em] uppercase font-sans mb-1">Visão geral</p>
        <h1 className="font-serif text-3xl font-bold text-[#F7F3EE]">Dashboard</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard label="Receita total" value={stats ? formatPrice(stats.totalRevenue) : '—'} icon={TrendingUp} sub="pedidos pagos" />
        <StatCard label="Pedidos totais" value={stats?.totalOrders ?? '—'} icon={ShoppingBag} />
        <StatCard label="Pedidos pagos" value={stats?.paidOrders ?? '—'} icon={CheckCircle} />
        <StatCard label="Aguardando" value={stats?.pendingOrders ?? '—'} icon={Clock} />
        <StatCard label="Enviados" value={stats?.shippedOrders ?? '—'} icon={Truck} />
        <StatCard label="Ticket médio" value={stats ? formatPrice(stats.avgOrderValue) : '—'} icon={Package} />
      </div>

      {/* Recent orders */}
      <div>
        <h2 className="font-serif text-lg font-bold text-[#F7F3EE] mb-4">Pedidos recentes</h2>
        <div className="bg-[#2C1A0E] rounded-2xl border border-[#C8A96E]/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="border-b border-[#C8A96E]/10 text-[#F7F3EE]/40">
                  <th className="text-left px-5 py-3 font-medium">Pedido</th>
                  <th className="text-left px-5 py-3 font-medium">Cliente</th>
                  <th className="text-left px-5 py-3 font-medium">Total</th>
                  <th className="text-left px-5 py-3 font-medium">Pagamento</th>
                  <th className="text-left px-5 py-3 font-medium">Envio</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-[#F7F3EE]/20">Nenhum pedido ainda</td>
                  </tr>
                ) : (
                  recentOrders.map((o: { id: string; customerName: string; totalAmount: number; paymentStatus: string; shippingStatus: string }) => (
                    <tr key={o.id} className="border-b border-[#C8A96E]/5 hover:bg-[#C8A96E]/5 transition-colors">
                      <td className="px-5 py-3 text-[#C8A96E] font-mono text-xs">{o.id.slice(0, 12)}…</td>
                      <td className="px-5 py-3 text-[#F7F3EE]/80">{o.customerName}</td>
                      <td className="px-5 py-3 text-[#F7F3EE] font-semibold">{formatPrice(o.totalAmount)}</td>
                      <td className={`px-5 py-3 font-medium ${statusColor[o.paymentStatus] ?? 'text-[#F7F3EE]/40'}`}>
                        {statusLabel[o.paymentStatus] ?? o.paymentStatus}
                      </td>
                      <td className="px-5 py-3 text-[#F7F3EE]/50">
                        {shippingLabel[o.shippingStatus] ?? o.shippingStatus}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
