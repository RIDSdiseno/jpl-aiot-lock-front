import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { DashboardLockUnlockTrendPoint } from "../types/dashboard.types";

export function LockUnlockTrendChart({
  data,
  from,
  to,
  onFromChange,
  onToChange,
}: {
  data: DashboardLockUnlockTrendPoint[];
  from: string;
  to: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
}) {
  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-slate-900">Frequency trend of lock/unlock</h2>
        <div className="flex items-center gap-2">
          <input className="rounded border border-slate-300 px-2 py-1 text-sm" type="date" value={from} onChange={(event) => onFromChange(event.target.value)} />
          <input className="rounded border border-slate-300 px-2 py-1 text-sm" type="date" value={to} onChange={(event) => onToChange(event.target.value)} />
        </div>
      </div>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Area dataKey="seal" name="Seal" stroke="#2563eb" fill="#bfdbfe" />
            <Area dataKey="unseal" name="Unseal" stroke="#16a34a" fill="#bbf7d0" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
