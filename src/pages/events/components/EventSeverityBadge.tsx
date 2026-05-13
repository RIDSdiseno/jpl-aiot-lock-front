import { translateAlarmLevel } from "../../../i18n/enums";
import { useI18n } from "../../../i18n/i18nStore";
import type { EventSeverity } from "../types/events.types";

const styles: Record<EventSeverity, string> = {
  INFO: "bg-slate-100 text-slate-600 ring-slate-200",
  LOW: "bg-sky-50 text-sky-700 ring-sky-200",
  MEDIUM: "bg-amber-50 text-amber-700 ring-amber-200",
  HIGH: "bg-orange-50 text-orange-700 ring-orange-200",
  CRITICAL: "bg-red-50 text-red-700 ring-red-200",
};

export function EventSeverityBadge({ severity }: { severity?: EventSeverity }) {
  const language = useI18n((state) => state.language);
  const value = severity || "INFO";
  return <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ring-1 ${styles[value]}`}>{translateAlarmLevel(language, value)}</span>;
}
