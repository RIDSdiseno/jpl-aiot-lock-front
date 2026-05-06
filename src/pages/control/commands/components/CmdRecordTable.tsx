import { Boton } from "../../../../componentes/comunes/Boton";
import type { DeviceCommandRecord } from "../../types/control.types";

export function CmdRecordTable({ records, onCancel, onResend, onDelete }: { records: DeviceCommandRecord[]; onCancel: (id: string) => void; onResend: (id: string) => void; onDelete: (id: string) => void }) {
  if (!records.length) {
    return <div className="rounded border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">No Data</div>;
  }

  return (
    <div className="overflow-x-auto rounded border border-slate-200 bg-white">
      <table className="min-w-[980px] w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            {["Sort No.", "Device ID", "Device name", "Command type", "Payload summary", "Status", "Progress", "Create time", "Update time", "Operator", "Operate"].map((heading) => (
              <th key={heading} className="px-4 py-3">{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {records.map((record) => (
            <tr key={record.id}>
              <td className="px-4 py-3">{record.sortNo ?? "-"}</td>
              <td className="px-4 py-3">{record.deviceId}</td>
              <td className="px-4 py-3">{record.deviceName ?? "-"}</td>
              <td className="px-4 py-3">{record.commandType}</td>
              <td className="px-4 py-3">{record.payloadSummary ?? record.commandContent ?? "-"}</td>
              <td className="px-4 py-3">{record.status}</td>
              <td className="px-4 py-3">{record.progress ?? 0}%</td>
              <td className="px-4 py-3">{record.createdAt}</td>
              <td className="px-4 py-3">{record.updatedAt ?? "-"}</td>
              <td className="px-4 py-3">{record.operator ?? "-"}</td>
              <td className="space-x-2 px-4 py-3">
                <button type="button" className="font-medium text-blue-600" onClick={() => alert(JSON.stringify(record, null, 2))}>View</button>
                <button type="button" className="font-medium text-blue-600" onClick={() => onResend(record.id)}>Resend</button>
                {["PENDING", "RESERVED"].includes(record.status) ? (
                  <Boton type="button" variante="peligro" className="px-3 py-1.5" onClick={() => onCancel(record.id)}>
                    Cancel
                  </Boton>
                ) : (
                  null
                )}
                <button type="button" className="font-medium text-red-600" onClick={() => onDelete(record.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
