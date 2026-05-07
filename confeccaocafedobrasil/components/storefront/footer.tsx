import Link from 'next/link'
import { Instagram, MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#2C1A0E] text-[#F7F3EE]/70">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <div>
            <p className="font-serif text-xl text-[#F7F3EE] font-semibold">Café do Brasil</p>
            <p className="text-[10px] text-[#C8A96E] tracking-[0.3em] uppercase mt-0.5">Confecção</p>
          </div>
          <p className="text-sm leading-relaxed text-[#F7F3EE]/60 max-w-xs">
            Cada peça carrega a história de uma saca de juta, de uma fazenda mineira e de mãos artesãs.
          </p>
          <div className="flex gap-4 mt-2">
            <a
              href="https://instagram.com/confeccaocafebrasil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F7F3EE]/60 hover:text-[#C8A96E] transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://wa.me/5531999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F7F3EE]/60 hover:text-[#C8A96E] transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3">
          <p className="text-xs text-[#C8A96E] tracking-[0.2em] uppercase font-sans mb-1">Navegação</p>
          {[
            { href: '/', label: 'Início' },
            { href: '/produto/mochila-cafe-origins', label: 'Mochila Café Origins' },
            { href: '/produto/bolsa-tote-cafe-heritage', label: 'Bolsa Tote Café Heritage' },
            { href: '/sobre', label: 'Nossa história' },
            { href: '/contato', label: 'Contato' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="text-sm hover:text-[#C8A96E] transition-colors">
              {label}
            </Link>
          ))}
        </div>

        {/* Policies */}
        <div className="flex flex-col gap-3">
          <p className="text-xs text-[#C8A96E] tracking-[0.2em] uppercase font-sans mb-1">Informações</p>
          {[
            { href: '/trocas-e-devolucoes', label: 'Trocas e Devoluções' },
            { href: '/privacidade', label: 'Política de Privacidade' },
            { href: '/contato', label: 'Fale Conosco' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="text-sm hover:text-[#C8A96E] transition-colors">
              {label}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-[#F7F3EE]/10">
            <p className="text-xs text-[#F7F3EE]/40">Poços de Caldas, Minas Gerais</p>
            <p className="text-xs text-[#F7F3EE]/40 mt-1">CNPJ: 00.000.000/0001-00</p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#F7F3EE]/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-xs text-[#F7F3EE]/40">
            &copy; {new Date().getFullYear()} Confecção Café do Brasil. Todos os direitos reservados.
          </p>
          <p className="text-xs text-[#F7F3EE]/30">
            Moda sustentável do cerrado para o mundo.
          </p>
        </div>
      </div>
    </footer>
  )
}
