import { Search, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useAppText } from "../../../i18n/text";
import type { DeviceFiltersState, DeviceOptions } from "../../../types/device.types";

const inputClass = "w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500";

export function DeviceFilters({
  filters,
  options,
  onSearch,
  onReset,
}: {
  filters: DeviceFiltersState;
  options?: DeviceOptions;
  onSearch: (filters: DeviceFiltersState) => void;
  onReset: () => void;
}) {
  const tr = useAppText();
  const [draft, setDraft] = useState(filters);
  const update = (patch: Partial<DeviceFiltersState>) => setDraft((current) => ({ ...current, ...patch, page: 1 }));

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        <select className={inputClass} value={draft.deviceType ?? ""} onChange={(event) => update({ deviceType: event.target.value || undefined })}>
          <option value="">{tr("Please select Device type")}</option>
          {(options?.deviceTypes ?? []).map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <select className={inputClass} value={draft.productModel ?? ""} onChange={(event) => update({ productModel: event.target.value || undefined })}>
          <option value="">{tr("Please select Product model")}</option>
          {(options?.productModels ?? []).map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <input className={inputClass} placeholder={tr("Please input Device ID")} value={draft.deviceId ?? ""} onChange={(event) => update({ deviceId: event.target.value })} />
        <select className={inputClass} value={draft.affiliatedCompanyId ?? ""} onChange={(event) => update({ affiliatedCompanyId: event.target.value || undefined })}>
          <option value="">{tr("Please select Affiliated company")}</option>
          {(options?.companies ?? []).map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
        </select>
        <input className={inputClass} placeholder={tr("Please input Device name")} value={draft.deviceName ?? ""} onChange={(event) => update({ deviceName: event.target.value })} />
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button type="button" className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700" onClick={() => onSearch(draft)}>
          <Search className="h-4 w-4" />
          {tr("Search")}
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          onClick={() => {
            const next = { page: 1, limit: filters.limit, sortOrder: "desc" as const };
            setDraft(next);
            onReset();
          }}
        >
          <RotateCcw className="h-4 w-4" />
          {tr("Reset")}
        </button>
      </div>
    </section>
  );
}
