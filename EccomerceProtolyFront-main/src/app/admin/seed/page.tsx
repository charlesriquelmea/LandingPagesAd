"use client";

import { seedData } from "@/actions/seed/seed-data";
import { useState } from "react";

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ categories: number; products: number; errors: string[] } | null>(null);

  const handleSeed = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await seedData();
      setResult(res);
    } catch (e) {
      setResult({ categories: 0, products: 0, errors: [`Error: ${e}`] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Generar Datos de Prueba</h1>
      <p className="mb-6 text-gray-600">
        Esto creará 8 categorías y 50 productos con imágenes de muestra para probar la aplicación.
        Si ya existen algunos datos, se crearán duplicados.
      </p>
      <button
        onClick={handleSeed}
        disabled={loading}
        className="bg-secondary text-black font-bold py-3 px-6 rounded-xl hover:opacity-90 disabled:opacity-50 transition-all"
      >
        {loading ? "Generando..." : "Generar 50 Productos"}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded-xl">
          <p className="font-semibold">Categorías creadas: {result.categories}</p>
          <p className="font-semibold">Productos creados: {result.products}</p>
          {result.errors.length > 0 && (
            <div className="mt-2">
              <p className="text-red-600 font-semibold">Errores ({result.errors.length}):</p>
              <ul className="list-disc ml-5 text-sm text-red-500">
                {result.errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
