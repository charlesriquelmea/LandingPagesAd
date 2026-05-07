'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, ShoppingBag, Package, BarChart3, Megaphone, Settings, LogOut, Coffee } from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/pedidos', label: 'Pedidos', icon: ShoppingBag },
  { href: '/admin/produtos', label: 'Produtos', icon: Package },
  { href: '/admin/financeiro', label: 'Financeiro', icon: BarChart3 },
  { href: '/admin/marketing', label: 'Marketing', icon: Megaphone },
  { href: '/admin/configuracoes', label: 'Configurações', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/login', { method: 'DELETE' })
    router.push('/admin/login')
  }

  function isActive(href: string, exact?: boolean) {
    return exact ? pathname === href : pathname.startsWith(href)
  }

  return (
    <aside className="hidden md:flex w-56 shrink-0 bg-[#2C1A0E] flex-col border-r border-[#C8A96E]/10">
      {/* Logo */}
      <div className="p-6 border-b border-[#C8A96E]/10">
        <div className="flex items-center gap-2">
          <Coffee size={18} className="text-[#C8A96E]" />
          <div>
            <p className="font-serif text-sm font-semibold text-[#F7F3EE]">Café do Brasil</p>
            <p className="text-[9px] text-[#C8A96E] tracking-[0.2em] uppercase font-sans">Admin</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 flex flex-col gap-1">
        {navItems.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-sans transition-all ${
              isActive(href, exact)
                ? 'bg-[#C8A96E]/15 text-[#C8A96E] font-semibold'
                : 'text-[#F7F3EE]/60 hover:text-[#F7F3EE] hover:bg-[#F7F3EE]/5'
            }`}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[#C8A96E]/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-sans text-[#F7F3EE]/40 hover:text-red-400 hover:bg-red-400/10 transition-all w-full"
        >
          <LogOut size={16} />
          Sair
        </button>
      </div>
    </aside>
  )
}
