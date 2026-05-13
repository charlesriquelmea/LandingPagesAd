import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { addToCart, checkoutLabel } from '@/lib/melhorenvio'
import { sendOrderShipped } from '@/lib/email'

const schema = z.object({
  orderId: z.string(),
  shippingServiceId: z.number().int().positive(),
})

export async function POST(request: Request) {
  // Basic admin auth
  const token = request.headers.get('x-admin-token')
  if (token !== '') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { orderId, shippingServiceId } = schema.parse(body)

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { product: true } } },
    })

    if (!order) return NextResponse.json({ error: 'Pedido não encontrado' }, { status: 404 })
    if (order.paymentStatus !== 'PAID') return NextResponse.json({ error: 'Pedido não pago' }, { status: 400 })

    const cartItem = await addToCart({
      serviceId: shippingServiceId,
      fromCep: '37540000',
      fromName: 'Confecção Café do Brasil',
      fromAddress: 'Rua das Fazendas, 100',
      fromCity: 'Poços de Caldas',
      fromState: 'MG',
      toCep: order.addressCep,
      toName: order.customerName,
      toEmail: order.customerEmail,
      toPhone: order.customerPhone,
      toCpf: order.customerCpf,
      toAddress: order.addressStreet,
      toNumber: order.addressNumber,
      toComplement: order.addressComplement ?? undefined,
      toNeighborhood: order.addressNeighborhood,
      toCity: order.addressCity,
      toState: order.addressState,
      orderId: order.id,
      products: order.items.map((i: typeof order.items[number]) => ({
        weight: i.product.weight,
        height: i.product.height,
        width: i.product.width,
        length: i.product.length,
      })),
    })

    await checkoutLabel(cartItem.id)

    await prisma.order.update({
      where: { id: orderId },
      data: {
        melhorEnvioId: cartItem.id,
        shippingStatus: 'LABEL_CREATED',
      },
    })

    return NextResponse.json({ success: true, melhorEnvioId: cartItem.id })
  } catch (err) {
    console.error('[shipping/checkout]', err)
    return NextResponse.json({ error: 'Erro ao gerar etiqueta' }, { status: 500 })
  }
}
