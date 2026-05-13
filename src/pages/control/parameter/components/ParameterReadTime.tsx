export function ParameterReadTime({ value }: { value?: string | null }) {
  const formatted = value ? value.replace("T", " ").slice(0, 19) : "-";
  return <div className="text-sm font-semibold text-red-600">Parameter read time: <span className="font-medium">{formatted}</span></div>;
}
