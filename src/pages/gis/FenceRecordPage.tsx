import { useEffect, useState } from "react";
import { RotateCw, Square, Trash2 } from "lucide-react";
import { MigasPan } from "../../componentes/layout/MigasPan";
import { useI18n } from "../../i18n/i18nStore";
import { getGisText } from "./gisText";
import {
  batchDeleteFenceRecords,
  deleteFenceRecord,
  listFenceRecords,
  resendFenceRecord,
  stopFenceRecord,
  stopSendingFenceRecords,
} from "./gisApi";
import type { FenceRecord, FenceSendStatus } from "./types";

const statusOptions: Array<"" | FenceSendStatus> = ["", "PENDING", "SENDING", "SENT", "FAILED", "STOPPED", "PARTIAL"];

function progressColor(status: FenceSendStatus) {
  if (status === "SENT") return "bg-emerald-500";
  if (status === "FAILED") return "bg-red-500";
  if (status === "STOPPED") return "bg-orange-500";
  return "bg-blue-500";
}

export function FenceRecordPage() {
  const { t, language } = useI18n();
  const labels = getGisText(language, t.gis);
  const [records, setRecords] = useState<FenceRecord[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [filters, setFilters] = useState({ deviceId: "", deviceName: "", status: "", startDate: "", endDate: "" });

  async function refresh() {
    setRecords(await listFenceRecords(filters));
  }

  useEffect(() => {
    refresh().catch(() => setRecords([]));
  }, []);

  async function batchDelete() {
    if (!selected.length || !window.confirm(`${labels.batchDelete} (${selected.length})`)) return;
    await batchDeleteFenceRecords(selected);
    setSelected([]);
    await refresh();
  }

  async function batchStop() {
    if (!selected.length || !window.confirm(`${labels.stopSending} (${selected.length})`)) return;
    await stopSendingFenceRecords(selected);
    await refresh();
  }

  return (
    <div className="space-y-5">
      <MigasPan items={[labels.breadcrumbHome, labels.breadcrumbGis, labels.breadcrumbFenceRecord]} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-slate-900">{labels.fenceRecord}</h1>
        <div className="flex gap-2">
          <button className="rounded-md bg-orange-500 px-4 py-2 text-sm text-white" onClick={batchStop}>{labels.stopSending}</button>
          <button className="rounded-md bg-red-600 px-4 py-2 text-sm text-white" onClick={batchDelete}>{labels.batchDelete}</button>
        </div>
      </div>
      <section className="rounded-md border border-slate-200 bg-white p-4">
        <div className="grid gap-3 lg:grid-cols-6">
          <input className="rounded-md border px-3 py-2 text-sm" placeholder={labels.deviceId} value={filters.deviceId} onChange={(event) => setFilters({ ...filters, deviceId: event.target.value })} />
          <input className="rounded-md border px-3 py-2 text-sm" placeholder={labels.deviceName} value={filters.deviceName} onChange={(event) => setFilters({ ...filters, deviceName: event.target.value })} />
          <input type="date" className="rounded-md border px-3 py-2 text-sm" value={filters.startDate} onChange={(event) => setFilters({ ...filters, startDate: event.target.value })} />
          <input type="date" className="rounded-md border px-3 py-2 text-sm" value={filters.endDate} onChange={(event) => setFilters({ ...filters, endDate: event.target.value })} />
          <select className="rounded-md border px-3 py-2 text-sm" value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value })}>
            {statusOptions.map((status) => <option key={status || "all"} value={status}>{status || labels.status}</option>)}
          </select>
          <div className="flex gap-2">
            <button className="flex-1 rounded-md bg-blue-600 px-3 py-2 text-sm text-white" onClick={refresh}>{labels.search}</button>
            <button className="flex-1 rounded-md border px-3 py-2 text-sm" onClick={() => setFilters({ deviceId: "", deviceName: "", status: "", startDate: "", endDate: "" })}>{labels.reset}</button>
          </div>
        </div>
      </section>
      <section className="overflow-hidden rounded-md border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-[1100px] w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-3 py-3"></th>
                <th className="px-3 py-3">Sort No.</th>
                <th className="px-3 py-3">{labels.deviceId}</th>
                <th className="px-3 py-3">{labels.deviceName}</th>
                <th className="px-3 py-3">Polygon</th>
                <th className="px-3 py-3">Circle</th>
                <th className="px-3 py-3">{labels.rules}</th>
                <th className="px-3 py-3">{labels.sendingProgress}</th>
                <th className="px-3 py-3">{labels.createTime}</th>
                <th className="px-3 py-3">{labels.status}</th>
                <th className="px-3 py-3">{labels.operate}</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record.id} className="border-t border-slate-100">
                  <td className="px-3 py-3"><input type="checkbox" checked={selected.includes(record.id)} onChange={(event) => setSelected((prev) => (event.target.checked ? [...prev, record.id] : prev.filter((id) => id !== record.id)))} /></td>
                  <td className="px-3 py-3">{index + 1}</td>
                  <td className="px-3 py-3">{record.deviceId}</td>
                  <td className="px-3 py-3">{record.deviceName ?? "-"}</td>
                  <td className="px-3 py-3">{record.polygonFenceCount}</td>
                  <td className="px-3 py-3">{record.circleFenceCount}</td>
                  <td className="px-3 py-3">{record.fenceRuleCount}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-28 rounded-full bg-slate-100"><div className={`h-2 rounded-full ${progressColor(record.status)}`} style={{ width: `${record.progress}%` }} /></div>
                      <span className="text-xs text-slate-500">{record.progress}%</span>
                    </div>
                  </td>
                  <td className="px-3 py-3">{new Date(record.createdAt).toLocaleString()}</td>
                  <td className="px-3 py-3">{record.status}</td>
                  <td className="px-3 py-3">
                    <div className="flex gap-1">
                      <button title={labels.resend} className="rounded-md p-2 text-blue-700 hover:bg-blue-100" onClick={async () => { await resendFenceRecord(record.id); await refresh(); }}><RotateCw className="h-4 w-4" /></button>
                      <button title={labels.stop} className="rounded-md p-2 text-orange-700 hover:bg-orange-100" onClick={async () => { await stopFenceRecord(record.id); await refresh(); }}><Square className="h-4 w-4" /></button>
                      <button title={labels.delete} className="rounded-md p-2 text-red-700 hover:bg-red-100" onClick={async () => { if (window.confirm(labels.delete)) { await deleteFenceRecord(record.id); await refresh(); } }}><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {!records.length ? <tr><td colSpan={11} className="px-3 py-12 text-center text-slate-500">{labels.noData}</td></tr> : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
