import { LockKeyhole } from "lucide-react";
import type { ControlDevice } from "../types/control.types";

const statusClass = {
  ONLINE: "bg-emerald-100 text-emerald-700",
  OFFLINE: "bg-slate-100 text-slate-600",
  SLEEP: "bg-amber-100 text-amber-700",
  ALARM: "bg-red-100 text-red-700",
};

export function ControlSelectedDeviceBanner({ device }: { device?: ControlDevice }) {
  if (!device) {
    return <div className="rounded border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">Select a device to operate.</div>;
  }

  return (
    <div className="flex flex-wrap items-center gap-3 rounded border border-slate-200 bg-white p-4">
      <LockKeyhole className="h-5 w-5 text-blue-600" />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold text-slate-900">{device.name ?? device.deviceId}</div>
        <div className="text-xs text-slate-500">{device.companyName}</div>
      </div>
      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[device.status]}`}>{device.status}</span>
      {device.hasActiveAlarm ? <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">{device.alarmType ?? "ALARM"}</span> : null}
    </div>
  );
}
