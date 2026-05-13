import { useAppText } from "../../../../i18n/text";
import { EventEmptyState } from "../../components/EventEmptyState";
import { EventStatusBadge } from "../../components/EventStatusBadge";
import type { PushEventItem } from "../../types/events.types";

export function PushEventsTable({ items, onDetail }: { items: PushEventItem[]; onDetail: (item: PushEventItem) => void }) {
  const tr = useAppText();
  if (!items.length) return <EventEmptyState />;

  const headers = ["", "#", "Device ID", "Affiliated company", "Push type", "Sending event type", "Send to", "Sending status", "Sending content", "Sendtime", "Detail"];

  return (
    <div className="overflow-x-auto bg-white">
      <table className="min-w-[1120px] divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
          <tr>
            {headers.map((title) => <th className="px-4 py-3" key={title}>{tr(title)}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((item) => (
            <tr className="hover:bg-slate-50" key={item.id}>
              <td className="px-4 py-3"><input type="checkbox" className="rounded border-slate-300" /></td>
              <td className="px-4 py-3">{item.sortNo}</td>
              <td className="px-4 py-3 font-medium text-slate-800">{item.deviceId}</td>
              <td className="px-4 py-3">{item.affiliatedCompany}</td>
              <td className="px-4 py-3">{item.pushType}</td>
              <td className="px-4 py-3">{item.sendingEventType}</td>
              <td className="max-w-48 truncate px-4 py-3" title={item.sendTo}>{maskRecipient(item.sendTo)}</td>
              <td className="px-4 py-3"><EventStatusBadge status={item.sendingStatus} /></td>
              <td className="max-w-72 truncate px-4 py-3" title={item.sendingContent}>{item.sendingContent}</td>
              <td className="px-4 py-3 whitespace-nowrap">{formatDate(item.sendTime)}</td>
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

function maskRecipient(value: string) {
  if (!value.includes("@")) return value;
  const [name, domain] = value.split("@");
  return `${name.slice(0, 3)}***@${domain}`;
}
