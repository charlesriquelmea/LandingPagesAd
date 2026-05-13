const INFINITEPAY_API = 'https://api.checkout.infinitepay.io'

export interface InfinitePayItem {
  quantity: number
  price: number
  description: string
}

export interface InfinitePayCustomer {
  name: string
  email: string
  phone_number: string
}

export interface InfinitePayAddress {
  cep: string
  street: string
  neighborhood: string
  number: string
  complement?: string
}

export interface CreatePaymentLinkParams {
  orderId: string
  items: InfinitePayItem[]
  customer: InfinitePayCustomer
  address: InfinitePayAddress
  redirectUrl: string
  webhookUrl: string
}

export interface CreatePaymentLinkResponse {
  url: string
  slug?: string
  order_nsu: string
}

export async function createPaymentLink(
  params: CreatePaymentLinkParams,
): Promise<CreatePaymentLinkResponse> {
  const body = {
    handle: '',
    order_nsu: params.orderId,
    items: params.items,
    redirect_url: params.redirectUrl,
    webhook_url: params.webhookUrl,
    customer: params.customer,
    address: params.address,
  }

  const res = await fetch(`${INFINITEPAY_API}/links`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`InfinitePay error ${res.status}: ${text}`)
  }

  return res.json()
}

export interface CheckPaymentParams {
  orderId: string
  transactionNsu: string
  slug: string
}

export async function checkPaymentStatus(params: CheckPaymentParams) {
  const res = await fetch(`${INFINITEPAY_API}/payment_check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      handle: '',
      order_nsu: params.orderId,
      transaction_nsu: params.transactionNsu,
      slug: params.slug,
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`InfinitePay check error ${res.status}: ${text}`)
  }

  return res.json()
}
