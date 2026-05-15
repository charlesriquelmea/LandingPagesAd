import { Product, CartProduct } from '@/interfaces';
import { useUIStore } from '@/store';
import { useCartStore } from '@/store';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import ModalEdit from '../ModalEdit';
import './styles.css'; // Importar tu archivo CSS

interface Props {
    product: Product;
    closeModal: () => void;
}

export const DetailProduct: React.FC<Props> = ({ product, closeModal }) => {
    const openSideMenu = useUIStore((state) => state.openSideMenu);
    const addProductToCart = useCartStore((state) => state.addProductTocart);

    const [count, setCount] = useState<number>(1);
    const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false); // Estado para controlar la apertura del modal de edición

    // Restablecer el conteo al cambiar de producto
    useEffect(() => {
        setCount(1);
    }, [product]);

    const onAddCart = () => {
        const cartItem: CartProduct = {
            nombre: product.nombre,
            price: product.precio,
            quantity: count,
            image: product.imagenUrl,
        };

        addProductToCart(cartItem);
        console.log('Producto añadido');
        closeModal();
        openSideMenu();
    };

    const onIncrement = () => {
        setCount(count + 1); // Incrementar la cantidad
    };

    const onDecrement = () => {
        if (count > 1) {
            setCount(count - 1); // Decrementar solo si es mayor que 1
        }
    };

    const openEditModal = () => {
        setEditModalOpen(true); // Abre el modal de edición
    };

    const closeEditModal = () => {
        setEditModalOpen(false); // Cierra el modal de edición
    };

    return (
        <div className="container lg:container-lg">
            {/* Imagen */}
            <div className="imageContainer">
                <Image
                    src={product.imagenUrl}
                    alt={product.nombre}
                    className="h-full w-full object-cover"
                    width={500}
                    height={500}
                />
            </div>

            {/* Contenido */}
            <div className="contentContainer">
                <h1 className="title">{product.nombre}</h1>
                <div className="priceContainer">
                    <span className="price">${product.precio}</span>
                    <span className="category">
                        {product.Categoria?.nombre}
                    </span>
                </div>

                <p className="description">{product.descripcion}</p>

                <div className="actionContainer">
                    {/* Contador para agregar al carrito */}
                    <div className="counterContainer">
                        <button onClick={onDecrement} className="counterButton">-</button>
                        <span className="counterDisplay">{count}</span>
                        <button onClick={onIncrement} className="counterButton">+</button>
                    </div>
                    {/* Botón para agregar al carrito */}
                    <button onClick={onAddCart} className="addCartButton">
                        Agregar ${count * product.precio}
                    </button>
                </div>

                {/* Botón para editar el producto */}
                <button onClick={openEditModal} className="editButton">
                    Editar Ingredientes
                </button>
            </div>

            {/* Modal de edición */}
            {isEditModalOpen && (
                <ModalEdit product={product} closeModal={closeEditModal} />
            )}
        </div>
    );
};
