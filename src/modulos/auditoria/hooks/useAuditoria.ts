import { useQuery } from "@tanstack/react-query";
import { obtenerAuditoria } from "../servicios/auditoria.service";

export function useAuditoria() {
  return useQuery({ queryKey: ["auditoria"], queryFn: obtenerAuditoria });
}
