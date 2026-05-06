import { useState } from "react";
import { EncabezadoPagina } from "../../componentes/layout/EncabezadoPagina";
import { EstadoCarga } from "../../componentes/comunes/EstadoCarga";
import { AlarmEventsCard } from "./components/AlarmEventsCard";
import { DeviceOperationRatioChart } from "./components/DeviceOperationRatioChart";
import { DeviceTypeSummaryCards } from "./components/DeviceTypeSummaryCards";
import { LockUnlockTrendChart } from "./components/LockUnlockTrendChart";
import { QuickAccessSystems } from "./components/QuickAccessSystems";
import { SystemMessagesCard } from "./components/SystemMessagesCard";
import { useDashboard } from "./hooks/useDashboard";

export function DashboardPage() {
  const [from, setFrom] = useState("2024-01-25");
  const [to, setTo] = useState("2024-01-31");
  const { data, isLoading } = useDashboard(from, to);

  if (isLoading || !data) return <EstadoCarga texto="Cargando Dashboard..." />;

  return (
    <>
      <EncabezadoPagina titulo="Home / Dashboard" descripcion="Resumen operacional de JPL-AIOT-LOCK." />
      <div className="space-y-5">
        <DeviceTypeSummaryCards deviceTypes={data.deviceTypes} />
        <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
          <LockUnlockTrendChart data={data.lockUnlockTrend} from={from} to={to} onFromChange={setFrom} onToChange={setTo} />
          <DeviceOperationRatioChart ratio={data.operationRatio} />
        </div>
        <div className="grid gap-5 xl:grid-cols-[1fr_420px]">
          <AlarmEventsCard events={data.alarmEvents} />
          <SystemMessagesCard messages={data.systemMessages} />
        </div>
        <QuickAccessSystems items={data.quickAccess} />
      </div>
    </>
  );
}
