import { Search } from "lucide-react";

export function BuscadorMapa() {
  return (
    <div className="absolute left-4 top-4 z-[500] w-[min(360px,calc(100%-2rem))] rounded border border-slate-200 bg-white shadow-md">
      <label className="relative block">
        <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        <input
          placeholder="Buscar ubicacion, ruta, etc."
          className="h-9 w-full rounded bg-white pl-9 pr-3 text-xs outline-none focus:ring-2 focus:ring-blue-100"
        />
      </label>
    </div>
  );
}
