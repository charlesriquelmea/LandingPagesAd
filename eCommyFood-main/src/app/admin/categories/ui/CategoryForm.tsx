'use client';
import { Category } from "@/interfaces";
import useCategoriesStore from "@/store/categories/categories-store";
import { useForm } from "react-hook-form";

export const CategoryForm = () => {
  // CONTROLADOR DEL FORM
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // ESTADOS GLOBALES DE ZUSTAND 
  const addCategory = useCategoriesStore((state) => state.addCategory);
  const loading = useCategoriesStore((state) => state.loading);
  
  // EVENTOS
  const onSubmit = handleSubmit(async (data) => {
    const { nombre } = data;
    const newData: Category = {
      nombre,
    };
    
    // Añadir la categoría y resetear el formulario
    await addCategory(newData);  // Espera a que se complete la adición
    reset();
  });

  return (
    <form onSubmit={onSubmit}>
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col">
          <span>Nombre</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('nombre', { required: true })}
          />
        </div>
        {errors.nombre && <span className="text-red-500 text-xs">Campo requerido</span>}

        <button type="submit" className="btn-primary w-full mt-5" disabled={loading}>
         Guardar
        </button>
      </div>
    </form>
  );
};