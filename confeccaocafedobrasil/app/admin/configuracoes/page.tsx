import type { Metadata } from 'next'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminSettings } from '@/components/admin/admin-settings'

export const metadata: Metadata = { title: 'Configurações' }

export default function AdminSettingsPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-auto"><AdminSettings /></main>
    </div>
  )
}
