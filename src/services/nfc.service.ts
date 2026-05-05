import { api } from "../librerias/api";
import type { NfcCard } from "../types/monitoring.types";

export function getNfcCards(deviceId: string) {
  return api.get<{ ok: boolean; cards: NfcCard[] }>(`/monitoring/devices/${deviceId}/nfc-cards`).then((response) => response.data.cards);
}

export function readNfcCards(deviceId: string) {
  return api.post<{ ok: boolean; cards: NfcCard[] }>(`/monitoring/devices/${deviceId}/nfc-cards/read`).then((response) => response.data.cards);
}

export function addNfcCard(deviceId: string, card: Partial<NfcCard>) {
  return api.post<{ ok: boolean; card: NfcCard }>(`/monitoring/devices/${deviceId}/nfc-cards`, card).then((response) => response.data.card);
}

export function syncNfcCards(deviceId: string) {
  return api.post<{ ok: boolean; cards: NfcCard[] }>(`/monitoring/devices/${deviceId}/nfc-cards/sync`).then((response) => response.data.cards);
}

export function deleteNfcCards(deviceId: string, cardIds: string[]) {
  return api
    .delete<{ ok: boolean; cards: NfcCard[] }>(`/monitoring/devices/${deviceId}/nfc-cards`, { data: { cardIds } })
    .then((response) => response.data.cards);
}
