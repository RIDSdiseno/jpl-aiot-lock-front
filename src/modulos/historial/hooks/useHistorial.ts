import { useQuery } from "@tanstack/react-query";
import { obtenerHistorial } from "../servicios/historial.service";

export function useHistorial() {
  return useQuery({ queryKey: ["historial"], queryFn: obtenerHistorial });
}
