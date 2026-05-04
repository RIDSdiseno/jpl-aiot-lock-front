export function MigasPan({ items }: { items: string[] }) {
  return <div className="text-xs text-slate-500">{items.join(" / ")}</div>;
}
