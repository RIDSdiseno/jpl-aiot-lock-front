import { useMutation, useQuery } from "@tanstack/react-query";
import { abrirDispositivo, cerrarDispositivo, obtenerComandosDispositivo } from "../servicios/comandos.service";

export function useComandosDispositivo(dispositivoId?: string) {
  return {
    comandos: useQuery({
      queryKey: ["comandos", dispositivoId],
      queryFn: () => obtenerComandosDispositivo(dispositivoId!),
      enabled: Boolean(dispositivoId),
    }),
    abrir: useMutation({ mutationFn: () => abrirDispositivo(dispositivoId!) }),
    cerrar: useMutation({ mutationFn: () => cerrarDispositivo(dispositivoId!) }),
  };
}
