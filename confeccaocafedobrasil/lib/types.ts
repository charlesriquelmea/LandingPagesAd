export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
export type ShippingStatus = 'PENDING' | 'LABEL_CREATED' | 'SHIPPED' | 'DELIVERED' | 'RETURNED'

export interface Product {
  id: string
  sku: string
  slug: string
  name: string
  description: string
  price: number
  stock: number
  images: string[]
  weight: number
  height: number
  width: number
  length: number
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  product: Product
  quantity: number
  unitPrice: number
}

export interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customerCpf: string
  paymentStatus: PaymentStatus
  paymentMethod: string | null
  infinitePayLink: string | null
  infinitePayOrderNsu: string
  infinitePaySlug: string | null
  transactionNsu: string | null
  receiptUrl: string | null
  paidAt: Date | null
  subtotal: number
  shippingAmount: number
  totalAmount: number
  shippingStatus: ShippingStatus
  melhorEnvioId: string | null
  trackingCode: string | null
  shippedAt: Date | null
  deliveredAt: Date | null
  addressCep: string
  addressStreet: string
  addressNumber: string
  addressComplement: string | null
  addressNeighborhood: string
  addressCity: string
  addressState: string
  metaEventId: string
  emailSentAt: Date | null
  createdAt: Date
  updatedAt: Date
  items: OrderItem[]
}

export interface ShippingQuote {
  id: number
  name: string
  price: string
  currency: string
  delivery_time: number
  company: {
    name: string
    picture: string
  }
}

export interface CartItem {
  productId: string
  sku: string
  slug: string
  name: string
  price: number
  quantity: number
  image: string
  weight: number
  height: number
  width: number
  length: number
}

export interface CheckoutFormData {
  name: string
  email: string
  phone: string
  cpf: string
  cep: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  shippingOptionId: number
  shippingPrice: number
  shippingName: string
  shippingDays: number
}
