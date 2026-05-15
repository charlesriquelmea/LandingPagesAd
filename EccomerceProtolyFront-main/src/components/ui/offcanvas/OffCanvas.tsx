"use client"
import { ItemCart } from "@/components/cart/ItemCart";
import { useUIStore } from "@/store";
import Link from "next/link";
import React from "react";
import { IoCartOutline, IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store";
import { CartProduct } from '@/interfaces';

export const OffCanvas = () => {
  const { isSideMenuOpen, openSideMenu, closeSideMenu } = useUIStore();
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);

  const cartStore = useCartStore();
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setCartItems(cartStore.cart);
  }, [cartStore.cart]);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

  return (
    <>
      {isSideMenuOpen && (
        <div
          className="fixed top-0 left-0 z-30 w-full h-full bg-black/50"
          onClick={closeSideMenu}
        />
      )}

      <div
        className={`fixed top-0 right-0 z-40 h-full overflow-y-auto transition-transform ${
          isSideMenuOpen ? "translate-x-0" : "translate-x-full"
        } bg-white w-full sm:w-[400px] shadow-xl`}
        tabIndex={-1}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold">Tu carrito</h2>
          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs font-medium text-gray-400 hover:text-red-500 transition-colors"
              >
                Vaciar
              </button>
            )}
            <button
              onClick={closeSideMenu}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <IoClose className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <IoCartOutline className="w-12 h-12 mb-2" />
              <p className="text-sm">Tu carrito está vacío</p>
            </div>
          ) : (
            cartItems.map((product, index) => (
              <ItemCart key={product.nombre + index} product={product} />
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="sticky bottom-0 p-4 border-t border-gray-100 bg-white">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">{totalItems} artículo(s)</span>
              <span className="text-lg font-bold text-accent">${totalPrice}</span>
            </div>
            <Link
              href='/checkout'
              onClick={closeSideMenu}
              className="flex items-center justify-center w-full h-12 bg-accent text-white font-semibold rounded-xl hover:bg-red-700 transition-colors"
            >
              Ir a pagar
            </Link>
          </div>
        )}
      </div>

      <button type="button" onClick={openSideMenu} className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
        <IoCartOutline className="w-5 h-5" />
        {totalItems > 0 && (
          <span className="absolute -top-0.5 -right-0.5 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full bg-accent text-white">
            {totalItems}
          </span>
        )}
      </button>
    </>
  );
};
