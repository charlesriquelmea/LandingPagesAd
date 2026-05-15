"use client"

import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";

const featuredStores = [
  { name: "Bebidas", emoji: "🥤", color: "from-blue-400 to-blue-600", href: "/category/bebidas" },
  { name: "Snacks", emoji: "🍿", color: "from-orange-400 to-orange-600", href: "/category/snacks" },
  { name: "Dulces", emoji: "🍪", color: "from-pink-400 to-pink-600", href: "/category/dulces y postres" },
  { name: "Lácteos", emoji: "🥛", color: "from-cyan-400 to-cyan-600", href: "/category/lácteos y huevos" },
];

export default function HomePage() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-accent via-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
          <h1 className="text-3xl sm:text-5xl font-bold mb-3">
            Tu tienda de confianza
          </h1>
          <p className="text-base sm:text-lg text-red-100 mb-8 max-w-xl">
            Todo lo que necesitas para tu hogar, entregado rápido y fácil.
          </p>

          <div className="relative max-w-xl">
            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 -mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {featuredStores.map((store) => (
            <Link
              key={store.name}
              href={store.href}
              className={`bg-gradient-to-br ${store.color} rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5`}
            >
              <span className="text-3xl block mb-2">{store.emoji}</span>
              <span className="font-semibold text-sm">{store.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Promo Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12">
        <div className="bg-surface rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              ¿Listo para ordenar?
            </h2>
            <p className="text-sm text-gray-500">
              Explora nuestro catálogo con cientos de productos.
            </p>
          </div>
          <Link
            href="/"
            className="flex-shrink-0 bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors text-sm"
          >
            Ver tienda
          </Link>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-12" />
    </div>
  );
}
