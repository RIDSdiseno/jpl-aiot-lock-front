import { Box, Cpu, LockKeyhole, Radio, Router, Satellite } from "lucide-react";
import type { DashboardDeviceTypes } from "../types/dashboard.types";

const cards = [
  { key: "smartLock", label: "Smart Lock", icon: LockKeyhole },
  { key: "smartSensor", label: "Smart Sensor", icon: Radio },
  { key: "gpsTracker", label: "GPS Tracker", icon: Satellite },
  { key: "eSeal", label: "E-Seal", icon: Cpu },
  { key: "smartGateway", label: "Smart Gateway", icon: Router },
  { key: "smartBox", label: "Smart Box", icon: Box },
] as const;

export function DeviceTypeSummaryCards({ deviceTypes }: { deviceTypes: DashboardDeviceTypes }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
      {cards.map((card) => (
        <div key={card.key} className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase text-slate-500">{card.label}</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{deviceTypes[card.key]}</p>
            </div>
            <card.icon className="h-5 w-5 text-blue-600" />
          </div>
        </div>
      ))}
    </div>
  );
}
