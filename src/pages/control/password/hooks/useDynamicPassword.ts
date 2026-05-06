import { useQuery } from "@tanstack/react-query";
import { getDynamicPassword } from "../../services/password.service";

export function useDynamicPassword(deviceId?: string) {
  return useQuery({
    queryKey: ["control-dynamic-password", deviceId],
    queryFn: () => getDynamicPassword(deviceId ?? ""),
    enabled: Boolean(deviceId),
  });
}
