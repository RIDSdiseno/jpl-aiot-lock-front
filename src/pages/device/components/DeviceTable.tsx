import { ArrowUpDown } from "lucide-react";
import { useAppText } from "../../../i18n/text";
import { formatearFecha } from "../../../librerias/fechas";
import type { Device, DeviceFiltersState, DevicePagination } from "../../../types/device.types";
import { DeviceStatusBadge } from "./DeviceStatusBadge";
import { EmptyDeviceState } from "./EmptyDeviceState";

const dash = (value: unknown) => {
  if (value === null || value === undefined || value === "" || Number.isNaN(value)) return "—";
  return String(value);
};

export function DeviceTable({
  devices,
  selectedIds,
  pagination,
  filters,
  loading,
  onToggle,
  onToggleAll,
  onSort,
  onDetail,
  onSlaves,
  onDelete,
}: {
  devices: Device[];
  selectedIds: string[];
  pagination: DevicePagination;
  filters: DeviceFiltersState;
  loading?: boolean;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  onSort: (sortBy: NonNullable<DeviceFiltersState["sortBy"]>) => void;
  onDetail: (device: Device) => void;
  onSlaves: (device: Device) => void;
  onDelete: (device: Device) => void;
}) {
  const tr = useAppText();
  const start = (pagination.page - 1) * pagination.limit;
  const allChecked = devices.length > 0 && devices.every((device) => selectedIds.includes(device.id));
  const sortableHeader = (label: string, key: NonNullable<DeviceFiltersState["sortBy"]>) => (
    <button type="button" className="inline-flex items-center gap-1" onClick={() => onSort(key)}>
      {label}
      <ArrowUpDown className={`h-3.5 w-3.5 ${filters.sortBy === key ? "text-blue-600" : "text-slate-400"}`} />
    </button>
  );

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
            <tr>
              <th className="w-10 px-4 py-3"><input type="checkbox" checked={allChecked} onChange={onToggleAll} /></th>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">{sortableHeader(tr("Device name"), "deviceName")}</th>
              <th className="px-4 py-3">{sortableHeader(tr("Device ID"), "deviceId")}</th>
              <th className="px-4 py-3">{tr("Device type")}</th>
              <th className="px-4 py-3">{tr("Product model")}</th>
              <th className="px-4 py-3">{tr("Affiliated company")}</th>
              <th className="px-4 py-3">{sortableHeader(tr("Status"), "status")}</th>
              <th className="px-4 py-3">{sortableHeader(tr("Create time"), "createdAt")}</th>
              <th className="px-4 py-3">{tr("Operate")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td className="px-4 py-8 text-center text-slate-500" colSpan={10}>{tr("Loading...")}</td></tr>
            ) : devices.length === 0 ? (
              <tr><td colSpan={10}><EmptyDeviceState /></td></tr>
            ) : devices.map((device, index) => {
              const sortNo = device.sortNo ?? start + index + 1;
              return (
                <tr key={device.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3"><input type="checkbox" checked={selectedIds.includes(device.id)} onChange={() => onToggle(device.id)} /></td>
                  <td className="px-4 py-3">{sortNo}</td>
                  <td className="max-w-[220px] truncate px-4 py-3 font-medium text-slate-900" title={dash(device.deviceName)}>{dash(device.deviceName)}</td>
                  <td className="px-4 py-3 font-mono text-xs">{dash(device.deviceId)}</td>
                  <td className="px-4 py-3">{dash(device.deviceType)}</td>
                  <td className="px-4 py-3">{dash(device.productModel)}</td>
                  <td className="max-w-[240px] truncate px-4 py-3" title={dash(device.affiliatedCompany)}>{dash(device.affiliatedCompany)}</td>
                  <td className="px-4 py-3"><DeviceStatusBadge status={device.status ?? device.onlineStatus} /></td>
                  <td className="px-4 py-3">{device.createdAt ? formatearFecha(device.createdAt) : "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button type="button" className="font-medium text-blue-600 hover:underline" onClick={() => onDetail(device)}>{tr("Detail")}</button>
                      <button type="button" className="font-medium text-slate-600 hover:underline" onClick={() => onSlaves(device)}>{tr("Slave Devices")}</button>
                      <button type="button" className="font-medium text-red-600 hover:underline" onClick={() => onDelete(device)}>{tr("Delete")}</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
