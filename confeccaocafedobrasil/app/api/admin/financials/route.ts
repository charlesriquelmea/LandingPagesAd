import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { startOfDay, startOfMonth, subDays } from 'date-fns'

async function verifyAdmin() {
  const cookieStore = await cookies()
  return cookieStore.get('admin-token')?.value ? true : false
}

export async function GET() {
  if (!await verifyAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const now = new Date()
    const todayStart = startOfDay(now)
    const monthStart = startOfMonth(now)
    const thirtyDaysAgo = subDays(now, 30)

    const [todayOrders, monthOrders, allPaidOrders, pendingCount, dailySales] = await Promise.all([
      prisma.order.aggregate({
        where: { paymentStatus: 'PAID', paidAt: { gte: todayStart } },
        _sum: { totalAmount: true },
        _count: true,
      }),
      prisma.order.aggregate({
        where: { paymentStatus: 'PAID', paidAt: { gte: monthStart } },
        _sum: { totalAmount: true },
        _count: true,
      }),
      prisma.order.aggregate({
        where: { paymentStatus: 'PAID' },
        _sum: { totalAmount: true },
        _count: true,
        _avg: { totalAmount: true },
      }),
      prisma.order.count({ where: { paymentStatus: 'PENDING' } }),
      prisma.$queryRaw<{ date: string; total: number; count: number }[]>`
        SELECT 
          DATE("paidAt")::text as date,
          SUM("totalAmount")::int as total,
          COUNT(*)::int as count
        FROM "Order"
        WHERE "paymentStatus" = 'PAID'
          AND "paidAt" >= ${thirtyDaysAgo}
        GROUP BY DATE("paidAt")
        ORDER BY date ASC
      `,
    ])

    return NextResponse.json({
      today: {
        revenue: todayOrders._sum.totalAmount ?? 0,
        orders: todayOrders._count,
      },
      month: {
        revenue: monthOrders._sum.totalAmount ?? 0,
        orders: monthOrders._count,
      },
      avg: Math.round(allPaidOrders._avg.totalAmount ?? 0),
      pendingCount,
      dailySales,
    })
  } catch (err) {
    console.error('[admin/financials]', err)
    return NextResponse.json({ error: 'Erro ao buscar financeiros' }, { status: 500 })
  }
}
