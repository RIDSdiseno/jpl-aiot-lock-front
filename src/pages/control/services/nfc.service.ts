import { api, extraerDatos } from "../../../librerias/api";
import type { ApiEnvelope, DeviceCommandRecord, NfcCardItem } from "../types/control.types";

export async function getNfcCards(deviceId: string) {
  const response = await api.get<ApiEnvelope<{ blockNumber: string; cards: NfcCardItem[] }>>(`/control/devices/${deviceId}/nfc`);
  return extraerDatos<{ blockNumber: string; cards: NfcCardItem[] }>(response);
}

export async function readNfcCards(deviceId: string) {
  const response = await api.post<ApiEnvelope<{ blockNumber: string; cards: NfcCardItem[] }>>(`/control/devices/${deviceId}/nfc/read`);
  return extraerDatos<{ blockNumber: string; cards: NfcCardItem[] }>(response);
}

export async function addNfcCard(deviceId: string, cardNumber: string, blockNumber: string) {
  const response = await api.post<ApiEnvelope<NfcCardItem>>(`/control/devices/${deviceId}/nfc/cards`, { cardNumber, blockNumber });
  return extraerDatos<NfcCardItem>(response);
}

export async function syncNfcCards(deviceId: string) {
  const response = await api.post<ApiEnvelope<{ syncedAt: string; cards: NfcCardItem[] }>>(`/control/devices/${deviceId}/nfc/sync`);
  return extraerDatos<{ syncedAt: string; cards: NfcCardItem[] }>(response);
}

export async function clearNfcCards(deviceId: string) {
  const response = await api.delete<ApiEnvelope<{ cleared: boolean }>>(`/control/devices/${deviceId}/nfc/clear`);
  return extraerDatos<{ cleared: boolean }>(response);
}

export async function reserveNfcCommand(deviceId: string) {
  const response = await api.post<ApiEnvelope<DeviceCommandRecord>>(`/control/devices/${deviceId}/nfc/reserve-command`);
  return extraerDatos<DeviceCommandRecord>(response);
}
