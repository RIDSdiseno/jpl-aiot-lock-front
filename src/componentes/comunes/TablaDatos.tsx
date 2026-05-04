import type { ReactNode } from "react";
import { EstadoVacio } from "./EstadoVacio";

interface Columna<T> {
  key: string;
  titulo: string;
  render: (item: T) => ReactNode;
}

interface TablaDatosProps<T> {
  columnas: Columna<T>[];
  datos: T[];
  obtenerClave: (item: T) => string;
}

export function TablaDatos<T>({ columnas, datos, obtenerClave }: TablaDatosProps<T>) {
  if (!datos.length) return <EstadoVacio titulo="Sin registros" descripcion="No hay datos para mostrar." />;

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>{columnas.map((columna) => <th key={columna.key} className="px-4 py-3">{columna.titulo}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {datos.map((item) => (
            <tr key={obtenerClave(item)} className="hover:bg-slate-50">
              {columnas.map((columna) => <td key={columna.key} className="px-4 py-3 align-middle">{columna.render(item)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
