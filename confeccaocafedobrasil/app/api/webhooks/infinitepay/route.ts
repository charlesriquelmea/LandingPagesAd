import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendOrderConfirmation } from '@/lib/email'
import { sendCAPIEvent } from '@/lib/meta-capi'

export async function POST(request: Request) {
  // Respond immediately — InfinitePay requires < 1s response
  const body = await request.json().catch(() => null)

  if (!body) return NextResponse.json({ ok: true })

  const {
    order_nsu,
    transaction_nsu,
    invoice_slug,
    paid_amount,
    capture_method,
    receipt_url,
  } = body as {
    order_nsu?: string
    transaction_nsu?: string
    invoice_slug?: string
    paid_amount?: number
    capture_method?: string
    receipt_url?: string
  }

  if (!order_nsu) return NextResponse.json({ ok: true })

  // Process async — do not await before responding (fire-and-forget via void)
  void (async () => {
    try {
      const order = await prisma.order.findUnique({
        where: { infinitePayOrderNsu: order_nsu },
        include: { items: { include: { product: true } } },
      })

      if (!order || order.paymentStatus === 'PAID') return

      // Mark as paid
      await prisma.order.update({
        where: { id: order.id },
        data: {
          paymentStatus: 'PAID',
          paidAt: new Date(),
          transactionNsu: transaction_nsu ?? null,
          infinitePaySlug: invoice_slug ?? null,
          receiptUrl: receipt_url ?? null,
          paymentMethod: capture_method ?? null,
        },
      })

      // Decrement stock
      for (const item of order.items) {
        await prisma.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        }).catch(() => null)
      }

      // Send confirmation email
      try {
        await sendOrderConfirmation({
          id: order.id,
          customerName: order.customerName,
          customerEmail: order.customerEmail,
          items: order.items.map((i: typeof order.items[number]) => ({
            name: i.product.name,
            quantity: i.quantity,
            unitPrice: i.unitPrice,
          })),
          subtotal: order.subtotal,
          shippingAmount: order.shippingAmount,
          totalAmount: order.totalAmount,
          addressStreet: order.addressStreet,
          addressNumber: order.addressNumber,
          addressComplement: order.addressComplement,
          addressNeighborhood: order.addressNeighborhood,
          addressCity: order.addressCity,
          addressState: order.addressState,
          addressCep: order.addressCep,
        })
        await prisma.order.update({
          where: { id: order.id },
          data: { emailSentAt: new Date() },
        })
      } catch (emailErr) {
        console.error('[webhook] email error', emailErr)
      }

      // Meta CAPI Purchase event
      await sendCAPIEvent({
        eventName: 'Purchase',
        eventId: order.metaEventId,
        email: order.customerEmail,
        phone: order.customerPhone,
        value: order.totalAmount,
        currency: 'BRL',
        contentIds: order.items.map((i) => i.productId),
      })
    } catch (err) {
      console.error('[webhook/infinitepay] error', err)
    }
  })()

  return NextResponse.json({ ok: true })
}
