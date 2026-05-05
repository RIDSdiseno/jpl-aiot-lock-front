import { useQuery } from "@tanstack/react-query";
import { getDeviceStatus } from "../services/monitoring.service";

export function useDeviceStatus(deviceId?: string) {
  return useQuery({
    queryKey: ["monitoring", "device-status", deviceId],
    queryFn: () => getDeviceStatus(deviceId ?? ""),
    enabled: Boolean(deviceId),
    refetchInterval: 15000,
  });
}
