import { useQuery } from "@tanstack/react-query";
import { obtenerEmpresaPorId, obtenerEmpresas } from "../servicios/empresas.service";

export function useEmpresas() {
  return useQuery({ queryKey: ["empresas"], queryFn: obtenerEmpresas });
}

export function useEmpresaDetalle(empresaId?: string) {
  return useQuery({
    queryKey: ["empresas", empresaId],
    queryFn: () => obtenerEmpresaPorId(empresaId!),
    enabled: Boolean(empresaId),
  });
}
