import { useQuery } from "@tanstack/react-query";
import { getAlarmEvents } from "../../services/alarm-events.service";
import type { EventQueryParams } from "../../types/events.types";

export function useAlarmEvents(params: EventQueryParams) {
  return useQuery({ queryKey: ["events", "alarms", params], queryFn: () => getAlarmEvents(params) });
}
