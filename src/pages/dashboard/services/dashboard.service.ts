import { api, extraerDatos } from "../../../librerias/api";
import type { DashboardSummary } from "../types/dashboard.types";

const emptySummary: DashboardSummary = {
  deviceTypes: {
    smartLock: 0,
    smartSensor: 0,
    gpsTracker: 0,
    eSeal: 0,
    smartGateway: 0,
    smartBox: 0,
  },
  operationRatio: {
    total: 0,
    online: 0,
    offline: 0,
    alarm: 0,
  },
  systemMessages: [],
  alarmEvents: [],
  lockUnlockTrend: [],
  quickAccess: [],
};

export async function getDashboardSummary(from?: string, to?: string) {
  const response = await api.get<DashboardSummary | { ok: boolean; data: DashboardSummary }>("/dashboard/summary", {
    params: { from, to },
  });
  return { ...emptySummary, ...extraerDatos<DashboardSummary>(response) };
}
