import { useQuery } from "@tanstack/react-query";
import { getDeviceTrajectory } from "../services/monitoring.service";
import type { MonitoringTrajectoryPoint } from "../types/monitoring.types";

export function useDeviceTrajectory(deviceId?: string, enabled = false) {
  return useQuery<MonitoringTrajectoryPoint[]>({
    queryKey: ["monitoring", "trajectory", deviceId],
    queryFn: () => getDeviceTrajectory(deviceId ?? ""),
    enabled: Boolean(deviceId) && enabled,
  });
}
