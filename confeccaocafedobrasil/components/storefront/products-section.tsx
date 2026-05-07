'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PRODUCTS, formatPrice } from '@/lib/products'
import { ArrowRight } from 'lucide-react'

export function ProductsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="produtos" ref={ref} className="bg-[#F7F3EE] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <p className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase font-sans mb-3">
              Coleção 2025
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#2C1A0E] leading-tight text-balance">
              Cada saca tem<br />uma história única.
            </h2>
          </div>
          <p className="text-[#555] text-base leading-relaxed max-w-xs font-sans">
            Apenas 2 modelos. Cada um produzido em série limitada com sacas selecionadas à mão.
          </p>
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Link href={`/produto/${product.slug}`} className="group block">
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#EDE8E0] mb-5">
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="h-full"
                  >
                    <Image
                      src={product.images[0] ?? '/placeholder.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#2C1A0E]/0 group-hover:bg-[#2C1A0E]/20 transition-all duration-500 flex items-end p-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-[#C8A96E] text-[#2C1A0E] text-sm font-semibold px-5 py-2.5 rounded-full flex items-center gap-2"
                    >
                      Ver produto <ArrowRight size={14} />
                    </motion.div>
                  </div>
                </div>

                {/* Info */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#2C1A0E] group-hover:text-[#3B5249] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[#777] text-sm mt-1 font-sans leading-relaxed line-clamp-2">
                      {product.description.slice(0, 90)}...
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-serif text-xl font-bold text-[#2C1A0E]">
                      {formatPrice(product.price)}
                    </p>
                    <p className="text-xs text-[#3B5249] font-sans mt-0.5">em 3× s/ juros</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
