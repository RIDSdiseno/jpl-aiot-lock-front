import { api, extraerDatos } from "../../../librerias/api";
import type { ApiEnvelope, DeviceCommandRecord, DeviceParameterField } from "../types/control.types";

export async function getDeviceParameters(deviceId: string) {
  const response = await api.get<ApiEnvelope<{ deviceId: string; readTime: string | null; fields: DeviceParameterField[] }>>(
    `/control/devices/${deviceId}/parameters`,
  );
  return extraerDatos<{ deviceId: string; readTime: string | null; fields: DeviceParameterField[] }>(response);
}

export async function readDeviceParameters(deviceId: string) {
  const response = await api.post<ApiEnvelope<{ deviceId: string; readTime: string; fields: DeviceParameterField[] }>>(
    `/control/devices/${deviceId}/parameters/read`,
  );
  return extraerDatos<{ deviceId: string; readTime: string; fields: DeviceParameterField[] }>(response);
}

export async function updateDeviceParameters(deviceId: string, fields: DeviceParameterField[]) {
  const response = await api.patch<ApiEnvelope<{ deviceId: string; updated: boolean; fields: DeviceParameterField[] }>>(
    `/control/devices/${deviceId}/parameters`,
    { fields },
  );
  return extraerDatos<{ deviceId: string; updated: boolean; fields: DeviceParameterField[] }>(response);
}

export async function reserveParameterCommand(deviceId: string) {
  const response = await api.post<ApiEnvelope<DeviceCommandRecord>>(`/control/devices/${deviceId}/parameters/reserve-command`);
  return extraerDatos<DeviceCommandRecord>(response);
}
