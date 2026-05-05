const items = [
  { label: "En línea", color: "bg-emerald-500" },
  { label: "Sin conexión", color: "bg-slate-400" },
  { label: "Reposo", color: "bg-orange-500" },
  { label: "Señal perdida", color: "bg-amber-400" },
  { label: "Alarma", color: "bg-red-600" },
];

export function LeyendaMapa() {
  return (
    <div className="absolute bottom-4 left-4 z-[500] rounded-lg border border-slate-200 bg-white/95 p-3 shadow-md backdrop-blur">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Leyenda</div>
      <div className="space-y-1.5">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-xs text-slate-700">
            <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
