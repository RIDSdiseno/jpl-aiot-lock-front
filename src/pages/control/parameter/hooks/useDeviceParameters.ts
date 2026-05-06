import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDeviceParameters, readDeviceParameters, reserveParameterCommand, updateDeviceParameters } from "../../services/parameter.service";
import type { DeviceParameterField } from "../../types/control.types";

export function useDeviceParameters(deviceId?: string) {
  const queryClient = useQueryClient();
  const queryKey = ["control-parameters", deviceId];
  const parametersQuery = useQuery({
    queryKey,
    queryFn: () => getDeviceParameters(deviceId ?? ""),
    enabled: Boolean(deviceId),
  });

  const invalidate = async () => queryClient.invalidateQueries({ queryKey });

  return {
    parametersQuery,
    read: useMutation({ mutationFn: () => readDeviceParameters(deviceId ?? ""), onSuccess: invalidate }),
    update: useMutation({ mutationFn: (fields: DeviceParameterField[]) => updateDeviceParameters(deviceId ?? "", fields), onSuccess: invalidate }),
    reserve: useMutation({ mutationFn: () => reserveParameterCommand(deviceId ?? "") }),
  };
}
