import { Boton } from "../../../../componentes/comunes/Boton";
import { useAppText } from "../../../../i18n/text";
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
  const tr = useAppText();
  return (
    <div className="grid gap-3 rounded border border-slate-200 bg-white p-4 md:grid-cols-3 xl:grid-cols-6">
      <input value={filters.deviceId ?? ""} onChange={(event) => onChange({ ...filters, deviceId: event.target.value })} placeholder={tr("Device ID")} className="rounded border border-slate-200 px-3 py-2 text-sm" />
      <input value={filters.deviceName ?? ""} onChange={(event) => onChange({ ...filters, deviceName: event.target.value })} placeholder={tr("Device name")} className="rounded border border-slate-200 px-3 py-2 text-sm" />
      <select value={filters.type ?? ""} onChange={(event) => onChange({ ...filters, type: event.target.value })} className="rounded border border-slate-200 px-3 py-2 text-sm">
        <option value="">{tr("Command type")}</option>
        {["NFC_READ", "NFC_SYNC", "NFC_CLEAR", "PASSWORD_READ", "PASSWORD_UPDATE", "PRESET_UPDATE", "BATCH_CARD_BINDING", "PARAMETER_READ", "PARAMETER_UPDATE", "RESERVATION_CMD", "RESERVATION_CMD_CANCEL"].map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      <select value={filters.status ?? ""} onChange={(event) => onChange({ ...filters, status: event.target.value })} className="rounded border border-slate-200 px-3 py-2 text-sm">
        <option value="">{tr("CMD status")}</option>
        <option value="PENDING">PENDING</option>
        <option value="SENDING">SENDING</option>
        <option value="SUCCESS">SUCCESS</option>
        <option value="FAILED">FAILED</option>
        <option value="TIMEOUT">TIMEOUT</option>
        <option value="RESERVED">RESERVED</option>
        <option value="EXECUTED">EXECUTED</option>
        <option value="CANCELLED">CANCELLED</option>
      </select>
      <input value={filters.operator ?? ""} onChange={(event) => onChange({ ...filters, operator: event.target.value })} placeholder={tr("Operator/User")} className="rounded border border-slate-200 px-3 py-2 text-sm" />
      <div className="flex gap-2">
        <Boton type="button" onClick={onSearch} className="flex-1">
          {tr("Search")}
        </Boton>
        <Boton type="button" variante="secundario" onClick={onReset}>
          {tr("Reset")}
        </Boton>
      </div>
      <input value={filters.content ?? ""} onChange={(event) => onChange({ ...filters, content: event.target.value })} placeholder={tr("Payload summary")} className="rounded border border-slate-200 px-3 py-2 text-sm" />
      <input value={filters.startDate ?? ""} onChange={(event) => onChange({ ...filters, startDate: event.target.value })} type="datetime-local" className="rounded border border-slate-200 px-3 py-2 text-sm" aria-label={tr("Create time start")} />
      <input value={filters.endDate ?? ""} onChange={(event) => onChange({ ...filters, endDate: event.target.value })} type="datetime-local" className="rounded border border-slate-200 px-3 py-2 text-sm" aria-label={tr("Create time end")} />
    </div>
  );
}
