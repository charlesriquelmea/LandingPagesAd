"use client";
import React, { useEffect, useState } from "react";
import { getOrders } from "@/actions/orders/getOrders";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("");

  const openModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleEstadoChange = async (event) => {
    const newEstado = event.target.value;
    try {
      // Realizar la solicitud para editar el estado
      await editEstado(selectedOrder.id, newEstado);
      // Actualizar el estado local de la orden
      setSelectedOrder({ ...selectedOrder, estado: newEstado });
      // Actualizar la lista de órdenes para reflejar el cambio
      const updatedOrders = orders.map((order) => {
        if (order.id === selectedOrder.id) {
          return { ...order, estado: newEstado };
        }
        return order;
      });
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error al editar el estado:", error);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response.orders);
      } catch (error) {
        console.error("Error al obtener las órdenes:", error);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (!filter) return true;
    return order.estado === filter;
  });

  return (
    <div className="top-0 z-50 bg-white w-full overflow-x-auto">
      <div className="flex justify-center items-center p-4">
        <div className="flex space-x-4 overflow-x-auto">
          <button
            className={`text-xs ${
              filter === "" ? "bg-blue-500 text-white" : "bg-gray-200"
            } hover:bg-blue-500 hover:text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition duration-300 ease-in-out`}
            onClick={() => setFilter("")}
          >
            Todos
          </button>
          <button
            className={`text-xs ${
              filter === "En preparación"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            } hover:bg-blue-500 hover:text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition duration-300 ease-in-out`}
            onClick={() => setFilter("En preparación")}
          >
            En preparación
          </button>
          <button
            className={`text-xs ${
              filter === "Pendiente" ? "bg-blue-500 text-white" : "bg-gray-200"
            } hover:bg-blue-500 hover:text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition duration-300 ease-in-out`}
            onClick={() => setFilter("Pendiente")}
          >
            Pendiente
          </button>
          <button
            className={`text-xs ${
              filter === "Entregado" ? "bg-blue-500 text-white" : "bg-gray-200"
            } hover:bg-blue-500 hover:text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition duration-300 ease-in-out`}
            onClick={() => setFilter("Entregado")}
          >
            Entregado
          </button>
        </div>
      </div>
      {filteredOrders.map((order) => (
        <div key={order.id} className="border rounded-lg p-4 mb-4">
          <h2 className="text-xl font-bold mb-2">Información del Cliente</h2>
          <div className="mb-2">
            <label htmlFor="name" className="font-bold">
              Nombre:
            </label>
            <span id="name" className="ml-2">
              {order.nombre_cliente}
            </span>
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="font-bold">
              Correo Electrónico:
            </label>
            <span id="email" className="ml-2">
              {order.correo}
            </span>
          </div>
          <div>
            <label htmlFor="phone" className="font-bold">
              Teléfono:
            </label>
            <span id="phone" className="ml-2">
              {order.telefono}
            </span>
          </div>
          <div>
            <label htmlFor="retiro" className="font-bold">
              Retiro:
            </label>
            <span id="retiro" className="ml-2">
              {order.retiro}
            </span>
          </div>
          <div>
            <label htmlFor="estado" className="font-bold">
              Estado:
            </label>
            <span id="estado" className="ml-2">
              {order.estado}
            </span>
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={() => openModal(order)}
              className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition duration-300 ease-in-out text-xs"
            >
              Ver Detalles de la Orden
            </button>
          </div>
        </div>
      ))}

      {selectedOrder && showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative bg-white rounded-lg shadow-lg max-w-md px-6 py-4 md:max-w-2xl">
            <h2 className="text-xl font-bold mb-2">Detalles de la Orden</h2>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                <span className="font-bold">Cantidad de Productos:</span>{" "}
                {selectedOrder.cantidad_productos}
              </div>
              <div>
                <span className="font-bold">Total:</span> ${selectedOrder.total}
              </div>
              <div>
                <label htmlFor="estado" className="font-bold">
                  Estado:
                </label>
                <select
                  id="estado"
                  className="ml-2 rounded-md border border-gray-300 p-1"
                  value={selectedOrder.estado}
                  onChange={handleEstadoChange}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Entregado">Entregado</option>
                  <option value="En preparación">En preparación</option>
                </select>
              </div>
              <div>
                <span className="font-bold">Fecha:</span>{" "}
                {selectedOrder.createdAt}
              </div>
              {selectedOrder.retiro === "Si" && (
                <>
                  <div>
                    <span className="font-bold">Dirección:</span>{" "}
                    {selectedOrder.direccion}
                  </div>
                  <div>
                    <span className="font-bold">Número:</span>{" "}
                    {selectedOrder.numero}
                  </div>
                  <div>
                    <span className="font-bold">Propiedad:</span>{" "}
                    {selectedOrder.propiedad}
                  </div>
                </>
              )}
            </div>
            <div className="flex space-x-2 justify-center md:justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition duration-300 ease-in-out text-xs"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;