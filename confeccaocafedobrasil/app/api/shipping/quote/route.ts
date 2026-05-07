import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getShippingQuote } from '@/lib/melhorenvio'

const schema = z.object({
  cep: z.string().min(8),
  items: z.array(
    z.object({
      weight: z.number().positive(),
      height: z.number().int().positive(),
      width: z.number().int().positive(),
      length: z.number().int().positive(),
    }),
  ).min(1),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { cep, items } = schema.parse(body)

    const quotes = await getShippingQuote({
      fromCep: process.env.SENDER_CEP ?? '37540000',
      toCep: cep.replace(/\D/g, ''),
      products: items,
    })

    return NextResponse.json({ quotes })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'CEP inválido' }, { status: 400 })
    }
    console.error('[shipping/quote]', err)
    return NextResponse.json({ error: 'Erro ao calcular frete' }, { status: 500 })
  }
}
