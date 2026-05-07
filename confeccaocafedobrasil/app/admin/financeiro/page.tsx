import type { Metadata } from 'next'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminFinancials } from '@/components/admin/admin-financials'

export const metadata: Metadata = { title: 'Financeiro' }

export default function AdminFinancialsPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-auto"><AdminFinancials /></main>
    </div>
  )
}
