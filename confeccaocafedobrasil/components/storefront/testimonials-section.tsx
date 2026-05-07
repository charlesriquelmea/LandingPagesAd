'use client'

import { useRef, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Mariana C.',
    city: 'São Paulo, SP',
    text: 'Recebi a mochila e fiquei impressionada com a qualidade. O couro vegano nas alças é incrível, e cada peça realmente parece única. Já recebi vários elogios.',
    stars: 5,
    product: 'Mochila Café Origins',
  },
  {
    name: 'Beatriz L.',
    city: 'Belo Horizonte, MG',
    text: 'A tote é perfeita para o mercado e o dia a dia. Adoro contar a história para as pessoas quando perguntam — de onde veio a estampa. Produto incrível.',
    stars: 5,
    product: 'Bolsa Tote Café Heritage',
  },
  {
    name: 'Carla M.',
    city: 'Curitiba, PR',
    text: 'Comprei como presente e foi um sucesso! A embalagem já é linda, e a bolsa então... resistente, cheirosa de juta, com aquele estilo rústico-chique que adoro.',
    stars: 5,
    product: 'Bolsa Tote Café Heritage',
  },
  {
    name: 'Fernanda O.',
    city: 'Rio de Janeiro, RJ',
    text: 'Produto artesanal de verdade. Dá para sentir o trabalho manual em cada costura. Chegou super bem embalado e no prazo. Recomendo muito!',
    stars: 5,
    product: 'Mochila Café Origins',
  },
  {
    name: 'Sofia R.',
    city: 'Florianópolis, SC',
    text: 'Amo tudo: a causa, o produto, o atendimento. A mochila é espaçosa e o forro interno com zíper é super prático. Minha preferida para viagens curtas.',
    stars: 5,
    product: 'Mochila Café Origins',
  },
]

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', slidesToScroll: 1 })

  const autoplay = useCallback(() => {
    if (!emblaApi) return
    const id = setInterval(() => {
      emblaApi.scrollNext()
    }, 4000)
    return () => clearInterval(id)
  }, [emblaApi])

  useEffect(() => {
    const cleanup = autoplay()
    return cleanup
  }, [autoplay])

  return (
    <section ref={sectionRef} className="bg-[#F7F3EE] py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase font-sans mb-3">Depoimentos</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2C1A0E] text-balance">
            Quem comprou, aprovou.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-5">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="flex-none w-[85vw] md:w-[380px] bg-white rounded-2xl p-7 shadow-sm border border-[#E8E0D5] flex flex-col gap-4"
                >
                  <div className="flex gap-1">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} size={14} className="fill-[#C8A96E] text-[#C8A96E]" />
                    ))}
                  </div>
                  <p className="font-serif text-base text-[#2C1A0E] leading-relaxed flex-1">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold text-sm text-[#2C1A0E] font-sans">{t.name}</p>
                    <p className="text-xs text-[#999] font-sans">{t.city} · {t.product}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
