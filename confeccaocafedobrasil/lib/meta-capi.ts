import crypto from 'crypto'

function sha256(value: string): string {
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex')
}

interface CAPIEventData {
  eventName: string
  eventId: string
  email: string
  phone?: string
  value: number
  currency?: string
  contentIds?: string[]
  ipAddress?: string
  userAgent?: string
}

export async function sendCAPIEvent(data: CAPIEventData): Promise<void> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const accessToken = process.env.META_ACCESS_TOKEN

  if (!pixelId || !accessToken) {
    console.warn('[meta-capi] Missing PIXEL_ID or ACCESS_TOKEN — skipping CAPI event')
    return
  }

  const event: Record<string, unknown> = {
    event_name: data.eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: data.eventId,
    action_source: 'website',
    user_data: {
      em: [sha256(data.email)],
      ...(data.phone ? { ph: [sha256(data.phone)] } : {}),
      ...(data.ipAddress ? { client_ip_address: data.ipAddress } : {}),
      ...(data.userAgent ? { client_user_agent: data.userAgent } : {}),
    },
    custom_data: {
      value: data.value / 100,
      currency: data.currency ?? 'BRL',
      ...(data.contentIds ? { content_ids: data.contentIds, content_type: 'product' } : {}),
    },
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [event] }),
      },
    )
    if (!res.ok) {
      const text = await res.text()
      console.error('[meta-capi] Error:', text)
    }
  } catch (err) {
    console.error('[meta-capi] Network error:', err)
  }
}
