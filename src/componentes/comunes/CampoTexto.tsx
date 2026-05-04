import type { InputHTMLAttributes } from "react";

interface CampoTextoProps extends InputHTMLAttributes<HTMLInputElement> {
  etiqueta?: string;
  error?: string;
}

export function CampoTexto({ etiqueta, error, className = "", ...props }: CampoTextoProps) {
  return (
    <label className="block">
      {etiqueta ? <span className="mb-1 block text-sm font-medium text-slate-700">{etiqueta}</span> : null}
      <input
        className={`w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${className}`}
        {...props}
      />
      {error ? <span className="mt-1 block text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
