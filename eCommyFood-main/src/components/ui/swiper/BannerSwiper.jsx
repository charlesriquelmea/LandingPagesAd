"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { getImagenes } from "@/actions";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import Image from "next/image";

export const BannerSwiper = () => {
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    const fetchImagenes = async () => {
      try {
        const imagenesData = await getImagenes();
        console.log(imagenesData); // Verifica el formato de los datos
        // Asegúrate de que los datos sean un array
        setImagenes(Array.isArray(imagenesData) ? imagenesData : []);
      } catch (error) {
        console.error('Error al obtener las imágenes:', error);
      }
    };

    fetchImagenes();
  }, []);

  const getImagen = (dispositivo, numero) => {
    // Verifica si "imagenes" es un array antes de usar .find()
    return Array.isArray(imagenes) 
      ? imagenes.find(imagen => imagen.dispositivo === dispositivo && imagen.nro === numero) 
      : null;
  };

  return (
    <section className="h-auto">
      <Swiper 
        pagination={{ clickable: true }}  
        modules={[Pagination]} 
        className="mySwiper"
      >
        <SwiperSlide>
          {/* Oculta en pantallas más pequeñas que SM */}
          <div className="hidden sm:block">
            {
              getImagen('pc', 1)?.url ? (
                <Image
                  src={getImagen('pc', 1).url}
                  alt="portada-web"
                  width={1000}
                  height={1000}
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-200">
                  <span>No hay imagen disponible</span>
                </div>
              )
            }
          </div>

          {/* Oculta en pantallas SM o mayores */}
          <div className="sm:hidden">
            {
              getImagen('movil', 1)?.url ? (
                <Image
                  src={getImagen('movil', 1).url}
                  alt="portada-movil"
                  width={1000}
                  height={1000}
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-200">
                  <span>No hay imagen disponible</span>
                </div>
              )
            }
          </div>
        </SwiperSlide>

        <SwiperSlide>
          {/* Oculta en pantallas más pequeñas que SM */}
          <div className="hidden sm:block">
            {
              getImagen('pc', 2)?.url ? (
                <Image
                  src={getImagen('pc', 2).url}
                  alt="portada-web"
                  width={1000}
                  height={1000}
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-200">
                  <span>No hay imagen disponible</span>
                </div>
              )
            }
          </div>

          {/* Oculta en pantallas SM o mayores */}
          <div className="sm:hidden">
            {
              getImagen('movil', 2)?.url ? (
                <Image
                  src={getImagen('movil', 2).url}
                  alt="portada-movil"
                  width={1000}
                  height={1000}
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-200">
                  <span>No hay imagen disponible</span>
                </div>
              )
            }
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};
