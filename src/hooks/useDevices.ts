import { useQuery } from "@tanstack/react-query";
import { fetchDevices } from "../services/device.service";
import type { DeviceFiltersState } from "../types/device.types";

export function useDevices(filters: DeviceFiltersState) {
  return useQuery({
    queryKey: ["device-module", "list", filters],
    queryFn: () => fetchDevices(filters),
  });
}
