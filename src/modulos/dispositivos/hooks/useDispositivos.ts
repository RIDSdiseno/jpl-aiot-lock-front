import { useQuery } from "@tanstack/react-query";
import { obtenerDispositivos } from "../servicios/dispositivos.service";
import type { FiltrosDispositivos } from "../tipos/dispositivo.types";

export function useDispositivos(filtros?: FiltrosDispositivos) {
  return useQuery({
    queryKey: ["dispositivos", filtros],
    queryFn: () => obtenerDispositivos(filtros),
  });
}
