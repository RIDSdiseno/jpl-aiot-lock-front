import type { DeviceParameterCategory } from "../../types/control.types";

export const parameterCategories: DeviceParameterCategory[] = [
  { key: "ble", label: "BLE" },
  { key: "power", label: "Power" },
  { key: "nfc", label: "NFC" },
  { key: "sensor", label: "Sensor" },
  { key: "shackle", label: "Shackle" },
  { key: "storage", label: "Storage" },
  { key: "ota", label: "OTA" },
  { key: "cmdSet", label: "CMD Set" },
  { key: "protocol", label: "Protocol" },
  { key: "password", label: "Password" },
  { key: "fixedPassword", label: "Fixed password" },
  { key: "time", label: "Time" },
  { key: "location", label: "Location" },
  { key: "communication", label: "Communication" },
];

export function ParameterCategoryTabs({ active, onChange }: { active: string; onChange: (key: string) => void }) {
  return (
    <div className="w-full shrink-0 rounded border border-slate-200 bg-white p-2 lg:w-56">
      {parameterCategories.map((category) => (
        <button
          key={category.key}
          type="button"
          onClick={() => onChange(category.key)}
          className={`block w-full rounded px-3 py-2 text-left text-sm ${active === category.key ? "bg-blue-50 font-semibold text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
