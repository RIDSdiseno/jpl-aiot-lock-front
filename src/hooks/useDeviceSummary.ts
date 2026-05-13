import { useQuery } from "@tanstack/react-query";
import { fetchDeviceSummary } from "../services/device.service";
import type { DeviceFiltersState } from "../types/device.types";

export function useDeviceSummary(filters: DeviceFiltersState) {
  return useQuery({
    queryKey: ["device-module", "summary", filters],
    queryFn: () => fetchDeviceSummary(filters),
  });
}
