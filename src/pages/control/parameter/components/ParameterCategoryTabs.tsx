import { useAppText } from "../../../../i18n/text";
import type { DeviceParameterCategory } from "../../types/control.types";

export const parameterCategories: DeviceParameterCategory[] = [
  { key: "COMMUNICATION", label: "Communication" },
  { key: "TIME", label: "Time" },
  { key: "SHACKLE", label: "Shackle" },
  { key: "INSTRUCTION_SET", label: "Instruction Set" },
  { key: "BLUETOOTH", label: "Bluetooth" },
  { key: "LOCATION", label: "Location" },
  { key: "POWER_SUPPLY", label: "Power Supply" },
  { key: "SENSOR", label: "Sensor" },
  { key: "IC_CARD", label: "IC Card" },
  { key: "STORAGE", label: "Storage" },
  { key: "OTA", label: "OTA" },
];

export function ParameterCategoryTabs({
  active,
  categories = parameterCategories,
  onChange,
}: {
  active: string;
  categories?: DeviceParameterCategory[];
  onChange: (key: string) => void;
}) {
  const tr = useAppText();
  return (
    <div className="w-full shrink-0 rounded border border-slate-200 bg-white p-2 lg:w-56">
      {categories.map((category) => (
        <button
          key={category.key}
          type="button"
          onClick={() => onChange(category.key)}
          className={`block w-full rounded px-3 py-2 text-left text-sm ${active === category.key ? "bg-blue-50 font-semibold text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}
        >
          {tr(category.label)}
        </button>
      ))}
    </div>
  );
}
