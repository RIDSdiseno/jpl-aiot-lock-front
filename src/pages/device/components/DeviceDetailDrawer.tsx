import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatearFecha } from "../../../librerias/fechas";
import type { Device } from "../../../types/device.types";
import { DeviceStatusBadge } from "./DeviceStatusBadge";

const value = (input: unknown) => (input === null || input === undefined || input === "" || Number.isNaN(input) ? "—" : String(input));

export function DeviceDetailDrawer({ open, device, onClose, onEdit }: { open: boolean; device?: Device | null; onClose: () => void; onEdit: (device: Device) => void }) {
  const navigate = useNavigate();
  if (!open || !device) return null;
  const nav = (path: string) => navigate(path);
  const id = encodeURIComponent(device.deviceId);
  const rows = [
    ["Device ID", device.deviceId],
    ["IMEI", device.imei],
    ["Device name", device.deviceName],
    ["Device type", device.deviceType],
    ["Product model", device.productModel],
    ["Affiliated company", device.affiliatedCompany],
    ["Last seen at", device.lastSeenAt ? formatearFecha(device.lastSeenAt) : "—"],
    ["Battery level", device.batteryLevel],
    ["Signal level", device.signalLevel],
    ["SIM ICCID", device.simIccid],
    ["Phone number", device.phoneNumber],
    ["Firmware version", device.firmwareVersion],
    ["Hardware version", device.hardwareVersion],
    ["Created at", device.createdAt ? formatearFecha(device.createdAt) : "—"],
    ["Updated at", device.updatedAt ? formatearFecha(device.updatedAt) : "—"],
    ["Description", device.description],
  ];
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/40">
      <aside className="ml-auto h-full w-full max-w-xl overflow-y-auto bg-white shadow-xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <div>
            <h2 className="font-semibold text-slate-900">Device detail</h2>
            <p className="font-mono text-xs text-slate-500">{device.deviceId}</p>
          </div>
          <button type="button" className="rounded-md p-2 hover:bg-slate-100" onClick={onClose}><X className="h-5 w-5" /></button>
        </div>
        <div className="space-y-5 p-5">
          <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
            <span className="text-sm font-medium text-slate-700">Status</span>
            <DeviceStatusBadge status={device.status ?? device.onlineStatus} />
          </div>
          <dl className="grid gap-3 sm:grid-cols-2">
            {rows.map(([label, item]) => (
              <div key={label} className={label === "Description" ? "sm:col-span-2" : ""}>
                <dt className="text-xs font-semibold uppercase text-slate-500">{label}</dt>
                <dd className="mt-1 break-words text-sm text-slate-900">{value(item)}</dd>
              </div>
            ))}
          </dl>
          <div className="grid gap-2 sm:grid-cols-2">
            <button className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white" onClick={() => onEdit(device)}>Edit device info</button>
            <button className="rounded-md border border-slate-200 px-3 py-2 text-sm" onClick={() => nav(`/app/monitoreo?deviceId=${id}`)}>View Monitoring</button>
            <button className="rounded-md border border-slate-200 px-3 py-2 text-sm" onClick={() => nav(`/app/control/parameter?deviceId=${id}`)}>View Parameters</button>
            <button className="rounded-md border border-slate-200 px-3 py-2 text-sm" onClick={() => nav(`/app/event/all-events?deviceId=${id}`)}>View Events</button>
            <button className="rounded-md border border-slate-200 px-3 py-2 text-sm" onClick={() => nav(`/app/reports/app-seal-unseal?deviceId=${id}`)}>View Reports</button>
            <button className="rounded-md border border-slate-200 px-3 py-2 text-sm" onClick={() => nav(`/app/history?deviceId=${id}`)}>View History</button>
            <button className="rounded-md border border-slate-200 px-3 py-2 text-sm" onClick={() => nav(`/app/maintain/ota?deviceId=${id}`)}>View OTA</button>
          </div>
        </div>
      </aside>
    </div>
  );
}
