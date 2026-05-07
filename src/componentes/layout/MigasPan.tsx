export function MigasPan({ items }: { items: string[] }) {
  return <div className="font-mono text-xs text-slate-500">{items.join(" / ")}</div>;
}
