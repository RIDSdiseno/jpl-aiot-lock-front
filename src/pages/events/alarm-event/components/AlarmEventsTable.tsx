import { EventEmptyState } from "../../components/EventEmptyState";
import { EventSeverityBadge } from "../../components/EventSeverityBadge";
import { EventStatusBadge } from "../../components/EventStatusBadge";
import type { AlarmEventItem } from "../../types/events.types";

export function AlarmEventsTable({ items }: { items: AlarmEventItem[] }) {
  if (!items.length) return <EventEmptyState />;

  return (
    <div className="overflow-x-auto bg-white">
      <table className="min-w-[1280px] divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
          <tr>
            {["", "Sort No.", "Device ID", "Device name", "Product model", "GPS Time", "Battery", "Alarm event", "Operating info", "Lock Status", "Data type", "Latitude and Longitude", "Severity", "Handled status"].map((title) => (
              <th className="px-4 py-3" key={title}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((item) => (
            <tr className={item.severity === "CRITICAL" ? "bg-red-50/50 hover:bg-red-50" : "hover:bg-slate-50"} key={item.id}>
              <td className="px-4 py-3"><input type="checkbox" className="rounded border-slate-300" /></td>
              <td className="px-4 py-3">{item.sortNo}</td>
              <td className="px-4 py-3 font-medium text-slate-800">{item.deviceId}</td>
              <td className="px-4 py-3">{item.deviceName}</td>
              <td className="px-4 py-3">{item.productModel}</td>
              <td className="px-4 py-3 whitespace-nowrap">{formatDate(item.gpsTime)}</td>
              <td className="px-4 py-3">{item.batteryLevel ?? "-"}%</td>
              <td className="px-4 py-3">{item.alarmEvent}</td>
              <td className="max-w-64 truncate px-4 py-3" title={item.operatingInfo}>{item.operatingInfo}</td>
              <td className="px-4 py-3">{item.lockStatus}</td>
              <td className="px-4 py-3">{item.dataType}</td>
              <td className="px-4 py-3 whitespace-nowrap">{formatLatLng(item.latitude, item.longitude)}</td>
              <td className="px-4 py-3"><EventSeverityBadge severity={item.severity} /></td>
              <td className="px-4 py-3"><EventStatusBadge status={item.handledStatus} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatDate(value?: string) {
  return value ? new Date(value).toLocaleString("es-CL") : "-";
}

function formatLatLng(lat?: number, lng?: number) {
  return typeof lat === "number" && typeof lng === "number" ? `${lat.toFixed(5)}, ${lng.toFixed(5)}` : "-";
}
