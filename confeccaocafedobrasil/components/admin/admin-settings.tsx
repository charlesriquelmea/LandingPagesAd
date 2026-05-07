'use client'

import { Settings, Key, Truck, Mail, ShieldCheck } from 'lucide-react'

const ENV_VARS = [
  { key: 'DATABASE_URL', label: 'Supabase Database URL', icon: ShieldCheck, desc: 'String de conexão PostgreSQL do Supabase (pooled).' },
  { key: 'DIRECT_URL', label: 'Supabase Direct URL', icon: ShieldCheck, desc: 'URL direta para migrações (non-pooled).' },
  { key: 'INFINITEPAY_API_KEY', label: 'InfinitePay API Key', icon: Key, desc: 'Chave de API para criação de links de pagamento.' },
  { key: 'INFINITEPAY_WEBHOOK_SECRET', label: 'InfinitePay Webhook Secret', icon: Key, desc: 'Secret para validar notificações de pagamento.' },
  { key: 'MELHOR_ENVIO_TOKEN', label: 'Melhor Envio Token', icon: Truck, desc: 'Token OAuth do Melhor Envio para cálculo de frete.' },
  { key: 'MELHOR_ENVIO_CEP_ORIGEM', label: 'CEP de Origem', icon: Truck, desc: 'CEP do endereço de despacho (ex: 37701000).' },
  { key: 'RESEND_API_KEY', label: 'Resend API Key', icon: Mail, desc: 'Chave da Resend para envio de e-mails transacionais.' },
  { key: 'RESEND_FROM_EMAIL', label: 'E-mail de Envio', icon: Mail, desc: 'Endereço de origem dos e-mails (ex: oi@confeccaocafebrasil.com.br).' },
  { key: 'ADMIN_PASSWORD', label: 'Senha do Admin', icon: ShieldCheck, desc: 'Senha de acesso ao painel administrativo.' },
  { key: 'NEXT_PUBLIC_META_PIXEL_ID', label: 'Meta Pixel ID', icon: Key, desc: 'ID do pixel do Facebook para rastreamento.' },
  { key: 'NEXT_PUBLIC_APP_URL', label: 'URL da Aplicação', icon: Settings, desc: 'URL pública do site (ex: https://confeccaocafebrasil.com.br).' },
]

export function AdminSettings() {
  return (
    <div className="p-6 md:p-8 flex flex-col gap-8">
      <div>
        <p className="text-[#C8A96E] text-xs tracking-[0.25em] uppercase font-sans mb-1">Sistema</p>
        <h1 className="font-serif text-3xl font-bold text-[#F7F3EE]">Configurações</h1>
      </div>

      {/* Env vars reference */}
      <div className="bg-[#2C1A0E] rounded-2xl border border-[#C8A96E]/10 p-6">
        <h2 className="font-serif text-lg font-bold text-[#F7F3EE] mb-2">Variáveis de ambiente</h2>
        <p className="text-[#F7F3EE]/40 text-sm font-sans mb-6">
          Configure estas variáveis no painel do Vercel em{' '}
          <span className="font-mono text-[#C8A96E]">Settings → Environment Variables</span>.
        </p>
        <div className="flex flex-col gap-3">
          {ENV_VARS.map(({ key, label, icon: Icon, desc }) => (
            <div key={key} className="flex items-start gap-4 bg-[#1A1008] rounded-xl p-4 border border-[#C8A96E]/5">
              <div className="w-8 h-8 rounded-lg bg-[#C8A96E]/10 flex items-center justify-center shrink-0 mt-0.5">
                <Icon size={13} className="text-[#C8A96E]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <p className="font-mono text-xs text-[#C8A96E] font-bold">{key}</p>
                  <p className="text-[#F7F3EE]/40 text-xs font-sans">{label}</p>
                </div>
                <p className="text-[#F7F3EE]/25 text-xs font-sans mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Webhook URLs */}
      <div className="bg-[#2C1A0E] rounded-2xl border border-[#C8A96E]/10 p-6">
        <h2 className="font-serif text-lg font-bold text-[#F7F3EE] mb-5">URLs de webhook</h2>
        <div className="flex flex-col gap-3">
          {[
            { label: 'InfinitePay', url: '/api/webhooks/infinitepay', desc: 'Notificações de pagamento aprovado/recusado.' },
          ].map(({ label, url, desc }) => (
            <div key={label} className="bg-[#1A1008] rounded-xl p-4 border border-[#C8A96E]/5">
              <p className="text-sm font-semibold text-[#F7F3EE]/70 font-sans mb-1">{label}</p>
              <p className="font-mono text-xs text-[#C8A96E] mb-1">
                {'<NEXT_PUBLIC_APP_URL>'}{url}
              </p>
              <p className="text-[#F7F3EE]/25 text-xs font-sans">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Integrations info */}
      <div className="bg-[#2C1A0E] rounded-2xl border border-[#C8A96E]/10 p-6">
        <h2 className="font-serif text-lg font-bold text-[#F7F3EE] mb-5">Integrações ativas</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { name: 'Supabase', desc: 'Banco de dados PostgreSQL' },
            { name: 'InfinitePay', desc: 'Processamento de pagamentos' },
            { name: 'Melhor Envio', desc: 'Cálculo e gestão de frete' },
            { name: 'Resend', desc: 'E-mails transacionais' },
            { name: 'Meta Pixel', desc: 'Rastreamento de conversões' },
            { name: 'Prisma ORM', desc: 'Acesso ao banco de dados' },
          ].map(({ name, desc }) => (
            <div key={name} className="bg-[#1A1008] rounded-xl p-4 border border-[#C8A96E]/5">
              <p className="text-sm font-semibold text-[#F7F3EE]/80 font-sans">{name}</p>
              <p className="text-xs text-[#F7F3EE]/30 font-sans mt-0.5">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
