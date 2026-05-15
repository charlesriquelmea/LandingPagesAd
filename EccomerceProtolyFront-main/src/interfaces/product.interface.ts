export interface Product {
    id?: number;
    nombre: string;
    descripcion: string;
    imagenUrl: string;
    precio: number;
    inventario: string;
    categoriaId: number;
    subcategoria?: string;
    Categoria?: Categoria;
    tamano?: string;
    precioPorUnidad?: string;
    snapElegible?: boolean;
    sabor?: string;
    detalles?: string;
    especificaciones?: string;
    ingredientes?: string;
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
    nombre: string
  }
