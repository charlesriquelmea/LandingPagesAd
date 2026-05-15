"use client"
import { useEffect } from 'react';
import React, { useState } from 'react';
import { IKContext, IKUpload } from "imagekitio-react";
import { authStorage } from "@/actions/storage/auth-storage";
import { getImagenes } from '@/actions/imagenes/getImagenes';
import { putImagen } from '@/actions/imagenes/putImagenes';
import { publicKey, urlEndpoint } from "@/config/img-url";

const Imagenes = () => {
    const [urlImageMobile, setUrlImageMobile] = useState("");
    const [urlImageDesktop, setUrlImageDesktop] = useState("");
    const [isUploadingMobile, setIsUploadingMobile] = useState(false);
    const [isUploadingDesktop, setIsUploadingDesktop] = useState(false);
    const [imagenes, setImagenes] = useState([]);
    const [hasChanges, setHasChanges] = useState(false);


    useEffect(() => {
        const fetchImagenes = async () => {
            try {
                const imagenesData = await getImagenes();
                setImagenes(imagenesData);
                setHasChanges(false);
            } catch (error) {
                console.error('Error al obtener las imágenes:', error);
            }
        };

        fetchImagenes();
    }, [hasChanges]);

    const getImagen = (dispositivo, numero) => {
        return imagenes.find(imagen => imagen.dispositivo === dispositivo && imagen.nro === numero);
    };

    const onError = (err) => {
        console.error("Error", err);
    };

    const onSuccessMobile = (res, id) => {
        setUrlImageMobile(res.url);
        setIsUploadingMobile(false);
        putImagen(id, res.url);
        setHasChanges(true);
    };

    const onSuccessDesktop = (res, id) => {
        setUrlImageDesktop(res.url);
        setIsUploadingDesktop(false);
        putImagen(id, res.url);
        setHasChanges(true);
    };

    const onUploadProgressMobile = (progress) => {
        setIsUploadingMobile(true);
    };

    const onUploadProgressDesktop = (progress) => {
        setIsUploadingDesktop(true);
    };

    const onUploadStartMobile = (evt) => {
        setIsUploadingMobile(true);
    };

    const onUploadStartDesktop = (evt) => {
        setIsUploadingDesktop(true);
    };


    return (
        <>
        <section className="text-gray-600 body-font">
        <p>Los tamaños para las imagenes son</p>
        <p className='text-black'>Para movil: 500x500px</p>
        <p className='text-black'>Para pc: 970x250 px</p>
        <p>En esta pagina puedes redimenzionar tus imagenes: <a href='https://www.iloveimg.com/es/redimensionar-imagen/jpg-cambiar-tamano#resize-options,pixels' target='blank'><button class="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200"><span>I love img</span><div class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]"><div class="relative h-full w-8 bg-white/20"></div></div></button></a></p>
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={getImagen('movil', 1)?.url}/>
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Celular</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">Primera Imagen</h2>
                <IKContext
                    urlEndpoint={urlEndpoint}
                    publicKey={publicKey}
                    authenticator={authStorage}
                >
                    <span>Subir Imagen Para Móvil</span>
                    <IKUpload
                    //id 1
                        className="p-2 border rounded-md bg-gray-200"
                        fileName="product.png"
                        onError={onError}
                        onSuccess={(res) => onSuccessMobile(res, 1)}
                        onUploadProgress={onUploadProgressMobile}
                        onUploadStart={onUploadStartMobile}
                        accept="image/png, image/jpeg, image/avif"
                    />
                    {isUploadingMobile && (
                        <div classNameName="text-sm text-gray-500 mt-2">
                            Cargando imagen para móvil...
                        </div>
                    )}
                </IKContext>
              </div>
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={getImagen('movil', 2)?.url}/>
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Celular</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">Segunda Imagen</h2>
                <IKContext
                    urlEndpoint={urlEndpoint}
                    publicKey={publicKey}
                    authenticator={authStorage}
                >
                    <span>Subir Imagen Para Móvil</span>
                    <IKUpload
                    //id 2
                        className="p-2 border rounded-md bg-gray-200"
                        fileName="product.png"
                        onError={onError}
                        onSuccess={(res) => onSuccessMobile(res, 2)}
                        onUploadProgress={onUploadProgressMobile}
                        onUploadStart={onUploadStartMobile}
                        accept="image/png, image/jpeg, image/avif"
                    />
                    {isUploadingMobile && (
                        <div classNameName="text-sm text-gray-500 mt-2">
                            Cargando imagen para móvil...
                        </div>
                    )}
                </IKContext>
              </div>
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={getImagen('pc', 1)?.url}/>
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">PC</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">Primera Imagen</h2>
                <IKContext
                    urlEndpoint={urlEndpoint}
                    publicKey={publicKey}
                    authenticator={authStorage}
                >
                    <span>Subir Imagen para PC</span>
                    <IKUpload
                    //id 3
                        className="p-2 border rounded-md bg-gray-200"
                        fileName="product.png"
                        onError={onError}
                        onSuccess={(res) => onSuccessDesktop(res, 3)}
                        onUploadProgress={onUploadProgressDesktop}
                        onUploadStart={onUploadStartDesktop}
                        accept="image/png, image/jpeg, image/avif"
                    />
                    {isUploadingDesktop && (
                        <div className="text-sm text-gray-500 mt-2">
                            Cargando imagen para PC...
                        </div>
                    )}
                </IKContext>
              </div>
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={getImagen('pc', 2)?.url}/>
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">PC</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">Segunda Imagen</h2>
                <IKContext
                    urlEndpoint={urlEndpoint}
                    publicKey={publicKey}
                    authenticator={authStorage}
                >
                    <span>Subir Imagen para PC</span>
                    <IKUpload

                    //id 4
                        className="p-2 border rounded-md bg-gray-200"
                        fileName="product.png"
                        onError={onError}
                        onSuccess={(res) => onSuccessDesktop(res, 4)}
                        onUploadProgress={onUploadProgressDesktop}
                        onUploadStart={onUploadStartDesktop}
                        accept="image/png, image/jpeg, image/avif"
                    />
                    {isUploadingDesktop && (
                        <div className="text-sm text-gray-500 mt-2">
                            Cargando imagen para PC...
                        </div>
                    )}
                </IKContext>
              </div>
            </div>
          </div>
        </div>
      </section>
      </>
    );
}

export default Imagenes;
