import { X } from "lucide-react";
import type { LockUnlockReportItem } from "../../../types/report.types";

export function ReportDetailDrawer({ item, onClose }: { item: LockUnlockReportItem | null; onClose: () => void }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-40 bg-slate-950/30">
      <aside className="ml-auto flex h-full w-full max-w-xl flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Lock&Unlock detail</h2>
            <p className="text-sm text-slate-500">{value(item.deviceId)} - {value(item.event)}</p>
          </div>
          <button className="rounded-md p-2 text-slate-500 hover:bg-slate-100" onClick={onClose} type="button"><X className="h-5 w-5" /></button>
        </div>
        <div className="flex-1 space-y-5 overflow-y-auto p-5">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Device ID" value={item.deviceId} />
            <Field label="Device name" value={item.deviceName} />
            <Field label="Product model" value={item.productModel} />
            <Field label="GPS Time" value={formatDate(item.gpsTime)} />
            <Field label="Operation type" value={item.event} />
            <Field label="Event type" value={item.eventType} />
            <Field label="Data type" value={item.dataType} />
            <Field label="Source" value={item.source} />
            <Field label="Operate user" value={item.operateUser} />
            <Field label="Latitude" value={typeof item.latitude === "number" ? item.latitude.toFixed(6) : undefined} />
            <Field label="Longitude" value={typeof item.longitude === "number" ? item.longitude.toFixed(6) : undefined} />
            <Field label="Created at" value={formatDate(item.createdAt)} />
          </div>
          <Field label="Operating info" value={item.operatingInfo} wide />
          <Field label="Description" value={item.description} wide />
          {item.eventImageUrl ? <img src={item.eventImageUrl} alt="Event evidence" className="max-h-64 rounded-md border border-slate-200 object-contain" /> : null}
          {item.rawPayload ? (
            <details className="rounded-md border border-slate-200 bg-slate-50 p-3">
              <summary className="cursor-pointer text-sm font-medium text-slate-700">Raw payload</summary>
              <pre className="mt-3 max-h-64 overflow-auto text-xs text-slate-700">{JSON.stringify(item.rawPayload, null, 2)}</pre>
            </details>
          ) : null}
        </div>
      </aside>
    </div>
  );
}

function Field({ label, value: fieldValue, wide }: { label: string; value?: string | number | null; wide?: boolean }) {
  return (
    <div className={wide ? "" : "min-w-0"}>
      <div className="text-xs font-medium uppercase text-slate-500">{label}</div>
      <div className="mt-1 truncate text-sm text-slate-900" title={value(fieldValue)}>{value(fieldValue)}</div>
    </div>
  );
}

function value(fieldValue?: string | number | null) {
  return fieldValue === null || fieldValue === undefined || fieldValue === "" || String(fieldValue) === "NaN" ? "—" : String(fieldValue);
}

function formatDate(date?: string) {
  if (!date) return undefined;
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toLocaleString("es-CL");
}
