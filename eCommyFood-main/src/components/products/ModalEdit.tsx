// ModalEdit.tsx

import React, { useState } from 'react';
import { Product, Ingredient } from '@/interfaces';

interface Props {
    product: Product;
    closeModal: () => void;
}

const ModalEdit: React.FC<Props> = ({ product, closeModal }) => {
    const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);

    const handleIngredientChange = (ingredient: Ingredient) => {
        setSelectedIngredients((prev) => {
            if (prev.find((i) => i.id === ingredient.id)) {
                return prev.filter((i) => i.id !== ingredient.id); // Desmarcar ingrediente
            }
            return [...prev, ingredient]; // Marcar ingrediente
        });
    };

    const renderOptions = () => {
        if (product.ingredients && product.ingredients.length > 0) {
            return (
                <div>
                    <h4>Selecciona ingredientes:</h4>
                    {product.ingredients.map((ingredient) => (
                        <label key={ingredient.id}>
                            <input
                                type="checkbox"
                                checked={selectedIngredients.some((i) => i.id === ingredient.id)}
                                onChange={() => handleIngredientChange(ingredient)}
                            />
                            {ingredient.name}
                        </label>
                    ))}
            </div>
            );
        }

        return <p className='mb-5'>No hay opciones disponibles para este producto.</p>;
    };

    const handleSaveChanges = () => {
        console.log("Ingredientes seleccionados:", selectedIngredients);
        // Aquí puedes hacer la lógica para guardar los cambios en tu base de datos
        closeModal();
    };

    return (
        <div className="flex flex-col items-center">
            {renderOptions()}
            <div className="flex flex-col items-center mt-4">
                {product.ingredients && product.ingredients.length > 0 && (
                    <button 
                        onClick={handleSaveChanges} 
                        className="bg-gray-800 text-white px-4 py-2 rounded mb-2" // Agregado mb-2 para separación
                    >
                        Guardar Cambios
                    </button>
                )}
                <button 
                    onClick={closeModal} 
                    className="bg-gray-500 text-white px-4 py-2 rounded  hover:bg-yellow-500 mb-5"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}    

export default ModalEdit;
