// ProductCard.tsx

'use client';

import React, { useState } from 'react';
import { Product } from '@/interfaces';
import ModalEdit from './ModalEdit';

interface Props {
    product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="card border rounded-lg p-4 shadow-lg">
            <img 
                src={product.imagenUrl} 
                alt={product.nombre} 
                className="w-full h-48 object-cover rounded" 
            />
            <h3 className="text-lg font-bold">{product.nombre}</h3>
            <p className="text-sm">{product.descripcion}</p>
            <span className="text-xl font-semibold">${product.precio}</span>
            <button 
                onClick={openModal} 
                className="bg-gray-800 text-white px-4 py-2 rounded mt-4"
            >
                Editar
            </button>

            {isModalOpen && (
                <ModalEdit product={product} closeModal={closeModal} />
            )}
        </div>
    );
};

export default ProductCard;
