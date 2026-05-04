import { useQuery } from "@tanstack/react-query";
import { obtenerUbicacionesDispositivos } from "../servicios/gis.service";

export function useUbicacionesDispositivos() {
  return useQuery({ queryKey: ["gis", "ubicaciones"], queryFn: obtenerUbicacionesDispositivos });
}
