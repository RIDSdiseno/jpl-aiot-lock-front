import { Boton } from "../../../../componentes/comunes/Boton";
import type { DeviceCommandRecord } from "../../types/control.types";

export function CmdRecordTable({ records, onCancel }: { records: DeviceCommandRecord[]; onCancel: (id: string) => void }) {
  if (!records.length) {
    return <div className="rounded border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">No Data</div>;
  }

  return (
    <div className="overflow-x-auto rounded border border-slate-200 bg-white">
      <table className="min-w-[980px] w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            {["Sort No.", "Device ID", "CMD content", "CMD status", "Execution time", "Content of response", "Submit reserved command", "Operator", "Operate"].map((heading) => (
              <th key={heading} className="px-4 py-3">{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {records.map((record) => (
            <tr key={record.id}>
              <td className="px-4 py-3">{record.sortNo ?? "-"}</td>
              <td className="px-4 py-3">{record.deviceId}</td>
              <td className="px-4 py-3">{record.commandContent ?? record.commandType}</td>
              <td className="px-4 py-3">{record.status}</td>
              <td className="px-4 py-3">{record.executionTime ?? "-"}</td>
              <td className="px-4 py-3">{record.responseContent ?? "-"}</td>
              <td className="px-4 py-3">{record.submittedReservedCommand ? "Yes" : "No"}</td>
              <td className="px-4 py-3">{record.operator ?? "-"}</td>
              <td className="px-4 py-3">
                {["PENDING", "RESERVED"].includes(record.status) ? (
                  <Boton type="button" variante="peligro" className="px-3 py-1.5" onClick={() => onCancel(record.id)}>
                    Cancel
                  </Boton>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
