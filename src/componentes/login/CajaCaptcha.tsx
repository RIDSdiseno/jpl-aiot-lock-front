import { useEffect, useMemo } from "react";

export function CajaCaptcha({ onCodigo }: { onCodigo: (codigo: string) => void }) {
  const codigo = useMemo(() => String(Math.floor(1000 + Math.random() * 9000)), []);
  useEffect(() => onCodigo(codigo), [codigo, onCodigo]);
  return (
    <div className="flex h-10 select-none items-center justify-center rounded-md border border-blue-200 bg-blue-50 font-mono text-lg font-semibold tracking-widest text-blue-800">
      {codigo}
    </div>
  );
}
