import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { DashboardOperationRatio } from "../types/dashboard.types";

const colors = {
  Online: "#16a34a",
  Offline: "#64748b",
  Alarm: "#dc2626",
};

export function DeviceOperationRatioChart({ ratio }: { ratio: DashboardOperationRatio }) {
  const data = [
    { name: "Online", value: ratio.online },
    { name: "Offline", value: ratio.offline },
    { name: "Alarm", value: ratio.alarm },
  ];

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Equipment operation ratio</h2>
          <p className="mt-1 text-xs text-slate-500">Total de dispositivos: {ratio.total}</p>
        </div>
      </div>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={2}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={colors[entry.name as keyof typeof colors]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colors[entry.name as keyof typeof colors] }} />
            <span className="text-slate-600">{entry.name}: {entry.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
