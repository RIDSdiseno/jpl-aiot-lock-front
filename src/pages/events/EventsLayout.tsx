import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { MigasPan } from "../../componentes/layout/MigasPan";
import { useAppText } from "../../i18n/text";

export function EventsLayout({ section, children }: { section: string; children: ReactNode }) {
  const tr = useAppText();
  const tabs = [
    { label: tr("All Events"), to: "/app/event/all-events" },
    { label: tr("Alarm Event"), to: "/app/event/alarm-event" },
    { label: tr("Push Event"), to: "/app/event/push-event" },
  ];
  return (
    <div>
      <div className="mb-4">
        <MigasPan items={[tr("Home Page"), tr("Event"), section]} />
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">{tr("Event")}</h1>
      </div>
      <div className="mb-5 flex flex-wrap gap-2 border-b border-slate-200">
        {tabs.map((tab) => (
          <NavLink
            className={({ isActive }) =>
              `border-b-2 px-3 py-2 text-sm font-medium ${isActive ? "border-blue-600 text-blue-700" : "border-transparent text-slate-500 hover:text-slate-900"}`
            }
            key={tab.to}
            to={tab.to}
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
      {children}
    </div>
  );
}
