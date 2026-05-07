import { HeroSection } from '@/components/storefront/hero-section'
import { ProductsSection } from '@/components/storefront/products-section'
import { BrandStory } from '@/components/storefront/brand-story'
import { TestimonialsSection } from '@/components/storefront/testimonials-section'
import { ImpactCounter } from '@/components/storefront/impact-counter'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Confecção Café do Brasil — Bolsas Artesanais de Juta',
  description:
    'Bolsas e mochilas únicas, feitas à mão com sacas de juta recicladas de fazendas brasileiras de café. Moda sustentável com alma mineira.',
  openGraph: {
    images: [{ url: '/images/hero-coffee-farm.jpg', width: 1200, height: 630 }],
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductsSection />
      <BrandStory />
      <ImpactCounter />
      <TestimonialsSection />
    </>
  )
}
