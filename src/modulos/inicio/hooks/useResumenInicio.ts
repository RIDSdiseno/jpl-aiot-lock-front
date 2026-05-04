import { useQuery } from "@tanstack/react-query";
import { obtenerResumenInicio } from "../servicios/inicio.service";

export function useResumenInicio() {
  return useQuery({
    queryKey: ["inicio", "resumen"],
    queryFn: obtenerResumenInicio,
  });
}
