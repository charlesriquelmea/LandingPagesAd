'use server'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { createPaymentLink } from '@/lib/infinitepay'

const schema = z.object({
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(10),
  customerCpf: z.string().min(11),
  addressCep: z.string().min(8),
  addressStreet: z.string().min(2),
  addressNumber: z.string().min(1),
  addressComplement: z.string().optional(),
  addressNeighborhood: z.string().min(2),
  addressCity: z.string().min(2),
  addressState: z.string().length(2),
  shippingServiceId: z.number().int().positive(),
  shippingPrice: z.number().int().nonnegative(),
  shippingName: z.string(),
  items: z.array(
    z.object({
      productId: z.string(),
      slug: z.string(),
      name: z.string(),
      price: z.number().int().positive(),
      quantity: z.number().int().positive(),
    }),
  ).min(1),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = schema.parse(body)

    const subtotal = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const totalAmount = subtotal + data.shippingPrice

    // Create order in DB first to get the ID (used as order_nsu)
    const order = await prisma.order.create({
      data: {
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        customerCpf: data.customerCpf,
        subtotal,
        shippingAmount: data.shippingPrice,
        totalAmount,
        addressCep: data.addressCep.replace(/\D/g, ''),
        addressStreet: data.addressStreet,
        addressNumber: data.addressNumber,
        addressComplement: data.addressComplement ?? null,
        addressNeighborhood: data.addressNeighborhood,
        addressCity: data.addressCity,
        addressState: data.addressState,
        infinitePayOrderNsu: `ORDER-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.price,
          })),
        },
      },
    })

    const appUrl = 'https://confeccaocafebrasil.com.br'
    const link = await createPaymentLink({
      orderId: order.infinitePayOrderNsu,
      items: data.items.map((item) => ({
        quantity: item.quantity,
        price: item.price,
        description: item.name,
      })),
      customer: {
        name: data.customerName,
        email: data.customerEmail,
        phone_number: data.customerPhone.replace(/\D/g, ''),
      },
      address: {
        cep: data.addressCep.replace(/\D/g, ''),
        street: data.addressStreet,
        neighborhood: data.addressNeighborhood,
        number: data.addressNumber,
        complement: data.addressComplement,
      },
      redirectUrl: `${appUrl}/pedido/${order.id}`,
      webhookUrl: `${appUrl}/api/webhooks/infinitepay`,
    })

    await prisma.order.update({
      where: { id: order.id },
      data: {
        infinitePayLink: link.url,
        infinitePaySlug: link.slug ?? null,
      },
    })

    return NextResponse.json({ url: link.url, orderId: order.id })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos', details: err.issues }, { status: 400 })
    }
    console.error('[create-link]', err)
    return NextResponse.json({ error: 'Erro ao criar link de pagamento' }, { status: 500 })
  }
}
