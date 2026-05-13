import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDeviceParameters, getParameterHistory, getParameterSchema, readDeviceParameters, reserveParameterCommand, updateDeviceParameters } from "../../services/parameter.service";
import type { ParameterUpdateInput } from "../../../../types/parameter.types";

export function useDeviceParameters(deviceId?: string) {
  const queryClient = useQueryClient();
  const queryKey = ["control-parameters", deviceId];
  const parametersQuery = useQuery({
    queryKey,
    queryFn: () => getDeviceParameters(deviceId ?? ""),
    enabled: Boolean(deviceId),
  });
  const schemaQuery = useQuery({
    queryKey: ["control-parameter-schema"],
    queryFn: getParameterSchema,
  });
  const historyQuery = useQuery({
    queryKey: ["control-parameter-history", deviceId],
    queryFn: () => getParameterHistory(deviceId ?? ""),
    enabled: Boolean(deviceId),
  });

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey });
    await queryClient.invalidateQueries({ queryKey: ["control-parameter-history", deviceId] });
  };

  return {
    parametersQuery,
    schemaQuery,
    historyQuery,
    read: useMutation({ mutationFn: () => readDeviceParameters(deviceId ?? ""), onSuccess: invalidate }),
    update: useMutation({ mutationFn: (parameters: ParameterUpdateInput[]) => updateDeviceParameters(deviceId ?? "", parameters), onSuccess: invalidate }),
    reserve: useMutation({ mutationFn: () => reserveParameterCommand(deviceId ?? "") }),
  };
}
