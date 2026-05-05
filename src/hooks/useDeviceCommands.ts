import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  sendAdvanceCommand,
  sendSealCommand,
  sendUnsealCommand,
  updateDeviceParameters,
} from "../services/deviceCommands.service";
import type { DeviceParameters } from "../types/monitoring.types";

export function useDeviceCommands(deviceId?: string) {
  const queryClient = useQueryClient();
  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: ["monitoring"] });
  };

  return {
    seal: useMutation({
      mutationFn: () => sendSealCommand(deviceId ?? ""),
      onSuccess: invalidate,
    }),
    unseal: useMutation({
      mutationFn: () => sendUnsealCommand(deviceId ?? ""),
      onSuccess: invalidate,
    }),
    advance: useMutation({
      mutationFn: (payload: Record<string, unknown>) => sendAdvanceCommand(deviceId ?? "", payload),
      onSuccess: invalidate,
    }),
    updateParameters: useMutation({
      mutationFn: (parameters: Partial<DeviceParameters>) => updateDeviceParameters(deviceId ?? "", parameters),
      onSuccess: invalidate,
    }),
  };
}
