import { useQuery } from "@tanstack/react-query";
import { fetchDeviceOptions } from "../services/device.service";

export function useDeviceOptions() {
  return useQuery({
    queryKey: ["device-module", "options"],
    queryFn: fetchDeviceOptions,
    staleTime: 5 * 60 * 1000,
  });
}
