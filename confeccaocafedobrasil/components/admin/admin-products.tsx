'use client'

import { useState } from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import { RefreshCw, Edit3, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatPrice } from '@/lib/products'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function AdminProducts() {
  const { data, mutate } = useSWR('/api/admin/products', fetcher)
  const products = data?.products ?? []
  const [editId, setEditId] = useState<string | null>(null)
  const [editStock, setEditStock] = useState('')
  const [saving, setSaving] = useState(false)

  async function saveStock(id: string) {
    if (!editStock) { setEditId(null); return }
    setSaving(true)
    try {
      await fetch(`/api/admin/products?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: parseInt(editStock) }),
      })
      await mutate()
    } finally {
      setSaving(false)
      setEditId(null)
      setEditStock('')
    }
  }

  async function toggleActive(id: string, active: boolean) {
    await fetch(`/api/admin/products?id=${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !active }),
    })
    await mutate()
  }

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[#C8A96E] text-xs tracking-[0.25em] uppercase font-sans mb-1">Gestão</p>
          <h1 className="font-serif text-3xl font-bold text-[#F7F3EE]">Produtos</h1>
        </div>
        <Button variant="outline" onClick={() => mutate()} className="border-[#C8A96E]/20 text-[#F7F3EE]/60 hover:text-[#F7F3EE] bg-transparent gap-2">
          <RefreshCw size={14} /> Atualizar
        </Button>
      </div>

      <div className="grid gap-5">
        {products.length === 0 && (
          <div className="flex items-center gap-3 bg-[#2C1A0E] rounded-2xl p-6 border border-[#C8A96E]/10 text-[#F7F3EE]/30 text-sm">
            <AlertCircle size={16} />
            {data ? 'Nenhum produto cadastrado no banco de dados.' : 'Carregando...'}
          </div>
        )}
        {products.map((p: { id: string; name: string; price: number; stock: number; active: boolean; images: string[] }) => (
          <div key={p.id} className="bg-[#2C1A0E] rounded-2xl border border-[#C8A96E]/10 p-5 flex gap-5 items-start">
            {/* Image */}
            <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#3d2510]">
              {p.images[0] && (
                <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="80px" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-start justify-between gap-3">
                <p className="font-serif text-base font-semibold text-[#F7F3EE]">{p.name}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium font-sans shrink-0 ${p.active ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'}`}>
                  {p.active ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              <p className="font-serif text-lg font-bold text-[#C8A96E]">{formatPrice(p.price)}</p>

              <div className="flex items-center gap-4 mt-1">
                {/* Stock edit */}
                {editId === p.id ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={editStock}
                      onChange={(e) => setEditStock(e.target.value)}
                      className="w-20 h-8 text-sm bg-[#1A1008] border-[#C8A96E]/30 text-[#F7F3EE]"
                      autoFocus
                      onKeyDown={(e) => e.key === 'Enter' && saveStock(p.id)}
                    />
                    <Button size="sm" onClick={() => saveStock(p.id)} disabled={saving}
                      className="h-8 bg-[#C8A96E] text-[#2C1A0E] hover:bg-[#B8976A] text-xs">
                      Salvar
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditId(null)}
                      className="h-8 text-[#F7F3EE]/40 text-xs">
                      Cancelar
                    </Button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setEditId(p.id); setEditStock(String(p.stock)) }}
                    className="flex items-center gap-1.5 text-sm text-[#F7F3EE]/50 hover:text-[#F7F3EE] transition-colors"
                  >
                    <Edit3 size={12} />
                    Estoque: <span className="font-bold text-[#F7F3EE]">{p.stock}</span> unidades
                  </button>
                )}

                <button
                  onClick={() => toggleActive(p.id, p.active)}
                  className="flex items-center gap-1.5 text-xs text-[#F7F3EE]/30 hover:text-[#F7F3EE]/60 transition-colors"
                >
                  {p.active ? <EyeOff size={12} /> : <Eye size={12} />}
                  {p.active ? 'Desativar' : 'Ativar'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
