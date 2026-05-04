import { useQuery } from "@tanstack/react-query";
import { obtenerUsuarioPorId, obtenerUsuarios } from "../servicios/usuarios.service";

export function useUsuarios() {
  return useQuery({ queryKey: ["usuarios"], queryFn: obtenerUsuarios });
}

export function useUsuarioDetalle(usuarioId?: string) {
  return useQuery({
    queryKey: ["usuarios", usuarioId],
    queryFn: () => obtenerUsuarioPorId(usuarioId!),
    enabled: Boolean(usuarioId),
  });
}
