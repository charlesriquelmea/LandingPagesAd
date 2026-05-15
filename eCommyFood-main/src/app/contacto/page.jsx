"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import { IoSearchOutline, IoPersonOutline } from "react-icons/io5";
import { OffCanvas } from "@/components";
import useLoginStore from "@/store/userauth/login-store";
import sendEmail from "@/actions/Email/sendEmail.js";
import { IoArrowBack } from "react-icons/io5";

const Contacto = () => {
  const sesion = useLoginStore((state) => state.sesion);

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    empresa: "",
    telefono: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendEmail(formData);
      Swal.fire({
        icon: "success",
        title: "¡Correo enviado!",
        text: "Tu mensaje ha sido enviado correctamente.",
      });
    } catch (error) {
      console.error("Error al enviar el correo electrónico:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al enviar el correo. Por favor, intenta nuevamente más tarde.",
      });
    }
  };

  return (
    <>
      <nav className="bg-orange-200 flex px-10 h-14 justify-between items-center w-full border-b-[1px]">
        {/* Logo */}
        <div>
          <Link href="/">
            <img src="/imgs/logo.png" width={250} height={250} alt="Logo"/>
          </Link>
        </div>

        {/* search, cart y menu */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <IoSearchOutline className="w-5 h-5" />
          </Link>

          {/* Este offcanvas contiene el carrito de compras*/}
          <OffCanvas />

          {sesion?.isSesion === false ? (
            <Link href="/auth/login">
              <IoPersonOutline className="w-5 h-5" />
            </Link>
          ) : (
            <Link
              href="/admin/products"
              className="text-sm p-2 rounded-md  transition-all hover:bg-gray-100"
            >
              Dashboard
            </Link>
          )}
        </div>
      </nav>
      <section className="text-gray-600 body-font relative text-center">
  <div className="flex justify-center items-center mb-4">

    <h1 className="text-4xl font-extrabold leading-none tracking-tight mt-9 text-primary md:text-4xl lg:text-5xl">
      Trabajos especializados en Acero inoxidable
    </h1>
    <Link href={"/"}>
      <div className="rounded-md py-1 px-2 flex justify-center items-center hover:bg-gray-200">
        <IoArrowBack size={30} />
      </div>
    </Link>
  </div>

        <form onSubmit={handleSubmit}>
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font  text-gray-900">
                Contactanos
              </h1>
            </div>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label for="nombre" className="leading-7 text-sm text-gray-600">
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label for="correo" className="leading-7 text-sm text-gray-600">
                      Correo
                    </label>
                    <input
                      type="email"
                      required
                      id="correo"
                      name="correo"
                      value={formData.correoe}
                      onChange={handleChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      for="empresa"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Empresa
                    </label>
                    <input
                      type="text"
                      required
                      id="empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      for="telefono"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Telefono
                    </label>
                    <input
                      type="number"
                      required
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      for="mensaje"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      required
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    ></textarea>
                  </div>
                </div>
                <div className="p-2 w-full">
                  <button
                    type="sumbit"
                    className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Contacto;
