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

export async function sendCAPIEvent(_data: CAPIEventData): Promise<void> {
  console.warn('[meta-capi] Skipping CAPI event — env vars not configured for basic deploy')
}
