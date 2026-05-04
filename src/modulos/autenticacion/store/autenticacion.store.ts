import { create } from "zustand";
import { almacenamiento } from "../../../librerias/almacenamiento";
import { iniciarSesion as iniciarSesionApi, obtenerUsuarioActual } from "../servicios/autenticacion.service";
import type { CredencialesLogin, UsuarioSesion } from "../tipos/autenticacion.types";

interface EstadoAutenticacion {
  accessToken: string | null;
  usuario: UsuarioSesion | null;
  estaAutenticado: boolean;
  iniciarSesion: (credenciales: CredencialesLogin) => Promise<void>;
  cargarUsuarioActual: () => Promise<void>;
  establecerSesion: (token: string, usuario?: UsuarioSesion) => void;
  establecerUsuario: (usuario: UsuarioSesion | null) => void;
  cerrarSesion: () => void;
}

export const useAutenticacionStore = create<EstadoAutenticacion>((set) => ({
  accessToken: almacenamiento.obtenerToken(),
  usuario: null,
  estaAutenticado: Boolean(almacenamiento.obtenerToken()),
  iniciarSesion: async (credenciales) => {
    const respuesta = await iniciarSesionApi(credenciales);
    almacenamiento.guardarToken(respuesta.accessToken);
    set({ accessToken: respuesta.accessToken, usuario: respuesta.user ?? null, estaAutenticado: true });
  },
  cargarUsuarioActual: async () => {
    const usuario = await obtenerUsuarioActual();
    set({ usuario, estaAutenticado: Boolean(almacenamiento.obtenerToken()) });
  },
  establecerSesion: (token, usuario) => {
    almacenamiento.guardarToken(token);
    set({ accessToken: token, usuario: usuario ?? null, estaAutenticado: true });
  },
  establecerUsuario: (usuario) => set({ usuario }),
  cerrarSesion: () => {
    almacenamiento.borrarToken();
    set({ accessToken: null, usuario: null, estaAutenticado: false });
  },
}));
