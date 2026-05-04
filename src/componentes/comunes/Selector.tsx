import type { SelectHTMLAttributes } from "react";

interface Opcion {
  value: string;
  label: string;
}

interface SelectorProps extends SelectHTMLAttributes<HTMLSelectElement> {
  etiqueta?: string;
  opciones: Opcion[];
}

export function Selector({ etiqueta, opciones, className = "", ...props }: SelectorProps) {
  return (
    <label className="block">
      {etiqueta ? <span className="mb-1 block text-sm font-medium text-slate-700">{etiqueta}</span> : null}
      <select
        className={`w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${className}`}
        {...props}
      >
        {opciones.map((opcion) => (
          <option key={opcion.value} value={opcion.value}>
            {opcion.label}
          </option>
        ))}
      </select>
    </label>
  );
}
