import { useQuery } from "@tanstack/react-query";
import { obtenerEventos, obtenerEventosDispositivo } from "../servicios/eventos.service";

export function useEventos(filtros?: Record<string, string>) {
  return useQuery({ queryKey: ["eventos", filtros], queryFn: () => obtenerEventos(filtros) });
}

export function useEventosDispositivo(dispositivoId?: string) {
  return useQuery({
    queryKey: ["eventos", dispositivoId],
    queryFn: () => obtenerEventosDispositivo(dispositivoId!),
    enabled: Boolean(dispositivoId),
  });
}
