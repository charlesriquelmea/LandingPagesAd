'use client'

import { useState } from 'react'
import { Copy, Check, ExternalLink, Megaphone, BarChart2, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy} className="text-[#F7F3EE]/30 hover:text-[#C8A96E] transition-colors">
      {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
    </button>
  )
}

const UTM_SOURCES = ['instagram', 'facebook', 'google', 'whatsapp', 'email']

export function AdminMarketing() {
  const [base, setBase] = useState('https://confeccaocafebrasil.com.br/produto/mochila-cafe-origins')
  const [campaign, setCampaign] = useState('lancamento-2025')

  const links = UTM_SOURCES.map((src) => ({
    source: src,
    url: `${base}?utm_source=${src}&utm_medium=${src === 'email' ? 'email' : 'social'}&utm_campaign=${encodeURIComponent(campaign)}`,
  }))

  const pixelId = typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_META_PIXEL_ID : undefined

  return (
    <div className="p-6 md:p-8 flex flex-col gap-8">
      <div>
        <p className="text-[#C8A96E] text-xs tracking-[0.25em] uppercase font-sans mb-1">Ferramentas</p>
        <h1 className="font-serif text-3xl font-bold text-[#F7F3EE]">Marketing</h1>
      </div>

      {/* Meta Pixel status */}
      <div className="bg-[#2C1A0E] rounded-2xl border border-[#C8A96E]/10 p-6">
        <div className="flex items-center gap-3 mb-4">
          <BarChart2 size={16} className="text-[#C8A96E]" />
          <h2 className="font-serif text-base font-bold text-[#F7F3EE]">Meta Pixel</h2>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium font-sans ${pixelId ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'}`}>
            {pixelId ? 'Ativo' : 'Não configurado'}
          </span>
        </div>
        <p className="text-[#F7F3EE]/40 text-sm font-sans mb-2">
          {pixelId ? `Pixel ID: ${pixelId}` : 'Configure a variável NEXT_PUBLIC_META_PIXEL_ID para ativar o rastreamento.'}
        </p>
        {pixelId && (
          <a
            href={`https://business.facebook.com/events_manager2/list/pixel/${pixelId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-[#C8A96E] hover:underline mt-1"
          >
            Abrir Events Manager <ExternalLink size={11} />
          </a>
        )}
      </div>

      {/* UTM Builder */}
      <div className="bg-[#2C1A0E] rounded-2xl border border-[#C8A96E]/10 p-6">
        <div className="flex items-center gap-3 mb-5">
          <Share2 size={16} className="text-[#C8A96E]" />
          <h2 className="font-serif text-base font-bold text-[#F7F3EE]">Gerador de links UTM</h2>
        </div>
        <div className="flex flex-col gap-3 mb-6">
          <div>
            <label className="text-xs text-[#F7F3EE]/40 font-sans uppercase tracking-wider mb-1.5 block">URL base</label>
            <Input
              value={base}
              onChange={(e) => setBase(e.target.value)}
              className="bg-[#1A1008] border-[#C8A96E]/20 text-[#F7F3EE] text-xs"
            />
          </div>
          <div>
            <label className="text-xs text-[#F7F3EE]/40 font-sans uppercase tracking-wider mb-1.5 block">Campanha</label>
            <Input
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              className="bg-[#1A1008] border-[#C8A96E]/20 text-[#F7F3EE] text-xs"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {links.map(({ source, url }) => (
            <div key={source} className="flex items-center gap-3 bg-[#1A1008] rounded-xl px-4 py-2.5">
              <span className="text-[#C8A96E] text-xs font-semibold uppercase w-20 shrink-0">{source}</span>
              <p className="text-[#F7F3EE]/40 text-xs font-mono truncate flex-1">{url}</p>
              <CopyButton text={url} />
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="bg-[#2C1A0E] rounded-2xl border border-[#C8A96E]/10 p-6">
        <div className="flex items-center gap-3 mb-5">
          <Megaphone size={16} className="text-[#C8A96E]" />
          <h2 className="font-serif text-base font-bold text-[#F7F3EE]">Links rápidos</h2>
        </div>
        <div className="flex flex-col gap-3">
          {[
            { label: 'Meta Ads Manager', href: 'https://adsmanager.facebook.com' },
            { label: 'Google Analytics', href: 'https://analytics.google.com' },
            { label: 'Instagram Insights', href: 'https://instagram.com' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 text-sm font-sans text-[#F7F3EE]/60 hover:text-[#F7F3EE] transition-colors group"
            >
              {label}
              <ExternalLink size={12} className="text-[#F7F3EE]/20 group-hover:text-[#C8A96E] transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
