const estados = [
  { label: "En linea", color: "bg-emerald-500" },
  { label: "Sin conexion", color: "bg-slate-700" },
  { label: "Reposo", color: "bg-orange-500" },
  { label: "Alarma", color: "bg-red-600" },
];

export function LeyendaEstadosMapa() {
  return (
    <div className="absolute bottom-4 left-4 z-[500] rounded border border-slate-200 bg-white/95 p-3 shadow-md backdrop-blur">
      <div className="mb-2 text-[11px] font-semibold uppercase text-slate-500">Leyenda</div>
      <div className="space-y-1.5">
        {estados.map((estado) => (
          <div key={estado.label} className="flex items-center gap-2 text-xs text-slate-700">
            <span className={`h-2.5 w-2.5 rounded-full ${estado.color}`} />
            {estado.label}
          </div>
        ))}
      </div>
    </div>
  );
}
