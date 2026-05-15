"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import Image from "next/image";

export const BannerSwiper = () => {
  return (
    <section className="h-auto">
      <Swiper 
        pagination={{ clickable:true }}  
        modules={[Pagination]} 
        className="mySwiper"
      >

        <SwiperSlide>

          {/* Oculta en pantallas más pequeñas que SM */}
          <div className="hidden sm:block"> 
            <Image
              src="/imgs/p-web.png"
              alt="portada-web"
              width={1000}
              height={1000}
            />
          </div>

          {/* Oculta en pantallas SM o mayores */}
          <div className="sm:hidden"> 
            <Image
              src="/imgs/p-movil.png"
              alt="portada-movil"
              width={1000}
              height={1000}
            />
          </div>

        </SwiperSlide>

        <SwiperSlide>

          {/* Oculta en pantallas más pequeñas que SM */}
          <div className="hidden sm:block"> 
            <Image
              src="/imgs/p-web.png"
              alt="portada-web"
              width={1000}
              height={1000}
            />
          </div>

          {/* Oculta en pantallas SM o mayores */}
          <div className="sm:hidden"> 
            <Image
              src="/imgs/p-movil.png"
              alt="portada-movil"
              width={1000}
              height={1000}
            />
          </div>
        
        </SwiperSlide>

      </Swiper>
    </section>
  );
};
