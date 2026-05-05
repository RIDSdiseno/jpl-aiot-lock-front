export type TipoMapaMonitoreo = "mapa" | "satelite";

export function SelectorTipoMapa({
  tipoMapa,
  onCambiarTipoMapa,
}: {
  tipoMapa: TipoMapaMonitoreo;
  onCambiarTipoMapa: (tipo: TipoMapaMonitoreo) => void;
}) {
  return (
    <div className="absolute right-4 top-4 z-[500] flex rounded-lg border border-slate-200 bg-white p-1 shadow-md">
      <button
        type="button"
        onClick={() => onCambiarTipoMapa("mapa")}
        className={`rounded-md px-3 py-1.5 text-sm font-medium ${tipoMapa === "mapa" ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
      >
        Mapa
      </button>
      <button
        type="button"
        onClick={() => onCambiarTipoMapa("satelite")}
        className={`rounded-md px-3 py-1.5 text-sm font-medium ${
          tipoMapa === "satelite" ? "bg-slate-200 text-slate-500" : "text-slate-400 hover:bg-slate-100"
        }`}
        title="Vista satélite pendiente para una siguiente fase"
      >
        Satélite
      </button>
    </div>
  );
}
