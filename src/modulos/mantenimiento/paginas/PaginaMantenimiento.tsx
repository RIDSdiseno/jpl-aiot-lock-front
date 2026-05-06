import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Upload } from "lucide-react";
import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Boton } from "../../../componentes/comunes/Boton";
import { Modal } from "../../../componentes/comunes/Modal";
import { EncabezadoPagina } from "../../../componentes/layout/EncabezadoPagina";
import { api, extraerDatos } from "../../../librerias/api";
import { formatearFecha } from "../../../librerias/fechas";
import { useI18n } from "../../../i18n/i18nStore";

type Firmware = { id: string; deviceType: string; productModel: string; firmwareType: string; versionName: string; fileName: string; fileSize: number; description?: string | null; uploadedAt: string };
type OtaRecord = { id: string; deviceId: string; firmwareType: string; toVersion: string; status: string; progress: number; startedAt?: string | null; finishedAt?: string | null; errorMessage?: string | null; createdById?: string | null };
type OtaDevice = { id: string; deviceId: string; name: string; deviceType: string; productModel: string; firmwareVersion?: string | null; onlineStatus: string; lastConnectionAt?: string | null };

async function getFirmware() {
  return extraerDatos<Firmware[]>(await api.get<{ data: Firmware[] }>("/maintain/firmware"));
}
async function getOtaDevices() {
  return extraerDatos<OtaDevice[]>(await api.get<{ data: OtaDevice[] }>("/maintain/ota/devices"));
}
async function getOtaRecords() {
  return extraerDatos<OtaRecord[]>(await api.get<{ data: OtaRecord[] }>("/maintain/ota/records"));
}

