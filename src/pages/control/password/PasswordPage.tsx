import { ControlLayout } from "../ControlLayout";
import { ControlSelectedDeviceBanner } from "../components/ControlSelectedDeviceBanner";
import type { ControlDevice } from "../types/control.types";
import { DynamicPasswordPanel } from "./components/DynamicPasswordPanel";
import { useDynamicPassword } from "./hooks/useDynamicPassword";

function PasswordContent({ selectedDevice }: { selectedDevice?: ControlDevice }) {
  const passwordQuery = useDynamicPassword(selectedDevice?.deviceId);

  return (
    <>
      <ControlSelectedDeviceBanner device={selectedDevice} />
      {selectedDevice && !selectedDevice.isOnline ? <div className="rounded border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">El dispositivo está offline. La contraseña mostrada puede ser la última disponible.</div> : null}
      <DynamicPasswordPanel data={passwordQuery.data} onRefresh={() => passwordQuery.update.mutate()} loading={passwordQuery.isFetching || passwordQuery.update.isPending} />
    </>
  );
}

export function PasswordPage() {
  return <ControlLayout section="Password">{({ selectedDevice }) => <PasswordContent selectedDevice={selectedDevice} />}</ControlLayout>;
}
