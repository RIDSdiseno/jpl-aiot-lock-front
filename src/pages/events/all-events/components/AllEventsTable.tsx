import { EventEmptyState } from "../../components/EventEmptyState";
import type { DeviceEventItem } from "../../types/events.types";

export function AllEventsTable({ items }: { items: DeviceEventItem[] }) {
  if (!items.length) return <EventEmptyState />;

  return (
    <div className="overflow-x-auto bg-white">
      <table className="min-w-[1280px] divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
          <tr>
            {["", "Sort No.", "Device ID", "Device name", "GPS Time", "Battery", "Product model", "Events", "Event type", "Lock Status", "Data type", "Latitude and Longitude", "Event content"].map((title) => (
              <th className="px-4 py-3" key={title}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((item) => (
            <tr className="hover:bg-slate-50" key={item.id}>
              <td className="px-4 py-3"><input type="checkbox" className="rounded border-slate-300" /></td>
              <td className="px-4 py-3">{item.sortNo}</td>
              <td className="px-4 py-3 font-medium text-slate-800">{item.deviceId}</td>
              <td className="px-4 py-3">{item.deviceName}</td>
              <td className="px-4 py-3 whitespace-nowrap">{formatDate(item.gpsTime)}</td>
              <td className="px-4 py-3">{item.batteryLevel ?? "-"}%</td>
              <td className="px-4 py-3">{item.productModel}</td>
              <td className="px-4 py-3">{item.events}</td>
              <td className="px-4 py-3">{item.eventType}</td>
              <td className="px-4 py-3">{item.lockStatus}</td>
              <td className="px-4 py-3">{item.dataType}</td>
              <td className="px-4 py-3 whitespace-nowrap">{formatLatLng(item.latitude, item.longitude)}</td>
              <td className="max-w-64 truncate px-4 py-3" title={item.operatingInfo}>{item.operatingInfo}</td>
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
