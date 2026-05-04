import { create } from "zustand";
import { almacenamiento } from "../../../librerias/almacenamiento";
import type { UsuarioSesion } from "../tipos/autenticacion.types";

interface EstadoAutenticacion {
  accessToken: string | null;
  usuario: UsuarioSesion | null;
  establecerSesion: (token: string, usuario?: UsuarioSesion) => void;
  establecerUsuario: (usuario: UsuarioSesion | null) => void;
  cerrarSesion: () => void;
}

export const useAutenticacionStore = create<EstadoAutenticacion>((set) => ({
  accessToken: almacenamiento.obtenerToken(),
  usuario: null,
  establecerSesion: (token, usuario) => {
    almacenamiento.guardarToken(token);
    set({ accessToken: token, usuario: usuario ?? null });
  },
  establecerUsuario: (usuario) => set({ usuario }),
  cerrarSesion: () => {
    almacenamiento.borrarToken();
    set({ accessToken: null, usuario: null });
  },
}));
