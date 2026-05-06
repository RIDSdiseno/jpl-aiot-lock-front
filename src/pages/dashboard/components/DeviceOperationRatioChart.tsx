import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { DashboardOperationRatio } from "../types/dashboard.types";
import { useI18n } from "../../../i18n/i18nStore";

const STATUS_COLORS = {
  Online: "#16a34a",
  Offline: "#64748b",
  Alarm: "#dc2626",
} as const;

export function DeviceOperationRatioChart({ ratio }: { ratio: DashboardOperationRatio }) {
  const { t } = useI18n();
  const or = t.dashboard.operationRatio;

  const data = [
    { key: "Online" as const, label: or.online, value: ratio.online },
    { key: "Offline" as const, label: or.offline, value: ratio.offline },
    { key: "Alarm" as const, label: or.alarm, value: ratio.alarm },
  ];

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">{or.title}</h2>
          <p className="mt-1 text-xs text-slate-500">{or.totalDevices}: {ratio.total}</p>
        </div>
      </div>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              innerRadius={58}
              outerRadius={92}
              paddingAngle={2}
            >
              {data.map((entry) => (
                <Cell key={entry.key} fill={STATUS_COLORS[entry.key]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
        {data.map((entry) => (
          <div key={entry.key} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: STATUS_COLORS[entry.key] }}
            />
            <span className="text-slate-600">{entry.label}: {entry.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
