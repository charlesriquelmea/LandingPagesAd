import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding products...')

  await prisma.product.upsert({
    where: { slug: 'mochila-cafe-origins' },
    update: {},
    create: {
      id: 'prod_mochila_origins',
      slug: 'mochila-cafe-origins',
      name: 'Mochila Café Origins',
      description:
        'Uma mochila artesanal única, tecida a partir de sacas de juta estampadas de fazendas brasileiras de café. Alças em couro vegano ou algodão trançado, forro interno de algodão reciclado com bolso zíper.',
      price: 18900,
      stock: 50,
      images: ['/images/mochila-cafe-origins-1.jpg', '/images/mochila-cafe-origins-2.jpg'],
      weight: 0.6,
      height: 45,
      width: 35,
      length: 12,
      active: true,
    },
  })

  await prisma.product.upsert({
    where: { slug: 'bolsa-tote-cafe-heritage' },
    update: {},
    create: {
      id: 'prod_bolsa_heritage',
      slug: 'bolsa-tote-cafe-heritage',
      name: 'Bolsa Tote Café Heritage',
      description:
        'Uma tote bag de mercado premium feita de sacas de juta estampadas com logos de fazendas cafeeiras. Alças duplas de sisal natural trançadas à mão.',
      price: 12900,
      stock: 80,
      images: ['/images/bolsa-tote-cafe-heritage-1.jpg', '/images/bolsa-tote-cafe-heritage-2.jpg'],
      weight: 0.4,
      height: 38,
      width: 40,
      length: 10,
      active: true,
    },
  })

  console.log('Seed complete.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
