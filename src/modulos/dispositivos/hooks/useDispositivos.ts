import { useQuery } from "@tanstack/react-query";
import { obtenerDispositivos, obtenerResumenDispositivos } from "../servicios/dispositivos.service";
import type { FiltrosDispositivos } from "../tipos/dispositivo.types";

export function useDispositivos(filtros?: FiltrosDispositivos) {
  return useQuery({
    queryKey: ["dispositivos", filtros],
    queryFn: () => obtenerDispositivos(filtros),
  });
}

export function useResumenDispositivos(filtros?: FiltrosDispositivos) {
  return useQuery({
    queryKey: ["dispositivos", "summary", filtros],
    queryFn: () => obtenerResumenDispositivos(filtros),
  });
}
