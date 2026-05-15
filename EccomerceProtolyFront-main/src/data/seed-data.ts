import { Category } from "@/interfaces";
import { Product } from "@/interfaces";

export const seedCategories: Category[] = [
  { id: 1, nombre: 'Bebidas' },
  { id: 2, nombre: 'Snacks' },
  { id: 3, nombre: 'Dulces y Postres' },
  { id: 4, nombre: 'Lácteos y Huevos' },
  { id: 5, nombre: 'Pan y Repostería' },
  { id: 6, nombre: 'Enlatados y Conservas' },
  { id: 7, nombre: 'Congelados' },
  { id: 8, nombre: 'Limpieza' },
  { id: 9, nombre: 'Alcohol' },
];

const catNames: Record<number, string> = {
  1: 'Bebidas', 2: 'Snacks', 3: 'Dulces y Postres',
  4: 'Lácteos y Huevos', 5: 'Pan y Repostería',
  6: 'Enlatados y Conservas', 7: 'Congelados', 8: 'Limpieza', 9: 'Alcohol',
};

function p(n: string, d: string, pr: number, c: number, s: string, seed: string): Omit<Product, 'id'> {
  return {
    nombre: n, descripcion: d, precio: pr, inventario: 'Hay existencias',
    categoriaId: c, subcategoria: s, imagenUrl: `https://picsum.photos/seed/${seed}/400/400`,
    Categoria: { id: c, nombre: catNames[c] },
  };
}

