import type { Metadata } from 'next'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminMarketing } from '@/components/admin/admin-marketing'

export const metadata: Metadata = { title: 'Marketing' }

export default function AdminMarketingPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-auto"><AdminMarketing /></main>
    </div>
  )
}
