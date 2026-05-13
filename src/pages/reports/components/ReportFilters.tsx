import { RotateCcw, Search } from "lucide-react";
import { Boton } from "../../../componentes/comunes/Boton";
import { CampoTexto } from "../../../componentes/comunes/CampoTexto";
import { Selector } from "../../../componentes/comunes/Selector";
import { useAppText } from "../../../i18n/text";
import type { LockUnlockReportFilters, ReportOptions } from "../../../types/report.types";

interface Props {
  filters: LockUnlockReportFilters;
  options?: ReportOptions;
  error?: string;
  onChange: (filters: LockUnlockReportFilters) => void;
  onSearch: () => void;
  onReset: () => void;
}

export function ReportFilters({ filters, options, error, onChange, onSearch, onReset }: Props) {
  const tr = useAppText();
  return (
    <div className="mb-4 rounded-md border border-slate-200 bg-white p-4">
      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-5">
        <Selector etiqueta={tr("Product model")} value={filters.productModel ?? ""} onChange={(event) => onChange({ ...filters, productModel: event.target.value })} opciones={[{ value: "", label: tr("All") }, ...(options?.productModels ?? []).map((value) => ({ value, label: value }))]} />
        <CampoTexto etiqueta={tr("Device ID")} value={filters.deviceId ?? ""} onChange={(event) => onChange({ ...filters, deviceId: event.target.value })} placeholder={tr("Partial Device ID")} />
        <Selector etiqueta={tr("Seal&Unseal type")} value={filters.sealUnsealType ?? ""} onChange={(event) => onChange({ ...filters, sealUnsealType: event.target.value })} opciones={[{ value: "", label: tr("All") }, ...(options?.sealUnsealTypes ?? []).map((value) => ({ value, label: value }))]} />
        <CampoTexto etiqueta={tr("Start date")} type="datetime-local" value={toLocalInput(filters.startDate)} onChange={(event) => onChange({ ...filters, startDate: fromLocalInput(event.target.value) })} error={error} />
        <CampoTexto etiqueta={tr("End date")} type="datetime-local" value={toLocalInput(filters.endDate)} onChange={(event) => onChange({ ...filters, endDate: fromLocalInput(event.target.value) })} />
        <Selector etiqueta={tr("Data type")} value={filters.dataType ?? ""} onChange={(event) => onChange({ ...filters, dataType: event.target.value })} opciones={[{ value: "", label: tr("All") }, ...(options?.dataTypes ?? []).map((value) => ({ value, label: value }))]} />
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Boton variante="secundario" icono={<RotateCcw className="h-4 w-4" />} onClick={onReset} type="button">{tr("Reset")}</Boton>
        <Boton icono={<Search className="h-4 w-4" />} onClick={onSearch} type="button" disabled={Boolean(error)}>{tr("Search")}</Boton>
      </div>
    </div>
  );
}

function toLocalInput(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

function fromLocalInput(value: string) {
  return value ? new Date(value).toISOString() : undefined;
}
