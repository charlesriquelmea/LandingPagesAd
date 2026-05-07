import type { Metadata } from 'next'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminProducts } from '@/components/admin/admin-products'

export const metadata: Metadata = { title: 'Produtos' }

export default function AdminProductsPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-auto"><AdminProducts /></main>
    </div>
  )
}
