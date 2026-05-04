import { Search } from "lucide-react";

export function Buscador({ value, onChange, placeholder }: { value: string; onChange: (valor: string) => void; placeholder?: string }) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2">
      <Search className="h-4 w-4 text-slate-400" />
      <input className="w-full bg-transparent text-sm outline-none" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}
