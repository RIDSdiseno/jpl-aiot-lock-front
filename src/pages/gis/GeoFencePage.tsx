import { useEffect, useMemo, useState } from "react";
import { Circle, MapContainer, Polygon, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { Edit3, LocateFixed, Send, Trash2 } from "lucide-react";
import { MigasPan } from "../../componentes/layout/MigasPan";
import { Modal } from "../../componentes/comunes/Modal";
import { useI18n } from "../../i18n/i18nStore";
import { getGisText } from "./gisText";
import {
  batchDeleteGeoFences,
  deleteGeoFence,
  listGeoFences,
  listGisDevices,
  readDeviceFences,
  saveGeoFence,
  sendGeoFences,
} from "./gisApi";
import type { DeviceFenceQueryType, GeoFence, GeoFenceInput, GeoFenceRule, GeoFenceType, GisDevice, LatLngPoint } from "./types";

const defaultCenter: LatLngPoint = { lat: -33.4489, lng: -70.6693 };
const ruleTypes: GeoFenceRule["ruleType"][] = [
  "TOUCHING_SEAL",
  "PASSWORD_SEAL_UNSEAL",
  "CARD_SEAL_UNSEAL",
  "TIMING_UNSEAL",
  "SMS_SEAL_UNSEAL",
  "BLE_SEAL_UNSEAL",
  "REMOTE_SEAL_UNSEAL",
];

function emptyRules(): GeoFenceRule[] {
  return ruleTypes.map((ruleType) => ({
    ruleType,
    enabled: false,
    value: ruleType === "SMS_SEAL_UNSEAL" ? "" : "00000000",
  }));
}

function Recenter({ center }: { center: LatLngPoint }) {
  const map = useMap();
  useEffect(() => {
    map.setView([center.lat, center.lng], 13);
  }, [center, map]);
  return null;
}

function DrawEvents({ mode, onDraft }: { mode: GeoFenceType; onDraft: (geometry: GeoFenceInput["geometry"]) => void }) {
  const [points, setPoints] = useState<LatLngPoint[]>([]);
  useMapEvents({
    click(event) {
      const point = { lat: event.latlng.lat, lng: event.latlng.lng };
      if (mode === "CIRCLE") {
        onDraft({ center: point, radiusMeters: 500 });
        return;
      }
      const next = [...points, point];
      setPoints(next);
      if (next.length >= 3) onDraft({ points: next });
    },
    dblclick() {
      setPoints([]);
    },
  });
  return points.length ? <Polygon positions={points.map((point) => [point.lat, point.lng])} pathOptions={{ color: "#2563eb", dashArray: "6 6" }} /> : null;
}

function GeoFenceMap({
  fences,
  selectedId,
  mode,
  center,
  draft,
  onDraft,
}: {
  fences: GeoFence[];
  selectedId?: string;
  mode: GeoFenceType;
  center: LatLngPoint;
  draft?: GeoFenceInput["geometry"];
  onDraft: (geometry: GeoFenceInput["geometry"]) => void;
}) {
  return (
    <MapContainer center={[center.lat, center.lng]} zoom={12} className="h-[620px] min-h-[520px] w-full rounded-md" doubleClickZoom={false}>
      <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Recenter center={center} />
      <DrawEvents mode={mode} onDraft={onDraft} />
      {fences.map((fence) =>
        fence.type === "CIRCLE" && fence.geometryJson.center ? (
          <Circle
            key={fence.id}
            center={[fence.geometryJson.center.lat, fence.geometryJson.center.lng]}
            radius={fence.geometryJson.radiusMeters ?? 500}
            pathOptions={{ color: fence.id === selectedId ? "#dc2626" : "#2563eb", weight: fence.id === selectedId ? 4 : 2 }}
          />
        ) : fence.geometryJson.points ? (
          <Polygon
            key={fence.id}
            positions={fence.geometryJson.points.map((point) => [point.lat, point.lng])}
            pathOptions={{ color: fence.id === selectedId ? "#dc2626" : "#2563eb", weight: fence.id === selectedId ? 4 : 2 }}
          />
        ) : null,
      )}
      {draft?.center ? <Circle center={[draft.center.lat, draft.center.lng]} radius={draft.radiusMeters ?? 500} pathOptions={{ color: "#f97316" }} /> : null}
      {draft?.points ? <Polygon positions={draft.points.map((point) => [point.lat, point.lng])} pathOptions={{ color: "#f97316" }} /> : null}
    </MapContainer>
  );
}

function RulesModal({
  open,
  initial,
  type,
  geometry,
  onClose,
  onSave,
  labels,
}: {
  open: boolean;
  initial?: GeoFence;
  type: GeoFenceType;
  geometry?: GeoFenceInput["geometry"];
  onClose: () => void;
  onSave: (input: GeoFenceInput, id?: string) => Promise<void>;
  labels: ReturnType<typeof getGisText>;
}) {
  const [name, setName] = useState("");
  const [rules, setRules] = useState<GeoFenceRule[]>(emptyRules());
  const [error, setError] = useState("");

  useEffect(() => {
    setName(initial?.name ?? "");
    setRules(initial?.rulesJson?.length ? initial.rulesJson : emptyRules());
    setError("");
  }, [initial, open]);

  async function submit() {
    const activeRules = rules.filter((rule) => rule.enabled);
    const invalid = activeRules.find((rule) => {
      if (rule.ruleType === "SMS_SEAL_UNSEAL") return !/^\d{11}$/.test(rule.value ?? "");
      if (rule.ruleType !== "TIMING_UNSEAL") return !/^\d{8}$/.test(rule.value ?? "");
      return Boolean(rule.startTime && rule.endTime && rule.startTime > rule.endTime);
    });
    if (!name.trim()) return setError(labels.fenceName);
    if (!geometry && !initial?.geometryJson) return setError("Geometry required");
    if (invalid) return setError(`${invalid.ruleType}: invalid value`);
    await onSave({ name, type: initial?.type ?? type, status: "ACTIVE", geometry: geometry ?? initial!.geometryJson, rules }, initial?.id);
    onClose();
  }

  return (
    <Modal abierto={open} titulo={labels.saveFence} onCerrar={onClose}>
      <div className="space-y-4">
        <input className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" placeholder={labels.fenceName} value={name} onChange={(event) => setName(event.target.value)} />
        <div className="max-h-80 space-y-3 overflow-y-auto pr-1">
          {rules.map((rule, index) => (
            <div key={rule.ruleType} className="rounded-md border border-slate-200 p-3">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-800">
                <input type="checkbox" checked={rule.enabled} onChange={(event) => setRules((prev) => prev.map((item, i) => (i === index ? { ...item, enabled: event.target.checked } : item)))} />
                {rule.ruleType.replaceAll("_", " ")}
              </label>
              {rule.ruleType === "REMOTE_SEAL_UNSEAL" && rule.enabled ? <p className="mt-2 text-xs text-orange-600">{labels.remoteWarning}</p> : null}
              {rule.ruleType === "TIMING_UNSEAL" ? (
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <input type="time" className="rounded-md border px-2 py-1 text-sm" value={rule.startTime ?? ""} onChange={(event) => setRules((prev) => prev.map((item, i) => (i === index ? { ...item, startTime: event.target.value } : item)))} />
                  <input type="time" className="rounded-md border px-2 py-1 text-sm" value={rule.endTime ?? ""} onChange={(event) => setRules((prev) => prev.map((item, i) => (i === index ? { ...item, endTime: event.target.value } : item)))} />
                  <input type="datetime-local" className="rounded-md border px-2 py-1 text-sm" value={rule.expiresAt ?? ""} onChange={(event) => setRules((prev) => prev.map((item, i) => (i === index ? { ...item, expiresAt: event.target.value } : item)))} />
                </div>
              ) : (
                <input className="mt-2 w-full rounded-md border px-2 py-1 text-sm" maxLength={rule.ruleType === "SMS_SEAL_UNSEAL" ? 11 : 8} value={rule.value ?? ""} onChange={(event) => setRules((prev) => prev.map((item, i) => (i === index ? { ...item, value: event.target.value.replace(/\D/g, "") } : item)))} />
              )}
            </div>
          ))}
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <div className="flex justify-end gap-2">
          <button className="rounded-md border px-4 py-2 text-sm" onClick={onClose}>{labels.cancel}</button>
          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white" onClick={submit}>{labels.confirm}</button>
        </div>
      </div>
    </Modal>
  );
}

function SendFenceModal({ open, selectedIds, onClose, onSent, labels }: { open: boolean; selectedIds: string[]; onClose: () => void; onSent: () => void; labels: ReturnType<typeof getGisText> }) {
  const [devices, setDevices] = useState<GisDevice[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) listGisDevices().then(setDevices).catch(() => setDevices([]));
  }, [open]);

  const visible = devices.filter((device) => {
    const statusMatch = filter === "all" || (filter === "online" ? device.isOnline : !device.isOnline);
    const q = search.toLowerCase();
    return statusMatch && (!q || device.deviceId.toLowerCase().includes(q) || device.name.toLowerCase().includes(q) || device.companyName.toLowerCase().includes(q));
  });

  async function submit() {
    if (!selectedIds.length) return setError(labels.sendFence);
    if (!selected.length) return setError(labels.selectDevice);
    await sendGeoFences(selectedIds, devices.filter((device) => selected.includes(device.deviceId)));
    onSent();
    onClose();
  }

  return (
    <Modal abierto={open} titulo={labels.selectDevice} onCerrar={onClose}>
      <div className="space-y-4">
        <div className="flex gap-2">
          {["all", "online", "offline"].map((item) => (
            <button key={item} className={`rounded-md px-3 py-1.5 text-sm ${filter === item ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`} onClick={() => setFilter(item)}>
              {item === "all" ? labels.all : item === "online" ? labels.online : labels.offline}
            </button>
          ))}
        </div>
        <input className="w-full rounded-md border px-3 py-2 text-sm" placeholder="Company / Device Info" value={search} onChange={(event) => setSearch(event.target.value)} />
        <div className="max-h-80 space-y-2 overflow-y-auto">
          {visible.map((device) => (
            <label key={device.deviceId} className="flex items-start gap-3 rounded-md border border-slate-200 p-3 text-sm">
              <input type="checkbox" checked={selected.includes(device.deviceId)} onChange={(event) => setSelected((prev) => (event.target.checked ? [...prev, device.deviceId] : prev.filter((id) => id !== device.deviceId)))} />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium text-slate-900">{device.name}</span>
                <span className="block text-xs text-slate-500">{device.companyName} - {device.deviceId}</span>
                {!device.isOnline ? <span className="mt-1 block text-xs text-orange-600">{labels.offlineWarning}</span> : null}
              </span>
            </label>
          ))}
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <div className="flex justify-end gap-2">
          <button className="rounded-md border px-4 py-2 text-sm" onClick={onClose}>{labels.cancel}</button>
          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white" onClick={submit}>{labels.confirm}</button>
        </div>
      </div>
    </Modal>
  );
}

