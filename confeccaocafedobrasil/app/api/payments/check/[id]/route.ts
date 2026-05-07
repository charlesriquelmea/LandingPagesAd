import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkPaymentStatus } from '@/lib/infinitepay'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: { include: { product: true } } },
    })

    if (!order) {
      return NextResponse.json({ error: 'Pedido não encontrado' }, { status: 404 })
    }

    // If already paid, return current state
    if (order.paymentStatus === 'PAID') {
      return NextResponse.json({
        status: 'PAID',
        order: {
          id: order.id,
          paymentStatus: order.paymentStatus,
          shippingStatus: order.shippingStatus,
          trackingCode: order.trackingCode,
          paidAt: order.paidAt,
        },
      })
    }

    // Poll InfinitePay if we have a slug
    if (order.infinitePaySlug && order.infinitePayOrderNsu) {
      try {
        const check = await checkPaymentStatus({
          orderId: order.infinitePayOrderNsu,
          transactionNsu: order.transactionNsu ?? '',
          slug: order.infinitePaySlug,
        })

        if (check.status === 'paid' || check.paid_amount > 0) {
          const updated = await prisma.order.update({
            where: { id },
            data: {
              paymentStatus: 'PAID',
              paidAt: new Date(),
              transactionNsu: check.transaction_nsu ?? order.transactionNsu,
              receiptUrl: check.receipt_url ?? null,
            },
          })
          return NextResponse.json({ status: 'PAID', order: { id: updated.id, paymentStatus: updated.paymentStatus } })
        }
      } catch {
        // Silently ignore poll errors — use DB state
      }
    }

    return NextResponse.json({ status: order.paymentStatus, order: { id: order.id, paymentStatus: order.paymentStatus } })
  } catch (err) {
    console.error('[payments/check]', err)
    return NextResponse.json({ error: 'Erro ao verificar pagamento' }, { status: 500 })
  }
}
