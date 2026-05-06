import type { DeviceParameterField } from "../../types/control.types";

export function ParameterForm({ fields, onChange }: { fields: DeviceParameterField[]; onChange: (fields: DeviceParameterField[]) => void }) {
  return (
    <div className="grid gap-4 rounded border border-slate-200 bg-white p-4 md:grid-cols-2">
      {fields.map((field) => (
        <label key={field.key} className="space-y-1">
          <span className="text-xs font-medium text-slate-600">{field.label}</span>
          <input
            type={field.sensitive ? "password" : "text"}
            value={field.value ?? ""}
            placeholder={field.placeholder}
            onChange={(event) => onChange(fields.map((item) => (item.key === field.key ? { ...item, value: event.target.value } : item)))}
            className="w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
        </label>
      ))}
    </div>
  );
}
