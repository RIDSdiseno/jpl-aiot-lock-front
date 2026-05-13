import { api, extraerDatos } from "../librerias/api";
import type { LockUnlockReportFilters, LockUnlockReportItem, ReportListResponse, ReportOptions } from "../types/report.types";

export async function getReportOptions() {
  const response = await api.get<{ ok: boolean; data: ReportOptions }>("/reports/options");
  return extraerDatos<ReportOptions>(response);
}

export async function getLockUnlockReport(filters: LockUnlockReportFilters) {
  const response = await api.get<ReportListResponse<LockUnlockReportItem>>("/reports/lock-unlock", {
    params: cleanParams(filters),
  });
  return response.data;
}

export async function getLockUnlockReportDetail(id: string) {
  const response = await api.get<{ ok: boolean; data: LockUnlockReportItem | null }>(`/reports/lock-unlock/${id}`);
  return extraerDatos<LockUnlockReportItem | null>(response);
}

export async function exportLockUnlockReport(filters: LockUnlockReportFilters) {
  const response = await api.get<Blob>("/reports/lock-unlock/export", {
    params: cleanParams(filters),
    responseType: "blob",
  });
  const url = URL.createObjectURL(response.data);
  const link = document.createElement("a");
  link.href = url;
  link.download = "lock-unlock-report.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function cleanParams(filters: LockUnlockReportFilters) {
  return Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== undefined && value !== null && value !== ""),
  );
}
