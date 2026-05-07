'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const acts = [
  {
    number: '01',
    title: 'A fazenda',
    body: 'Nas montanhas de Minas Gerais, cada saca de café percorre centenas de quilômetros carregando os grãos que aquecem o Brasil. Após cumprir sua missão, elas estavam destinadas ao lixo.',
  },
  {
    number: '02',
    title: 'As mãos artesãs',
    body: 'Artesãs de Poços de Caldas aprenderam a dar nova vida a essas sacas. Com linhas, agulhas e amor, transformam cada peça em algo único — com a alma e o carimbo da fazenda original.',
  },
  {
    number: '03',
    title: 'Para você',
    body: 'Quando você carrega uma peça da Confecção Café do Brasil, não está apenas comprando uma bolsa. Você leva um pedaço do cerrado, da cultura e do trabalho brasileiro.',
  },
]

export function BrandStory() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="bg-[#2C1A0E] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="/images/artisan-crafting.jpg"
                alt="Artesã tecendo bolsa de juta em Poços de Caldas"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/40 to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-[#C8A96E] rounded-2xl p-5 shadow-2xl"
            >
              <p className="font-serif text-3xl font-bold text-[#2C1A0E] leading-none">100%</p>
              <p className="text-[#2C1A0E]/80 text-xs font-sans mt-1 tracking-wide">Reciclado &amp; artesanal</p>
            </motion.div>
          </motion.div>

          {/* Right — story */}
          <div className="flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase font-sans mb-3">
                Nossa história
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F7F3EE] leading-tight text-balance">
                Da colheita<br />ao seu ombro.
              </h2>
            </motion.div>

            {acts.map((act, i) => (
              <motion.div
                key={act.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                className="flex gap-5"
              >
                <span className="font-serif text-4xl font-bold text-[#C8A96E]/30 leading-none shrink-0 w-10">
                  {act.number}
                </span>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#C8A96E] mb-1">{act.title}</h3>
                  <p className="text-[#F7F3EE]/65 text-sm leading-relaxed font-sans">{act.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
