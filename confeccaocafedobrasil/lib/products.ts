import type { Product } from '@/lib/types'

// Static product data — seeded once, then served from DB.
// Used as fallback when DB is unreachable in dev.
export const PRODUCTS: Product[] = [
  {
    id: 'prod_mochila_origins',
    slug: 'mochila-cafe-origins',
    name: 'Mochila Café Origins',
    description:
      'Uma mochila artesanal única, tecida a partir de sacas de juta estampadas de fazendas brasileiras de café. Alças em couro vegano ou algodão trançado, forro interno de algodão reciclado com bolso zíper. Cada peça carrega a história de uma colheita.',
    price: 18900,
    stock: 50,
    images: [
      '/images/mochila-cafe-origins-1.jpg',
      '/images/mochila-cafe-origins-2.jpg',
    ],
    weight: 0.6,
    height: 45,
    width: 35,
    length: 12,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'prod_bolsa_heritage',
    slug: 'bolsa-tote-cafe-heritage',
    name: 'Bolsa Tote Café Heritage',
    description:
      'Uma tote bag de mercado premium feita de sacas de juta estampadas com logos de fazendas cafeeiras. Alças duplas de sisal natural trançadas à mão. Sem forro — estilo minimalista que valoriza a textura bruta da juta. Cada saca é selecionada manualmente.',
    price: 12900,
    stock: 80,
    images: [
      '/images/bolsa-tote-cafe-heritage-1.jpg',
      '/images/bolsa-tote-cafe-heritage-2.jpg',
    ],
    weight: 0.4,
    height: 38,
    width: 40,
    length: 10,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getOtherProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug !== slug)
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100)
}
