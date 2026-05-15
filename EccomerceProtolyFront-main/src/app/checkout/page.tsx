"use client";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store";
import { IoArrowBack } from "react-icons/io5";
import { createOrder } from "@/actions/chekout/sendOrdern";

export default function CheckoutPage() {
  const cartItems = useCartStore((state) => state.cart);
  const [retiro, setRetiro] = useState(false);
  const [direccion, setDireccion] = useState("");
  const [numero, setNumero] = useState("");
  const [tipoPropiedad, setTipoPropiedad] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [total, setTotal] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const DELIVERY_COST = 3000;
  useEffect(() => {
    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(subtotal);
  }, [cartItems]);

  const handleretiroChange = () => {
    setRetiro(true);
  };

  const handlePickupChange = () => {
    setRetiro(false);
    setDireccion("");
    setTipoPropiedad("");
    setNumero("");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formattedPhone = `+56${phone}`;
    const retira = retiro ? "Si" : "No";
    const productDetails = cartItems.map((item) => ({
      nombre: item.nombre,
      cantidad: item.quantity,
    }));

    const finalTotal = retiro ? total : total + DELIVERY_COST;
    createOrder(
      productDetails,
      name,
      formattedPhone,
      email,
      finalTotal,
      retira,
      direccion,
      tipoPropiedad,
      numero
    );
    setFormSubmitted(true);
  };

  return (
    <div className="p-4 md:p-0 md:h-screen md:flex md:flex-col md:items-center mb-20">
      <div className="w-full md:w-[500px]">
        <h1 className="mt-10 text-gray-500 font-bold text-3xl">Checkout</h1>
        <div className="flex justify-between w-full">
          <h2 className="text-2xl font-semibold">Name your application</h2>
          <div className="rounded-md py-1 px-2 flex justify-center items-center hover:bg-gray-200">
            <IoArrowBack size={20} />
          </div>
        </div>
      </div>

      <form className="w-full md:w-[500px]" onSubmit={handleSubmit}>
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
            <div className="flex flex-col">
              <label htmlFor="">Teléfono</label>
              <div className="flex w-full gap-4">
                <input
                  className="border border-gray-300 rounded-lg w-[25%] py-1 px-3"
                  type="text"
                  value="+56"
                  disabled
                />
                <input
                  className="border border-gray-300 rounded-lg w-[75%] py-1 px-3"
                  type="text"
                  onChange={(e) => setPhone(e.target.value)}
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
            </div>
          </div>
        </div>

        {/* Opción de entrega */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md mt-5">
          <span className="font-semibold">Opción de entrega</span>
          <div className="mt-4 mb-3">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="retiroOption"
                className="mr-2"
                checked={retiro}
                onChange={handleretiroChange}
              />
              Entrega a domicilio
            </label>
            {/* Mostrar el campo de dirección solo si se selecciona la entrega a domicilio */}
            {retiro && (
              <div className="mt-3">
                <label htmlFor="direccion" className="mb-1">
                  Dirección y numero
                </label>
                <input
                  id="direccion"
                  className="border border-gray-300 rounded-lg py-1 px-3 w-full"
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                />
                <br></br>
                <label htmlFor="tipoPropiedad" className="mt-3 mb-1">
                  Tipo de Propiedad
                </label>
                <div className="flex">
                  <label className="flex items-center mr-4">
                    <input
                      type="radio"
                      name="tipoPropiedad"
                      className="mr-2"
                      value="casa"
                      checked={tipoPropiedad === "casa"}
                      onChange={(e) => setTipoPropiedad(e.target.value)}
                      required
                    />
                    Casa
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="tipoPropiedad"
                      className="mr-2"
                      value="departamento"
                      checked={tipoPropiedad === "departamento"}
                      onChange={(e) => setTipoPropiedad(e.target.value)}
                      required
                    />
                    Departamento
                  </label>
                </div>
                <label htmlFor="numero" className="mt-3 mb-1">
                  Número de casa o depto
                </label>
                <input
                  id="numero"
                  className="border border-gray-300 rounded-lg py-1 px-3 w-full"
                  type="text"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  required
                />
              </div>
            )}

            <label className="flex items-center cursor-pointer mt-2">
              <input
                type="radio"
                name="retiroOption"
                className="mr-2"
                checked={!retiro}
                onChange={handlePickupChange}
              />
              Retiro en tienda
            </label>
          </div>
        </div>

       {/* Resumen */}
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
                <span>${total}</span>
              </div>
              {retiro && (
                <div className="flex justify-between">
                  <label className="mb-2">Costo de Delivery</label>
                  <span>${DELIVERY_COST}</span>
                </div>
              )}
              <hr />
              <div className="flex justify-between font-bold">
                <label className="mb-2">Total</label>
                <span>${retiro ? total + DELIVERY_COST : total}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          className="text-gray-700 bg-secondary py-4 rounded-lg flex w-full justify-center hover:bg-yellow-500 font-semibold mt-5"
          type="submit"
          disabled={cartItems.length === 0 || formSubmitted} // Deshabilitar el botón después de enviar el formulario
        >
          {formSubmitted ? "Orden Enviada" : "Siguiente - Cotizar"}
        </button>
      </form>
    </div>
  );
}
