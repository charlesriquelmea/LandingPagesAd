'use client';
import { Modal } from "@/components/ui/modal/Modal";
import { Product, CartProduct } from "@/interfaces";
import { useCartStore, useUIStore } from "@/store";
import Image from "next/image";
import { useState } from "react";
import { Detailproduct } from "../detail-product/DetailProduct";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addProductToCart = useCartStore(state => state.addProductTocart);
  const openSideMenu = useUIStore(state => state.openSideMenu);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cartItem: CartProduct = {
      nombre: product.nombre,
      price: product.precio,
      quantity: 1,
      image: product.imagenUrl,
    };
    addProductToCart(cartItem);
    openSideMenu();
  };

  return (
    <>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full text-left"
        >
          <div className="aspect-square relative overflow-hidden bg-gray-50">
            <Image
              src={product.imagenUrl}
              alt={product.nombre}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              width={400}
              height={400}
            />
          </div>
        </button>

        <div className="px-2.5 pb-2.5 pt-1.5 flex items-center justify-between gap-1">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-gray-900">${product.precio}</p>
            <h3 className="text-xs text-gray-600 leading-tight line-clamp-2 mt-0.5">
              {product.nombre}
            </h3>
          </div>
          <button
            onClick={handleQuickAdd}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-accent text-white text-lg font-bold hover:bg-red-700 transition-colors active:scale-90 shadow-sm"
          >
            +
          </button>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          title=""
          isOpenModal={isModalOpen}
          onCloseModal={() => setIsModalOpen(false)}
          className="max-w-2xl"
        >
          <Detailproduct product={product} closeModal={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </>
  );
};
