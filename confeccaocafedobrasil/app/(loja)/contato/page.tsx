import type { Metadata } from 'next'
import { Mail, Instagram, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contato — Confecção Café do Brasil',
  description: 'Entre em contato com a Confecção Café do Brasil.',
}

export default function ContatoPage() {
  return (
    <main className="bg-[#d4cec7] min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-28">
        <p className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase font-sans mb-4">Fale conosco</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#2C1A0E] text-balance mb-12">
          Estamos por aqui.
        </h1>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <a
            href="mailto:oi@confeccaocafebrasil.com.br"
            className="flex items-start gap-4 bg-white p-6 rounded-2xl border border-[#E8E0D5] hover:border-[#C8A96E] transition-colors group"
          >
            <div className="w-11 h-11 rounded-full bg-[#2C1A0E] flex items-center justify-center shrink-0">
              <Mail size={18} className="text-[#C8A96E]" />
            </div>
            <div>
              <p className="font-semibold text-[#2C1A0E] font-sans mb-1">E-mail</p>
              <p className="text-[#666] text-sm font-sans group-hover:text-[#C8A96E] transition-colors">
                oi@confeccaocafebrasil.com.br
              </p>
              <p className="text-[#999] text-xs mt-1 font-sans">Respondemos em até 24h</p>
            </div>
          </a>

          <a
            href="https://instagram.com/confeccaocafebrasil"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 bg-white p-6 rounded-2xl border border-[#E8E0D5] hover:border-[#C8A96E] transition-colors group"
          >
            <div className="w-11 h-11 rounded-full bg-[#2C1A0E] flex items-center justify-center shrink-0">
              <Instagram size={18} className="text-[#C8A96E]" />
            </div>
            <div>
              <p className="font-semibold text-[#2C1A0E] font-sans mb-1">Instagram</p>
              <p className="text-[#666] text-sm font-sans group-hover:text-[#C8A96E] transition-colors">
                @confeccaocafebrasil
              </p>
              <p className="text-[#999] text-xs mt-1 font-sans">DM aberto todos os dias</p>
            </div>
          </a>

          <div className="flex items-start gap-4 bg-white p-6 rounded-2xl border border-[#E8E0D5]">
            <div className="w-11 h-11 rounded-full bg-[#2C1A0E] flex items-center justify-center shrink-0">
              <MapPin size={18} className="text-[#C8A96E]" />
            </div>
            <div>
              <p className="font-semibold text-[#2C1A0E] font-sans mb-1">Localização</p>
              <p className="text-[#666] text-sm font-sans">Poços de Caldas, MG</p>
              <p className="text-[#999] text-xs mt-1 font-sans">Sem loja física — venda 100% online</p>
            </div>
          </div>
        </div>

        <div className="bg-[#2C1A0E] rounded-2xl p-8 text-center">
          <p className="font-serif text-2xl font-bold text-[#F7F3EE] mb-3">
            Revendedor ou atacado?
          </p>
          <p className="text-[#F7F3EE]/70 text-sm font-sans mb-6 max-w-sm mx-auto">
            Temos condições especiais para boutiques, lojas de produtos naturais e espaços culturais. Entre em contato por e-mail com o assunto &quot;Revenda&quot;.
          </p>
          <a
            href="mailto:oi@confeccaocafebrasil.com.br?subject=Revenda"
            className="inline-block bg-[#C8A96E] text-[#2C1A0E] font-semibold px-8 py-3 rounded-full text-sm hover:bg-[#B8976A] transition-colors"
          >
            Enviar e-mail de revenda
          </a>
        </div>
      </div>
    </main>
  )
}
