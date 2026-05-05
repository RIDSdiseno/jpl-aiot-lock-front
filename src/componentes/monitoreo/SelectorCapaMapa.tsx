export type TipoMapaMonitoreo = "mapa" | "satelite";

export function SelectorCapaMapa({
  tipoMapa,
  onCambiarTipoMapa,
}: {
  tipoMapa: TipoMapaMonitoreo;
  onCambiarTipoMapa: (tipo: TipoMapaMonitoreo) => void;
}) {
  return (
    <div className="absolute right-4 top-4 z-[500] flex rounded border border-slate-200 bg-white p-1 shadow-md">
      <button
        type="button"
        onClick={() => onCambiarTipoMapa("mapa")}
        className={`rounded px-3 py-1.5 text-xs font-semibold ${tipoMapa === "mapa" ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
      >
        Mapa
      </button>
      <button
        type="button"
        onClick={() => onCambiarTipoMapa("satelite")}
        className={`rounded px-3 py-1.5 text-xs font-semibold ${
          tipoMapa === "satelite" ? "bg-slate-700 text-white" : "text-slate-600 hover:bg-slate-100"
        }`}
        title="Vista satelite pendiente"
      >
        Satelite
      </button>
    </div>
  );
}
