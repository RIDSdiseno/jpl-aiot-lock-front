export function SelectorIdioma({ compacto = false }: { compacto?: boolean }) {
  return (
    <select className={`rounded-md border border-slate-200 bg-white text-sm outline-none ${compacto ? "px-2 py-1" : "w-full px-3 py-2"}`} defaultValue={import.meta.env.VITE_DEFAULT_LANGUAGE ?? "es"}>
      <option value="es">ES</option>
      <option value="en">EN</option>
    </select>
  );
}
