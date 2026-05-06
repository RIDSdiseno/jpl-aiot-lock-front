export function SelectorIdioma({ compacto = false }: { compacto?: boolean }) {
  return (
    <select
      className={`rounded-lg font-mono text-xs tracking-widest uppercase outline-none transition-all ${
        compacto ? "px-2 py-1" : "w-full px-3 py-2.5"
      }`}
      defaultValue={import.meta.env.VITE_DEFAULT_LANGUAGE ?? "es"}
      style={{
        background: "rgba(8,18,36,0.70)",
        border: "1px solid rgba(6,182,212,0.22)",
        color: "#64748b",
      }}
    >
      <option value="es">🌐 Español</option>
      <option value="en">🌐 English</option>
    </select>
  );
}
