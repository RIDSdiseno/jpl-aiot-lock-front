import { api, extraerDatos } from "../../../librerias/api";
import type { ApiEnvelope, DeviceCommandRecord } from "../types/control.types";

export interface CommandRecordFilters {
  deviceId?: string;
  deviceName?: string;
  content?: string;
  type?: string;
  status?: string;
  operator?: string;
  startDate?: string;
  endDate?: string;
}

export async function getCommandRecords(params: CommandRecordFilters) {
  const response = await api.get<ApiEnvelope<DeviceCommandRecord[]>>("/control/commands", { params });
  return extraerDatos<DeviceCommandRecord[]>(response);
}

export async function cancelCommandRecord(commandId: string) {
  const response = await api.post<ApiEnvelope<DeviceCommandRecord>>(`/control/commands/${commandId}/cancel`);
  return extraerDatos<DeviceCommandRecord>(response);
}

export async function resendCommandRecord(commandId: string) {
  const response = await api.post<ApiEnvelope<DeviceCommandRecord>>(`/control/commands/${commandId}/resend`);
  return extraerDatos<DeviceCommandRecord>(response);
}

export async function deleteCommandRecord(commandId: string) {
  const response = await api.delete<ApiEnvelope<{ deleted: boolean }>>(`/control/commands/${commandId}`);
  return extraerDatos<{ deleted: boolean }>(response);
}
