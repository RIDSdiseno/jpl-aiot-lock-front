import { MapPinned } from "lucide-react";
import type { GeocercaMonitoreo } from "../../modulos/monitoreo/tipos/monitoreo.types";

export function PanelGeocercasMonitoreo({
  geocercas,
  idsGeocercasVisibles,
  onAlternarGeocerca,
}: {
  geocercas: GeocercaMonitoreo[];
  idsGeocercasVisibles: Set<string>;
  onAlternarGeocerca: (id: string) => void;
}) {
  return (
    <section className="border-b border-slate-200">
      <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase text-slate-600">
        <MapPinned className="h-4 w-4 text-blue-600" />
        Lista de geocercas
      </div>
      <div className="max-h-36 overflow-y-auto p-2">
        {!geocercas.length ? (
          <div className="px-2 py-3 text-xs text-slate-500">No hay geocercas registradas</div>
        ) : (
          geocercas.map((geocerca) => (
            <label key={geocerca.id} className="flex cursor-pointer items-start gap-2 rounded px-2 py-1.5 text-xs hover:bg-slate-50">
              <input
                type="checkbox"
                checked={idsGeocercasVisibles.has(geocerca.id)}
                onChange={() => onAlternarGeocerca(geocerca.id)}
                className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="min-w-0">
                <span className="block truncate font-medium text-slate-800">{geocerca.name}</span>
                <span className="block truncate text-slate-500">{geocerca.company?.name ?? "Sin empresa"}</span>
              </span>
            </label>
          ))
        )}
      </div>
    </section>
  );
}
