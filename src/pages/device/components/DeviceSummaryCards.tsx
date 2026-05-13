import { RefreshCw } from "lucide-react";
import { useAppText } from "../../../i18n/text";
import type { DeviceSummary } from "../../../types/device.types";

function metric(summary: DeviceSummary | undefined, key: keyof DeviceSummary, legacyKey: keyof DeviceSummary) {
  return Number(summary?.[key] ?? summary?.[legacyKey] ?? 0);
}

export function DeviceSummaryCards({ summary, loading, onRefresh }: { summary?: DeviceSummary; loading?: boolean; onRefresh: () => void }) {
  const tr = useAppText();
  const cards = [
    ["Total number", metric(summary, "total", "totalNumber")],
    ["Total online", metric(summary, "online", "totalOnline")],
    ["Total offline", metric(summary, "offline", "totalOffline")],
    ["Dormant Count", metric(summary, "dormant", "dormantCount")],
  ];

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-end">
        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          {tr("Refresh")}
        </button>
      </div>
      <div className="grid gap-3 md:grid-cols-4">
        {cards.map(([label, value]) => (
          <div key={label} className="border-l-2 border-cyan-500 bg-slate-50 px-4 py-3">
            <div className="text-xs font-semibold uppercase text-slate-500">{tr(String(label))}</div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
