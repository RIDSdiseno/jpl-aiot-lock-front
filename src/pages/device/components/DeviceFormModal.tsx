import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { Modal } from "../../../componentes/comunes/Modal";
import type { Device, DeviceInput, DeviceOptions } from "../../../types/device.types";

const inputClass = "w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500";

export function DeviceFormModal({
  open,
  device,
  options,
  busy,
  onClose,
  onSubmit,
}: {
  open: boolean;
  device?: Device | null;
  options?: DeviceOptions;
  busy?: boolean;
  onClose: () => void;
  onSubmit: (input: DeviceInput) => void;
}) {
  const [form, setForm] = useState<DeviceInput>({ deviceId: "", deviceName: "", deviceType: "", productModel: "", affiliatedCompanyId: "" });

  useEffect(() => {
    if (!open) return;
    setForm({
      deviceId: device?.deviceId ?? "",
      deviceName: device?.deviceName ?? "",
      deviceType: device?.deviceType ?? options?.deviceTypes[0] ?? "",
      productModel: device?.productModel ?? options?.productModels[0] ?? "",
      affiliatedCompanyId: device?.affiliatedCompanyId ?? options?.companies[0]?.id ?? "",
      simIccid: device?.simIccid ?? "",
      phoneNumber: device?.phoneNumber ?? "",
      description: device?.description ?? "",
    });
  }, [device, open, options]);

  function submit(event: FormEvent) {
    event.preventDefault();
    onSubmit({
      ...form,
      deviceId: form.deviceId.trim(),
      deviceName: form.deviceName?.trim(),
      simIccid: form.simIccid?.trim(),
      phoneNumber: form.phoneNumber?.trim(),
      description: form.description?.trim(),
    });
  }

  return (
    <Modal abierto={open} titulo={device ? "Edit device info" : "Add device"} onCerrar={onClose}>
      <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm text-slate-600">Device ID / IMEI<input disabled={Boolean(device)} required className={inputClass} value={form.deviceId} onChange={(event) => setForm({ ...form, deviceId: event.target.value })} /></label>
        <label className="text-sm text-slate-600">Device name<input className={inputClass} value={form.deviceName ?? ""} onChange={(event) => setForm({ ...form, deviceName: event.target.value })} /></label>
        <label className="text-sm text-slate-600">Device type<select required className={inputClass} value={form.deviceType} onChange={(event) => setForm({ ...form, deviceType: event.target.value })}><option value="" />{(options?.deviceTypes ?? []).map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label className="text-sm text-slate-600">Product model<select required className={inputClass} value={form.productModel} onChange={(event) => setForm({ ...form, productModel: event.target.value })}><option value="" />{(options?.productModels ?? []).map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label className="text-sm text-slate-600">Affiliated company<select required className={inputClass} value={form.affiliatedCompanyId} onChange={(event) => setForm({ ...form, affiliatedCompanyId: event.target.value })}><option value="" />{(options?.companies ?? []).map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}</select></label>
        <label className="text-sm text-slate-600">SIM ICCID<input className={inputClass} value={form.simIccid ?? ""} onChange={(event) => setForm({ ...form, simIccid: event.target.value })} /></label>
        <label className="text-sm text-slate-600">Phone number/SIM number<input className={inputClass} value={form.phoneNumber ?? ""} onChange={(event) => setForm({ ...form, phoneNumber: event.target.value })} /></label>
        <label className="text-sm text-slate-600 sm:col-span-2">Description<textarea className={`${inputClass} min-h-20`} value={form.description ?? ""} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label>
        <div className="flex justify-end gap-2 sm:col-span-2">
          <button type="button" className="rounded-md border border-slate-200 px-4 py-2 text-sm" onClick={onClose}>Cancel</button>
          <button disabled={busy} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60">Confirm</button>
        </div>
      </form>
    </Modal>
  );
}
