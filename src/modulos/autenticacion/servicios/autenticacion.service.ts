import { api, extraerDatos } from "../../../librerias/api";
import { almacenamiento } from "../../../librerias/almacenamiento";
import type { CredencialesLogin, RespuestaLogin, UsuarioSesion } from "../tipos/autenticacion.types";

export async function login(credenciales: CredencialesLogin) {
  const respuesta = await api.post<RespuestaLogin | { data: RespuestaLogin }>("/auth/login", credenciales);
  return extraerDatos<RespuestaLogin>(respuesta);
}

export async function obtenerUsuarioActual() {
  const respuesta = await api.get<UsuarioSesion | { data: UsuarioSesion }>("/auth/me");
  return extraerDatos<UsuarioSesion>(respuesta);
}

export function logoutLocal() {
  almacenamiento.borrarToken();
}
