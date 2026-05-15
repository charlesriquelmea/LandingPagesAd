"use client";

import { authStorage } from "@/actions";
import { publicKey, urlEndpoint } from "@/config/img-url";
import { Product } from "@/interfaces";
import useCategoriesStore from "@/store/categories/categories-store";
import useProductsStore from "@/store/products/products-store";
import { IKContext, IKUpload } from "imagekitio-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

interface Props {
  product?: Product;
}

export const ProductForm = ({ product }: Props) => {
  // CONTROLADOR DEL FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [inventario, setInventario] = useState(true);

  // ESTADOS GLOBALES DE ZUSTAND
  // Categorias
  const getCategories = useCategoriesStore((state) => state.getCategories);
  const categories = useCategoriesStore((state) => state.categories);
  // Producto
  const addProduct = useProductsStore((state) => state.addProduct);
  const updateProduct = useProductsStore((state) => state.updateProduct);
  const loading = useProductsStore((state) => state.loading);

  // Estado local para capturar la imagen y para capturar la demora en la carga al storage
  const [urlImage, setUrlImage] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  // EVENTOS
  const onSubmit = handleSubmit((data) => {
    const { nombre, descripcion, imagenUrl, precio, inventario, categoriaId } =
      data;
    
    if(!product){
      const newData: Product = {
        nombre,
        descripcion,
        imagenUrl: urlImage,
        precio,
        categoriaId,
        inventario,
      };
  
      addProduct(newData);
    // console.log('Data a añadir: '+ newData);

    }else{
      const updatedata: Product = {
        nombre,
        descripcion,
        imagenUrl: !urlImage ? product.imagenUrl : urlImage,
        precio,
        categoriaId,
        inventario,
      };

      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción cambiará los datos del producto.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, actualizar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          updateProduct(product.id! , updatedata);
          console.log(updatedata);
        }
      });
    }
    reset();
  });

  // Función onError tipada con ErrorCallback
  const onError = (err: any) => {
    console.error("Error", err);
  };

  const onSuccess = (res: any) => {
    setUrlImage(res.url);
    console.log("Success", res.url);
    setIsUploading(false); // Cuando la imagen se ha cargado exitosamente, establecemos isUploading como falso
  };

  const onUploadProgress = (progress: any) => {
    console.log("Progress", progress);
    setIsUploading(true); // Cuando se inicia la carga de la imagen, establecemos isUploading como verdadero
  };

  const onUploadStart = (evt: any) => {
    console.log("Start", evt);
    setIsUploading(true); // Cuando se inicia la carga de la imagen, establecemos isUploading como verdadero
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {!product ? (
        // Formulario para añadir
        <form
          onSubmit={onSubmit}
          className="grid  px-5 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
        >
          {/* Textos */}
          <div className="w-full">
            <div className="flex flex-col">
              <span>Nombre</span>
              <input
                type="text"
                className="p-2 border rounded-md bg-gray-200"
                {...register("nombre", { required: true })}
              />
            </div>
            {errors.nombre && (
              <span className="text-red-500 text-xs">Campo requerido </span>
            )}
            <div className="flex flex-col mt-2">
              <span>Descripción</span>
              <textarea
                rows={5}
                className="p-2 border rounded-md bg-gray-200"
                {...register("descripcion", { required: true })}
              ></textarea>
            </div>
            {errors.descripcion && (
              <span className="text-red-500 text-xs">Campo requerido </span>
            )}
            <div className="flex flex-col mt-2">
              <span>Precio</span>
              <input
                type="number"
                className="p-2 border rounded-md bg-gray-200"
                {...register("precio", { required: true })}
              />
            </div>
            {errors.precio && (
              <span className="text-red-500 text-xs">Campo requerido </span>
            )}

            <div className="flex flex-col mt-2">
              <span>Categoria</span>
              <select
                className="p-2 border rounded-md bg-gray-200"
                {...register("categoriaId", { required: true })}
              >
                <option value={0}>Sin categoria</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.nombre}
                  </option>
                ))}
              </select>
            </div>
            {errors.categoriaId && (
              <span className="text-red-500 text-xs">Categoria requerida </span>
            )}
          </div>
          <div className="w-full">
            {/* Radio buttons de existencias */}
            <div className="flex flex-col">
              <span>Inventario</span>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="hayExistencias"
                  value="true" // Valor para "hay existencias"
                  {...register("inventario")}
                  onChange={() => setInventario(true)} // Cambiar el estado a true cuando se selecciona este radio button
                  checked={inventario === true} // Marcar como seleccionado si el estado es true
                  className="mr-2"
                />
                <label htmlFor="hayExistencias">Hay existencias</label>
                &nbsp;&nbsp;
                <input
                  type="radio"
                  id="agotado"
                  value="false" // Valor para "agotado"
                  {...register("inventario")}
                  onChange={() => setInventario(false)} // Cambiar el estado a false cuando se selecciona este radio button
                  checked={inventario === false} // Marcar como seleccionado si el estado es false
                  className="ml-2"
                />
                <label htmlFor="agotado">Agotado</label>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col mt-2">
                <IKContext
                  urlEndpoint={urlEndpoint}
                  publicKey={publicKey}
                  authenticator={authStorage}
                >
                  <span>Imagen</span>
                  <IKUpload
                    className="p-2 border rounded-md bg-gray-200"
                    fileName="product.png"
                    onError={onError}
                    onSuccess={onSuccess}
                    onUploadProgress={onUploadProgress}
                    onUploadStart={onUploadStart}
                    accept="image/png, image/jpeg, image/avif"
                  />
                  {isUploading && (
                    <div className="text-sm text-gray-500 mt-2">
                      Cargando imagen...
                    </div>
                  )}
                  {urlImage && (
                    <Image
                      src={urlImage}
                      alt="img-load"
                      className="w-20 h-20 object-cover rounded mt-2"
                      width={80}
                      height={80}
                    />
                  )}
                </IKContext>
              </div>
            </div>
            <button
              type="submit"
              className="btn-primary w-full mt-2"
              disabled={isUploading || loading}
            >
              {loading ? "Añadiendo..." : "Guardar"}
            </button>
          </div>
        </form>
      ) : (



        // Formulario para editar
        <form
          onSubmit={onSubmit}
          className="grid  px-5 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
        >
          {/* Textos */}
          <div className="w-full">
            <div className="flex flex-col">
              <span>Nombre</span>
              <input
                type="text"
                // value={product.nombre}
                defaultValue={product.nombre}
                className="p-2 border rounded-md bg-gray-200"
                {...register("nombre", { required: true })}
              />
            </div>
            {errors.nombre && (
              <span className="text-red-500 text-xs">Campo requerido </span>
            )}

            <div className="flex flex-col mt-2">
              <span>Descripción</span>
              <textarea
                rows={5}
                defaultValue={product.descripcion}
                className="p-2 border rounded-md bg-gray-200"
                {...register("descripcion", { required: true })}
              ></textarea>
            </div>
            {errors.descripcion && (
              <span className="text-red-500 text-xs">Campo requerido </span>
            )}

            <div className="flex flex-col mt-2">
              <span>Precio</span>
              <input
                type="number"
                defaultValue={product.precio}
                className="p-2 border rounded-md bg-gray-200"
                {...register("precio", { required: true })}
              />
            </div>
            {errors.precio && (
              <span className="text-red-500 text-xs">Campo requerido </span>
            )}

            <div className="flex flex-col mt-2">
              <span>Categoría</span>
              <select
                className="p-2 border rounded-md bg-gray-200"
                {...register("categoriaId", { required: true })}
                defaultValue={product.Categoria?.id} // Establece el valor seleccionado en el select
              >
                <option value={0}>Sin categoría</option>
                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.nombre}
                  </option>
                ))}
              </select>
            </div>
            {errors.categoriaId && (
              <span className="text-red-500 text-xs">Categoria requerida </span>
            )}
          </div>

          <div className="w-full">
            {/* Radio buttons de existencias */}
            <div className="flex flex-col">
              <span>Inventario</span>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="hayExistencias"
                  value="true" // Valor para "hay existencias"
                  {...register("inventario")}
                  onChange={() => setInventario(true)} // Cambiar el estado a true cuando se selecciona este radio button
                  checked={inventario === true} // Marcar como seleccionado si el estado es true
                  className="mr-2"
                />
                <label htmlFor="hayExistencias">Hay existencias</label>
                &nbsp;&nbsp;
                <input
                  type="radio"
                  id="agotado"
                  value="false" // Valor para "agotado"
                  {...register("inventario")}
                  onChange={() => setInventario(false)} // Cambiar el estado a false cuando se selecciona este radio button
                  checked={inventario === false} // Marcar como seleccionado si el estado es false
                  className="ml-2"
                />
                <label htmlFor="agotado">Agotado</label>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-col mt-2">
                <IKContext
                  urlEndpoint={urlEndpoint}
                  publicKey={publicKey}
                  authenticator={authStorage}
                >
                  <span>Imagen</span>
                  <IKUpload
                    className="p-2 border rounded-md bg-gray-200"
                    fileName="product.png"
                    onError={onError}
                    onSuccess={onSuccess}
                    onUploadProgress={onUploadProgress}
                    onUploadStart={onUploadStart}
                    accept="image/png, image/jpeg, image/avif"
                  />
                  {isUploading && (
                    <div className="text-sm text-gray-500 mt-2">
                      Cargando imagen...
                    </div>
                  )}
                  {!urlImage ? (
                    <Image
                      src={product.imagenUrl}
                      alt="img-preload"
                      className="w-20 h-20 object-cover rounded mt-2"
                      width={80}
                      height={80}
                    />
                  ):
                  <Image
                      src={urlImage}
                      alt="img-load"
                      className="w-20 h-20 object-cover rounded mt-2"
                      width={80}
                      height={80}
                    />
                
                }
                </IKContext>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full mt-2"
              disabled={isUploading || loading}
            >
              {loading ? "Actualizando..." : "Actualizar"}
            </button>
          </div>
        </form>
      )}
    </>
  );
};
