"use client";

import { Usuario } from "@/interfaces";
import useLoginStore from "@/store/userauth/login-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const FormLogin = () => {
  // CONTROLADOR DEL FORM
  const router = useRouter(); 
  const { register, handleSubmit, formState: { errors }, reset, } = useForm();

  // ESTADO GLOBALES
  const login = useLoginStore(state => state.login);
  const usuario = useLoginStore(state => state.usuario);
  const loading = useLoginStore(state => state.loading);
  

  // EVENTOS
  const onSubmit = handleSubmit(async(data) => {
    const { email, contraseña  } = data;
    const user: Usuario = {
      email,
      contraseña,
    };

    await login(user); // aqui guarda el usuario en local strage
    // console.log(usuario)
  });

  useEffect(() => {
    // Verifica si hay un usuario después de que el estado de usuario cambie
    if (usuario !== null) {
      // Redirige a la página principal si hay un usuario
      console.log(usuario)
      router.push('/');
    }
  }, [usuario]);

  return (
    <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
      <form onSubmit={onSubmit} className="px-5 py-7">
        <label className="font-semibold text-sm text-gray-600 pb-1 block">
          E-mail
        </label>
        <input
          type="email"
          className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
          {...register("email", { required: true, })}
        />
        {errors.email && ( <span className="text-red-500 text-xs">Campo requerido</span> )}

        <label className="font-semibold text-sm text-gray-600 pb-1 block mt-5">
          Password
        </label>
        <input
          type="password"
          className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
          {...register("contraseña", { required: true })}
        />
        {errors.contraseña && ( <span className="text-red-500 text-xs">Campo requerido</span> )}

        <button
          type="submit"
          disabled={loading}
          className="transition duration-200 bg-blue-500 hover:bg-blue-600 mt-5 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
        >
          <span className="inline-block mr-2">
            { loading ? 'Cargando..' : 'Iniciar Sesión' }
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4 inline-block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </form>
      {/* <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center sm:text-left whitespace-nowrap">
                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                    <span className="inline-block ml-1">Forgot Password</span>
                </button>
              </div>
              <div className="text-center sm:text-right  whitespace-nowrap">
                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-bottom	">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="inline-block ml-1">Help</span>
                </button>
              </div>
            </div>
          </div> */}
    </div>
  );
};
