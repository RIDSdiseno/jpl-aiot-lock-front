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
      <DynamicPasswordPanel data={passwordQuery.data} onRefresh={() => void passwordQuery.refetch()} loading={passwordQuery.isFetching} />
    </>
  );
}

export function PasswordPage() {
  return <ControlLayout section="Password">{({ selectedDevice }) => <PasswordContent selectedDevice={selectedDevice} />}</ControlLayout>;
}
