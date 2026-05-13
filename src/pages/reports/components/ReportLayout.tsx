import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { EncabezadoPagina } from "../../../componentes/layout/EncabezadoPagina";
import { MigasPan } from "../../../componentes/layout/MigasPan";
import { useAppText } from "../../../i18n/text";

export function ReportLayout({ title, children }: { title: string; children: ReactNode }) {
  const tr = useAppText();
  const tabs = [
    { label: tr("APP Seal&Unseal report"), to: "/app/reports/app-seal-unseal" },
    { label: tr("Lock&Unlock"), to: "/app/reports/lock-unlock" },
    { label: tr("Fence Seal&Unseal"), to: "/app/reports/fence-seal-unseal" },
    { label: tr("Fence Record"), to: "/app/reports/fence-record" },
    { label: tr("User Log"), to: "/app/reports/user-log" },
  ];
  return (
    <div>
      <MigasPan items={[tr("Home Page"), tr("Report"), tr(title)]} />
      <EncabezadoPagina titulo={tr(title)} descripcion={tr("Historical lock operation audit and export.")} />
      <div className="mb-4 flex flex-wrap gap-2 border-b border-slate-700/60">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `rounded-t-md px-3 py-2 text-sm font-medium ${isActive ? "bg-white text-slate-900" : "text-slate-400 hover:bg-white/5 hover:text-slate-100"}`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
      {children}
    </div>
  );
}
