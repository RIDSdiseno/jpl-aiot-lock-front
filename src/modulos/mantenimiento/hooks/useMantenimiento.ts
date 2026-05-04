import { useQuery } from "@tanstack/react-query";
import { obtenerMantenimiento } from "../servicios/mantenimiento.service";

export function useMantenimiento() {
  return useQuery({ queryKey: ["mantenimiento"], queryFn: obtenerMantenimiento });
}
