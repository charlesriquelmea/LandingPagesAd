'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ShoppingBag, Package, Truck, Leaf, ChevronRight, Star } from 'lucide-react'
import type { Product } from '@/lib/types'
import { formatPrice } from '@/lib/products'
import { trackViewContent, trackAddToCart } from '@/lib/pixel'
import { useCart } from '@/hooks/use-cart'

interface Props {
  product: Product
  crossSell?: Product
}

const tabs = [
  { id: 'produto', label: 'O Produto' },
  { id: 'feito', label: 'Como é feito' },
  { id: 'cuidados', label: 'Cuidados' },
] as const

const tabContent: Record<string, Record<string, string>> = {
  'mochila-cafe-origins': {
    produto: 'A Mochila Café Origins é confeccionada com sacas de juta estampadas, coletadas de fazendas parceiras no sul de Minas Gerais. Com capacidade aproximada de 15 litros, possui forro interno de algodão reciclado e bolso com zíper. Alças em couro vegano ou algodão trançado, ajustáveis. Fechamento com ímã de couro. Dimensões: 35 × 45 × 12 cm.',
    feito: 'Cada saca passa por triagem manual, lavagem ecológica e corte artesanal. Costuradas por artesãs de Poços de Caldas, cada mochila leva em média 4 horas de trabalho. As variações de estampa são naturais — a saca de uma fazenda diferente trará um logo diferente, o que torna cada peça verdadeiramente única.',
    cuidados: 'Lavar à mão com sabão neutro em água fria. Não torcer. Secar à sombra, na horizontal. Não usar alvejante. A juta pode relaxar com o uso — isso é natural e parte do envelhecimento bonito da peça. Armazenar em local seco, longe de umidade.',
  },
  'bolsa-tote-cafe-heritage': {
    produto: 'A Bolsa Tote Café Heritage celebra o estilo mercado premium — sem forro, com a textura da juta à mostra. Alças duplas de sisal natural trançadas à mão com acabamento artesanal. Dimensões: 40 × 38 × 10 cm. Ideal para compras, praia, dia a dia. Cada saca carrega o logotipo original da fazenda.',
    feito: 'As sacas são selecionadas por tamanho e qualidade de estampa. Lavadas, prensadas e cortadas por artesãs locais. O sisal das alças é importado de Minas Gerais e trançado à mão em pares, levando cerca de 2 horas por par. Cada tote leva 3 horas de trabalho artesanal no total.',
    cuidados: 'Lavar à mão com sabão neutro. Não imergir completamente — apenas esfregar as partes sujas com pano úmido. Secar ao sol por no máximo 20 minutos para evitar desbotamento. As alças de sisal ficam melhores com o tempo de uso. Guardar recheada de papel kraft para manter a forma.',
  },
}

