import { translateDataType, translateEventType, translateLockStatus } from "../../../../i18n/enums";
import { useI18n } from "../../../../i18n/i18nStore";
import { useAppText } from "../../../../i18n/text";
import { EventEmptyState } from "../../components/EventEmptyState";
import type { DeviceEventItem } from "../../types/events.types";

export function AllEventsTable({ items, onDetail, onMap, onImage }: { items: DeviceEventItem[]; onDetail: (item: DeviceEventItem) => void; onMap: (item: DeviceEventItem) => void; onImage: (item: DeviceEventItem) => void }) {
  const tr = useAppText();
  const language = useI18n((state) => state.language);
  if (!items.length) return <EventEmptyState />;

  const headers = ["", "#", "Device ID", "Device name", "GPS Time", "Battery level", "Product model", "Events", "Event type", "Lock Status", "Data type", "Latitude and Longitude", "Event Image", "Get Position", "Detail"];

  return (
    <div className="overflow-x-auto bg-white">
      <table className="min-w-[1280px] divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
          <tr>
            {headers.map((title) => <th className="px-4 py-3" key={title}>{tr(title)}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((item) => (
            <tr className="hover:bg-slate-50" key={item.id}>
              <td className="px-4 py-3"><input type="checkbox" className="rounded border-slate-300" /></td>
              <td className="px-4 py-3">{value(item.sortNo)}</td>
              <td className="px-4 py-3 font-medium text-slate-800">{item.deviceId}</td>
              <td className="max-w-48 truncate px-4 py-3" title={item.deviceName}>{value(item.deviceName)}</td>
              <td className="px-4 py-3 whitespace-nowrap">{formatDate(item.gpsTime)}</td>
              <td className="px-4 py-3">{typeof item.batteryLevel === "number" ? `${item.batteryLevel}%` : "-"}</td>
              <td className="px-4 py-3">{value(item.productModel)}</td>
              <td className="max-w-64 truncate px-4 py-3" title={item.eventName ?? item.events}>{value(item.eventName ?? item.events)}</td>
              <td className="px-4 py-3">{translateEventType(language, item.eventType)}</td>
              <td className="px-4 py-3">{translateLockStatus(language, item.lockStatus)}</td>
              <td className="px-4 py-3">{translateDataType(language, item.dataType)}</td>
              <td className="px-4 py-3 whitespace-nowrap">{formatLatLng(item.latitude, item.longitude)}</td>
              <td className="px-4 py-3">{item.eventImageUrl ? <button className="text-blue-700 hover:underline" onClick={() => onImage(item)} type="button">{tr("View image")}</button> : "-"}</td>
              <td className="px-4 py-3"><button className="text-blue-700 hover:underline" onClick={() => onMap(item)} type="button">{tr("Get location")}</button></td>
              <td className="px-4 py-3"><button className="text-blue-700 hover:underline" onClick={() => onDetail(item)} type="button">{tr("Detail")}</button></td>
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
  return typeof lat === "number" && typeof lng === "number" ? `${lat.toFixed(6)}, ${lng.toFixed(6)}` : "-";
}

function value(input?: string | number | null) {
  return input === undefined || input === null || input === "" ? "-" : input;
}

