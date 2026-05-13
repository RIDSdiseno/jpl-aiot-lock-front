import type { DeviceParameterField } from "../../types/control.types";

function normalizeValue(field: DeviceParameterField, value: string): string | number | boolean {
  if (field.type === "number") return Number(value);
  if (field.type === "boolean") return value === "true";
  const option = field.options?.find((item) => String(item.value) === value);
  return option ? option.value : value;
}

function formatDateTimeValue(value: DeviceParameterField["value"]) {
  if (!value) return "";
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toISOString().slice(0, 16);
}

function groupedFields(fields: DeviceParameterField[]) {
  return fields.reduce<Array<{ title?: string; fields: DeviceParameterField[] }>>((groups, field) => {
    const title = field.group;
    const current = groups.find((group) => group.title === title);
    if (current) current.fields.push(field);
    else groups.push({ title, fields: [field] });
    return groups;
  }, []);
}

export function ParameterForm({
  fields,
  dirtyKeys,
  onChange,
}: {
  fields: DeviceParameterField[];
  dirtyKeys: Set<string>;
  onChange: (field: DeviceParameterField) => void;
}) {
  if (!fields.length) {
    return <div className="rounded border border-slate-200 bg-white p-6 text-sm text-slate-500">Select a device or read parameters to display this category.</div>;
  }

  return (
    <div className="rounded border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-900">Parameter values</h2>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{dirtyKeys.size} modified</span>
      </div>
      <div className="space-y-5 p-4">
        {groupedFields(fields).map((group) => (
          <section key={group.title ?? "default"} className="space-y-3">
            {group.title ? <h3 className="border-b border-slate-100 pb-2 text-xs font-semibold uppercase text-slate-500">{group.title}</h3> : null}
            <div className="grid gap-4 md:grid-cols-2">
              {group.fields.map((field) => {
                const disabled = field.editable === false || field.type === "readonly";
                const changed = dirtyKeys.has(field.key);
                const inputClass = "w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 disabled:bg-slate-100 disabled:text-slate-500";
                return (
                  <label key={field.key} className="space-y-1">
                    <span className="flex items-center gap-2 text-xs font-medium text-slate-600">
                      <span className="min-w-0 truncate">{field.label}</span>
                      {field.unit ? <span className="shrink-0 font-normal text-slate-400">({field.unit})</span> : null}
                      {changed ? <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Modified</span> : null}
                    </span>
                    {field.type === "boolean" ? (
                      <select value={String(field.value)} disabled={disabled} onChange={(event) => onChange({ ...field, value: normalizeValue(field, event.target.value) })} className={inputClass}>
                        <option value="true">Enabled</option>
                        <option value="false">Disabled</option>
                      </select>
                    ) : field.type === "select" ? (
                      <select value={String(field.value ?? "")} disabled={disabled} onChange={(event) => onChange({ ...field, value: normalizeValue(field, event.target.value) })} className={inputClass}>
                        {(field.options ?? []).map((option) => (
                          <option key={String(option.value)} value={String(option.value)}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "datetime" ? (
                      <input
                        type="datetime-local"
                        value={formatDateTimeValue(field.value)}
                        disabled={disabled}
                        onChange={(event) => onChange({ ...field, value: event.target.value ? new Date(event.target.value).toISOString() : "" })}
                        className={inputClass}
                      />
                    ) : (
                      <input
                        type={field.type === "password" || field.sensitive ? "password" : field.type === "number" ? "number" : "text"}
                        value={String(field.value ?? "")}
                        min={field.min}
                        max={field.max}
                        placeholder={field.placeholder}
                        disabled={disabled}
                        onChange={(event) => onChange({ ...field, value: normalizeValue(field, event.target.value) })}
                        className={inputClass}
                      />
                    )}
                    {field.description ? <span className="block text-xs text-slate-400">{field.description}</span> : null}
                  </label>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
