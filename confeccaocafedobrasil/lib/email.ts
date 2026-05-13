import type { Resend } from 'resend'
import { OrderConfirmationEmail } from '@/emails/order-confirmation'
import { OrderShippedEmail } from '@/emails/order-shipped'

let _resend: Resend | null = null
function getResend(): Resend {
  if (!_resend) {
    // Dynamic import to avoid instantiation at module load time
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Resend: R } = require('resend')
    _resend = new R('')
  }
  return _resend!
}

export interface OrderEmailData {
  id: string
  customerName: string
  customerEmail: string
  items: Array<{
    name: string
    quantity: number
    unitPrice: number
    image?: string
  }>
  subtotal: number
  shippingAmount: number
  totalAmount: number
  addressStreet: string
  addressNumber: string
  addressComplement?: string | null
  addressNeighborhood: string
  addressCity: string
  addressState: string
  addressCep: string
}

export async function sendOrderConfirmation(order: OrderEmailData) {
  const { data, error } = await getResend().emails.send({
    from: `Confecção Café do Brasil <pedidos@confeccaocafebrasil.com.br>`,
    to: order.customerEmail,
    subject: `Pedido #${order.id} confirmado! ☕`,
    react: OrderConfirmationEmail({ order }),
  })

  if (error) throw error
  return data
}

export async function sendOrderShipped(
  order: OrderEmailData & { trackingCode: string; estimatedDelivery?: string },
) {
  const { data, error } = await getResend().emails.send({
    from: `Confecção Café do Brasil <pedidos@confeccaocafebrasil.com.br>`,
    to: order.customerEmail,
    subject: `Seu pedido está a caminho! 🚚`,
    react: OrderShippedEmail({ order }),
  })

  if (error) throw error
  return data
}
