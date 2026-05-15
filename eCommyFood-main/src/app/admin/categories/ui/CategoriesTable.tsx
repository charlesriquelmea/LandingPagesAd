"use client";
import useCategoriesStore from "@/store/categories/categories-store";
import { useEffect } from "react";
import { IoTrashOutline } from "react-icons/io5";
import Swal from "sweetalert2";

export const CategoriesTable = () => {
  // ESTADOS GLOBALES DE ZUSTAND
  const categories = useCategoriesStore((state) => state.categories);
  const getCategories = useCategoriesStore((state) => state.getCategories);
  const deleteCategory = useCategoriesStore((state) => state.deleteCategory);
  const loading = useCategoriesStore((state) => state.loading);

  // EVENTOS
  const onDeleteClick = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la categoría permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategory(id);
      }
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  // Verifica si categories es undefined antes de intentar acceder a su propiedad length
  const showCategories = categories !== undefined && categories.length > 0;

  return (
    <>
      <table className="border-collapse w-[97%]">
      <thead>
        <tr>
          <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
            Id
          </th>
          <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
            Nombre
          </th>
          <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.nombre} className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                Id
              </span>
                #{category.id}
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                Nombre
              </span>
              <span className="rounded  py-1 px-3 text-xs font-bold">
                {category.nombre}
              </span>
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                Acciones
              </span>
              <div className="flex justify-center">
                <button
                  onClick={() => onDeleteClick(category.id!)}
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
    </>
  );
};



{/* <div className="mb-10">
          <table className="min-w-full">
            <thead className="bg-gray-200 border-b">
              <tr>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Id
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Nombre
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.nombre}
                  className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{category.id}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {category.nombre}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => onDeleteClick(category.id!)}
                      className="bg-red-500 w-8 h-8 rounded-lg flex justify-center items-center hover:bg-red-600"
                      disabled={loading}
                    >
                      <IoTrashOutline className="w-5 h-5 text-white cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}