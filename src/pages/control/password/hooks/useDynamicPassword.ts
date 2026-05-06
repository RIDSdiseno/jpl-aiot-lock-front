import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDynamicPassword, updateDynamicPassword } from "../../services/password.service";

export function useDynamicPassword(deviceId?: string) {
  const queryClient = useQueryClient();
  const queryKey = ["control-dynamic-password", deviceId];
  const passwordQuery = useQuery({
    queryKey,
    queryFn: () => getDynamicPassword(deviceId ?? ""),
    enabled: Boolean(deviceId),
  });
  const update = useMutation({
    mutationFn: () => updateDynamicPassword(deviceId ?? ""),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });
  return { ...passwordQuery, update };
}
