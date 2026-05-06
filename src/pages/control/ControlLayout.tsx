import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { MigasPan } from "../../componentes/layout/MigasPan";
import { getControlDevices } from "./services/control.service";
import { ControlDeviceSidebar } from "./components/ControlDeviceSidebar";
import type { ControlDevice, ControlStatusFilter } from "./types/control.types";

export function ControlLayout({
  section,
  children,
}: {
  section: string;
  children: (props: { selectedDevice?: ControlDevice }) => ReactNode;
}) {
  const [status, setStatus] = useState<ControlStatusFilter>("all");
  const [type, setType] = useState("AllType");
  const [search, setSearch] = useState("");
  const [selectedDevice, setSelectedDevice] = useState<ControlDevice | undefined>();

  const devicesQuery = useQuery({
    queryKey: ["control-devices", status, type, search],
    queryFn: () => getControlDevices({ status, type, search }),
  });

  const groups = devicesQuery.data ?? [];
  const firstDevice = useMemo(() => groups.flatMap((group) => group.devices).find((device) => device.selected) ?? groups[0]?.devices[0], [groups]);

  useEffect(() => {
    if (!selectedDevice && firstDevice) {
      setSelectedDevice(firstDevice);
    }
  }, [firstDevice, selectedDevice]);

  return (
    <div className="space-y-4">
      <div>
        <MigasPan items={["Home", "Control", section]} />
        <h1 className="mt-2 text-2xl font-semibold text-slate-950">Control</h1>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row">
        <ControlDeviceSidebar
          groups={groups}
          status={status}
          type={type}
          search={search}
          selectedDeviceId={selectedDevice?.deviceId}
          onStatusChange={setStatus}
          onTypeChange={setType}
          onSearchChange={setSearch}
          onSelectDevice={setSelectedDevice}
        />
        <section className="min-w-0 flex-1 space-y-4">{children({ selectedDevice })}</section>
      </div>
    </div>
  );
}
