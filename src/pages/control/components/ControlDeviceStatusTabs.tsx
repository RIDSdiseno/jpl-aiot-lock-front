import type { ControlStatusFilter } from "../types/control.types";

const tabs: Array<{ value: ControlStatusFilter; label: string }> = [
  { value: "all", label: "All" },
  { value: "online", label: "On-line" },
  { value: "offline", label: "Off-line" },
  { value: "sleep", label: "Sleep" },
];

export function ControlDeviceStatusTabs({
  value,
  onChange,
  counts,
}: {
  value: ControlStatusFilter;
  onChange: (value: ControlStatusFilter) => void;
  counts: Record<ControlStatusFilter, number>;
}) {
  return (
    <div className="grid grid-cols-4 gap-1 rounded border border-slate-200 bg-slate-100 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={`rounded px-2 py-2 text-xs font-medium ${value === tab.value ? "bg-white text-slate-950 shadow-sm" : "text-slate-600 hover:bg-white/70"}`}
        >
          <span className="block">{tab.label}</span>
          <span className="text-[11px] text-slate-500">{counts[tab.value]}</span>
        </button>
      ))}
    </div>
  );
}