export function PaginaMantenimiento() {
  const { t } = useI18n();
  const labels = t.maintain;
  const location = useLocation();
  const queryClient = useQueryClient();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [upgradeDevice, setUpgradeDevice] = useState<OtaDevice | null>(null);
  const firmware = useQuery({ queryKey: ["firmware"], queryFn: getFirmware });
  const otaDevices = useQuery({ queryKey: ["ota-devices"], queryFn: getOtaDevices });
  const otaRecords = useQuery({ queryKey: ["ota-records"], queryFn: getOtaRecords });
  const mode = location.pathname.includes("/ota/records") ? "records" : location.pathname.includes("/ota") ? "ota" : "firmware";

  const upload = useMutation({
    mutationFn: (payload: Partial<Firmware> & { filePath?: string }) => api.post("/maintain/firmware/upload", payload),
    onSuccess: () => { setUploadOpen(false); void queryClient.invalidateQueries({ queryKey: ["firmware"] }); },
  });
  const upgrade = useMutation({
    mutationFn: (firmwareFileId: string) => api.post("/maintain/ota/upgrade", { deviceId: upgradeDevice?.deviceId, firmwareFileId }),
    onSuccess: () => { setUpgradeDevice(null); void queryClient.invalidateQueries({ queryKey: ["ota-records"] }); },
  });

  function uploadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fileName = String(data.get("fileName") ?? "");
    upload.mutate({
      deviceType: String(data.get("deviceType") ?? "SMART_LOCK"),
      productModel: String(data.get("productModel") ?? "G300N"),
      firmwareType: String(data.get("firmwareType") ?? "MASTER_MCU"),
      versionName: String(data.get("versionName") ?? ""),
      fileName,
      filePath: `/firmware/${fileName}`,
      fileSize: Number(data.get("fileSize") ?? 1024),
      description: String(data.get("description") ?? ""),
    });
  }

  return (
    <>
      <EncabezadoPagina titulo={labels?.title ?? "Maintain"} descripcion={mode === "firmware" ? labels?.firmware ?? "Firmware" : labels?.ota ?? "OTA"} acciones={mode === "firmware" ? <Boton icono={<Upload className="h-4 w-4" />} onClick={() => setUploadOpen(true)}>{labels?.upload ?? "Upload"}</Boton> : null} />
      <div className="mb-4 flex gap-2">
        <Link className={`rounded-md px-3 py-2 text-sm ${mode === "firmware" ? "bg-blue-600 text-white" : "bg-white text-slate-700"}`} to="/app/maintain/firmware">{labels?.firmware ?? "Firmware"}</Link>
        <Link className={`rounded-md px-3 py-2 text-sm ${mode === "ota" ? "bg-blue-600 text-white" : "bg-white text-slate-700"}`} to="/app/maintain/ota">{labels?.ota ?? "OTA"}</Link>
        <Link className={`rounded-md px-3 py-2 text-sm ${mode === "records" ? "bg-blue-600 text-white" : "bg-white text-slate-700"}`} to="/app/maintain/ota/records">{labels?.upgradeRecord ?? "Upgrade record"}</Link>
      </div>

      {mode === "firmware" ? (
        <div className="grid gap-4 xl:grid-cols-[220px_1fr]">
          <div className="rounded-lg border bg-white p-3 text-sm">{["Smart_Lock", "B_Lock", "G_Lock", "GPS_Tracker", "E_Seal", "Smart_Gateway", "Smart_Box"].map((item) => <div key={item} className="rounded px-3 py-2 hover:bg-slate-50">{item}</div>)}</div>
          <DataTable headers={["Sort No.", "Device type", "Product model", "Firmware type", "Version name", "File name", "Size", "Description", "Upload time", "Operate"]} rows={(firmware.data ?? []).map((item, index) => [index + 1, item.deviceType, item.productModel, item.firmwareType, item.versionName, item.fileName, `${Math.round(item.fileSize / 1024)} KB`, item.description ?? "-", formatearFecha(item.uploadedAt), "Download / Delete"])} />
        </div>
      ) : null}

      {mode === "ota" ? <DataTable headers={["Sort No.", "Device ID", "Device name", "Device type", "Product model", "Current firmware version", "Status", "Last online time", "Operate"]} rows={(otaDevices.data ?? []).map((item, index) => [index + 1, item.deviceId, item.name, item.deviceType, item.productModel, item.firmwareVersion ?? "-", item.onlineStatus, formatearFecha(item.lastConnectionAt), <button className="text-blue-700" onClick={() => setUpgradeDevice(item)}>{labels?.upgrade ?? "Upgrade"}</button>])} /> : null}

      {mode === "records" ? <DataTable headers={["Device ID", "Firmware version", "Firmware type", "Status", "Progress", "Start time", "Finish time", "Error message", "Operator", "Operate"]} rows={(otaRecords.data ?? []).map((item) => [item.deviceId, item.toVersion, item.firmwareType, item.status, `${item.progress}%`, formatearFecha(item.startedAt), formatearFecha(item.finishedAt), item.errorMessage ?? "-", item.createdById ?? "-", "Detail / Retry / Cancel"])} /> : null}

      <Modal abierto={uploadOpen} titulo={labels?.firmwareUpload ?? "Firmware upload"} onCerrar={() => setUploadOpen(false)}>
        <form className="grid gap-3" onSubmit={uploadSubmit}>
          <select name="deviceType" className="rounded border px-3 py-2 text-sm"><option>SMART_LOCK</option><option>B_LOCK</option><option>G_LOCK</option><option>GPS_TRACKER</option><option>E_SEAL</option></select>
          <input name="productModel" required placeholder="Product model" defaultValue="G300N" className="rounded border px-3 py-2 text-sm" />
          <select name="firmwareType" className="rounded border px-3 py-2 text-sm"><option>MASTER_MCU</option><option>BLUETOOTH_MCU</option><option>EXTENSION_MCU</option></select>
          <input name="versionName" required placeholder={labels?.versionName ?? "Version name"} className="rounded border px-3 py-2 text-sm" />
          <input name="fileName" required placeholder="upgrade.bin / bluetooth.zip" className="rounded border px-3 py-2 text-sm" />
          <input name="fileSize" type="number" min={1} defaultValue={1024} className="rounded border px-3 py-2 text-sm" />
          <textarea name="description" placeholder={labels?.description ?? "Description"} className="rounded border px-3 py-2 text-sm" />
          <Boton disabled={upload.isPending}>{labels?.upload ?? "Upload"}</Boton>
        </form>
      </Modal>

      <Modal abierto={Boolean(upgradeDevice)} titulo={labels?.selectUpgradeFile ?? "Select upgrade file"} onCerrar={() => setUpgradeDevice(null)}>
        <div className="space-y-2">
          {(firmware.data ?? []).map((item) => <button key={item.id} className="flex w-full justify-between rounded border px-3 py-2 text-left text-sm hover:bg-blue-50" onClick={() => upgrade.mutate(item.id)}><span>{item.fileName} - {item.versionName}</span><span>{item.firmwareType}</span></button>)}
        </div>
      </Modal>
    </>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: Array<Array<ReactNode>> }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500"><tr>{headers.map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr></thead>
        <tbody className="divide-y divide-slate-100">{rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-3">{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
