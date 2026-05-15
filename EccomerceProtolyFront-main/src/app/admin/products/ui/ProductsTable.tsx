"use client";

import { useEffect } from "react";
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import useProductsStore from "@/store/products/products-store";
import { EditProductButton } from "@/components";
import { ProductForm } from "./ProductForm";

export const ProductsTable = () => {
  // ESTADOS GLOBALES DE ZUSTAND
  const products = useProductsStore((state) => state.products);
  const getProducts = useProductsStore((state) => state.getProducts);
  const deleteProduct = useProductsStore((state) => state.deleteProduct);
  const loading = useProductsStore((state) => state.loading);

  // EVENTOS
  const onDeleteClick = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el producto permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
      }
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <table className="border-collapse w-[97%]">
      <thead>
        <tr>
          <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
            Imagen
          </th>
          <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
            Titulo
          </th>
          <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
            Precio
          </th>
          <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
            Inventario
          </th>
          <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
            Categoria
          </th>
          <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.nombre} className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                Imagen
              </span>
              <Link href="" className="flex justify-center">
                <Image
                  src={product.imagenUrl}
                  width={80}
                  height={80}
                  alt={product.nombre}
                  className="w-20 h-20 object-cover rounded"
                />
              </Link>
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                Titulo
              </span>
              {product.nombre}
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                Precio
              </span>
              <span className="rounded  py-1 px-3 text-xs font-bold">
                ${product.precio}
              </span>
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                Inventario
              </span>
              <span className="rounded  py-1 px-3 text-xs font-bold">{product.inventario}</span>
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                Categoria
              </span>
              <a href="#" className="text-blue-400 hover:text-blue-600  pl-6">
                {product.Categoria?.nombre}
              </a>
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                Acciones
              </span>
              <div className="flex justify-center gap-1">

                {/* Open modal to edit */}
                {/* <button
                  className="bg-blue-500 w-8 h-8 rounded-lg flex justify-center items-center hover:bg-blue-600"
                  disabled={loading}
                >
                  <IoCreateOutline className="w-5 h-5 text-white cursor-pointer" />
                </button> */}

                <EditProductButton>
                  <div className="p-10">
                    <ProductForm product={product}/>
                  </div>
                </EditProductButton>



                <button
                  onClick={() => onDeleteClick(product.id!)}
                  className="bg-red-500 w-8 h-8 rounded-lg flex justify-center items-center hover:bg-red-600"
                  disabled={loading}
                >
                  <IoTrashOutline className="w-5 h-5 text-white cursor-pointer" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
