const BASE_URL = 'https://melhorenvio.com.br/api/v2'

function headers() {
  return {
    Authorization: 'Bearer ',
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'User-Agent': 'Confeccao Cafe do Brasil (pedidos@confeccaocafebrasil.com.br)',
  }
}

export interface ProductDimensions {
  weight: number
  height: number
  width: number
  length: number
}

export interface ShippingQuoteParams {
  fromCep: string
  toCep: string
  products: ProductDimensions[]
}

export async function getShippingQuote(params: ShippingQuoteParams) {
  const body = {
    from: { postal_code: params.fromCep },
    to: { postal_code: params.toCep },
    products: params.products.map((p) => ({
      weight: p.weight,
      height: p.height,
      width: p.width,
      length: p.length,
      quantity: 1,
    })),
    options: {
      receipt: false,
      own_hand: false,
    },
    services: '1,2,17', // SEDEX, PAC, Mini Envios
  }

  const res = await fetch(`${BASE_URL}/me/shipment/calculate`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`MelhorEnvio quote error ${res.status}: ${text}`)
  }

  return res.json()
}

export interface AddToCartParams {
  serviceId: number
  fromCep: string
  toCep: string
  fromName: string
  fromAddress: string
  fromCity: string
  fromState: string
  toName: string
  toEmail: string
  toPhone: string
  toCpf: string
  toAddress: string
  toNumber: string
  toComplement?: string
  toNeighborhood: string
  toCity: string
  toState: string
  orderId: string
  products: ProductDimensions[]
}

export async function addToCart(params: AddToCartParams) {
  const body = {
    service: params.serviceId,
    agency: null,
    from: {
      name: params.fromName,
      postal_code: params.fromCep,
      address: params.fromAddress,
      city: params.fromCity,
      state_abbr: params.fromState,
    },
    to: {
      name: params.toName,
      email: params.toEmail,
      phone: params.toPhone,
      document: params.toCpf,
      postal_code: params.toCep,
      address: params.toAddress,
      number: params.toNumber,
      complement: params.toComplement,
      district: params.toNeighborhood,
      city: params.toCity,
      state_abbr: params.toState,
    },
    products: params.products.map((p) => ({
      name: 'Produto',
      quantity: 1,
      unitary_value: 100,
      weight: p.weight,
      height: p.height,
      width: p.width,
      length: p.length,
    })),
    volumes: params.products.map((p) => ({
      height: p.height,
      width: p.width,
      length: p.length,
      weight: p.weight,
    })),
    tag: [{ tag: `order-${params.orderId}`, url: null }],
    plp: false,
    non_commercial: true,
    options: {
      insurance_value: null,
      receipt: false,
      own_hand: false,
      collect: false,
      reverse: false,
      non_commercial: true,
    },
  }

  const res = await fetch(`${BASE_URL}/me/cart`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`MelhorEnvio cart error ${res.status}: ${text}`)
  }

  return res.json()
}

export async function checkoutLabel(orderId: string) {
  const res = await fetch(`${BASE_URL}/me/shipment/checkout`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ orders: [orderId] }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`MelhorEnvio checkout error ${res.status}: ${text}`)
  }

  return res.json()
}

export async function trackOrder(orderId: string) {
  const res = await fetch(`${BASE_URL}/me/shipment/tracking?orders=${orderId}`, {
    method: 'GET',
    headers: headers(),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`MelhorEnvio tracking error ${res.status}: ${text}`)
  }

  return res.json()
}
