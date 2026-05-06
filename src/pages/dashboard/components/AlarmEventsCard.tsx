import type { DashboardAlarmEvent } from "../types/dashboard.types";

export function AlarmEventsCard({ events }: { events: DashboardAlarmEvent[] }) {
  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-slate-900">Alarm Events</h2>
      <div className="mt-3 overflow-hidden rounded border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2">Device ID</th>
              <th className="px-3 py-2">Fecha/Hora</th>
              <th className="px-3 py-2">Tipo</th>
              <th className="px-3 py-2">Descripcion</th>
              <th className="px-3 py-2">Severidad</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {events.length === 0 ? (
              <tr>
                <td className="px-3 py-6 text-center text-slate-500" colSpan={5}>No data</td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event.id}>
                  <td className="px-3 py-2 font-medium text-slate-900">{event.deviceId}</td>
                  <td className="px-3 py-2 text-slate-600">{new Date(event.occurredAt).toLocaleString()}</td>
                  <td className="px-3 py-2 text-slate-600">{event.alarmType}</td>
                  <td className="px-3 py-2 text-slate-600">{event.description}</td>
                  <td className="px-3 py-2 text-slate-600">{event.severity ?? "N/A"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
