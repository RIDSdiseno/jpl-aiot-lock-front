import { useEffect, useMemo } from "react";

export function CajaCaptcha({ onCodigo }: { onCodigo: (codigo: string) => void }) {
  const codigo = useMemo(() => String(Math.floor(1000 + Math.random() * 9000)), []);
  useEffect(() => onCodigo(codigo), [codigo, onCodigo]);

  return (
    <div
      className="flex h-full min-h-[42px] select-none items-center justify-center rounded-lg font-mono text-lg font-bold tracking-[0.35em]"
      style={{
        background: "linear-gradient(135deg, rgba(8,145,178,0.13), rgba(37,99,235,0.09))",
        border: "1px solid rgba(6,182,212,0.30)",
        color: "#22d3ee",
        textShadow: "0 0 12px rgba(34,211,238,0.65)",
        boxShadow: "0 0 12px rgba(6,182,212,0.08), inset 0 0 12px rgba(6,182,212,0.04)",
      }}
    >
      {codigo}
    </div>
  );
}
