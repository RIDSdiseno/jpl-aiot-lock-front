import type { ReactNode } from "react";
import { useAppText } from "../../../i18n/text";
import { EmptyUserCenterState } from "./EmptyUserCenterState";

export function UserCenterTable({
  headers,
  rows,
  loading,
}: {
  headers: ReactNode[];
  rows: ReactNode[][];
  loading?: boolean;
}) {
  const tr = useAppText();
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
            <tr>{headers.map((head, index) => <th key={index} className="whitespace-nowrap px-4 py-3">{typeof head === "string" ? tr(head) : head}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td className="px-4 py-8 text-center text-slate-500" colSpan={headers.length}>{tr("Loading...")}</td></tr>
            ) : rows.length ? (
              rows.map((row, rowIndex) => <tr key={rowIndex} className="hover:bg-slate-50">{row.map((cell, cellIndex) => <td key={cellIndex} className="whitespace-nowrap px-4 py-3 text-slate-700">{cell}</td>)}</tr>)
            ) : (
              <tr><td colSpan={headers.length}><EmptyUserCenterState /></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
