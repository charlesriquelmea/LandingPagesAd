import { Resend } from 'resend'
import { OrderConfirmationEmail } from '@/emails/order-confirmation'
import { OrderShippedEmail } from '@/emails/order-shipped'

const resend = new Resend(process.env.RESEND_API_KEY)

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
  const { data, error } = await resend.emails.send({
    from: `Confecção Café do Brasil <${process.env.FROM_EMAIL ?? 'pedidos@confeccaocafebrasil.com.br'}>`,
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
  const { data, error } = await resend.emails.send({
    from: `Confecção Café do Brasil <${process.env.FROM_EMAIL ?? 'pedidos@confeccaocafebrasil.com.br'}>`,
    to: order.customerEmail,
    subject: `Seu pedido está a caminho! 🚚`,
    react: OrderShippedEmail({ order }),
  })

  if (error) throw error
  return data
}
