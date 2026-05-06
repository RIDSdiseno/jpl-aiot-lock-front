import { api, extraerDatos } from "../../../librerias/api";
import type { ApiEnvelope, ControlCompanyGroup, ControlStatusFilter } from "../types/control.types";

export async function getControlDevices(params: { status: ControlStatusFilter; type: string; search: string }) {
  const response = await api.get<ApiEnvelope<ControlCompanyGroup[]>>("/control/devices", { params });
  return extraerDatos<ControlCompanyGroup[]>(response);
}
