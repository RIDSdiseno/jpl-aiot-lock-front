import { useQuery } from "@tanstack/react-query";
import { obtenerAccesosDispositivo } from "../servicios/accesos.service";

export function useAccesosDispositivo(dispositivoId?: string) {
  return useQuery({
    queryKey: ["accesos", dispositivoId],
    queryFn: () => obtenerAccesosDispositivo(dispositivoId!),
    enabled: Boolean(dispositivoId),
  });
}
