import React, { ReactNode, useState, useCallback } from "react";

interface ModalProps {
  title: string;
  children: ReactNode;
  isOpenModal: boolean;
  onCloseModal: () => void; // Función para cerrar el modal
  className?: string;
}

export const Modal = ({ title, children, isOpenModal, onCloseModal, className = "" }: ModalProps) => {
  return (
    <>
      {isOpenModal && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-center items-center">
          {/* Degradado de fondo */}
          <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

          <div className={`relative max-w-2xl ${className}`}>
            {/* Modal content */}
            <div className="bg-white rounded-2xl shadow relative">
              {/* Modal body */}
              <div className="relative">
                {/* button close */}
                <button
                  type="button"
                  className="absolute right-6 top-6 text-white bg-gray-800 hover:bg-white hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  onClick={onCloseModal}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>

                {/* Content */}
                <div className="rounded-2xl overflow-y-auto max-h-screen">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
