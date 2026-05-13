import { Suspense } from 'react'
import type { Metadata } from 'next'
import { AdminLoginForm } from '@/components/admin/admin-login-form'

export const metadata: Metadata = {
  title: 'Login — Admin',
  robots: { index: false, follow: false },
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#1A1008] flex items-center justify-center px-6">
      <Suspense fallback={<div className="text-[#F7F3EE] font-sans">Carregando...</div>}>
        <AdminLoginForm />
      </Suspense>
    </div>
  )
}
