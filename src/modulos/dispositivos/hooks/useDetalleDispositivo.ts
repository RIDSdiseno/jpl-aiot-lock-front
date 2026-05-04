import { useQuery } from "@tanstack/react-query";
import { obtenerDispositivoPorId } from "../servicios/dispositivos.service";

export function useDetalleDispositivo(dispositivoId?: string) {
  return useQuery({
    queryKey: ["dispositivos", dispositivoId],
    queryFn: () => obtenerDispositivoPorId(dispositivoId!),
    enabled: Boolean(dispositivoId),
  });
}
