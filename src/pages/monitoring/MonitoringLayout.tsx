import type { ReactNode } from "react";

export function MonitoringLayout({ sidebar, map }: { sidebar: ReactNode; map: ReactNode }) {
  return (
    <div className="flex h-[calc(100vh-7.5rem)] min-h-[640px] flex-col overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
      <header className="border-b border-slate-200 px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">JPL-AIOT-LOCK</p>
        <h1 className="text-xl font-semibold text-slate-950">Monitoring</h1>
      </header>
      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[340px_minmax(0,1fr)]">
        {sidebar}
        <main className="min-h-0">{map}</main>
      </div>
    </div>
  );
}
