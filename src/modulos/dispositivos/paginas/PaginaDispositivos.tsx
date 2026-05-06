import { Download, FileUp, Pencil, Plus, RefreshCw, ShieldCheck, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Boton } from "../../../componentes/comunes/Boton";
import { Modal } from "../../../componentes/comunes/Modal";
import { EstadoCarga } from "../../../componentes/comunes/EstadoCarga";
import { EncabezadoPagina } from "../../../componentes/layout/EncabezadoPagina";
import { formatearFecha } from "../../../librerias/fechas";
import { useI18n } from "../../../i18n/i18nStore";
import { obtenerEmpresas } from "../../empresas/servicios/empresas.service";
import type { Empresa } from "../../empresas/tipos/empresa.types";
import { useDispositivos, useResumenDispositivos } from "../hooks/useDispositivos";
import {
  asignarEmpresaPorLote,
  crearDispositivo,
  crearDispositivosPorLote,
  eliminarDispositivosPorLote,
  exportarDispositivos,
  guardarPoliticaAlarmaPorLote,
  modificarDispositivosPorLote,
} from "../servicios/dispositivos.service";
import type { Dispositivo, EntradaDispositivo, FiltrosDispositivos } from "../tipos/dispositivo.types";

const DEVICE_TYPES = ["SMART_LOCK", "B_LOCK", "G_LOCK", "GPS_TRACKER", "E_SEAL", "SMART_GATEWAY", "SMART_BOX"];
const MODELS = ["G300N", "B168", "B102", "G310N"];
const STATUSES = ["ONLINE", "OFFLINE", "DORMANT", "ALARM", "MAINTENANCE", "UPDATING"];
const ALARM_EVENTS = ["ALL_ALARMS", "UNSEALED_ALARM", "DISMANTLED_ALARM", "CUT_ALARM", "LOW_BATTERY_ALARM", "GEOFENCE_ALARM", "TAMPER_ALARM", "OFFLINE_ALARM"];

function cleanDeviceId(device: Dispositivo) {
  return device.deviceId ?? device.internalCode;
}

function statusBadge(status?: string) {
  const value = status ?? "OFFLINE";
  const styles: Record<string, string> = {
    ONLINE: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    OFFLINE: "bg-slate-100 text-slate-600 ring-slate-200",
    DORMANT: "bg-amber-50 text-amber-700 ring-amber-200",
    ALARM: "bg-red-50 text-red-700 ring-red-200",
    MAINTENANCE: "bg-violet-50 text-violet-700 ring-violet-200",
    UPDATING: "bg-blue-50 text-blue-700 ring-blue-200",
  };
  return <span className={`rounded-full px-2 py-1 text-xs font-semibold ring-1 ${styles[value] ?? styles.OFFLINE}`}>{value}</span>;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="space-y-1 text-sm"><span className="text-xs font-semibold text-slate-600">{label}</span>{children}</label>;
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 ${props.className ?? ""}`} />;
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 ${props.className ?? ""}`} />;
}

