import { X } from "lucide-react";
import { Boton } from "../../../componentes/comunes/Boton";
import { translateAlarmLevel, translateCommandStatus, translateDataType, translateEventType, translateLockStatus } from "../../../i18n/enums";
import { useI18n } from "../../../i18n/i18nStore";
import { useAppText } from "../../../i18n/text";
import type { AlarmEventItem, DeviceEventItem, PushEventItem } from "../types/events.types";

type EventDetail = Partial<DeviceEventItem & AlarmEventItem & PushEventItem>;

export function EventDetailDrawer({
  item,
  onClose,
  onAlarmStatusChange,
}: {
  item: EventDetail | null;
  onClose: () => void;
  onAlarmStatusChange?: (status: "REVIEWED" | "RESOLVED" | "DISMISSED") => void;
}) {
  const tr = useAppText();
  const language = useI18n((state) => state.language);
  if (!item) return null;
  const isAlarm = Boolean(item.alarmType || item.alarmEvent || item.alarmLevel);

  return (
    <div className="fixed inset-0 z-40 bg-slate-950/30">
      <aside className="ml-auto flex h-full w-full max-w-xl flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{tr("Event detail")}</h2>
            <p className="text-sm text-slate-500">{value(item.deviceId)} · {value(item.eventName ?? item.alarmType ?? item.sendingEventType)}</p>
          </div>
          <button className="rounded-md p-2 text-slate-500 hover:bg-slate-100" onClick={onClose} type="button" aria-label={tr("Close")}><X className="h-5 w-5" /></button>
        </div>
        <div className="flex-1 space-y-5 overflow-y-auto p-5">
          <div className="grid grid-cols-2 gap-3">
            <Field label={tr("Device ID")} value={item.deviceId} />
            <Field label={tr("Device name")} value={item.deviceName} />
            <Field label={tr("Product model")} value={item.productModel} />
            <Field label={tr("GPS Time")} value={formatDate(item.gpsTime)} />
            <Field label={tr("Battery level")} value={typeof item.batteryLevel === "number" ? `${item.batteryLevel}%` : undefined} />
            <Field label={tr("Events")} value={item.eventName ?? item.events} />
            <Field label={tr("Event type")} value={translateEventType(language, item.eventType)} />
            <Field label={tr("Alarm event")} value={item.alarmType ?? item.alarmEvent} />
            <Field label={tr("Alarm level")} value={translateAlarmLevel(language, item.alarmLevel)} />
            <Field label={tr("Lock Status")} value={translateLockStatus(language, item.lockStatus)} />
            <Field label={tr("Data type")} value={translateDataType(language, item.dataType)} />
            <Field label={tr("Source")} value={item.source} />
            <Field label={tr("Latitude")} value={typeof item.latitude === "number" ? item.latitude.toFixed(6) : undefined} />
            <Field label={tr("Longitude")} value={typeof item.longitude === "number" ? item.longitude.toFixed(6) : undefined} />
            <Field label={tr("Status")} value={translateCommandStatus(language, item.status ?? item.handledStatus ?? item.sendingStatus)} />
            <Field label={tr("Created at")} value={formatDate(item.createdAt)} />
          </div>
          <Field label={tr("Description")} value={item.description ?? item.operatingInfo ?? item.sendingContent} wide />
          {item.rawPayload ? (
            <details className="rounded-md border border-slate-200 bg-slate-50 p-3">
              <summary className="cursor-pointer text-sm font-medium text-slate-700">{tr("Raw payload")}</summary>
              <pre className="mt-3 max-h-64 overflow-auto text-xs text-slate-700">{JSON.stringify(item.rawPayload, null, 2)}</pre>
            </details>
          ) : null}
        </div>
        {isAlarm && onAlarmStatusChange ? (
          <div className="flex flex-wrap justify-end gap-2 border-t border-slate-200 p-4">
            <Boton variante="secundario" onClick={() => onAlarmStatusChange("REVIEWED")} type="button">{tr("Mark as reviewed")}</Boton>
            <Boton onClick={() => onAlarmStatusChange("RESOLVED")} type="button">{tr("Mark as resolved")}</Boton>
            <Boton variante="fantasma" onClick={() => onAlarmStatusChange("DISMISSED")} type="button">{tr("Dismiss alarm")}</Boton>
          </div>
        ) : null}
      </aside>
    </div>
  );
}

function Field({ label, value: fieldValue, wide }: { label: string; value?: string | number | null; wide?: boolean }) {
  return (
    <div className={wide ? "" : "min-w-0"}>
      <div className="text-xs font-medium uppercase text-slate-500">{label}</div>
      <div className="mt-1 truncate text-sm text-slate-900" title={value(fieldValue)}>{value(fieldValue)}</div>
    </div>
  );
}

function value(fieldValue?: string | number | null) {
  return fieldValue === null || fieldValue === undefined || fieldValue === "" ? "-" : String(fieldValue);
}

function formatDate(date?: string) {
  return date ? new Date(date).toLocaleString("es-CL") : undefined;
}
