import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Boton } from "../../../componentes/comunes/Boton";
import { useI18n } from "../../../i18n/i18nStore";
import { ControlLayout } from "../ControlLayout";
import { ControlSelectedDeviceBanner } from "../components/ControlSelectedDeviceBanner";
import { createBatchCardBinding, createPreset, type PresetPayload } from "../services/preset.service";
import type { ControlDevice } from "../types/control.types";

const initialPreset: PresetPayload = {
  expirationTime: "",
  serverAddress: "",
  tcpPort: "",
  reportInterval: "",
  heartbeatInterval: "",
  sealUnsealCmd: "SEAL",
  automaticCardBindingMinutes: "",
  staticPassword: "",
  vibrationDetection: false,
  shutdownAfterShacklePullingOut: false,
};

function PresetContent({ selectedDevice }: { selectedDevice?: ControlDevice }) {
  const { t } = useI18n();
  const labels = t.control;
  const [tab, setTab] = useState<"preset" | "batch">("preset");
  const [preset, setPreset] = useState<PresetPayload>(initialPreset);
  const [cards, setCards] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const deviceIds = selectedDevice ? [selectedDevice.deviceId] : [];

  const presetMutation = useMutation({
    mutationFn: () => createPreset(deviceIds, preset),
    onSuccess: (data) => {
      setError("");
      setMessage(`${labels.reservationCmd}: ${data.commands.length}`);
    },
    onError: (err) => setError(err instanceof Error ? err.message : "Preset failed"),
  });

  const batchMutation = useMutation({
    mutationFn: () =>
      createBatchCardBinding(
        deviceIds,
        cards.split(/\r?\n|,/).map((card) => card.trim()).filter(Boolean),
        preset.expirationTime,
      ),
    onSuccess: (data) => {
      setError("");
      setMessage(`${labels.batchCardBinding}: ${data.commands.length}`);
    },
    onError: (err) => setError(err instanceof Error ? err.message : "Batch card binding failed"),
  });

  const updatePreset = (key: keyof PresetPayload, value: string | boolean) => setPreset((current) => ({ ...current, [key]: value }));
  const disabled = !selectedDevice || presetMutation.isPending || batchMutation.isPending;

  return (
    <>
      <ControlSelectedDeviceBanner device={selectedDevice} />
      <div className="rounded border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">{labels.presetDescription}</div>
      {message ? <div className="rounded border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</div> : null}
      {error ? <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

      <div className="rounded border border-slate-200 bg-white">
        <div className="flex border-b border-slate-200">
          <button type="button" onClick={() => setTab("preset")} className={`px-4 py-3 text-sm font-medium ${tab === "preset" ? "border-b-2 border-blue-600 text-blue-700" : "text-slate-600"}`}>
            {labels.preset}
          </button>
          <button type="button" onClick={() => setTab("batch")} className={`px-4 py-3 text-sm font-medium ${tab === "batch" ? "border-b-2 border-blue-600 text-blue-700" : "text-slate-600"}`}>
            {labels.batchCardBinding}
          </button>
        </div>

        {tab === "preset" ? (
          <div className="grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
            <input value={preset.expirationTime} onChange={(event) => updatePreset("expirationTime", event.target.value)} type="datetime-local" className="rounded border border-slate-200 px-3 py-2 text-sm" aria-label="CMD expiration time" />
            <input value={preset.serverAddress} onChange={(event) => updatePreset("serverAddress", event.target.value)} placeholder="Server address, IP/Domain" className="rounded border border-slate-200 px-3 py-2 text-sm" />
            <input value={preset.tcpPort} onChange={(event) => updatePreset("tcpPort", event.target.value)} placeholder="TCP Port" className="rounded border border-slate-200 px-3 py-2 text-sm" />
            <input value={preset.reportInterval} onChange={(event) => updatePreset("reportInterval", event.target.value)} placeholder="Report interval" className="rounded border border-slate-200 px-3 py-2 text-sm" />
            <input value={preset.heartbeatInterval} onChange={(event) => updatePreset("heartbeatInterval", event.target.value)} placeholder="Heartbeat sending interval" className="rounded border border-slate-200 px-3 py-2 text-sm" />
            <select value={preset.sealUnsealCmd} onChange={(event) => updatePreset("sealUnsealCmd", event.target.value)} className="rounded border border-slate-200 px-3 py-2 text-sm">
              <option value="SEAL">Seal CMD</option>
              <option value="UNSEAL">Unseal CMD</option>
            </select>
            <input value={preset.automaticCardBindingMinutes} onChange={(event) => updatePreset("automaticCardBindingMinutes", event.target.value)} placeholder="Allowed automatic card binding time" className="rounded border border-slate-200 px-3 py-2 text-sm" />
            <input value={preset.staticPassword} onChange={(event) => updatePreset("staticPassword", event.target.value)} placeholder="Static password read/write" className="rounded border border-slate-200 px-3 py-2 text-sm" />
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={Boolean(preset.vibrationDetection)} onChange={(event) => updatePreset("vibrationDetection", event.target.checked)} />
              Vibration or 3-axis displacement detection
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={Boolean(preset.shutdownAfterShacklePullingOut)} onChange={(event) => updatePreset("shutdownAfterShacklePullingOut", event.target.checked)} />
              Shutdown after shackle pulling out
            </label>
          </div>
        ) : (
          <div className="space-y-4 p-4">
            <input value={preset.expirationTime} onChange={(event) => updatePreset("expirationTime", event.target.value)} type="datetime-local" className="w-full rounded border border-slate-200 px-3 py-2 text-sm md:w-80" aria-label="CMD expiration time" />
            <textarea value={cards} onChange={(event) => setCards(event.target.value)} placeholder="12345678, 87654321" rows={6} className="w-full rounded border border-slate-200 px-3 py-2 text-sm" />
            <p className="text-xs text-slate-500">Card numbers must be unique and contain 8 numeric digits.</p>
          </div>
        )}

        <div className="flex justify-end gap-2 border-t border-slate-100 p-4">
          <Boton type="button" variante="secundario" onClick={() => setPreset(initialPreset)}>
            {labels.cancel}
          </Boton>
          <Boton type="button" disabled={disabled} onClick={() => (tab === "preset" ? presetMutation.mutate() : batchMutation.mutate())}>
            {labels.confirm}
          </Boton>
        </div>
      </div>
    </>
  );
}

export function PresetPage() {
  const { t } = useI18n();
  return <ControlLayout section={t.control.preset}>{({ selectedDevice }) => <PresetContent selectedDevice={selectedDevice} />}</ControlLayout>;
}