export function ProductDetail({ product, crossSell }: Props) {
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState<'produto' | 'feito' | 'cuidados'>('produto')
  const [added, setAdded] = useState(false)
  const [buying, setBuying] = useState(false)
  const { addItem } = useCart()
  const router = useRouter()

  useEffect(() => {
    trackViewContent(product.id, product.name, product.price)
  }, [product.id, product.name, product.price])

  const cartPayload = {
    productId: product.id,
    sku: product.sku,
    slug: product.slug,
    name: product.name,
    price: product.price,
    quantity: 1,
    image: product.images[0] ?? '',
    weight: product.weight,
    height: product.height,
    width: product.width,
    length: product.length,
  }

  function handleAddToCart() {
    addItem(cartPayload)
    trackAddToCart(product.id, product.price)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  function handleBuyNow() {
    addItem(cartPayload)
    trackAddToCart(product.id, product.price)
    setBuying(true)
    setTimeout(() => router.push('/checkout'), 1000)
  }

  const content = tabContent[product.slug] ?? {}

  return (
    <>
      <div className="min-h-screen bg-[#F7F3EE] pt-16">
        <div className="max-w-6xl mx-auto px-6 py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#999] font-sans mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#2C1A0E] transition-colors">Início</Link>
            <ChevronRight size={12} />
            <Link href="/#produtos" className="hover:text-[#2C1A0E] transition-colors">Produtos</Link>
            <ChevronRight size={12} />
            <span className="text-[#2C1A0E] font-medium">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* Image gallery */}
            <div className="flex flex-col gap-4">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-square rounded-2xl overflow-hidden bg-[#EDE8E0] cursor-zoom-in"
              >
                <Image
                  src={product.images[activeImage] ?? '/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  loading="eager"
                />
              </motion.div>
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === i ? 'border-[#2C1A0E]' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    aria-label={`Ver imagem ${i + 1}`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
              <div className="bg-[#2C1A0E]/5 rounded-xl p-4 flex gap-3 items-start">
                <Star size={16} className="text-[#C8A96E] mt-0.5 shrink-0" />
                <p className="text-xs text-[#555] font-sans leading-relaxed">
                  <strong className="text-[#2C1A0E]">Cada peça é única.</strong> A estampa da saca varia conforme a fazenda de origem — você receberá uma peça com logo autêntico de uma fazenda brasileira.
                </p>
              </div>
            </div>

            {/* Product info */}
            <div className="flex flex-col gap-7">
              <div>
                <p className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase font-sans mb-2">
                  Juta reciclada · Feito à mão
                </p>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#2C1A0E] leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => <Star key={s} size={13} className="fill-[#C8A96E] text-[#C8A96E]" />)}
                  </div>
                  <span className="text-xs text-[#999] font-sans">5.0 (47 avaliações)</span>
                </div>
                <p className="font-serif text-3xl font-bold text-[#2C1A0E] mt-4">
                  {formatPrice(product.price)}
                </p>
                <p className="text-xs text-[#3B5249] font-sans mt-1">
                  ou 3× de {formatPrice(Math.ceil(product.price / 3))} sem juros
                </p>
              </div>

              {/* Tabs */}
              <div>
                <div className="flex border-b border-[#E8E0D5] gap-0">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`pb-3 pr-5 text-sm font-sans transition-all border-b-2 -mb-px ${
                        activeTab === tab.id
                          ? 'border-[#2C1A0E] text-[#2C1A0E] font-semibold'
                          : 'border-transparent text-[#999] hover:text-[#555]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <motion.p
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-[#555] text-sm leading-relaxed font-sans mt-4"
                >
                  {content[activeTab] ?? product.description}
                </motion.p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Leaf, label: '100% reciclado' },
                  { icon: Package, label: 'Frete grátis +R$250' },
                  { icon: Truck, label: 'Envio em 2–3 dias' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="bg-white rounded-xl p-3 flex flex-col items-center gap-2 text-center border border-[#E8E0D5]">
                    <Icon size={18} className="text-[#3B5249]" />
                    <span className="text-xs text-[#555] font-sans">{label}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.97 }}
                animate={{ backgroundColor: added ? '#3B5249' : '#2C1A0E' }}
                transition={{ duration: 0.2 }}
                className="w-full py-4 rounded-full text-[#F7F3EE] font-semibold text-base cursor-pointer
                flex items-center justify-center gap-3 shadow-lg"
              >
                <ShoppingBag size={18} />
                {added ? 'Adicionado ao carrinho!' : 'Adicionar ao carrinho'}
              </motion.button>

              <motion.button
                onClick={handleBuyNow}
                disabled={buying}
                whileTap={{ scale: 0.97 }}
                animate={{
                  backgroundColor: buying ? '#3B5249' : 'transparent',
                  color: buying ? '#F7F3EE' : '#2C1A0E',
                  borderColor: buying ? '#3B5249' : '#2C1A0E',
                }}
                transition={{ duration: 0.2 }}
                className="w-full py-4 rounded-full border-2 font-semibold text-base cursor-pointer
                flex items-center justify-center gap-3"
              >
                {buying ? 'Redirecionando...' : 'Comprar agora'}
              </motion.button>
            </div>
          </div>

          {/* Cross-sell */}
          {crossSell && (
            <div className="mt-20 border-t border-[#E8E0D5] pt-14">
              <p className="text-[#C8A96E] text-xs tracking-[0.3em] uppercase font-sans mb-3">Complete o look</p>
              <h2 className="font-serif text-2xl font-bold text-[#2C1A0E] mb-8">Você também vai amar</h2>
              <Link href={`/produto/${crossSell.slug}`} className="group flex flex-col sm:flex-row gap-6 items-center bg-white rounded-2xl p-6 border border-[#E8E0D5] hover:shadow-md transition-shadow max-w-lg">
                <div className="relative w-28 h-28 rounded-xl overflow-hidden shrink-0 bg-[#EDE8E0]">
                  <Image src={crossSell.images[0] ?? ''} alt={crossSell.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="112px" />
                </div>
                <div className="flex-1">
                  <p className="font-serif text-lg font-semibold text-[#2C1A0E] group-hover:text-[#3B5249] transition-colors">{crossSell.name}</p>
                  <p className="text-sm text-[#777] font-sans mt-1 line-clamp-2">{crossSell.description.slice(0, 80)}...</p>
                  <p className="font-bold text-[#2C1A0E] mt-2">{formatPrice(crossSell.price)}</p>
                </div>
                <ChevronRight size={20} className="text-[#C8A96E] shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white border-t border-[#E8E0D5] px-6 py-4 flex gap-3 shadow-2xl">
        <div className="flex-1">
          <p className="font-serif font-bold text-[#2C1A0E]">{formatPrice(product.price)}</p>
          <p className="text-xs text-[#999] font-sans">3× s/ juros</p>
        </div>
        <motion.button
          onClick={handleAddToCart}
          whileTap={{ scale: 0.97 }}
          animate={{ backgroundColor: added ? '#3B5249' : '#2C1A0E' }}
          transition={{ duration: 0.2 }}
          className="text-[#F7F3EE] font-semibold px-6 py-3 rounded-full text-sm flex items-center gap-2"
        >
          <ShoppingBag size={16} />
          {added ? 'Adicionado!' : 'Adicionar ao carrinho'}
        </motion.button>
      </div>
    </>
  )
}
