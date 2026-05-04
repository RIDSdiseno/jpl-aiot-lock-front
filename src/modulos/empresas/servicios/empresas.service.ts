import { api, extraerDatos } from "../../../librerias/api";
import type { Empresa } from "../tipos/empresa.types";

export async function obtenerEmpresas() {
  const respuesta = await api.get<Empresa[] | { data: Empresa[] }>("/companies");
  return extraerDatos<Empresa[]>(respuesta) ?? [];
}

export async function obtenerEmpresaPorId(id: string) {
  const respuesta = await api.get<Empresa | { data: Empresa }>(`/companies/${id}`);
  return extraerDatos<Empresa>(respuesta);
}
