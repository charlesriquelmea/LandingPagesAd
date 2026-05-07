'use client'

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void
    _fbq: unknown
  }
}

export function fbq(...args: unknown[]) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq(...args)
  }
}

export function trackViewContent(productId: string, name: string, price: number) {
  fbq('track', 'ViewContent', {
    content_ids: [productId],
    content_name: name,
    content_type: 'product',
    value: price / 100,
    currency: 'BRL',
  })
}

export function trackAddToCart(productId: string, total: number) {
  fbq('track', 'AddToCart', {
    content_ids: [productId],
    value: total / 100,
    currency: 'BRL',
  })
}

export function trackInitiateCheckout(total: number) {
  fbq('track', 'InitiateCheckout', {
    value: total / 100,
    currency: 'BRL',
  })
}

export function trackPurchase(
  orderId: string,
  total: number,
  contentIds: string[],
) {
  fbq('track', 'Purchase', {
    value: total / 100,
    currency: 'BRL',
    content_ids: contentIds,
    event_id: orderId,
  })
}
