import { Lock, Unlock } from "lucide-react";
import { Boton } from "../comunes/Boton";
import { useComandosDispositivo } from "../../modulos/comandos/hooks/useComandosDispositivo";

export function BotonesComandoDispositivo({ dispositivoId }: { dispositivoId: string }) {
  const { abrir, cerrar } = useComandosDispositivo(dispositivoId);
  return (
    <div className="flex flex-wrap gap-2">
      <Boton icono={<Unlock className="h-4 w-4" />} disabled={abrir.isPending} onClick={() => abrir.mutate()}>Abrir</Boton>
      <Boton variante="secundario" icono={<Lock className="h-4 w-4" />} disabled={cerrar.isPending} onClick={() => cerrar.mutate()}>Cerrar</Boton>
    </div>
  );
}
