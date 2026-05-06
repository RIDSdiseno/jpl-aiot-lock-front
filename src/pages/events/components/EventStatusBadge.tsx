const styles: Record<string, string> = {
  SENT: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  FAILED: "bg-red-50 text-red-700 ring-red-200",
  PENDING: "bg-amber-50 text-amber-700 ring-amber-200",
  UNKNOWN: "bg-slate-100 text-slate-600 ring-slate-200",
  NEW: "bg-blue-50 text-blue-700 ring-blue-200",
  ACKNOWLEDGED: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  RESOLVED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  IGNORED: "bg-slate-100 text-slate-600 ring-slate-200",
};

export function EventStatusBadge({ status }: { status?: string }) {
  const value = status || "UNKNOWN";
  return <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ring-1 ${styles[value] ?? styles.UNKNOWN}`}>{value}</span>;
}
