import { useQuery } from "@tanstack/react-query";
import { getPushEvents } from "../../services/push-events.service";
import type { EventQueryParams } from "../../types/events.types";

export function usePushEvents(params: EventQueryParams) {
  return useQuery({ queryKey: ["events", "push", params], queryFn: () => getPushEvents(params) });
}
