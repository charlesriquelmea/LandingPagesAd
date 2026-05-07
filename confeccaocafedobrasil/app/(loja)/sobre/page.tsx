import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Nossa História — Confecção Café do Brasil',
  description: 'Conheça a história por trás das bolsas artesanais de juta reciclada de fazendas de café de Minas Gerais.',
}

export default function SobrePage() {
  return (
    <main className="bg-[#F7F3EE]">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] flex items-end overflow-hidden">
        <Image
          src="/images/artisan-crafting.jpg"
          alt="Artesã trabalhando com sacas de juta"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/80 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-16 w-full">
          <p className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase font-sans mb-3">Nossa história</p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#F7F3EE] text-balance leading-tight">
            De Minas Gerais<br />para o mundo.
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="prose prose-lg max-w-none text-[#2C1A0E] font-sans">
          <p className="text-xl leading-relaxed mb-8 font-medium text-[#2C1A0E]">
            A Confecção Café do Brasil nasceu em 2021, em Poços de Caldas, Minas Gerais — no coração do maior cinturão cafeeiro do Brasil.
          </p>
          <p className="leading-relaxed mb-6 text-[#444]">
            Tudo começou com uma pergunta simples: o que acontece com as sacas de juta depois que o café é entregue? A resposta era desanimadora — a maioria é queimada, gerando toneladas de CO₂ desnecessariamente.
          </p>
          <p className="leading-relaxed mb-6 text-[#444]">
            Decidimos mudar isso. Parceiros com fazendas locais de Poços de Caldas, Botelhos e Monte Belo, hoje coletamos centenas de sacas por mês. Cada saca chega estampada com o nome, localização e lote da fazenda que a produziu — uma identidade única que preservamos em cada peça.
          </p>
          <p className="leading-relaxed mb-6 text-[#444]">
            Trabalhamos com 8 artesãs da região, todas parceiras independentes que recebem por peça acima da média de mercado. Cada bolsa leva entre 3 e 6 horas de trabalho manual: seleção da saca, lavagem, corte, costura e acabamento.
          </p>
          <p className="leading-relaxed text-[#444]">
            O resultado é uma peça que conta uma história real — de qual fazenda veio, quais mãos a produziram, e por que cada detalhe importa. Moda lenta. Moda com alma.
          </p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-[#E8E0D5]">
          {[
            { n: '2021', label: 'Fundada em' },
            { n: '8', label: 'Artesãs parceiras' },
            { n: '1.240+', label: 'Sacas recicladas' },
            { n: '380 kg', label: 'CO₂ evitado' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-3xl font-bold text-[#C8A96E]">{s.n}</p>
              <p className="text-sm text-[#666] font-sans mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Link
            href="/#produtos"
            className="inline-block bg-[#2C1A0E] text-[#F7F3EE] font-semibold px-10 py-4 rounded-full text-base hover:bg-[#3d2510] transition-colors"
          >
            Ver a coleção
          </Link>
        </div>
      </section>
    </main>
  )
}
