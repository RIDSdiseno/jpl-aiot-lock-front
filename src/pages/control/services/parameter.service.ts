import { api, extraerDatos } from "../../../librerias/api";
import type { ApiEnvelope, DeviceCommandRecord, DeviceParameterField } from "../types/control.types";
import type { ParameterHistoryResponse, ParameterLatestResponse, ParameterReadResponse, ParameterSchemaResponse, ParameterUpdateInput, ParameterUpdateResponse } from "../../../types/parameter.types";

function flatten(parameters: Record<string, DeviceParameterField[]>) {
  return Object.values(parameters).flat();
}

export async function getParameterSchema() {
  const response = await api.get<ApiEnvelope<ParameterSchemaResponse>>("/control/parameters/schema");
  return extraerDatos<ParameterSchemaResponse>(response);
}

export async function getDeviceParameters(deviceId: string) {
  const response = await api.get<ApiEnvelope<ParameterLatestResponse>>(`/control/parameters/devices/${deviceId}/latest`);
  const data = extraerDatos<ParameterLatestResponse>(response);
  return {
    deviceId: data.deviceId,
    readTime: data.readAt,
    fields: flatten(data.parameters),
    parameters: data.parameters,
    lastSnapshot: data.lastSnapshot,
  };
}

export async function readDeviceParameters(deviceId: string) {
  try {
    const response = await api.post<ApiEnvelope<ParameterReadResponse>>(`/control/parameters/devices/${deviceId}/read`);
    const data = extraerDatos<ParameterReadResponse>(response);
    const parameters = data.data?.parameters ?? (data.fields ? { all: data.fields } : {});
    return {
      ...data,
      readTime: data.data?.readAt ?? data.readTime,
      fields: data.fields ?? flatten(parameters),
      parameters,
    };
  } catch (error: any) {
    if (error.response?.data?.status === "OFFLINE") return error.response.data as ParameterReadResponse;
    throw error;
  }
}

export async function updateDeviceParameters(deviceId: string, parameters: ParameterUpdateInput[]) {
  try {
    const response = await api.patch<ApiEnvelope<ParameterUpdateResponse>>(`/control/parameters/devices/${deviceId}/update`, { parameters });
    return extraerDatos<ParameterUpdateResponse>(response);
  } catch (error: any) {
    if (error.response?.data?.status === "OFFLINE") return error.response.data as ParameterUpdateResponse;
    throw error;
  }
}

export async function getParameterHistory(deviceId: string) {
  const response = await api.get<ApiEnvelope<ParameterHistoryResponse>>(`/control/parameters/devices/${deviceId}/history`);
  return extraerDatos<ParameterHistoryResponse>(response);
}

export async function reserveParameterCommand(deviceId: string) {
  const response = await api.post<ApiEnvelope<DeviceCommandRecord>>(`/control/parameters/devices/${deviceId}/reserve`);
  return extraerDatos<DeviceCommandRecord>(response);
}
