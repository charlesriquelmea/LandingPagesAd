'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'

interface CounterProps {
  target: number
  suffix?: string
  duration?: number
}

function AnimatedCounter({ target, suffix = '', duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const start = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress === 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString('pt-BR')}{suffix}
    </span>
  )
}

const stats = [
  { value: 1240, suffix: '+', label: 'Sacas recicladas', sublabel: 'desde 2021' },
  { value: 380, suffix: 'kg', label: 'CO₂ evitado', sublabel: 'pela não-queima' },
  { value: 8, suffix: '', label: 'Artesãs parceiras', sublabel: 'em Poços de Caldas' },
  { value: 5, suffix: '⭐', label: 'Avaliação média', sublabel: 'de 234 clientes' },
]

export function ImpactCounter() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="bg-[#3B5249] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase font-sans mb-3">Impacto real</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F7F3EE] text-balance">
            Números que importam.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-4xl md:text-5xl font-bold text-[#C8A96E] leading-none">
                {isInView ? (
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                ) : (
                  `0${stat.suffix}`
                )}
              </p>
              <p className="text-[#F7F3EE] font-semibold text-sm mt-3 font-sans">{stat.label}</p>
              <p className="text-[#F7F3EE]/50 text-xs mt-1 font-sans">{stat.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
