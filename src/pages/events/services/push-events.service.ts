import type { EventQueryParams, PushEventItem } from "../types/events.types";
import { exportEventCsv, getEventPage } from "./events.service";

export function getPushEvents(params: EventQueryParams) {
  return getEventPage<PushEventItem>("/events/push", params);
}

export function exportPushEvents(params: EventQueryParams) {
  return exportEventCsv("/events/push/export", params, "push-events.csv");
}
