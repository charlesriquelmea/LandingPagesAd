"use client";
import { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useCartStore } from "@/store";
import { createOrder } from "@/actions";
import Link from "next/link";
import Swal from "sweetalert2";

export default function CheckoutPage() {
  const cartItems = useCartStore((state) => state.cart);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [reference, setReference] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("domicilio");

  useEffect(() => {
    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(subtotal);
  }, [cartItems]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formattedPhone = `+56${phone}`;
    const productDetails = cartItems.map((item) => ({
      nombre: item.nombre,
      cantidad: item.quantity,
    }));

    try {
      await createOrder(
        productDetails,
        name,
        formattedPhone,
        email,
        total,
        address,
        apartment,
        reference
      );
      Swal.fire({
        icon: "success",
        title: "¡Pedido enviado!",
        text: "Nos contactaremos lo antes posible. ¡Gracias!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al crear la orden. Por favor, inténtalo de nuevo más tarde.",
      });
    }
  };

  return (
    <div className="p-4 md:p-0 md:h-screen md:flex md:flex-col md:items-center mb-20">
      <div className="w-full md:w-[500px]">
        <h1 className="mt-10 text-gray-500 font-bold text-3xl">Checkout</h1>
        <div className="flex justify-between w-full">
          <h2 className="text-2xl font-semibold">eCommy</h2>
          <Link href={"/"}>
            <div className="rounded-md py-1 px-2 flex justify-center items-center hover:bg-gray-200">
              <IoArrowBack size={20} /> Volver al Carrito
            </div>
          </Link>
        </div>
      </div>

      <form className="w-full md:w-[500px] mt-8" onSubmit={handleSubmit}>
        {/* Datos personales */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md mt-5">
          <span className="font-semibold">Cliente</span>
          <div className="mt-4 mb-3">
            <div className="flex flex-col mb-4">
              <label className="mb-1">Nombre</label>
              <input
                className="border border-gray-300 rounded-lg py-1 px-3"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="mb-1">Correo</label>
              <input
                className="border border-gray-300 rounded-lg py-1 px-3"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label>Teléfono</label>
              <div className="flex w-full gap-4">
                <input
                  className="border border-gray-300 rounded-lg w-[25%] py-1 px-3"
                  type="text"
                  value="+56"
                  disabled
                />
                <input
                  className="border border-gray-300 rounded-lg w-[75%] py-1 px-3"
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Opción de entrega */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md mt-5">
          <span className="font-semibold">Opción de entrega</span>
          <div className="mt-4 mb-3">
            <div className="flex flex-col mb-4">
              <label className="flex items-center mb-2">
                <input
                  type="radio"
                  name="delivery"
                  value="domicilio"
                  checked={deliveryOption === "domicilio"}
                  onChange={() => setDeliveryOption("domicilio")}
                />
                <span className="ml-2">Entrega a domicilio</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="delivery"
                  value="tienda"
                  checked={deliveryOption === "tienda"}
                  onChange={() => setDeliveryOption("tienda")}
                />
                <span className="ml-2">Retiro en tienda</span>
              </label>
            </div>

            {/* Mostrar el campo de dirección solo si es entrega a domicilio */}
            {deliveryOption === "domicilio" && (
              <div className="flex flex-col mb-4">
                <label className="mb-1">Dirección</label>
                <input
                  className="border border-gray-300 rounded-lg py-1 px-3"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <label className="mb-1 mt-4">N° Dpto o Casa</label>
                <input
                  className="border border-gray-300 rounded-lg py-1 px-3"
                  type="number"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  required
                />
                <label className="mb-1 mt-4">Referencia</label>
                <input
                  className="border border-gray-300 rounded-lg py-1 px-3"
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  required
                />
              </div>
            )}

            {/* Mostrar la dirección "Avenida Libertad" si es retiro en tienda */}
            {deliveryOption === "tienda" && (
              <div className="flex flex-col mb-4">
                <label className="mb-1">Dirección</label>
                <input
                  className="border border-gray-300 rounded-lg py-1 px-3"
                  type="text"
                  value="Avenida Libertad 6545"
                  disabled
                />
              </div>
            )}
          </div>
        </div>

        {/* Resumen del pedido */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md mt-5">
          <span className="font-semibold">Resumen del pedido</span>
          <div className="mt-4 mb-3">
            <div className="flex flex-col mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col">
                  <div className="flex justify-between mb-2">
                    <span>
                      <b>Producto</b>: {item.nombre}
                    </span>
                    <span>${item.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cantidad: {item.quantity}</span>
                    <span>Total: ${item.price * item.quantity}</span>
                  </div>
                </div>
              ))}

              <hr />
            </div>
            <div className="flex flex-col">
              <hr />
              <div className="flex justify-between">
                <label className="mb-2">Subtotal</label>
                <span>
                  $
                  {cartItems.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        <button
          className="text-gray-700 bg-secondary py-4 rounded-lg flex w-full justify-center hover:bg-yellow-500 font-semibold mt-5"
          type="submit"
          disabled={cartItems.length === 0}
        >
          Confirmar Pedido
        </button>
      </form>
    </div>
  );
}
