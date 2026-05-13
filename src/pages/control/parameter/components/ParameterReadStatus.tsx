import type { ParameterStatus } from "../../../../types/parameter.types";

const styles: Record<ParameterStatus, string> = {
  SUCCESS: "border-emerald-200 bg-emerald-50 text-emerald-700",
  FAILED: "border-red-200 bg-red-50 text-red-700",
  PENDING: "border-amber-200 bg-amber-50 text-amber-700",
  OFFLINE: "border-slate-200 bg-slate-50 text-slate-700",
};

export function ParameterReadStatus({ status, message }: { status?: ParameterStatus; message?: string }) {
  if (!status && !message) return null;
  const current = status ?? "PENDING";
  return (
    <div className={`rounded border px-4 py-3 text-sm ${styles[current]}`}>
      <span className="font-semibold">{current}</span>
      {message ? <span className="ml-2">{message}</span> : null}
    </div>
  );
}
