'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Coffee, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function AdminLoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const callbackUrl = params.get('callbackUrl') ?? '/admin'
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push(callbackUrl)
      } else {
        setError('Senha incorreta.')
      }
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col items-center mb-10">
        <div className="w-14 h-14 rounded-2xl bg-[#C8A96E]/15 border border-[#C8A96E]/30 flex items-center justify-center mb-4">
          <Coffee size={24} className="text-[#C8A96E]" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-[#F7F3EE]">Admin</h1>
        <p className="text-[#F7F3EE]/40 text-sm font-sans mt-1">Confecção Café do Brasil</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs text-[#F7F3EE]/50 font-sans mb-1.5 uppercase tracking-wider">
            Senha de acesso
          </label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="bg-[#2C1A0E] border-[#C8A96E]/20 text-[#F7F3EE] placeholder:text-[#F7F3EE]/20 focus:border-[#C8A96E]"
            autoFocus
          />
        </div>

        {error && <p className="text-red-400 text-xs font-sans">{error}</p>}

        <Button
          type="submit"
          disabled={loading || !password}
          className="w-full bg-[#C8A96E] hover:bg-[#B8976A] text-[#2C1A0E] font-semibold py-3"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : 'Entrar'}
        </Button>
      </form>
    </div>
  )
}
