import { Boton } from "../../../../componentes/comunes/Boton";
import type { CommandRecordFilters } from "../../services/command-record.service";

export function CmdRecordFilters({
  filters,
  onChange,
  onSearch,
  onReset,
}: {
  filters: CommandRecordFilters;
  onChange: (filters: CommandRecordFilters) => void;
  onSearch: () => void;
  onReset: () => void;
}) {
  return (
    <div className="grid gap-3 rounded border border-slate-200 bg-white p-4 md:grid-cols-3 xl:grid-cols-6">
      <input value={filters.deviceId ?? ""} onChange={(event) => onChange({ ...filters, deviceId: event.target.value })} placeholder="Device ID" className="rounded border border-slate-200 px-3 py-2 text-sm" />
      <input value={filters.content ?? ""} onChange={(event) => onChange({ ...filters, content: event.target.value })} placeholder="CMD content" className="rounded border border-slate-200 px-3 py-2 text-sm" />
      <input value={filters.type ?? ""} onChange={(event) => onChange({ ...filters, type: event.target.value })} placeholder="CMD type" className="rounded border border-slate-200 px-3 py-2 text-sm" />
      <select value="" disabled className="rounded border border-slate-200 px-3 py-2 text-sm text-slate-500">
        <option>Whether to cancel</option>
      </select>
      <select value={filters.status ?? ""} onChange={(event) => onChange({ ...filters, status: event.target.value })} className="rounded border border-slate-200 px-3 py-2 text-sm">
        <option value="">CMD status</option>
        <option value="PENDING">PENDING</option>
        <option value="RESERVED">RESERVED</option>
        <option value="EXECUTED">EXECUTED</option>
        <option value="CANCELLED">CANCELLED</option>
      </select>
      <div className="flex gap-2">
        <Boton type="button" onClick={onSearch} className="flex-1">
          Search
        </Boton>
        <Boton type="button" variante="secundario" onClick={onReset}>
          Reset
        </Boton>
      </div>
      <input type="datetime-local" className="rounded border border-slate-200 px-3 py-2 text-sm" aria-label="Create time start" />
      <input type="datetime-local" className="rounded border border-slate-200 px-3 py-2 text-sm" aria-label="Create time end" />
    </div>
  );
}
