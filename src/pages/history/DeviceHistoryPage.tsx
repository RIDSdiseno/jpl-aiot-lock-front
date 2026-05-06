import { useMutation, useQuery } from "@tanstack/react-query";
import { Download, Eye, MapPin, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Boton } from "../../componentes/comunes/Boton";
import { Modal } from "../../componentes/comunes/Modal";
import { EncabezadoPagina } from "../../componentes/layout/EncabezadoPagina";
import { useI18n } from "../../i18n/i18nStore";
import { api, extraerDatos } from "../../librerias/api";
import { formatearFecha } from "../../librerias/fechas";

type HistoryItem = {
  id: string;
  deviceId: string;
  deviceName?: string | null;
  deviceType?: string | null;
  productModel?: string | null;
  companyName?: string | null;
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
  firmwareVersion?: string | null;
  rawPayloadJson?: unknown;
};

const STORAGE_KEY = "jpl-aiot-history-columns";
const configurable = ["longitude", "latitude", "address", "lockStatus", "shackleStatus", "batteryLevel", "signalStrength", "temperature", "speed", "firmwareVersion", "rawPayloadJson"] as const;

export function DeviceHistoryPage() {
  const { t } = useI18n();
  const labels = t.history ?? {};
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [columnsOpen, setColumnsOpen] = useState(false);
  const [detail, setDetail] = useState<HistoryItem | null>(null);
  const [mapItem, setMapItem] = useState<HistoryItem | null>(null);
  const [rawItem, setRawItem] = useState<HistoryItem | null>(null);
  const [visible, setVisible] = useState<string[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) as string[] : Array.from(configurable);
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visible));
  }, [visible]);

  const history = useQuery({
    queryKey: ["device-history", filters],
    queryFn: async () => extraerDatos<HistoryItem[]>(await api.get("/history/device-data", { params: filters })),
  });

  const exportHistory = useMutation({
    mutationFn: () => api.post("/history/device-data/export", { filters }, { responseType: "blob" }),
    onSuccess: (response) => {
      const url = URL.createObjectURL(response.data as Blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "device-history.csv";
      link.click();
      URL.revokeObjectURL(url);
    },
  });

  const columnLabels = useMemo<Record<string, string>>(() => ({
    longitude: labels.longitude ?? "Longitude",
    latitude: labels.latitude ?? "Latitude",
    address: labels.address ?? "Address",
    lockStatus: labels.lockStatus ?? "Lock status",
    shackleStatus: labels.shackleStatus ?? "Shackle status",
    batteryLevel: labels.battery ?? "Battery",
    signalStrength: labels.signal ?? "Signal",
    temperature: labels.temperature ?? "Temperature",
    speed: labels.speed ?? "Speed",
    firmwareVersion: labels.firmwareVersion ?? "Firmware version",
    rawPayloadJson: labels.rawPayload ?? "Raw payload",
  }), [labels]);

  return (
    <>
      <EncabezadoPagina
        titulo={labels.title ?? "History"}
        descripcion={labels.deviceHistoryData ?? "Device history data"}
        acciones={<div className="flex gap-2"><Boton variante="secundario" icono={<SlidersHorizontal className="h-4 w-4" />} onClick={() => setColumnsOpen(true)}>{labels.columnSettings ?? "Column settings"}</Boton><Boton icono={<Download className="h-4 w-4" />} onClick={() => exportHistory.mutate()}>{labels.export ?? "Export"}</Boton></div>}
      />
      <div className="space-y-4">
        <section className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="grid gap-3 md:grid-cols-4 xl:grid-cols-6">
            <FilterInput label={labels.deviceId ?? "Device ID"} value={draft.deviceId} onChange={(value) => setDraft({ ...draft, deviceId: value })} />
            <FilterInput label={labels.deviceName ?? "Device name"} value={draft.deviceName} onChange={(value) => setDraft({ ...draft, deviceName: value })} />
            <FilterInput label={labels.deviceType ?? "Device type"} value={draft.deviceType} onChange={(value) => setDraft({ ...draft, deviceType: value })} />
            <FilterInput label={labels.productModel ?? "Product model"} value={draft.productModel} onChange={(value) => setDraft({ ...draft, productModel: value })} />
            <FilterInput label={labels.company ?? "Company"} value={draft.companyName} onChange={(value) => setDraft({ ...draft, companyName: value })} />
            <select className="rounded-md border border-slate-200 px-3 py-2 text-sm" value={draft.reportType ?? ""} onChange={(event) => setDraft({ ...draft, reportType: event.target.value })}>
              <option value="">{labels.reportType ?? "Report type"}</option>
              <option value="REALTIME">{labels.realtimeData ?? "Real-time data"}</option>
              <option value="SUPPLEMENTARY">{labels.supplementaryData ?? "Supplementary data"}</option>
            </select>
            <FilterInput label={labels.lockStatus ?? "Lock status"} value={draft.lockStatus} onChange={(value) => setDraft({ ...draft, lockStatus: value })} />
            <FilterInput label={labels.shackleStatus ?? "Shackle status"} value={draft.shackleStatus} onChange={(value) => setDraft({ ...draft, shackleStatus: value })} />
            <input type="date" className="rounded-md border border-slate-200 px-3 py-2 text-sm" value={draft.startDate ?? ""} onChange={(event) => setDraft({ ...draft, startDate: event.target.value })} />
            <input type="date" className="rounded-md border border-slate-200 px-3 py-2 text-sm" value={draft.endDate ?? ""} onChange={(event) => setDraft({ ...draft, endDate: event.target.value })} />
            <Boton onClick={() => setFilters(draft)}>{labels.search ?? "Search"}</Boton>
            <Boton variante="secundario" onClick={() => { setDraft({}); setFilters({}); }}>{labels.reset ?? "Reset"}</Boton>
          </div>
        </section>

        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
              <tr>{["Sort No.", labels.deviceId, labels.deviceName, labels.deviceType, labels.productModel, labels.company, labels.reportType, labels.reportTime, ...visible.map((key) => columnLabels[key]), "Operate"].map((head) => <th key={head} className="whitespace-nowrap px-4 py-3">{head}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(history.data ?? []).map((item, index) => (
                <tr key={item.id}>
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{item.deviceId}</td>
                  <td className="px-4 py-3">{item.deviceName ?? "-"}</td>
                  <td className="px-4 py-3">{item.deviceType ?? "-"}</td>
                  <td className="px-4 py-3">{item.productModel ?? "-"}</td>
                  <td className="px-4 py-3">{item.companyName ?? "-"}</td>
                  <td className="px-4 py-3">{item.reportType}</td>
                  <td className="px-4 py-3">{formatearFecha(item.reportedAt)}</td>
                  {visible.map((key) => <td key={key} className="max-w-72 truncate px-4 py-3">{key === "rawPayloadJson" ? JSON.stringify(item.rawPayloadJson ?? {}) : String(item[key as keyof HistoryItem] ?? "-")}</td>)}
                  <td className="px-4 py-3"><div className="flex gap-2"><button title={labels.detail} onClick={() => setDetail(item)}><Eye className="h-4 w-4 text-blue-600" /></button><button title={labels.viewOnMap} onClick={() => setMapItem(item)}><MapPin className="h-4 w-4 text-emerald-600" /></button><button className="text-xs text-slate-700" onClick={() => setRawItem(item)}>{labels.rawPayload}</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal abierto={columnsOpen} titulo={labels.columnSettings ?? "Column settings"} onCerrar={() => setColumnsOpen(false)}>
        <div className="grid gap-2 sm:grid-cols-2">{configurable.map((key) => <label key={key} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={visible.includes(key)} onChange={(event) => setVisible(event.target.checked ? [...visible, key] : visible.filter((item) => item !== key))} />{columnLabels[key]}</label>)}</div>
      </Modal>
      <Modal abierto={Boolean(detail)} titulo={labels.detail ?? "Detail"} onCerrar={() => setDetail(null)}><pre className="max-h-96 overflow-auto rounded bg-slate-50 p-3 text-xs">{JSON.stringify(detail, null, 2)}</pre></Modal>
      <Modal abierto={Boolean(rawItem)} titulo={labels.rawPayload ?? "Raw payload"} onCerrar={() => setRawItem(null)}><pre className="max-h-96 overflow-auto rounded bg-slate-50 p-3 text-xs">{JSON.stringify(rawItem?.rawPayloadJson ?? {}, null, 2)}</pre></Modal>
      <Modal abierto={Boolean(mapItem)} titulo={labels.viewOnMap ?? "View on map"} onCerrar={() => setMapItem(null)}><div className="space-y-3 text-sm"><div>{labels.latitude}: {mapItem?.latitude ?? "-"}</div><div>{labels.longitude}: {mapItem?.longitude ?? "-"}</div><div>{labels.address}: {mapItem?.address ?? "-"}</div></div></Modal>
    </>
  );
}

function FilterInput({ label, value, onChange }: { label: string; value?: string; onChange: (value: string) => void }) {
  return <input className="rounded-md border border-slate-200 px-3 py-2 text-sm" placeholder={label} value={value ?? ""} onChange={(event) => onChange(event.target.value)} />;
}
