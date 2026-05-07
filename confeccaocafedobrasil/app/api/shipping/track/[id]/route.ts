import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { trackOrder } from '@/lib/melhorenvio'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  try {
    const order = await prisma.order.findUnique({ where: { id } })
    if (!order) return NextResponse.json({ error: 'Pedido não encontrado' }, { status: 404 })

    if (!order.melhorEnvioId) {
      return NextResponse.json({
        shippingStatus: order.shippingStatus,
        trackingCode: order.trackingCode,
        tracking: null,
      })
    }

    const tracking = await trackOrder(order.melhorEnvioId).catch(() => null)

    return NextResponse.json({
      shippingStatus: order.shippingStatus,
      trackingCode: order.trackingCode,
      tracking,
    })
  } catch (err) {
    console.error('[shipping/track]', err)
    return NextResponse.json({ error: 'Erro ao rastrear' }, { status: 500 })
  }
}
