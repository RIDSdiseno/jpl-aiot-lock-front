import { translateDataType } from "../../../i18n/enums";
import { useI18n } from "../../../i18n/i18nStore";
import { useAppText } from "../../../i18n/text";
import type { LockUnlockReportItem, SortOrder } from "../../../types/report.types";
import { EmptyReportState } from "./EmptyReportState";

export function ReportTable({
  items,
  sortBy,
  sortOrder,
  onSort,
  onDetail,
  onMap,
  onImage,
}: {
  items: LockUnlockReportItem[];
  sortBy?: string;
  sortOrder?: SortOrder;
  onSort: (sortBy: string) => void;
  onDetail: (item: LockUnlockReportItem) => void;
  onMap: (item: LockUnlockReportItem) => void;
  onImage: (item: LockUnlockReportItem) => void;
}) {
  const tr = useAppText();
  const language = useI18n((state) => state.language);
  if (!items.length) return <EmptyReportState />;

  const headers = [
    ["sortNo", "#"],
    ["deviceId", "Device ID"],
    ["deviceName", "Device name"],
    ["productModel", "Product model"],
    ["gpsTime", "GPS Time"],
    ["event", "Event"],
    ["operatingInfo", "Operating info"],
    ["dataType", "Data type"],
  ] as const;

  return (
    <div className="overflow-x-auto bg-white">
      <table className="min-w-[1120px] divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3"><input type="checkbox" className="rounded border-slate-300" /></th>
            {headers.map(([key, title]) => (
              <th className="px-4 py-3" key={key}>
                <button className="font-semibold uppercase hover:text-slate-900" onClick={() => onSort(key)} type="button">
                  {tr(title)}{sortBy === key ? (sortOrder === "ASC" ? " ↑" : " ↓") : ""}
                </button>
              </th>
            ))}
            <th className="px-4 py-3">{tr("Event Image")}</th>
            <th className="px-4 py-3">{tr("Get Position")}</th>
            <th className="px-4 py-3">{tr("Detail")}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((item) => (
            <tr className="hover:bg-slate-50" key={item.id}>
              <td className="px-4 py-3"><input type="checkbox" className="rounded border-slate-300" /></td>
              <td className="px-4 py-3">{value(item.sortNo)}</td>
              <td className="px-4 py-3 font-medium text-slate-800">{value(item.deviceId)}</td>
              <td className="max-w-48 truncate px-4 py-3" title={value(item.deviceName)}>{value(item.deviceName)}</td>
              <td className="px-4 py-3">{value(item.productModel)}</td>
              <td className="whitespace-nowrap px-4 py-3">{formatDate(item.gpsTime)}</td>
              <td className="px-4 py-3">{value(item.event)}</td>
              <td className="max-w-64 truncate px-4 py-3" title={value(item.operatingInfo)}>{value(item.operatingInfo)}</td>
              <td className="px-4 py-3">{translateDataType(language, item.dataType)}</td>
              <td className="px-4 py-3">{item.eventImageUrl ? <button className="text-blue-700 hover:underline" onClick={() => onImage(item)} type="button">{tr("View image")}</button> : "-"}</td>
              <td className="px-4 py-3"><button className="text-blue-700 hover:underline" onClick={() => onMap(item)} type="button">{tr("Get Position")}</button></td>
              <td className="px-4 py-3"><button className="text-blue-700 hover:underline" onClick={() => onDetail(item)} type="button">{tr("Detail")}</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatDate(value?: string) {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : date.toLocaleString("es-CL");
}

function value(input?: string | number | null) {
  return input === undefined || input === null || input === "" || String(input) === "NaN" ? "-" : String(input);
}
