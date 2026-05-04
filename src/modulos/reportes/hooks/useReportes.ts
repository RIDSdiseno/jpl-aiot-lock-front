import { useQuery } from "@tanstack/react-query";
import { obtenerReportes } from "../servicios/reportes.service";

export function useReportes() {
  return useQuery({ queryKey: ["reportes"], queryFn: obtenerReportes });
}
