const items = [
  ["bg-emerald-500", "Online"],
  ["bg-slate-400", "Offline"],
  ["bg-rose-500", "Alarm"],
];

export function MonitoringLegend() {
  return (
    <div className="absolute bottom-4 right-4 z-[500] rounded border border-slate-200 bg-white px-3 py-2 shadow-sm">
      <div className="flex gap-3 text-xs font-medium text-slate-700">
        {items.map(([color, label]) => (
          <span key={label} className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
