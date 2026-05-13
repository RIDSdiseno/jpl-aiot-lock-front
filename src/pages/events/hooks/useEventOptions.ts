import { useQuery } from "@tanstack/react-query";
import { getEventOptions } from "../services/events.service";

export function useEventOptions() {
  return useQuery({ queryKey: ["events", "options"], queryFn: getEventOptions, staleTime: 10 * 60 * 1000 });
}
