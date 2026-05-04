import { api, extraerDatos } from "../../../librerias/api";
import type { Usuario } from "../tipos/usuario.types";

export async function obtenerUsuarios() {
  const respuesta = await api.get<Usuario[] | { data: Usuario[] }>("/users");
  return extraerDatos<Usuario[]>(respuesta) ?? [];
}

export async function obtenerUsuarioPorId(id: string) {
  const respuesta = await api.get<Usuario | { data: Usuario }>(`/users/${id}`);
  return extraerDatos<Usuario>(respuesta);
}
