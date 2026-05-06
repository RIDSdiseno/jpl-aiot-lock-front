import { Box, Cpu, LockKeyhole, Radio, Router, Satellite } from "lucide-react";
import type { DashboardDeviceTypes } from "../types/dashboard.types";
import { useI18n } from "../../../i18n/i18nStore";

const cardKeys = [
  { key: "smartLock", icon: LockKeyhole },
  { key: "smartSensor", icon: Radio },
  { key: "gpsTracker", icon: Satellite },
  { key: "eSeal", icon: Cpu },
  { key: "smartGateway", icon: Router },
  { key: "smartBox", icon: Box },
] as const;

export function DeviceTypeSummaryCards({ deviceTypes }: { deviceTypes: DashboardDeviceTypes }) {
  const { t } = useI18n();
  const dt = t.dashboard.deviceTypes;

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
      {cardKeys.map(({ key, icon: Icon }) => (
        <div key={key} className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase text-slate-500">{dt[key]}</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{deviceTypes[key]}</p>
            </div>
            <Icon className="h-5 w-5 text-blue-600" />
          </div>
        </div>
      ))}
    </div>
  );
}
