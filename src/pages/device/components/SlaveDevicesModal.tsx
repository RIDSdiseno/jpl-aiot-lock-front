import { Modal } from "../../../componentes/comunes/Modal";
import { formatearFecha } from "../../../librerias/fechas";
import type { Device } from "../../../types/device.types";
import { DeviceStatusBadge } from "./DeviceStatusBadge";

export function SlaveDevicesModal({ open, devices, loading, onClose }: { open: boolean; devices: Device[]; loading?: boolean; onClose: () => void }) {
  return (
    <Modal abierto={open} titulo="Slave Devices" onCerrar={onClose}>
      {loading ? <p className="text-sm text-slate-500">Loading slave devices...</p> : devices.length === 0 ? (
        <p className="text-sm text-slate-600">No slave devices associated with this device.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-xs uppercase text-slate-500"><tr><th>Sort No.</th><th>Slave Device ID</th><th>Slave Device name</th><th>Type</th><th>Status</th><th>Created at</th><th>Operate</th></tr></thead>
            <tbody>
              {devices.map((device, index) => (
                <tr key={device.id} className="border-t border-slate-100">
                  <td className="py-2">{index + 1}</td>
                  <td>{device.deviceId}</td>
                  <td>{device.deviceName || "—"}</td>
                  <td>{device.deviceType || "—"}</td>
                  <td><DeviceStatusBadge status={device.status} /></td>
                  <td>{device.createdAt ? formatearFecha(device.createdAt) : "—"}</td>
                  <td>—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Modal>
  );
}
