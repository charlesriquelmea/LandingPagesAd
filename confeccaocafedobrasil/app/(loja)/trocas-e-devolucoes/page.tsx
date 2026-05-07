import type { Metadata } from 'next'
import Link from 'next/link'
import { RotateCcw, PackageCheck, Clock, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Trocas e Devoluções — Confecção Café do Brasil',
  description: 'Política de trocas e devoluções da Confecção Café do Brasil.',
}

const steps = [
  {
    icon: Mail,
    title: 'Entre em contato',
    body: 'Envie um e-mail para oi@confeccaocafebrasil.com.br com o número do pedido e o motivo dentro de 7 dias do recebimento.',
  },
  {
    icon: PackageCheck,
    title: 'Envie o produto',
    body: 'Após nossa confirmação, envie o item com embalagem original e sem sinais de uso. O frete de devolução é por nossa conta em casos de defeito.',
  },
  {
    icon: RotateCcw,
    title: 'Troca ou reembolso',
    body: 'Após recebermos e inspecionarmos o produto, processamos a troca por outro modelo ou reembolso integral em até 5 dias úteis.',
  },
]

export default function TrocasPage() {
  return (
    <main className="bg-[#F7F3EE] min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-28">
        <p className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase font-sans mb-4">Pós-compra</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#2C1A0E] text-balance mb-4">
          Trocas e Devoluções
        </h1>
        <p className="text-[#666] text-base font-sans leading-relaxed mb-16 max-w-xl">
          Sua satisfação é nossa prioridade. Se algo não estiver certo, estamos aqui para resolver.
        </p>

        {/* Process */}
        <div className="grid gap-6 mb-16">
          {steps.map((s, i) => (
            <div key={s.title} className="flex gap-5 bg-white rounded-2xl p-6 border border-[#E8E0D5]">
              <div className="flex flex-col items-center gap-2 shrink-0">
                <div className="w-11 h-11 rounded-full bg-[#2C1A0E] flex items-center justify-center">
                  <s.icon size={18} className="text-[#C8A96E]" />
                </div>
                <span className="text-xs font-bold text-[#C8A96E] font-sans">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#2C1A0E] mb-2">{s.title}</h3>
                <p className="text-[#666] text-sm font-sans leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Policy highlights */}
        <div className="bg-[#2C1A0E] rounded-2xl p-8 mb-12">
          <h2 className="font-serif text-xl font-bold text-[#F7F3EE] mb-6">Resumo da política</h2>
          <ul className="flex flex-col gap-3">
            {[
              '7 dias para solicitar troca ou devolução após recebimento (Código de Defesa do Consumidor)',
              'Produto deve estar sem uso, com etiquetas e embalagem original',
              'Defeitos de fabricação: frete de devolução por nossa conta',
              'Arrependimento: frete de devolução por conta do cliente',
              'Reembolso em até 5 dias úteis após inspeção do produto',
              'Não aceitamos devoluções de produtos que apresentem sinais de uso intenso ou danos causados pelo cliente',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-[#F7F3EE]/80 text-sm font-sans leading-relaxed">
                <span className="text-[#C8A96E] shrink-0 mt-0.5">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Prazo */}
        <div className="flex items-start gap-4 bg-[#EDE8E0] rounded-2xl p-6 mb-10 border border-[#E8E0D5]">
          <Clock size={22} className="text-[#C8A96E] shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-[#2C1A0E] font-sans mb-1">Prazo de resposta</p>
            <p className="text-[#666] text-sm font-sans">Respondemos todas as solicitações em até 24 horas em dias úteis.</p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/contato"
            className="inline-block bg-[#2C1A0E] text-[#F7F3EE] font-semibold px-10 py-4 rounded-full text-base hover:bg-[#3d2510] transition-colors"
          >
            Iniciar solicitação
          </Link>
        </div>
      </div>
    </main>
  )
}
