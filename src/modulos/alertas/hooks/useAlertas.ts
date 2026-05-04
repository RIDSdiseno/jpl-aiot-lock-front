import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { actualizarAlerta, obtenerAlertas } from "../servicios/alertas.service";

export function useAlertas() {
  const queryClient = useQueryClient();
  return {
    alertas: useQuery({ queryKey: ["alertas"], queryFn: obtenerAlertas }),
    actualizar: useMutation({
      mutationFn: ({ id, data }: { id: string; data: Record<string, string> }) => actualizarAlerta(id, data),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["alertas"] }),
    }),
  };
}