const rawProducts: Omit<Product, 'id'>[] = [
  // === Bebidas - Gaseosas ===
  p('Coca-Cola 355ml', 'Refresco de cola clásico, lata 355ml.', 18, 1, 'Gaseosas', 'cola'),
  p('Sprite 355ml', 'Refresco sabor limón, lata 355ml.', 18, 1, 'Gaseosas', 'sprite'),
  p('Fanta Naranja 355ml', 'Refresco sabor naranja, lata 355ml.', 18, 1, 'Gaseosas', 'fanta'),
  p('Coca-Cola Zero 355ml', 'Refresco de cola sin azúcar, lata 355ml.', 18, 1, 'Gaseosas', 'colazero'),
  p('Agua Tónica 355ml', 'Agua tónica premium, lata 355ml.', 20, 1, 'Gaseosas', 'tonica'),
  p('Soda Limeña 500ml', 'Agua mineral con gas y limón, botella 500ml.', 22, 1, 'Gaseosas', 'soda'),

  // === Bebidas - Té & Limonadas ===
  p('Té Helado Limón 500ml', 'Té helado sabor limón, refrescante.', 22, 1, 'Te y Limonadas', 'te'),
  p('Té Helado Durazno 500ml', 'Té helado sabor durazno, botella 500ml.', 22, 1, 'Te y Limonadas', 'tedurazno'),
  p('Limonada Natural 500ml', 'Limonada natural preparada con limón fresco.', 25, 1, 'Te y Limonadas', 'limonada'),
  p('Limonada con Hierbabuena 500ml', 'Limonada natural con hierbabuena y hielo.', 28, 1, 'Te y Limonadas', 'hierbabuena'),
  p('Té Verde con Miel 400ml', 'Té verde endulzado con miel natural.', 26, 1, 'Te y Limonadas', 'teverde'),

  // === Bebidas - Jugos ===
  p('Jugo de Naranja Natural 1L', 'Jugo de naranja 100% natural.', 32, 1, 'Jugos', 'jugo'),
  p('Jugo de Manzana 1L', 'Jugo de manzana pasteurizado, 1 litro.', 28, 1, 'Jugos', 'manzana'),
  p('Jugo de Piña 500ml', 'Jugo de piña natural, botella 500ml.', 26, 1, 'Jugos', 'pina'),
  p('Jugo Verde Detox 500ml', 'Jugo detox con apio, espinaca y manzana verde.', 34, 1, 'Jugos', 'detox'),
  p('Smoothie de Fresa 350ml', 'Smoothie cremoso de fresa con yogurt.', 38, 1, 'Jugos', 'smoothie'),

  // === Bebidas - Aguas ===
  p('Agua Mineral 1.5L', 'Agua mineral natural sin gas.', 15, 1, 'Aguas', 'agua'),
  p('Agua Mineral con Gas 1L', 'Agua mineral con gas natural, botella 1L.', 18, 1, 'Aguas', 'agas'),
  p('Agua de Coco 330ml', 'Agua de coco natural, rica en electrolitos.', 28, 1, 'Aguas', 'coco'),
  p('Agua Alcalina 1L', 'Agua alcalina con pH 8.5, 1 litro.', 22, 1, 'Aguas', 'alcalina'),

  // === Bebidas - Alcohol ===
  p('Cerveza Lager 355ml', 'Cerveza tipo lager, botella 355ml.', 25, 9, 'Alcohol', 'cerveza'),
  p('Cerveza IPA 355ml', 'Cerveza artesanal India Pale Ale, lata 355ml.', 38, 9, 'Alcohol', 'ipa'),
  p('Vino Tinto 750ml', 'Vino tinto de mesa, botella 750ml.', 120, 9, 'Alcohol', 'vino'),
  p('Vino Blanco 750ml', 'Vino blanco seco, botella 750ml.', 110, 9, 'Alcohol', 'vblanco'),
  p('Sidra 500ml', 'Sidra natural espumante, botella 500ml.', 55, 9, 'Alcohol', 'sidra'),
  p('Ron Dorado 750ml', 'Ron dorado añejo, botella 750ml.', 180, 9, 'Alcohol', 'ron'),

  // === Snacks - Antojos ===
  p('Papas Fritas Clásicas 170g', 'Papas fritas crujientes ligeramente saladas.', 28, 2, 'Antojos', 'papas'),
  p('Botana de Maíz 200g', 'Botana de maíz horneada con queso.', 25, 2, 'Antojos', 'botana'),
  p('Nachos con Queso 250g', 'Nachos crujientes con salsa de queso.', 32, 2, 'Antojos', 'nachos'),
  p('Aros de Cebolla 150g', 'Aros de cebolla empanizados, bolsa 150g.', 30, 2, 'Antojos', 'aros'),
  p('Churros Dulces 200g', 'Churros crujientes espolvoreados con azúcar.', 28, 2, 'Antojos', 'churros'),
  p('Papas Sabor BBQ 170g', 'Papas fritas con sabor a BBQ, bolsa 170g.', 28, 2, 'Antojos', 'bbq'),

  // === Snacks - Frutos Secos ===
  p('Mix de Frutos Secos 150g', 'Mezcla de almendras, nueces y pasas.', 45, 2, 'Frutos Secos', 'frutos'),
  p('Almendras Tostadas 100g', 'Almendras tostadas y saladas, bolsa 100g.', 38, 2, 'Frutos Secos', 'almendras'),
  p('Nueces de la India 120g', 'Nueces de la India tostadas, bolsa 120g.', 42, 2, 'Frutos Secos', 'nueces'),
  p('Pistaches 100g', 'Pistaches salados con cáscara, bolsa 100g.', 35, 2, 'Frutos Secos', 'pistache'),

  // === Snacks - Saludables ===
  p('Barra de Granola 50g', 'Barra de granola con avena y miel.', 15, 2, 'Saludables', 'granola'),
  p('Galletas de Arroz 100g', 'Galletas de arroz inflado, bajas en calorías.', 18, 2, 'Saludables', 'arroz'),
  p('Pack de Fruta Deshidratada 80g', 'Mix de manzana, mango y plátano deshidratado.', 25, 2, 'Saludables', 'deshidratada'),

  // === Snacks - Sandwich ===
  p('Sándwich de Jamón y Queso', 'Sándwich clásico de jamón de pavo y queso suizo.', 45, 2, 'Sandwich', 'jamon'),
  p('Sándwich de Pollo', 'Sándwich de pechuga de pollo con lechuga y tomate.', 52, 2, 'Sandwich', 'pollo'),
  p('Club Sándwich', 'Sándwich triple con pavo, tocino, lechuga y tomate.', 58, 2, 'Sandwich', 'club'),
  p('Sándwich Veggie', 'Sándwich vegetariano con hummus, pepino y espinaca.', 48, 2, 'Sandwich', 'veggie'),
  p('Sándwich de Atún', 'Sándwich de atún con mayonesa, lechuga y tomate.', 42, 2, 'Sandwich', 'atun'),

  // === Dulces y Postres - Dulces ===
  p('Gomitas de Frutas 200g', 'Gomitas masticables sabor frutas.', 20, 3, 'Dulces', 'gomitas'),
  p('Caramelo Suave 150g', 'Caramelos suaves de leche.', 25, 3, 'Dulces', 'caramelo'),
  p('Malvaviscos 150g', 'Malvaviscos esponjosos.', 18, 3, 'Dulces', 'malvavisco'),
  p('Paletas de Caramelo 12pz', 'Paletas duras de caramelo, 12 piezas.', 22, 3, 'Dulces', 'paletas'),
  p('Gomitas Ácidas 150g', 'Gomitas cubiertas de azúcar ácida.', 22, 3, 'Dulces', 'acidas'),

  // === Dulces y Postres - Chocolates ===
  p('Chocolate Amargo 70% 100g', 'Chocolate oscuro con 70% de cacao.', 42, 3, 'Chocolates', 'chocolate'),
  p('Chocolate con Leche 100g', 'Chocolate con leche cremoso, tableta 100g.', 35, 3, 'Chocolates', 'chocolateleche'),
  p('Chocolate Blanco 90g', 'Chocolate blanco con trozos de almendra.', 32, 3, 'Chocolates', 'blanco'),
  p('Chocolate con Avellanas 100g', 'Chocolate con leche y avellanas enteras.', 38, 3, 'Chocolates', 'avellanas'),
  p('Bombones Surtidos 150g', 'Caja de bombones surtidos rellenos.', 55, 3, 'Chocolates', 'bombones'),

  // === Dulces y Postres - Postres ===
  p('Pastelito de Vainilla 80g', 'Pastelito relleno de crema de vainilla.', 16, 3, 'Postres', 'pastelito'),
  p('Galletas con Chispas 200g', 'Galletas crujientes con chispas de chocolate.', 30, 3, 'Postres', 'chispas'),
  p('Flan Napolitano 150g', 'Flan napolitano con caramelo líquido.', 28, 3, 'Postres', 'flan'),
  p('Arroz con Leche 200g', 'Arroz con leche cremoso, envase 200g.', 22, 3, 'Postres', 'arrozleche'),

  // === Lácteos y Huevos - Lácteos ===
  p('Leche Entera 1L', 'Leche de vaca entera pasteurizada.', 24, 4, 'Lacteos', 'leche'),
  p('Leche Deslactosada 1L', 'Leche sin lactosa, 1 litro.', 26, 4, 'Lacteos', 'deslactosada'),
  p('Leche de Almendra 1L', 'Leche vegetal de almendra, 1 litro.', 35, 4, 'Lacteos', 'almendra'),
  p('Yogurt Natural 500g', 'Yogurt natural sin azúcar.', 30, 4, 'Lacteos', 'yogurt'),
  p('Yogurt de Fresa 200g', 'Yogurt sabor fresa, envase 200g.', 18, 4, 'Lacteos', 'yogfresa'),
  p('Crema para Batir 200ml', 'Crema de leche para batir.', 35, 4, 'Lacteos', 'crema'),
  p('Mantequilla 90g', 'Mantequilla de leche de vaca.', 28, 4, 'Lacteos', 'mantequilla'),

  // === Lácteos y Huevos - Quesos ===
  p('Queso Manchego 200g', 'Queso manchego curado.', 78, 4, 'Quesos', 'manchego'),
  p('Queso Fresco 200g', 'Queso fresco suave y cremoso.', 42, 4, 'Quesos', 'fresco'),
  p('Queso Crema 200g', 'Queso crema untable, 200g.', 38, 4, 'Quesos', 'cremaqueso'),
  p('Queso Parmesano 100g', 'Queso parmesano rallado, 100g.', 55, 4, 'Quesos', 'parmesano'),

  // === Lácteos y Huevos - Huevos ===
  p('Huevo Blanco 12pz', 'Huevo blanco de primera calidad, 12 piezas.', 32, 4, 'Huevos', 'huevoblanco'),
  p('Huevo Libre de Jaula 6pz', 'Huevo de gallina libre de jaula, 6 piezas.', 38, 4, 'Huevos', 'huevolibre'),
  p('Claras de Huevo 500ml', 'Claras de huevo pasteurizadas, envase 500ml.', 45, 4, 'Huevos', 'claras'),

  // === Pan y Repostería - Pan ===
  p('Pan de Caja Blanco 680g', 'Pan de caja blanco suave, 680g.', 32, 5, 'Pan', 'pancaja'),
  p('Pan de Caja Integral 680g', 'Pan de caja integral con fibra, 680g.', 35, 5, 'Pan', 'panintegral'),
  p('Bolillo 6pz', 'Bolillo tradicional, 6 piezas.', 18, 5, 'Pan', 'bolillo'),
  p('Tortillas de Harina 1kg', 'Tortillas de harina de trigo, 1kg.', 42, 5, 'Pan', 'tortillasharina'),
  p('Baguette Artesanal', 'Baguette artesanal de masa madre.', 35, 5, 'Pan', 'baguette'),

  // === Pan y Repostería - Reposteria ===
  p('Donas Glaseadas 4pz', 'Donas esponjosas cubiertas de glaseado, 4 piezas.', 45, 5, 'Reposteria', 'donas'),
  p('Croissant de Mantequilla', 'Croissant hojaldrado de mantequilla.', 28, 5, 'Reposteria', 'croissant'),
  p('Pan Dulce Surtido 6pz', 'Surtido de pan dulce tradicional, 6 piezas.', 48, 5, 'Reposteria', 'pandulce'),
  p('Muffin de Arándano', 'Muffin esponjoso con arándanos frescos.', 25, 5, 'Reposteria', 'muffin'),

  // === Enlatados y Conservas - Conservas ===
  p('Atún en Agua 140g', 'Atún en agua, lata 140g.', 22, 6, 'Conservas', 'atunlata'),
  p('Sardinas en Tomate 120g', 'Sardinas en salsa de tomate, lata 120g.', 20, 6, 'Conservas', 'sardinas'),
  p('Champiñones Enteros 400g', 'Champiñones enteros en conserva, 400g.', 28, 6, 'Conservas', 'champinones'),
  p('Elote Dulce 300g', 'Elote dulce en grano, lata 300g.', 22, 6, 'Conservas', 'elote'),
  p('Frijoles Refritos 500g', 'Frijoles refritos estilo tradicional, 500g.', 25, 6, 'Conservas', 'frijoles'),
  p('Verduras Mixtas 400g', 'Mezcla de verduras en conserva, 400g.', 24, 6, 'Conservas', 'verduras'),

  // === Enlatados y Conservas - Sopas ===
  p('Sopa de Fideos 150g', 'Sopa de fideos deshidratada, sobre 150g.', 15, 6, 'Sopas', 'sopafideos'),
  p('Caldo de Res 150g', 'Caldo de res deshidratado, sobre 150g.', 18, 6, 'Sopas', 'caldores'),
  p('Crema de Champiñón 300g', 'Crema de champiñón lista, lata 300g.', 28, 6, 'Sopas', 'cremachampi'),

  // === Enlatados y Conservas - Salsas ===
  p('Salsa de Tomate 250g', 'Salsa de tomate natural, 250g.', 18, 6, 'Salsas', 'salsatomate'),
  p('Mayonesa 400g', 'Mayonesa cremosa, envase 400g.', 32, 6, 'Salsas', 'mayonesa'),
  p('Mostaza 200g', 'Mostaza amarilla, envase 200g.', 18, 6, 'Salsas', 'mostaza'),
  p('Catsup 400g', 'Catsup de tomate, envase 400g.', 25, 6, 'Salsas', 'catsup'),

  // === Congelados - Comida Congelada ===
  p('Pizza Congelada 500g', 'Pizza congelada de pepperoni, 500g.', 65, 7, 'Comida Congelada', 'pizza'),
  p('Nuggets de Pollo 400g', 'Nuggets de pollo empanizados, 400g.', 55, 7, 'Comida Congelada', 'nuggets'),
  p('Papas a la Francesa 500g', 'Papas a la francesa congeladas, 500g.', 42, 7, 'Comida Congelada', 'papascong'),
  p('Verduras Congeladas 400g', 'Mezcla de verduras congeladas, 400g.', 35, 7, 'Comida Congelada', 'verdurascong'),
  p('Helado de Vainilla 1L', 'Helado cremoso de vainilla, 1 litro.', 55, 7, 'Comida Congelada', 'heladovainilla'),

  // === Congelados - Helados ===
  p('Helado de Chocolate 1L', 'Helado cremoso de chocolate, 1 litro.', 55, 7, 'Helados', 'heladochocolate'),
  p('Paleta de Fresa 6pz', 'Paletas de agua sabor fresa, 6 piezas.', 32, 7, 'Helados', 'paletafresa'),
  p('Sorbete de Limón 500ml', 'Sorbete refrescante de limón, 500ml.', 38, 7, 'Helados', 'sorbete'),

  // === Limpieza ===
  p('Limpiador Multiusos 500ml', 'Limpiador multiusos con aroma a lavanda, 500ml.', 28, 8, 'Limpieza', 'limpiador'),
  p('Cloro 1L', 'Cloro líquido para desinfección, 1 litro.', 22, 8, 'Limpieza', 'cloro'),
  p('Jabón para Trastes 500ml', 'Jabón líquido para trastes, 500ml.', 25, 8, 'Limpieza', 'jabontrastes'),
  p('Desinfectante 1L', 'Desinfectante multiusos, 1 litro.', 30, 8, 'Limpieza', 'desinfectante'),
  p('Suavizante de Telas 1L', 'Suavizante de telas aroma floral, 1 litro.', 35, 8, 'Limpieza', 'suavizante'),
  p('Detergente 1kg', 'Detergente para ropa en polvo, 1kg.', 42, 8, 'Limpieza', 'detergente'),
  p('Bolsas de Basura 30pz', 'Bolsas de basura resistentes, 30 piezas.', 32, 8, 'Limpieza', 'bolsas'),
];

export const seedProducts: Product[] = rawProducts.map((p, i) => ({ ...p, id: i + 1 }));
