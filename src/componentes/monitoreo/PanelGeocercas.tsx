import { useMemo, useState } from "react";
import { MapPinned, Search } from "lucide-react";
import type { GeocercaMonitoreo } from "../../modulos/monitoreo/tipos/monitoreo.types";

export function PanelGeocercas({
  geocercas,
  geocercasVisibles,
  onToggleGeocerca,
  onSeleccionarGeocerca,
}: {
  geocercas: GeocercaMonitoreo[];
  geocercasVisibles: Set<string>;
  onToggleGeocerca: (id: string) => void;
  onSeleccionarGeocerca: (geocerca: GeocercaMonitoreo) => void;
}) {
  const [busqueda, setBusqueda] = useState("");

  const geocercasFiltradas = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    if (!termino) return geocercas;
    return geocercas.filter(
      (geocerca) =>
        geocerca.name.toLowerCase().includes(termino) ||
        geocerca.description?.toLowerCase().includes(termino) ||
        geocerca.company?.name.toLowerCase().includes(termino),
    );
  }, [busqueda, geocercas]);

  return (
    <section className="flex min-h-0 flex-1 flex-col rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-3">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
          <MapPinned className="h-4 w-4 text-blue-600" />
          Lista de geocercas
        </div>
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            placeholder="Buscar geocerca"
            className="w-full rounded-md border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </label>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        {!geocercas.length ? (
          <div className="p-4 text-sm text-slate-500">No hay geocercas registradas</div>
        ) : !geocercasFiltradas.length ? (
          <div className="p-4 text-sm text-slate-500">No hay geocercas que coincidan con la búsqueda.</div>
        ) : (
          geocercasFiltradas.map((geocerca) => (
            <div key={geocerca.id} className="flex items-start gap-2 rounded-md px-2 py-2 hover:bg-slate-50">
              <input
                type="checkbox"
                checked={geocercasVisibles.has(geocerca.id)}
                onChange={() => onToggleGeocerca(geocerca.id)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <button type="button" onClick={() => onSeleccionarGeocerca(geocerca)} className="min-w-0 flex-1 text-left">
                <div className="truncate text-sm font-medium text-slate-800">{geocerca.name}</div>
                <div className="mt-0.5 truncate text-xs text-slate-500">{geocerca.company?.name ?? "Sin empresa asignada"}</div>
                {geocerca.description ? <div className="mt-1 line-clamp-2 text-xs text-slate-500">{geocerca.description}</div> : null}
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
