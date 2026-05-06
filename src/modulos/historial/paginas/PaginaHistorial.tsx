import { useQuery } from "@tanstack/react-query";
import { Eye, MapPin } from "lucide-react";
import { useState } from "react";
import { Boton } from "../../../componentes/comunes/Boton";
import { EncabezadoPagina } from "../../../componentes/layout/EncabezadoPagina";
import { api, extraerDatos } from "../../../librerias/api";
import { formatearFecha } from "../../../librerias/fechas";
import { useI18n } from "../../../i18n/i18nStore";

type HistoryItem = {
  id: string;
  deviceId: string;
  reportType: string;
  reportedAt: string;
  longitude?: number | null;
  latitude?: number | null;
  address?: string | null;
  lockStatus?: string | null;
  shackleStatus?: string | null;
  batteryLevel?: number | null;
  signalStrength?: number | null;
  temperature?: number | null;
  speed?: number | null;
  rawPayloadJson?: unknown;
};

const allColumns = ["longitude", "latitude", "address", "lockStatus", "shackleStatus", "batteryLevel", "signalStrength", "rawPayloadJson"] as const;

async function fetchHistory(filters: Record<string, string>) {
  const response = await api.get<{ data: HistoryItem[] }>("/history/device-data", { params: filters });
  return extraerDatos<HistoryItem[]>(response);
}

export function PaginaHistorial() {
  const { t } = useI18n();
  const labels = t.history;
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [visible, setVisible] = useState<string[]>(Array.from(allColumns));
  const { data = [] } = useQuery({ queryKey: ["history", filters], queryFn: () => fetchHistory(filters) });

  return (
    <>
      <EncabezadoPagina titulo={labels?.title ?? "History"} descripcion={labels?.deviceHistoryData ?? "Device history data"} acciones={<Boton variante="secundario">{labels?.columnSettings ?? "Column settings"}</Boton>} />
      <div className="space-y-4">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="grid gap-3 md:grid-cols-4">
            <input className="rounded-md border px-3 py-2 text-sm" placeholder="Device ID" value={filters.deviceId ?? ""} onChange={(e) => setFilters({ ...filters, deviceId: e.target.value })} />
            <select className="rounded-md border px-3 py-2 text-sm" value={filters.reportType ?? ""} onChange={(e) => setFilters({ ...filters, reportType: e.target.value })}>
              <option value="">Data type</option>
              <option value="REALTIME">{labels?.realtimeData ?? "Real-time data"}</option>
              <option value="SUPPLEMENTARY">{labels?.supplementaryData ?? "Supplementary data"}</option>
            </select>
            <Boton onClick={() => setFilters({ ...filters })}>{t.devices?.search ?? "Search"}</Boton>
            <Boton variante="secundario" onClick={() => setFilters({})}>{t.devices?.reset ?? "Reset"}</Boton>
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            {allColumns.map((column) => <label key={column} className="flex gap-2 text-xs text-slate-600"><input type="checkbox" checked={visible.includes(column)} onChange={(e) => setVisible(e.target.checked ? [...visible, column] : visible.filter((item) => item !== column))} />{column}</label>)}
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
              <tr>
                {["Sort No.", "Device ID", labels?.reportTime ?? "Report time", labels?.reportType ?? "Report type", ...visible, "Operate"].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{item.deviceId}</td>
                  <td className="px-4 py-3">{formatearFecha(item.reportedAt)}</td>
                  <td className="px-4 py-3">{item.reportType}</td>
                  {visible.map((column) => <td key={column} className="px-4 py-3">{column === "rawPayloadJson" ? JSON.stringify(item.rawPayloadJson ?? {}) : String(item[column as keyof HistoryItem] ?? "-")}</td>)}
                  <td className="px-4 py-3"><div className="flex gap-2"><Eye className="h-4 w-4 text-blue-600" /><MapPin className="h-4 w-4 text-emerald-600" /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
