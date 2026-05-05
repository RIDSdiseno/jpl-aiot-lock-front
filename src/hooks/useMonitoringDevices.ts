import { useQuery } from "@tanstack/react-query";
import { getMonitoringDevices } from "../services/monitoring.service";
import type { MonitoringStatusFilter } from "../types/monitoring.types";

export function useMonitoringDevices(status: MonitoringStatusFilter, search: string) {
  return useQuery({
    queryKey: ["monitoring", "devices", status, search],
    queryFn: () => getMonitoringDevices(status, search),
  });
}
