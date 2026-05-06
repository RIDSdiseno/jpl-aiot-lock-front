import { useMemo, useState } from "react";
import { EstadoCarga } from "../../componentes/comunes/EstadoCarga";
import { EstadoVacio } from "../../componentes/comunes/EstadoVacio";
import { useGeoFences } from "../../hooks/useGeoFences";
import { useMonitoringDevices } from "../../hooks/useMonitoringDevices";
import type { MonitoringDevice, MonitoringStatusFilter } from "../../types/monitoring.types";
import { AdvanceCommandModal } from "./AdvanceCommandModal";
import { DynamicPasswordModal } from "./DynamicPasswordModal";
import { FenceModal } from "./FenceModal";
import { MonitoringLayout } from "./MonitoringLayout";
import { MonitoringMap } from "./MonitoringMap";
import { MonitoringSidebar } from "./MonitoringSidebar";
import { NfcModal } from "./NfcModal";
import { ParameterModal } from "./ParameterModal";
import { SealActionModal } from "./SealActionModal";
import { TrajectoryModal } from "./TrajectoryModal";
import type { MonitoringAction } from "./DeviceStatusPopup";

function monitoringErrorMessage(error: unknown) {
  if (error && typeof error === "object" && "response" in error) {
    const response = (error as { response?: { status?: number } }).response;
    if (response?.status === 404) return "El backend no encontro las rutas de Monitoring. Revisa el despliegue de Railway.";
    if (response?.status && response.status >= 500) return "El backend tuvo un problema cargando Monitoring.";
  }

  return "Verifica sesion, conexion y disponibilidad del backend.";
}

export function MonitoringPage() {
  const [status, setStatus] = useState<MonitoringStatusFilter>("all");
  const [deviceSearch, setDeviceSearch] = useState("");
  const [fenceSearch, setFenceSearch] = useState("");
  const [selectedDevice, setSelectedDevice] = useState<MonitoringDevice | undefined>();
  const [activeAction, setActiveAction] = useState<MonitoringAction | undefined>();

  const devicesQuery = useMonitoringDevices(status, deviceSearch);
  const geofencesQuery = useGeoFences(fenceSearch);

  const devices = devicesQuery.data ?? [];
  const geofences = geofencesQuery.data ?? [];
  const selected = useMemo(() => selectedDevice ?? devices[0], [devices, selectedDevice]);

  const openAction = (device: MonitoringDevice, action: MonitoringAction) => {
    setSelectedDevice(device);
    setActiveAction(action);
  };

  if (devicesQuery.isLoading || geofencesQuery.isLoading) return <EstadoCarga texto="Cargando Monitoring..." />;

  if (devicesQuery.isError || geofencesQuery.isError) {
    return (
      <EstadoVacio
        titulo="No se pudo cargar Monitoring"
        descripcion={monitoringErrorMessage(devicesQuery.error ?? geofencesQuery.error)}
      />
    );
  }

  return (
    <>
      <MonitoringLayout
        sidebar={
          <MonitoringSidebar
            devices={devices}
            geofences={geofences}
            selectedDeviceId={selected?.id}
            status={status}
            deviceSearch={deviceSearch}
            fenceSearch={fenceSearch}
            onStatusChange={setStatus}
            onDeviceSearchChange={setDeviceSearch}
            onFenceSearchChange={setFenceSearch}
            onSelectDevice={setSelectedDevice}
          />
        }
        map={<MonitoringMap devices={devices} geofences={geofences} selectedDevice={selected} onSelectDevice={setSelectedDevice} onAction={openAction} />}
      />
      <SealActionModal device={selected} mode="seal" open={activeAction === "seal"} onClose={() => setActiveAction(undefined)} />
      <SealActionModal device={selected} mode="unseal" open={activeAction === "unseal"} onClose={() => setActiveAction(undefined)} />
      <AdvanceCommandModal device={selected} open={activeAction === "advance"} onClose={() => setActiveAction(undefined)} />
      <ParameterModal device={selected} open={activeAction === "parameter"} onClose={() => setActiveAction(undefined)} />
      <FenceModal device={selected} open={activeAction === "fence"} onClose={() => setActiveAction(undefined)} />
      <DynamicPasswordModal device={selected} open={activeAction === "password"} onClose={() => setActiveAction(undefined)} />
      <TrajectoryModal device={selected} open={activeAction === "trajectory"} onClose={() => setActiveAction(undefined)} />
      <NfcModal device={selected} open={activeAction === "nfc"} onClose={() => setActiveAction(undefined)} />
    </>
  );
}
