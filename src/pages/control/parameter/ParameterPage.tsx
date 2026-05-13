import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ControlLayout } from "../ControlLayout";
import { ControlSelectedDeviceBanner } from "../components/ControlSelectedDeviceBanner";
import type { ControlDevice, DeviceParameterField } from "../types/control.types";
import type { ParameterStatus, ParameterUpdateInput } from "../../../types/parameter.types";
import { ParameterActions } from "./components/ParameterActions";
import { ParameterCategoryTabs, parameterCategories } from "./components/ParameterCategoryTabs";
import { ParameterForm } from "./components/ParameterForm";
import { ParameterHistoryPanel } from "./components/ParameterHistoryPanel";
import { ParameterReadStatus } from "./components/ParameterReadStatus";
import { ParameterReadTime } from "./components/ParameterReadTime";
import { ParameterReserveCommandModal } from "./components/ParameterReserveCommandModal";
import { useDeviceParameters } from "./hooks/useDeviceParameters";

function fieldFingerprint(field: DeviceParameterField) {
  return JSON.stringify(field.value ?? "");
}

function flattenSnapshot(snapshot?: Record<string, DeviceParameterField[]> | null) {
  return snapshot ? Object.values(snapshot).flat() : [];
}

function ParameterContent({ selectedDevice }: { selectedDevice?: ControlDevice }) {
  const navigate = useNavigate();
  const [category, setCategory] = useState("COMMUNICATION");
  const [fields, setFields] = useState<DeviceParameterField[]>([]);
  const [baseline, setBaseline] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<ParameterStatus | undefined>();
  const [message, setMessage] = useState("");
  const [readTime, setReadTime] = useState<string | null>(null);
  const [reserveMode, setReserveMode] = useState<"batch" | "single" | null>(null);
  const parameters = useDeviceParameters(selectedDevice?.deviceId);

  const categories = parameters.schemaQuery.data?.categories ?? parameterCategories;
  const dirtyKeys = useMemo(() => new Set(fields.filter((field) => baseline[field.key] !== fieldFingerprint(field)).map((field) => field.key)), [baseline, fields]);
  const visibleFields = fields.filter((field) => field.category === category);

  useEffect(() => {
    const loaded = parameters.parametersQuery.data?.fields ?? [];
    setFields(loaded);
    setBaseline(Object.fromEntries(loaded.map((field) => [field.key, fieldFingerprint(field)])));
    setReadTime(parameters.parametersQuery.data?.readTime ?? null);
    setStatus(undefined);
    setMessage("");
  }, [parameters.parametersQuery.data?.deviceId, selectedDevice?.deviceId, parameters.parametersQuery.data?.readTime]);

  function replaceFields(next: DeviceParameterField[], nextStatus: ParameterStatus, nextMessage: string, nextReadTime?: string | null) {
    setFields(next);
    setBaseline(Object.fromEntries(next.map((field) => [field.key, fieldFingerprint(field)])));
    setStatus(nextStatus);
    setMessage(nextMessage);
    if (nextReadTime !== undefined) setReadTime(nextReadTime);
  }

  function onFieldChange(updated: DeviceParameterField) {
    setFields((current) => current.map((field) => (field.key === updated.key ? updated : field)));
  }

  function buildUpdates(): ParameterUpdateInput[] {
    return fields
      .filter((field) => dirtyKeys.has(field.key))
      .map((field) => ({
        key: field.key,
        value: field.value ?? "",
      }));
  }

  return (
    <>
      <ControlSelectedDeviceBanner device={selectedDevice} />
      {selectedDevice ? (
        <div className="flex flex-wrap items-center gap-2 rounded border border-slate-200 bg-white px-4 py-3 text-sm">
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
              selectedDevice.status === "ONLINE" ? "bg-emerald-100 text-emerald-700" : selectedDevice.status === "SLEEP" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"
            }`}
          >
            {selectedDevice.status === "SLEEP" ? "Sleep" : selectedDevice.isOnline ? "Online" : "Offline"}
          </span>
          <span className="text-slate-600">{selectedDevice.companyName}</span>
          <span className="text-slate-400">/</span>
          <span className="font-medium text-slate-900">{selectedDevice.name ?? selectedDevice.deviceId}</span>
        </div>
      ) : null}
      <ParameterReadStatus status={status} message={message} />
      <div className="grid gap-4 xl:grid-cols-[14rem_minmax(0,1fr)_18rem]">
        <ParameterCategoryTabs active={category} categories={categories} onChange={setCategory} />
        <div className="min-w-0 space-y-4">
          <ParameterForm fields={visibleFields} dirtyKeys={dirtyKeys} onChange={onFieldChange} />
          <ParameterReadTime value={readTime} />
          <ParameterActions
            disabled={!selectedDevice}
            busy={parameters.read.isPending || parameters.update.isPending}
            onBatchReserve={() => setReserveMode("batch")}
            onReservationRecord={() => navigate(`/app/control/cmd-record?deviceId=${selectedDevice?.deviceId ?? ""}`)}
            onReservation={() => setReserveMode("single")}
            onRead={() => {
              if (!selectedDevice) {
                setStatus("FAILED");
                setMessage("Please select a device first.");
                return;
              }
              setStatus("PENDING");
              setMessage("Reading device parameters...");
              parameters.read.mutate(undefined, {
                onSuccess: (result) => {
                  if (result.status === "OFFLINE") {
                    const lastFields = flattenSnapshot(result.lastSnapshot?.parameters);
                    if (lastFields.length) replaceFields(lastFields, "OFFLINE", "Device is offline. Last saved parameters are displayed.", result.lastSnapshot?.readAt ?? null);
                    else {
                      setStatus("OFFLINE");
                      setMessage("Device is offline. No saved parameters are available.");
                    }
                    return;
                  }
                  replaceFields(result.fields ?? [], result.status, result.message ?? "Device parameters read successfully", result.readTime ?? result.data?.readAt ?? null);
                },
                onError: () => {
                  setStatus("FAILED");
                  setMessage("Failed to read device parameters.");
                },
              });
            }}
            onUpdate={() => {
              if (!selectedDevice) {
                setStatus("FAILED");
                setMessage("Please select a device first.");
                return;
              }
              const updates = buildUpdates();
              if (!updates.length) {
                setStatus("FAILED");
                setMessage("No modified parameters to update.");
                return;
              }
              if (!window.confirm("Are you sure you want to update device parameters?")) return;
              setStatus("PENDING");
              setMessage("Sending parameter update...");
              parameters.update.mutate(updates, {
                onSuccess: (result) => {
                  setStatus(result.status);
                  setMessage(result.message ?? "Device parameters updated successfully");
                  if (result.fields?.length) replaceFields(result.fields, result.status, result.message ?? "Device parameters updated successfully", new Date().toISOString());
                  setBaseline(Object.fromEntries(fields.map((field) => [field.key, fieldFingerprint(field)])));
                },
                onError: () => {
                  setStatus("FAILED");
                  setMessage("Failed to update device parameters.");
                },
              });
            }}
          />
        </div>
        <ParameterHistoryPanel history={parameters.historyQuery.data} />
      </div>
      <ParameterReserveCommandModal
        open={reserveMode !== null}
        title={reserveMode === "batch" ? "Batch Reserve Command" : "Reservation CMD"}
        deviceLabel={selectedDevice ? `${selectedDevice.companyName} / ${selectedDevice.name ?? selectedDevice.deviceId}` : undefined}
        onClose={() => setReserveMode(null)}
        onConfirm={() => {
          if (!selectedDevice) {
            setReserveMode(null);
            setStatus("FAILED");
            setMessage("Please select a device first.");
            return;
          }
          parameters.reserve.mutate(undefined, {
            onSuccess: () => {
              setReserveMode(null);
              setStatus("SUCCESS");
              setMessage(reserveMode === "batch" ? "Batch reserve command created." : "Reservation CMD created.");
            },
            onError: () => {
              setReserveMode(null);
              setStatus("FAILED");
              setMessage("Failed to create reservation command.");
            },
          });
        }}
      />
    </>
  );
}

export function ParameterPage() {
  return <ControlLayout section="Parameter">{({ selectedDevice }) => <ParameterContent selectedDevice={selectedDevice} />}</ControlLayout>;
}
