import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EstadoCarga } from "../../../componentes/comunes/EstadoCarga";
import { EstadoVacio } from "../../../componentes/comunes/EstadoVacio";
import { Tarjeta } from "../../../componentes/comunes/Tarjeta";
import { EncabezadoPagina } from "../../../componentes/layout/EncabezadoPagina";
import { formatearFecha } from "../../../librerias/fechas";
import { obtenerEstrategiaAlarma } from "../servicios/dispositivos.service";
import { useDetalleDispositivo } from "../hooks/useDetalleDispositivo";

const tabs = ["Basic info", "Device data", "NFC Function", "Alarm Strategy", "Dynamic password", "Parameter"] as const;

type AlarmPolicy = {
  id: string;
  pushSmsEnabled: boolean;
  pushEmailEnabled: boolean;
  sendingEventTypes: string;
  receivePhones?: string | null;
  receiveEmails?: string | null;
  enabled: boolean;
  remarks?: string | null;
  createdAt: string;
};

function InfoGrid({ rows }: { rows: Array<[string, string | number | null | undefined]> }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {rows.map(([label, value]) => (
        <div key={label} className="rounded-md border border-slate-200 bg-white px-4 py-3">
          <div className="text-xs font-semibold uppercase text-slate-500">{label}</div>
          <div className="mt-1 text-sm font-medium text-slate-900">{value ?? "-"}</div>
        </div>
      ))}
    </div>
  );
}

export function PaginaDetalleDispositivo() {
  const { dispositivoId } = useParams();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Basic info");
  const { data: dispositivo, isLoading } = useDetalleDispositivo(dispositivoId);
  const alarmQuery = useQuery({
    queryKey: ["devices", dispositivoId, "alarm-strategy"],
    queryFn: () => obtenerEstrategiaAlarma(dispositivoId ?? "") as Promise<AlarmPolicy[]>,
    enabled: Boolean(dispositivoId),
  });

  if (isLoading) return <EstadoCarga />;
  if (!dispositivo) return <EstadoVacio titulo="Device not found" />;

  const deviceId = dispositivo.deviceId ?? dispositivo.internalCode;
  const controlLinks = (
    <div className="grid gap-3 md:grid-cols-3">
      <Link className="rounded-md border border-slate-200 bg-white p-4 text-sm font-semibold text-blue-700 hover:bg-blue-50" to={`/app/control/nfc?deviceId=${deviceId}`}>NFC Function</Link>
      <Link className="rounded-md border border-slate-200 bg-white p-4 text-sm font-semibold text-blue-700 hover:bg-blue-50" to={`/app/control/password?deviceId=${deviceId}`}>Dynamic password</Link>
      <Link className="rounded-md border border-slate-200 bg-white p-4 text-sm font-semibold text-blue-700 hover:bg-blue-50" to={`/app/control/parameter?deviceId=${deviceId}`}>Parameter</Link>
    </div>
  );

  return (
    <>
      <EncabezadoPagina titulo={dispositivo.deviceName ?? dispositivo.name} descripcion={`Device ID: ${deviceId}`} />
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 border-b border-slate-200">
          {tabs.map((item) => (
            <button key={item} className={`border-b-2 px-3 py-2 text-sm font-semibold ${tab === item ? "border-blue-600 text-blue-700" : "border-transparent text-slate-500"}`} onClick={() => setTab(item)}>
              {item}
            </button>
          ))}
        </div>

        {tab === "Basic info" ? (
          <InfoGrid rows={[
            ["Device ID", deviceId],
            ["Device name", dispositivo.deviceName ?? dispositivo.name],
            ["Device type", dispositivo.deviceType ?? dispositivo.type],
            ["Product model", dispositivo.productModel],
            ["Affiliated company", dispositivo.affiliatedCompany],
            ["Status", dispositivo.onlineStatus ?? dispositivo.connectionStatus],
            ["Firmware version", dispositivo.firmwareVersion],
            ["Hardware version", dispositivo.hardwareVersion],
            ["IMEI", dispositivo.imei],
            ["Serial number", dispositivo.serialNumber],
            ["SIM", dispositivo.simNumber],
            ["ICCID", dispositivo.iccid],
            ["Bluetooth name", dispositivo.bluetoothName],
            ["Battery", dispositivo.batteryLevel],
            ["Signal", dispositivo.signalStrength ?? dispositivo.signalLevel],
            ["Last online time", formatearFecha(dispositivo.lastConnectionAt)],
            ["Last location", dispositivo.latitude && dispositivo.longitude ? `${dispositivo.latitude}, ${dispositivo.longitude}` : dispositivo.lastAddress],
            ["Created at", formatearFecha(dispositivo.createdAt)],
          ]} />
        ) : null}

        {tab === "Device data" ? (
          <InfoGrid rows={[
            ["Last telemetry", formatearFecha(dispositivo.lastConnectionAt)],
            ["Longitude", dispositivo.longitude],
            ["Latitude", dispositivo.latitude],
            ["Lock status", dispositivo.lockStatus],
            ["Shackle status", dispositivo.shackleStatus],
            ["Battery", dispositivo.batteryLevel],
            ["Signal", dispositivo.signalStrength ?? dispositivo.signalLevel],
            ["Address", dispositivo.lastAddress],
          ]} />
        ) : null}

        {tab === "NFC Function" || tab === "Dynamic password" || tab === "Parameter" ? controlLinks : null}

        {tab === "Alarm Strategy" ? (
          <Tarjeta>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">Alarm Strategy</h2>
              <Link className="text-sm font-semibold text-blue-700" to="/app/devices">Set alarm policy</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
                  <tr>{["Push type", "Sending event type", "Send to", "Sending status", "Sending content", "Sending time"].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(alarmQuery.data ?? []).map((policy) => (
                    <tr key={policy.id}>
                      <td className="px-4 py-3">{[policy.pushSmsEnabled ? "Mobile SMS" : "", policy.pushEmailEnabled ? "E-mail" : ""].filter(Boolean).join(", ")}</td>
                      <td className="px-4 py-3">{policy.sendingEventTypes}</td>
                      <td className="px-4 py-3">{[policy.receivePhones, policy.receiveEmails].filter(Boolean).join(" / ")}</td>
                      <td className="px-4 py-3">{policy.enabled ? "Enabled" : "Disabled"}</td>
                      <td className="px-4 py-3">{policy.remarks ?? "Alarm push policy"}</td>
                      <td className="px-4 py-3">{formatearFecha(policy.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tarjeta>
        ) : null}
      </div>
    </>
  );
}
