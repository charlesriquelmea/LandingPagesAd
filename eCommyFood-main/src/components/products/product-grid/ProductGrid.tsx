'use client';


import { ProductGridItem } from "./ProductGridItem"
import { useEffect } from "react";
import useProductsStore from "@/store/products/products-store";



export const ProductGrid = () => {

    // ESTADOS GLOBALES DE ZUSTAND
    const getProducts = useProductsStore((state) => state.getProducts);
    const products = useProductsStore((state) => state.products);
    const loading = useProductsStore((state) => state.loading);

    // EVENTOS
    useEffect(() => {
        getProducts();
    }, [])
    

    return (
        <div className="grid grid-cols-2 mx-2 gap-5 mb-10
            
            sm:grid-cols-2 sm:mx-10
            md:grid-cols-3 md:mx-10
            lg:grid-cols-3 lg:mx-20
            xl:grid-cols-4 xl:mx-44 " 
        >
            {loading ? (
                <h1>Cargando...</h1>
            ) : products.length > 0 ? (
                products.map((product) => (
                    <ProductGridItem 
                        key={product.nombre}
                        product={product}
                    />
                ))
            ) : (
                <h1>No hay productos agregados</h1>
            )}
        </div>
    );
}
