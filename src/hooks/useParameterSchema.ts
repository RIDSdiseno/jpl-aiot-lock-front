import { useQuery } from "@tanstack/react-query";
import { getParameterSchema } from "../services/parameter.service";

export function useParameterSchema() {
  return useQuery({
    queryKey: ["control-parameter-schema"],
    queryFn: getParameterSchema,
  });
}
