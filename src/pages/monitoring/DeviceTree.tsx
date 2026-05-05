import { ChevronDown, ChevronRight, LockKeyhole } from "lucide-react";
import type { MonitoringDevice } from "../../types/monitoring.types";

export function DeviceTree({
  devices,
  selectedId,
  onSelect,
}: {
  devices: MonitoringDevice[];
  selectedId?: string;
  onSelect: (device: MonitoringDevice) => void;
}) {
  const byCompany = devices.reduce<Record<string, MonitoringDevice[]>>((acc, device) => {
    acc[device.companyName] = [...(acc[device.companyName] ?? []), device];
    return acc;
  }, {});

  return (
    <div className="space-y-2">
      {Object.entries(byCompany).map(([company, companyDevices]) => (
        <div key={company} className="rounded border border-slate-200 bg-white">
          <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2 text-sm font-semibold text-slate-800">
            {companyDevices.length ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            {company}
            <span className="ml-auto text-xs text-slate-500">{companyDevices.length}</span>
          </div>
          <div className="py-1">
            {companyDevices.map((device) => (
              <button
                key={device.id}
                type="button"
                onClick={() => onSelect(device)}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-50 ${selectedId === device.id ? "bg-slate-100" : ""}`}
              >
                <LockKeyhole className="h-4 w-4 text-slate-500" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium text-slate-800">{device.name}</span>
                  <span className="block truncate text-xs text-slate-500">{device.deviceId}</span>
                </span>
                <span
                  className={`h-2.5 w-2.5 rounded-full ${device.status === "online" ? "bg-emerald-500" : device.status === "alarm" ? "bg-rose-500" : "bg-slate-400"}`}
                />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
