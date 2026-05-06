import type { DashboardAlarmEvent } from "../types/dashboard.types";
import { useI18n } from "../../../i18n/i18nStore";
import type { SeveritySection } from "../../../i18n/translations";

function translateSeverity(severity: string | null | undefined, severityMap: SeveritySection): string {
  if (!severity) return "N/A";
  const key = severity.toUpperCase() as keyof SeveritySection;
  return severityMap[key] ?? severity;
}

export function AlarmEventsCard({ events }: { events: DashboardAlarmEvent[] }) {
  const { t } = useI18n();
  const ae = t.dashboard.alarmEvents;

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-slate-900">{ae.title}</h2>
      <div className="mt-3 overflow-hidden rounded border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2">{ae.deviceId}</th>
              <th className="px-3 py-2">{ae.dateTime}</th>
              <th className="px-3 py-2">{ae.type}</th>
              <th className="px-3 py-2">{ae.description}</th>
              <th className="px-3 py-2">{ae.severity}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {events.length === 0 ? (
              <tr>
                <td className="px-3 py-6 text-center text-slate-500" colSpan={5}>
                  {ae.noData}
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event.id}>
                  <td className="px-3 py-2 font-medium text-slate-900">{event.deviceId}</td>
                  <td className="px-3 py-2 text-slate-600">
                    {new Date(event.occurredAt).toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-slate-600">{event.alarmType}</td>
                  <td className="px-3 py-2 text-slate-600">{event.description}</td>
                  <td className="px-3 py-2 text-slate-600">
                    {translateSeverity(event.severity, t.severity)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
