import type { AlarmEventItem, EventQueryParams } from "../types/events.types";
import { exportEventCsv, getEventPage } from "./events.service";

export function getAlarmEvents(params: EventQueryParams) {
  return getEventPage<AlarmEventItem>("/events/alarms", params);
}

export function exportAlarmEvents(params: EventQueryParams) {
  return exportEventCsv("/events/alarms/export", params, "alarm-events.csv");
}
