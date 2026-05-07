import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProductBySlug, getOtherProduct, PRODUCTS, formatPrice } from '@/lib/products'
import { ProductDetail } from '@/components/product/product-detail'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}

  return {
    title: `${product.name} — Confecção Café do Brasil`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0] ?? '', width: 800, height: 1000 }],
      type: 'website',
    },
  }
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const crossSell = getOtherProduct(slug)

  return <ProductDetail product={product} crossSell={crossSell} />
}
