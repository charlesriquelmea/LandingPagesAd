'use client'

import useSWR from 'swr'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { TrendingUp, ShoppingBag, CreditCard, Package } from 'lucide-react'
import { formatPrice } from '@/lib/products'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function StatBox({ label, value, icon: Icon }: { label: string; value: string; icon: React.ElementType }) {
  return (
    <div className="bg-[#2C1A0E] rounded-2xl p-5 border border-[#C8A96E]/10 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-[#F7F3EE]/40 text-xs font-sans uppercase tracking-wider">{label}</p>
        <Icon size={14} className="text-[#C8A96E]" />
      </div>
      <p className="font-serif text-2xl font-bold text-[#F7F3EE]">{value}</p>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[#2C1A0E] border border-[#C8A96E]/30 rounded-xl px-4 py-3">
        <p className="text-[#F7F3EE]/50 text-xs font-sans mb-1">{label}</p>
        <p className="text-[#C8A96E] font-bold text-sm">{formatPrice(payload[0].value)}</p>
      </div>
    )
  }
  return null
}

export function AdminFinancials() {
  const { data } = useSWR('/api/admin/financials', fetcher, { refreshInterval: 60000 })
  const stats = data?.stats
  const monthly = data?.monthly ?? []

  return (
    <div className="p-6 md:p-8 flex flex-col gap-8">
      <div>
        <p className="text-[#C8A96E] text-xs tracking-[0.25em] uppercase font-sans mb-1">Análise</p>
        <h1 className="font-serif text-3xl font-bold text-[#F7F3EE]">Financeiro</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBox label="Receita total" value={stats ? formatPrice(stats.totalRevenue) : '—'} icon={TrendingUp} />
        <StatBox label="Pedidos pagos" value={stats?.paidOrders ?? '—'} icon={ShoppingBag} />
        <StatBox label="Ticket médio" value={stats ? formatPrice(stats.avgOrderValue) : '—'} icon={CreditCard} />
        <StatBox label="Total de pedidos" value={stats?.totalOrders ?? '—'} icon={Package} />
      </div>

      {/* Monthly chart */}
      <div className="bg-[#2C1A0E] rounded-2xl border border-[#C8A96E]/10 p-6">
        <h2 className="font-serif text-lg font-bold text-[#F7F3EE] mb-6">Receita mensal</h2>
        {monthly.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-[#F7F3EE]/20 text-sm font-sans">
            Sem dados suficientes para exibir o gráfico
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthly} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#C8A96E10" />
              <XAxis dataKey="month" tick={{ fill: '#F7F3EE60', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis
                tickFormatter={(v) => `R$${(v / 100).toFixed(0)}`}
                tick={{ fill: '#F7F3EE40', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#C8A96E10' }} />
              <Bar dataKey="revenue" fill="#C8A96E" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Product breakdown */}
      {data?.byProduct && data.byProduct.length > 0 && (
        <div className="bg-[#2C1A0E] rounded-2xl border border-[#C8A96E]/10 p-6">
          <h2 className="font-serif text-lg font-bold text-[#F7F3EE] mb-5">Receita por produto</h2>
          <div className="flex flex-col gap-3">
            {data.byProduct.map((p: { name: string; revenue: number; qty: number }) => (
              <div key={p.name} className="flex items-center justify-between gap-4">
                <p className="text-[#F7F3EE]/70 text-sm font-sans truncate">{p.name}</p>
                <div className="text-right shrink-0">
                  <p className="text-[#F7F3EE] font-semibold text-sm">{formatPrice(p.revenue)}</p>
                  <p className="text-[#F7F3EE]/30 text-xs">{p.qty} unidades</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
