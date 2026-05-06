import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ControlLayout } from "../ControlLayout";
import { ControlSelectedDeviceBanner } from "../components/ControlSelectedDeviceBanner";
import type { CommandRecordFilters } from "../services/command-record.service";
import type { ControlDevice } from "../types/control.types";
import { CmdRecordFilters } from "./components/CmdRecordFilters";
import { CmdRecordTable } from "./components/CmdRecordTable";
import { useCommandRecords } from "./hooks/useCommandRecords";

function CmdRecordContent({ selectedDevice }: { selectedDevice?: ControlDevice }) {
  const [searchParams] = useSearchParams();
  const initialDeviceId = searchParams.get("deviceId") ?? "";
  const [draftFilters, setDraftFilters] = useState<CommandRecordFilters>(initialDeviceId ? { deviceId: initialDeviceId } : {});
  const [filters, setFilters] = useState<CommandRecordFilters>(initialDeviceId ? { deviceId: initialDeviceId } : {});
  const records = useCommandRecords(filters);

  return (
    <>
      <ControlSelectedDeviceBanner device={selectedDevice} />
      <CmdRecordFilters
        filters={draftFilters}
        onChange={setDraftFilters}
        onSearch={() => setFilters(draftFilters)}
        onReset={() => {
          setDraftFilters({});
          setFilters({});
        }}
      />
      <CmdRecordTable
        records={records.recordsQuery.data ?? []}
        onCancel={(id) => records.cancel.mutate(id)}
        onResend={(id) => records.resend.mutate(id)}
        onDelete={(id) => records.remove.mutate(id)}
      />
    </>
  );
}

export function CmdRecordPage() {
  return <ControlLayout section="CMD Record">{({ selectedDevice }) => <CmdRecordContent selectedDevice={selectedDevice} />}</ControlLayout>;
}
