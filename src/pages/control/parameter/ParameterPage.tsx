import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ControlLayout } from "../ControlLayout";
import { ControlSelectedDeviceBanner } from "../components/ControlSelectedDeviceBanner";
import type { ControlDevice, DeviceParameterField } from "../types/control.types";
import { ParameterActions } from "./components/ParameterActions";
import { ParameterCategoryTabs } from "./components/ParameterCategoryTabs";
import { ParameterForm } from "./components/ParameterForm";
import { ParameterReadTime } from "./components/ParameterReadTime";
import { useDeviceParameters } from "./hooks/useDeviceParameters";

function ParameterContent({ selectedDevice }: { selectedDevice?: ControlDevice }) {
  const navigate = useNavigate();
  const [category, setCategory] = useState("communication");
  const [fields, setFields] = useState<DeviceParameterField[]>([]);
  const [message, setMessage] = useState("");
  const parameters = useDeviceParameters(selectedDevice?.deviceId);

  useEffect(() => {
    setFields((parameters.parametersQuery.data?.fields ?? []).filter((field) => field.category === category));
  }, [category, parameters.parametersQuery.data]);

  return (
    <>
      <ControlSelectedDeviceBanner device={selectedDevice} />
      {message ? <div className="rounded border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</div> : null}
      <div className="flex flex-col gap-4 lg:flex-row">
        <ParameterCategoryTabs active={category} onChange={setCategory} />
        <div className="min-w-0 flex-1 space-y-4">
          <ParameterForm fields={fields} onChange={setFields} />
          <ParameterReadTime value={parameters.parametersQuery.data?.readTime} />
          <ParameterActions
            disabled={!selectedDevice}
            onBatchReserve={() => parameters.reserve.mutate(undefined, { onSuccess: () => setMessage("Batch reserve command created.") })}
            onReservationRecord={() => navigate(`/app/control/cmd-record?deviceId=${selectedDevice?.deviceId ?? ""}`)}
            onReservation={() => parameters.reserve.mutate(undefined, { onSuccess: () => setMessage("Reservation CMD created.") })}
            onRead={() => parameters.read.mutate(undefined, { onSuccess: () => setMessage("Parameters read from mock service.") })}
            onUpdate={() => parameters.update.mutate(fields, { onSuccess: () => setMessage("Parameters updated in mock service.") })}
          />
        </div>
      </div>
    </>
  );
}

export function ParameterPage() {
  return <ControlLayout section="Parameter">{({ selectedDevice }) => <ParameterContent selectedDevice={selectedDevice} />}</ControlLayout>;
}
