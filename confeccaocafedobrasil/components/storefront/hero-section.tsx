'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const words = ['Juta.', 'Café.', 'Arte.', 'Brasil.']

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -80])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Background image with parallax */}
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src="/images/hero-coffee-farm.jpg"
          alt="Fazenda de café em Minas Gerais ao amanhecer"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2C1A0E]/60 via-[#2C1A0E]/40 to-[#2C1A0E]/70" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 pt-16"
      >
        {/* Kicker */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-[#C8A96E] text-xs tracking-[0.35em] uppercase font-sans mb-6"
        >
          Moda sustentável · Minas Gerais, Brasil
        </motion.p>

        {/* Headline */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-[#F7F3EE] leading-none mb-4">
          {['De', 'saca', 'a', 'obra'].map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="inline-block mr-4"
            >
              {word}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-[#C8A96E] inline-block"
          >
            de arte.
          </motion.span>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="text-[#F7F3EE]/75 text-lg md:text-xl max-w-xl leading-relaxed mt-6 font-sans"
        >
          Bolsas e mochilas feitas à mão com sacas de juta recicladas de fazendas de café do interior de Minas Gerais. Cada peça é única.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mt-10"
        >
          <Link
            href="#produtos"
            className="bg-[#C8A96E] text-[#2C1A0E] font-semibold px-8 py-4 rounded-full text-base hover:bg-[#B8976A] transition-colors text-center"
          >
            Ver coleção
          </Link>
          <Link
            href="/sobre"
            className="border border-[#F7F3EE]/40 text-[#F7F3EE] font-medium px-8 py-4 rounded-full text-base hover:border-[#C8A96E] hover:text-[#C8A96E] transition-colors text-center"
          >
            Nossa história
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#F7F3EE]/50"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-sans">Descer</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
