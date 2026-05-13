import { useI18n } from "../../../i18n/i18nStore";
import { translateDeviceStatus } from "../../../i18n/enums";

export function DeviceStatusBadge({ status }: { status?: string | null }) {
  const language = useI18n((state) => state.language);
  const value = status || "UNKNOWN";
  const styles: Record<string, string> = {
    ONLINE: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    OFFLINE: "bg-slate-100 text-slate-700 ring-slate-200",
    SLEEP: "bg-amber-50 text-amber-700 ring-amber-200",
    DORMANT: "bg-yellow-50 text-yellow-700 ring-yellow-200",
    UNKNOWN: "bg-zinc-100 text-zinc-700 ring-zinc-200",
    DELETED: "bg-red-50 text-red-700 ring-red-200",
  };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${styles[value] ?? styles.UNKNOWN}`}>{translateDeviceStatus(language, value)}</span>;
}
