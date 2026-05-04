import { api, extraerDatos } from "../../../librerias/api";
import type { RegistroAuditoria } from "../tipos/auditoria.types";

export async function obtenerAuditoria() {
  const respuesta = await api.get<RegistroAuditoria[] | { data: RegistroAuditoria[] }>("/audit");
  return extraerDatos<RegistroAuditoria[]>(respuesta) ?? [];
}