export function GeoFencePage() {
  const { t, language } = useI18n();
  const labels = getGisText(language, t.gis);
  const [fences, setFences] = useState<GeoFence[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedFence, setSelectedFence] = useState<GeoFence>();
  const [mode, setMode] = useState<GeoFenceType>("POLYGON");
  const [center, setCenter] = useState(defaultCenter);
  const [draft, setDraft] = useState<GeoFenceInput["geometry"]>();
  const [rulesOpen, setRulesOpen] = useState(false);
  const [sendOpen, setSendOpen] = useState(false);
  const [tab, setTab] = useState<"list" | "device">("list");
  const [queryResult, setQueryResult] = useState<unknown>();
  const [deviceId, setDeviceId] = useState("");
  const [queryType, setQueryType] = useState<DeviceFenceQueryType>("CIRCLE_FENCE_LIST");
  const [locationSearch, setLocationSearch] = useState("");

  const selected = useMemo(() => fences.find((fence) => fence.id === selectedFence?.id), [fences, selectedFence]);

  async function refresh() {
    setFences(await listGeoFences());
  }

  useEffect(() => {
    refresh().catch(() => setFences([]));
  }, []);

  async function searchLocation() {
    if (!locationSearch.trim()) return;
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationSearch)}`);
    const [first] = (await response.json()) as Array<{ lat: string; lon: string }>;
    if (first) setCenter({ lat: Number(first.lat), lng: Number(first.lon) });
  }

  async function save(input: GeoFenceInput, id?: string) {
    await saveGeoFence(input, id);
    setDraft(undefined);
    setSelectedFence(undefined);
    await refresh();
  }

  async function remove(ids: string[]) {
    if (!ids.length || !window.confirm(`${labels.confirmDeleteFence} (${ids.length})`)) return;
    if (ids.length === 1) await deleteGeoFence(ids[0]);
    else await batchDeleteGeoFences(ids);
    setSelectedIds([]);
    await refresh();
  }

  return (
    <div className="space-y-5">
      <MigasPan items={[labels.breadcrumbHome, labels.breadcrumbGis, labels.breadcrumbGeoFence]} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-slate-900">{labels.title}</h1>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white" onClick={() => setSendOpen(true)}><Send className="h-4 w-4" />{labels.sendFence}</button>
          <button className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm text-white" onClick={() => remove(selectedIds)}><Trash2 className="h-4 w-4" />{labels.batchDelete}</button>
        </div>
      </div>
      <div className="flex border-b border-slate-200">
        <button className={`px-4 py-2 text-sm ${tab === "list" ? "border-b-2 border-blue-600 text-blue-700" : "text-slate-500"}`} onClick={() => setTab("list")}>{labels.fenceList}</button>
        <button className={`px-4 py-2 text-sm ${tab === "device" ? "border-b-2 border-blue-600 text-blue-700" : "text-slate-500"}`} onClick={() => setTab("device")}>{labels.deviceFencesAndRules}</button>
      </div>
      {tab === "list" ? (
        <div className="grid gap-4 xl:grid-cols-[440px_minmax(0,1fr)]">
          <section className="rounded-md border border-slate-200 bg-white">
            <div className="space-y-3 border-b border-slate-200 p-4">
              <input className="w-full rounded-md border px-3 py-2 text-sm" placeholder={labels.searchLocation} value={locationSearch} onChange={(event) => setLocationSearch(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") void searchLocation(); }} />
              <div className="flex items-center gap-2">
                <button className="rounded-md bg-slate-900 px-3 py-2 text-sm text-white" onClick={searchLocation}><LocateFixed className="h-4 w-4" /></button>
                {[["POLYGON", labels.polygon], ["CIRCLE", labels.circle]].map(([value, label]) => (
                  <button key={value} className={`rounded-md px-3 py-2 text-sm ${mode === value ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`} onClick={() => setMode(value as GeoFenceType)}>{label}</button>
                ))}
                {draft ? <button className="ml-auto rounded-md bg-orange-500 px-3 py-2 text-sm text-white" onClick={() => setRulesOpen(true)}>{labels.saveFence}</button> : null}
              </div>
            </div>
            <div className="min-h-[470px] overflow-auto">
              {fences.length ? fences.map((fence) => (
                <div key={fence.id} className={`border-b border-slate-100 p-4 ${selected?.id === fence.id ? "bg-blue-50" : ""}`}>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" checked={selectedIds.includes(fence.id)} onChange={(event) => setSelectedIds((prev) => (event.target.checked ? [...prev, fence.id] : prev.filter((id) => id !== fence.id)))} />
                    <button className="min-w-0 flex-1 text-left" onClick={() => setSelectedFence(fence)}>
                      <span className="block truncate font-medium text-slate-900">{fence.name}</span>
                      <span className="text-xs text-slate-500">{fence.type} - {fence.rulesJson.filter((rule) => rule.enabled).length} {labels.rules} - {fence.status}</span>
                    </button>
                    <button title={labels.modify} className="rounded-md p-2 text-blue-700 hover:bg-blue-100" onClick={() => { setSelectedFence(fence); setRulesOpen(true); }}><Edit3 className="h-4 w-4" /></button>
                    <button title={labels.delete} className="rounded-md p-2 text-red-700 hover:bg-red-100" onClick={() => remove([fence.id])}><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              )) : <div className="p-8 text-center text-sm text-slate-500">{labels.noData}</div>}
            </div>
          </section>
          <GeoFenceMap fences={fences} selectedId={selected?.id} mode={mode} center={center} draft={draft} onDraft={(geometry) => { setDraft(geometry); setRulesOpen(true); }} />
        </div>
      ) : (
        <section className="rounded-md border border-slate-200 bg-white p-5">
          <div className="grid gap-3 lg:grid-cols-4">
            <input className="rounded-md border px-3 py-2 text-sm" placeholder={labels.deviceId} value={deviceId} onChange={(event) => setDeviceId(event.target.value)} />
            <select className="rounded-md border px-3 py-2 text-sm" value={queryType} onChange={(event) => setQueryType(event.target.value as DeviceFenceQueryType)}>
              <option value="CIRCLE_FENCE_LIST">CircleFenceList</option>
              <option value="POLYGON_FENCE_LIST">PolygonFenceList</option>
              <option value="FENCE_RULE_LIST">FenceRuleList</option>
            </select>
            <select className="rounded-md border px-3 py-2 text-sm"><option>{labels.block1}</option></select>
            <button className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white" onClick={async () => setQueryResult(await readDeviceFences(deviceId, queryType, 1))}>{labels.getFenceRuleInfo}</button>
          </div>
          <pre className="mt-5 min-h-80 overflow-auto rounded-md bg-slate-950 p-4 text-xs text-slate-100">{queryResult ? JSON.stringify(queryResult, null, 2) : labels.noData}</pre>
          <button className="mt-3 rounded-md border px-4 py-2 text-sm" onClick={() => setQueryResult(undefined)}>{labels.clearResult}</button>
        </section>
      )}
      <RulesModal open={rulesOpen} initial={selectedFence} type={mode} geometry={draft} labels={labels} onClose={() => setRulesOpen(false)} onSave={save} />
      <SendFenceModal open={sendOpen} selectedIds={selectedIds} labels={labels} onClose={() => setSendOpen(false)} onSent={() => undefined} />
    </div>
  );
}
