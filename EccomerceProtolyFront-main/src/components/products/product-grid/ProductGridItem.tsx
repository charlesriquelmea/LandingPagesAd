'use client';
import { Modal } from "@/components/ui/modal/Modal";
import { Product } from "@/interfaces";
import Image from "next/image";
import { useState } from "react";
import { Detailproduct } from "../detail-product/DetailProduct";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 text-left w-full"
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
        <div className="p-2.5">
          <h3 className="text-sm font-medium text-gray-900 leading-tight line-clamp-2 min-h-[2.5rem]">
            {product.nombre}
          </h3>
          <p className="text-base font-bold text-accent mt-1">${product.precio}</p>
        </div>
      </button>

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
