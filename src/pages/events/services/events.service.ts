import { api, extraerDatos } from "../../../librerias/api";
import type { EventQueryParams, PaginatedResponse } from "../types/events.types";

export async function getEventPage<T>(url: string, params: EventQueryParams) {
  const response = await api.get<PaginatedResponse<T> | { data: PaginatedResponse<T> }>(url, { params });
  return extraerDatos<PaginatedResponse<T>>(response);
}

export async function exportEventCsv(url: string, params: EventQueryParams, filename: string) {
  const response = await api.get<Blob>(url, { params, responseType: "blob" });
  const blobUrl = URL.createObjectURL(response.data);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(blobUrl);
}
