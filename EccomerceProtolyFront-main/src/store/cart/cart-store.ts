


import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };

  addProductTocart: (product: CartProduct) => void;
  updateProductQuantity: (productName: string, quantity: number) => void;
  incrementProductQuantity: (productName: string) => void; // Nueva función para incrementar la cantidad
  decrementProductQuantity: (productName: string) => void;
  removeProduct: (product: CartProduct) => void;

  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      // Methods
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      getSummaryInformation: () => {
        const { cart } = get();

        const subTotal = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0
        );
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        };
      },

      addProductTocart: (product: CartProduct) => {
        set((state) => {
          const existing = state.cart.find((p) => p.nombre === product.nombre);
          if (existing) {
            return {
              cart: state.cart.map((p) =>
                p.nombre === product.nombre
                  ? { ...p, quantity: p.quantity + product.quantity }
                  : p
              ),
            };
          }
          return { cart: [...state.cart, product] };
        });
    },

    updateProductQuantity: (productName: string, quantity: number) => {
      set((state) => ({
        cart: state.cart.map((product) =>
          product.nombre === productName ? { ...product, quantity } : product
        ),
      }));
    },

    incrementProductQuantity: (productName: string) => {
      set((state) => ({
        cart: state.cart.map((product) =>
          product.nombre === productName ? { ...product, quantity: product.quantity + 1 } : product
        ),
      }));
    },

    decrementProductQuantity: (productName: string) => {
      set((state) => ({
        cart: state.cart.map((product) =>
          product.nombre === productName ? { ...product, quantity: Math.max(product.quantity - 1, 1) } : product // Asegura que la cantidad nunca sea menor que 1
        ),
      }));
    },


      removeProduct: (productToRemove: CartProduct) => {
        set((state) => ({
          cart: state.cart.filter((product) => product.nombre !== productToRemove.nombre),
        }));
      },

      clearCart: () => {
        set({ cart: [] });
      },
    }),

    {
      name: "shopping-cart",
    }
  )
);