import { Inbox } from "lucide-react";
import { useAppText } from "../../../i18n/text";

export function EventEmptyState() {
  const tr = useAppText();
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-md border border-dashed border-slate-200 bg-white text-center">
      <Inbox className="h-10 w-10 text-slate-300" />
      <div className="mt-3 text-sm font-medium text-slate-700">{tr("No Data")}</div>
      <div className="mt-1 text-xs text-slate-400">{tr("No events for selected filters.")}</div>
    </div>
  );
}
