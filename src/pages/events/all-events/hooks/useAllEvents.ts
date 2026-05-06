import { useQuery } from "@tanstack/react-query";
import { getAllEvents } from "../../services/all-events.service";
import type { EventQueryParams } from "../../types/events.types";

export function useAllEvents(params: EventQueryParams) {
  return useQuery({ queryKey: ["events", "all", params], queryFn: () => getAllEvents(params) });
}
