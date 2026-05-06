import { ChevronDown, LockKeyhole } from "lucide-react";
import { useMemo } from "react";
import { ControlDeviceSearch } from "./ControlDeviceSearch";
import { ControlDeviceStatusTabs } from "./ControlDeviceStatusTabs";
import type { ControlCompanyGroup, ControlDevice, ControlStatusFilter } from "../types/control.types";

export function ControlDeviceSidebar({
  groups,
  status,
  type,
  search,
  selectedDeviceId,
  onStatusChange,
  onTypeChange,
  onSearchChange,
  onSelectDevice,
}: {
  groups: ControlCompanyGroup[];
  status: ControlStatusFilter;
  type: string;
  search: string;
  selectedDeviceId?: string;
  onStatusChange: (status: ControlStatusFilter) => void;
  onTypeChange: (type: string) => void;
  onSearchChange: (search: string) => void;
  onSelectDevice: (device: ControlDevice) => void;
}) {
  const allDevices = groups.flatMap((group) => group.devices);
  const counts = useMemo(
    () => ({
      all: allDevices.length,
      online: allDevices.filter((device) => device.status === "ONLINE").length,
      offline: allDevices.filter((device) => device.status === "OFFLINE").length,
      sleep: allDevices.filter((device) => device.status === "SLEEP").length,
    }),
    [allDevices],
  );

  return (
    <aside className="w-full shrink-0 space-y-3 rounded border border-slate-200 bg-white p-3 lg:w-80">
      <ControlDeviceStatusTabs value={status} onChange={onStatusChange} counts={counts} />
      <select
        value={type}
        onChange={(event) => onTypeChange(event.target.value)}
        className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
      >
        <option>AllType</option>
        <option>G300</option>
        <option>G300N</option>
      </select>
      <ControlDeviceSearch value={search} onChange={onSearchChange} />
      <div className="max-h-[60vh] space-y-2 overflow-y-auto pr-1">
        {groups.map((group) => (
          <div key={group.companyId} className="rounded border border-slate-200">
            <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2 text-sm font-semibold text-slate-800">
              <ChevronDown className="h-4 w-4" />
              <span className="truncate">{group.companyName}</span>
              <span className="ml-auto text-xs text-slate-500">{group.devices.length}</span>
            </div>
            <div className="py-1">
              {group.devices.map((device) => (
                <button
                  key={device.id}
                  type="button"
                  onClick={() => onSelectDevice(device)}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-50 ${selectedDeviceId === device.deviceId ? "bg-blue-50" : ""}`}
                >
                  <LockKeyhole className="h-4 w-4 text-slate-500" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium text-slate-800">{device.name ?? device.deviceId}</span>
                    <span className="block truncate text-xs text-slate-500">{device.deviceId}</span>
                  </span>
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      device.status === "ONLINE" ? "bg-emerald-500" : device.status === "SLEEP" ? "bg-amber-500" : device.status === "ALARM" ? "bg-red-500" : "bg-slate-400"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
