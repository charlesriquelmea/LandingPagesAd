import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

async function verifyAdmin() {
  const cookieStore = await cookies()
  return cookieStore.get('admin-token')?.value ? true : false
}

export async function GET() {
  if (!await verifyAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const products = await prisma.product.findMany({ orderBy: { createdAt: 'asc' } })
    return NextResponse.json({ products })
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  if (!await verifyAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID obrigatório' }, { status: 400 })

    const data = await request.json()
    const product = await prisma.product.update({ where: { id }, data })
    return NextResponse.json(product)
  } catch (err) {
    console.error('[admin/products PATCH]', err)
    return NextResponse.json({ error: 'Erro ao atualizar produto' }, { status: 500 })
  }
}
