export interface Ingredient {
    id: number;
    name: string;
}

export interface Product {
    id?: number;
    nombre: string;
    descripcion: string;
    imagenUrl: string;
    precio: number;
    inventario: string;
    categoriaId: number;
    Categoria?: Categoria;
    ingredients?: Ingredient[]; // Asegúrate de que esto esté aquí
}

export interface Categoria {
    id: number;
    nombre: string;
}

export interface CartProduct {
    id?: number;
    price: number;
    quantity: number;
    image: string;
    nombre: string;
}