function DeviceForm({ companies, onSubmit, busy }: { companies: Empresa[]; onSubmit: (data: EntradaDispositivo) => void; busy: boolean }) {
  const [data, setData] = useState<EntradaDispositivo>({ deviceType: "SMART_LOCK", productModel: "G300N" });
  function submit(event: FormEvent) {
    event.preventDefault();
    onSubmit(data);
  }
  return (
    <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
      <Field label="Device ID"><Input required value={data.deviceId ?? ""} onChange={(e) => setData({ ...data, deviceId: e.target.value })} /></Field>
      <Field label="Device name"><Input required value={data.name ?? ""} onChange={(e) => setData({ ...data, name: e.target.value })} /></Field>
      <Field label="Device type"><Select value={data.deviceType ?? ""} onChange={(e) => setData({ ...data, deviceType: e.target.value })}>{DEVICE_TYPES.map((item) => <option key={item}>{item}</option>)}</Select></Field>
      <Field label="Product model"><Select value={data.productModel ?? ""} onChange={(e) => setData({ ...data, productModel: e.target.value })}>{MODELS.map((item) => <option key={item}>{item}</option>)}</Select></Field>
      <Field label="Affiliated company"><Select required value={data.companyId ?? ""} onChange={(e) => setData({ ...data, companyId: e.target.value })}><option value="" />{companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</Select></Field>
      <Field label="IMEI"><Input value={data.imei ?? ""} onChange={(e) => setData({ ...data, imei: e.target.value })} /></Field>
      <Field label="Serial number"><Input value={data.serialNumber ?? ""} onChange={(e) => setData({ ...data, serialNumber: e.target.value })} /></Field>
      <Field label="Firmware version"><Input value={data.firmwareVersion ?? ""} onChange={(e) => setData({ ...data, firmwareVersion: e.target.value })} /></Field>
      <Field label="Notes"><Input value={data.notes ?? ""} onChange={(e) => setData({ ...data, notes: e.target.value })} /></Field>
      <div className="flex justify-end gap-2 sm:col-span-2"><Boton disabled={busy}>Confirm</Boton></div>
    </form>
  );
}

export function PaginaDispositivos() {
  const { t } = useI18n();
  const labels = t.devices;
  const queryClient = useQueryClient();
  const [filtros, setFiltros] = useState<FiltrosDispositivos>({});
  const [seleccionados, setSeleccionados] = useState<string[]>([]);
  const [modal, setModal] = useState<"add" | "batch" | "modify" | "assign" | "alarm" | null>(null);
  const [batchText, setBatchText] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [alarm, setAlarm] = useState({ phones: "", emails: "", sms: true, email: true, enabled: true });
  const [message, setMessage] = useState("");
  const { data = [], isLoading, refetch } = useDispositivos(filtros);
  const summary = useResumenDispositivos(filtros);
  const companies = useQuery({ queryKey: ["empresas"], queryFn: obtenerEmpresas });

  const selectedDevices = useMemo(() => data.filter((device) => seleccionados.includes(cleanDeviceId(device))), [data, seleccionados]);
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["dispositivos"] });
  const createMutation = useMutation({ mutationFn: crearDispositivo, onSuccess: () => { setModal(null); void invalidate(); } });
  const batchCreateMutation = useMutation({ mutationFn: crearDispositivosPorLote, onSuccess: () => { setModal(null); void invalidate(); } });
  const batchModifyMutation = useMutation({ mutationFn: (updates: EntradaDispositivo) => modificarDispositivosPorLote(seleccionados, updates), onSuccess: () => { setModal(null); void invalidate(); } });
  const assignMutation = useMutation({ mutationFn: () => asignarEmpresaPorLote(seleccionados, companyId), onSuccess: () => { setModal(null); void invalidate(); } });
  const alarmMutation = useMutation({
    mutationFn: () => guardarPoliticaAlarmaPorLote({
      deviceIds: seleccionados,
      receivePhones: alarm.phones,
      receiveEmails: alarm.emails,
      pushTypes: [alarm.sms ? "SMS" : "", alarm.email ? "EMAIL" : ""].filter((item): item is "SMS" | "EMAIL" => item === "SMS" || item === "EMAIL"),
      sendingEventTypes: ALARM_EVENTS,
      enabled: alarm.enabled,
    }),
    onSuccess: () => { setModal(null); void invalidate(); },
  });

  async function exportSelected() {
    const blob = await exportarDispositivos(seleccionados.length ? seleccionados : undefined, filtros);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "devices.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  function parseBatch() {
    const rows = batchText.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    const devices = rows.map((line) => {
      const [deviceId, name, deviceType, productModel, companyIdValue, imei, serialNumber] = line.split(",").map((part) => part.trim());
      return { deviceId, name, deviceType, productModel, companyId: companyIdValue, imei, serialNumber };
    });
    batchCreateMutation.mutate(devices);
  }

  function toggle(id: string) {
    setSeleccionados((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <>
      <EncabezadoPagina titulo={labels?.title ?? "Device"} descripcion="Home Page / Device / Device" acciones={<Boton icono={<RefreshCw className="h-4 w-4" />} onClick={() => void refetch()}>{labels?.refresh ?? "Refresh"}</Boton>} />
      {message ? <div className="rounded-md border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-800">{message}</div> : null}
      <div className="space-y-4">
        <div className="grid gap-3 md:grid-cols-4">
          {[
            [labels?.totalNumber ?? "Total number", summary.data?.totalNumber ?? 0],
            [labels?.totalOnline ?? "Total online", summary.data?.totalOnline ?? 0],
            [labels?.totalOffline ?? "Total offline", summary.data?.totalOffline ?? 0],
            [labels?.dormantCount ?? "Dormant Count", summary.data?.dormantCount ?? 0],
          ].map(([label, value]) => <div key={label} className="rounded-lg border border-slate-200 bg-white p-4"><div className="text-xs font-semibold uppercase text-slate-500">{label}</div><div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div></div>)}
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
            <Select value={filtros.deviceType ?? ""} onChange={(e) => setFiltros({ ...filtros, deviceType: e.target.value })}><option value="">{labels?.deviceType ?? "Device type"}</option>{DEVICE_TYPES.map((item) => <option key={item}>{item}</option>)}</Select>
            <Select value={filtros.productModel ?? ""} onChange={(e) => setFiltros({ ...filtros, productModel: e.target.value })}><option value="">{labels?.productModel ?? "Product model"}</option>{MODELS.map((item) => <option key={item}>{item}</option>)}</Select>
            <Input placeholder={labels?.deviceId ?? "Device ID"} value={filtros.deviceId ?? ""} onChange={(e) => setFiltros({ ...filtros, deviceId: e.target.value })} />
            <Input placeholder={labels?.deviceName ?? "Device name"} value={filtros.deviceName ?? ""} onChange={(e) => setFiltros({ ...filtros, deviceName: e.target.value })} />
            <Select value={filtros.status ?? ""} onChange={(e) => setFiltros({ ...filtros, status: e.target.value })}><option value="">{labels?.status ?? "Status"}</option>{STATUSES.map((item) => <option key={item}>{item}</option>)}</Select>
            <Boton variante="secundario" onClick={() => setFiltros({})}>{labels?.reset ?? "Reset"}</Boton>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Boton icono={<Plus className="h-4 w-4" />} onClick={() => setModal("add")}>{labels?.add ?? "Add"}</Boton>
          <Boton icono={<FileUp className="h-4 w-4" />} variante="secundario" onClick={() => setModal("batch")}>{labels?.batchAdd ?? "Batch add"}</Boton>
          <Boton variante="secundario" icono={<Pencil className="h-4 w-4" />} disabled={!seleccionados.length} onClick={() => setModal("modify")}>{labels?.batchModify ?? "Batch modify device info"}</Boton>
          <Boton variante="peligro" icono={<Trash2 className="h-4 w-4" />} disabled={!seleccionados.length} onClick={() => { if (confirm("Delete selected devices? History, reports, commands and events may be affected.")) eliminarDispositivosPorLote(seleccionados).then(() => invalidate()); }}>{labels?.batchDelete ?? "Batch delete"}</Boton>
          <Boton className="bg-emerald-600 hover:bg-emerald-700" icono={<ShieldCheck className="h-4 w-4" />} disabled={!seleccionados.length} onClick={() => setModal("alarm")}>{labels?.batchAlarmPolicy ?? "Batch alarm policy"}</Boton>
          <Boton variante="secundario" disabled={!seleccionados.length} onClick={() => setModal("assign")}>{labels?.batchAssignCompanies ?? "Batch assign companies"}</Boton>
          <Boton variante="secundario" icono={<Download className="h-4 w-4" />} onClick={() => void exportSelected()}>{labels?.export ?? "Export"}</Boton>
        </div>

        {isLoading ? <EstadoCarga /> : (
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
                <tr>{["", "Sort No.", "Device name", "Device ID", "Device type", "Product model", "Affiliated company", "Status", "Create time", "Operate"].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.map((device, index) => {
                  const id = cleanDeviceId(device);
                  return (
                    <tr key={device.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3"><input type="checkbox" checked={seleccionados.includes(id)} onChange={() => toggle(id)} /></td>
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3 font-medium text-slate-900">{device.deviceName ?? device.name}</td>
                      <td className="px-4 py-3">{id}</td>
                      <td className="px-4 py-3">{device.deviceType ?? device.type}</td>
                      <td className="px-4 py-3">{device.productModel ?? "-"}</td>
                      <td className="px-4 py-3">{device.affiliatedCompany ?? "-"}</td>
                      <td className="px-4 py-3">{statusBadge(device.onlineStatus ?? device.connectionStatus)}</td>
                      <td className="px-4 py-3">{formatearFecha(device.createdAt)}</td>
                      <td className="px-4 py-3"><div className="flex gap-2"><Link className="text-blue-600 hover:underline" to={`/app/devices/${id}`}>{labels?.detail ?? "Detail"}</Link><button className="text-slate-500" onClick={() => setMessage("Slave Devices: pending IoT provider integration")}>{labels?.slaveDevices ?? "Slave Devices"}</button></div></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal abierto={modal === "add"} titulo={labels?.addDevice ?? "Add device"} onCerrar={() => setModal(null)}>
        <DeviceForm companies={companies.data ?? []} busy={createMutation.isPending} onSubmit={(payload) => createMutation.mutate(payload)} />
      </Modal>
      <Modal abierto={modal === "batch"} titulo={labels?.batchAddDevices ?? "Batch add devices"} onCerrar={() => setModal(null)}>
        <div className="space-y-3">
          <p className="text-sm text-slate-600">CSV columns: deviceId, deviceName, deviceType, productModel, companyId, imei, serialNumber</p>
          <textarea className="h-48 w-full rounded-md border border-slate-200 p-3 text-sm" value={batchText} onChange={(e) => setBatchText(e.target.value)} />
          <Boton disabled={!batchText.trim() || batchCreateMutation.isPending} onClick={parseBatch}>{labels?.confirm ?? "Confirm"}</Boton>
        </div>
      </Modal>
      <Modal abierto={modal === "modify"} titulo={labels?.batchModify ?? "Batch modify device info"} onCerrar={() => setModal(null)}>
        <DeviceForm companies={companies.data ?? []} busy={batchModifyMutation.isPending} onSubmit={(payload) => batchModifyMutation.mutate(payload)} />
      </Modal>
      <Modal abierto={modal === "assign"} titulo={labels?.batchAssignCompanies ?? "Batch assign companies"} onCerrar={() => setModal(null)}>
        <div className="space-y-3">
          <p className="text-sm text-slate-600">{selectedDevices.length} devices selected.</p>
          <Select value={companyId} onChange={(e) => setCompanyId(e.target.value)}><option value="" />{(companies.data ?? []).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</Select>
          <Boton disabled={!companyId || assignMutation.isPending} onClick={() => assignMutation.mutate()}>{labels?.confirm ?? "Confirm"}</Boton>
        </div>
      </Modal>
      <Modal abierto={modal === "alarm"} titulo={labels?.batchAlarmPolicy ?? "Batch alarm policy"} onCerrar={() => setModal(null)}>
        <div className="space-y-3">
          <p className="text-sm text-slate-600">{selectedDevices.length} devices selected.</p>
          <Field label={labels?.receivePhoneNumber ?? "Receive phone number"}><Input value={alarm.phones} onChange={(e) => setAlarm({ ...alarm, phones: e.target.value })} /></Field>
          <Field label={labels?.receiveEmail ?? "Receive email"}><Input value={alarm.emails} onChange={(e) => setAlarm({ ...alarm, emails: e.target.value })} /></Field>
          <label className="flex gap-2 text-sm"><input type="checkbox" checked={alarm.sms} onChange={(e) => setAlarm({ ...alarm, sms: e.target.checked })} />{labels?.mobileSms ?? "Mobile SMS"}</label>
          <label className="flex gap-2 text-sm"><input type="checkbox" checked={alarm.email} onChange={(e) => setAlarm({ ...alarm, email: e.target.checked })} />{labels?.email ?? "E-mail"}</label>
          <label className="flex gap-2 text-sm"><input type="checkbox" checked={alarm.enabled} onChange={(e) => setAlarm({ ...alarm, enabled: e.target.checked })} />{labels?.enableAlarmPolicy ?? "Enable alarm policy"}</label>
          <Boton disabled={alarmMutation.isPending || (alarm.sms && !alarm.phones) || (alarm.email && !alarm.emails)} onClick={() => alarmMutation.mutate()}>{labels?.confirm ?? "Confirm"}</Boton>
        </div>
      </Modal>
    </>
  );
}
