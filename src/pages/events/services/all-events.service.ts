import type { DeviceEventItem, EventQueryParams } from "../types/events.types";
import { exportEventCsv, getEventPage } from "./events.service";

export function getAllEvents(params: EventQueryParams) {
  return getEventPage<DeviceEventItem>("/events/all", params);
}

export function exportAllEvents(params: EventQueryParams) {
  return exportEventCsv("/events/all/export", params, "all-events.csv");
}
