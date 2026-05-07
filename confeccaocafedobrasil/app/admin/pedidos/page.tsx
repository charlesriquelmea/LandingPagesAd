import type { Metadata } from 'next'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminOrders } from '@/components/admin/admin-orders'

export const metadata: Metadata = { title: 'Pedidos' }

export default function AdminOrdersPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-auto"><AdminOrders /></main>
    </div>
  )
}
