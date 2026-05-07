import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: 'Admin — Café do Brasil', template: '%s | Admin' },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#1A1008] min-h-screen text-[#F7F3EE]">
      {children}
    </div>
  )
}
