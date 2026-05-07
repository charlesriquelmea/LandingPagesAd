'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/hooks/use-cart'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const itemCount = useCart((s) => s.itemCount())

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#2C1A0E]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-tight group">
          <span className="font-serif text-base font-semibold text-[#F7F3EE] tracking-wide group-hover:text-[#C8A96E] transition-colors">
            Café do Brasil
          </span>
          <span className="text-[10px] text-[#C8A96E] tracking-[0.25em] uppercase font-sans">
            Confecção
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { href: '/#produtos', label: 'Produtos' },
            { href: '/sobre', label: 'Nossa história' },
            { href: '/contato', label: 'Contato' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-[#F7F3EE]/80 hover:text-[#C8A96E] transition-colors font-sans tracking-wide"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/checkout"
            className="relative flex items-center gap-2 bg-[#C8A96E] text-[#2C1A0E] text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#B8976A] transition-colors"
          >
            <ShoppingBag size={14} />
            Carrinho
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#3B5249] text-[#F7F3EE] text-[10px] font-bold flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#F7F3EE] p-1"
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#2C1A0E] border-t border-[#C8A96E]/20"
          >
            <nav className="flex flex-col px-6 py-6 gap-5">
              {[
                { href: '/#produtos', label: 'Produtos' },
                { href: '/sobre', label: 'Nossa história' },
                { href: '/contato', label: 'Contato' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="text-[#F7F3EE]/80 hover:text-[#C8A96E] font-sans text-base transition-colors"
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 bg-[#C8A96E] text-[#2C1A0E] font-semibold py-3 rounded-full"
              >
                <ShoppingBag size={16} />
                Comprar agora
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
