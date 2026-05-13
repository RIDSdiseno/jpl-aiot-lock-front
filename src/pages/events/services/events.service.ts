import { api, extraerDatos } from "../../../librerias/api";
import type { EventOptions, EventQueryParams, PaginatedResponse } from "../types/events.types";

export async function getEventPage<T>(url: string, params: EventQueryParams) {
  const normalizedParams = normalizeParams(params);
  const response = await api.get<unknown>(url, { params: normalizedParams });
  return normalizePage<T>(response.data);
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

export async function getEventOptions() {
  const response = await api.get<{ ok: boolean; data: EventOptions }>("/events/options");
  return extraerDatos<EventOptions>(response);
}

export async function getEventDetail<T>(eventId: string) {
  const response = await api.get<{ ok: boolean; data: T | null }>(`/events/${eventId}`);
  return extraerDatos<T | null>(response);
}

export async function updateAlarmEventStatus(alarmId: string, status: "REVIEWED" | "RESOLVED" | "DISMISSED") {
  const response = await api.patch(`/events/alarms/${alarmId}/status`, { status });
  return response.data;
}

function normalizeParams(params: EventQueryParams) {
  const startDate = params.startDate ?? params.gpsTimeFrom ?? params.sendTimeFrom;
  const endDate = params.endDate ?? params.gpsTimeTo ?? params.sendTimeTo;
  return {
    ...params,
    startDate,
    endDate,
    limit: params.limit ?? params.pageSize,
    alarmType: params.alarmType ?? params.alarmEvent,
  };
}

function normalizePage<T>(payload: unknown): PaginatedResponse<T> {
  const body = payload as {
    data?: T[] | PaginatedResponse<T>;
    pagination?: { page: number; limit: number; total: number; totalPages: number };
    items?: T[];
    total?: number;
    page?: number;
    pageSize?: number;
  };
  if (Array.isArray(body.data) && body.pagination) {
    return {
      items: body.data,
      total: body.pagination.total,
      page: body.pagination.page,
      pageSize: body.pagination.limit,
    };
  }
  if (body.data && !Array.isArray(body.data)) return body.data;
  return {
    items: body.items ?? [],
    total: body.total ?? 0,
    page: body.page ?? 1,
    pageSize: body.pageSize ?? 20,
  };
}
