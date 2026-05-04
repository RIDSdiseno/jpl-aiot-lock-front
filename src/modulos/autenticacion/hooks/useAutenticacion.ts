import { useMutation, useQuery } from "@tanstack/react-query";
import { useAutenticacionStore } from "../store/autenticacion.store";
import { iniciarSesion, obtenerUsuarioActual } from "../servicios/autenticacion.service";

export function useAutenticacion() {
  const store = useAutenticacionStore();

  const usuarioActual = useQuery({
    queryKey: ["auth", "me"],
    queryFn: obtenerUsuarioActual,
    enabled: Boolean(store.accessToken),
  });

  const loginMutation = useMutation({
    mutationFn: iniciarSesion,
    onSuccess: (respuesta) => {
      store.establecerSesion(respuesta.accessToken, respuesta.user);
    },
  });

  return { ...store, usuarioActual, loginMutation };
}
