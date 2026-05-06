export function ParameterReadTime({ value }: { value?: string | null }) {
  return <div className="text-sm text-slate-600">Parameter read time: <span className="font-medium text-slate-900">{value ?? "-"}</span></div>;
}
