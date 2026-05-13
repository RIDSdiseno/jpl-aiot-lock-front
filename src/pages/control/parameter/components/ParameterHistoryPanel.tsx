import type { ParameterHistoryResponse } from "../../../../types/parameter.types";

function formatDate(value?: string) {
  return value ? value.replace("T", " ").slice(0, 19) : "-";
}

export function ParameterHistoryPanel({ history }: { history?: ParameterHistoryResponse }) {
  const lastCommand = history?.commands?.[0];
  const snapshots = history?.snapshots?.slice(0, 4) ?? [];

  return (
    <aside className="rounded border border-slate-200 bg-white p-4">
      <h2 className="text-sm font-semibold text-slate-900">Last command</h2>
      {lastCommand ? (
        <div className="mt-3 space-y-1 text-sm text-slate-600">
          <div className="font-medium text-slate-900">{lastCommand.commandType}</div>
          <div>Status: {lastCommand.status}</div>
          <div>{formatDate(lastCommand.createdAt)}</div>
        </div>
      ) : (
        <div className="mt-3 text-sm text-slate-500">No command recorded yet.</div>
      )}

      <h2 className="mt-5 text-sm font-semibold text-slate-900">Read history</h2>
      <div className="mt-3 space-y-2">
        {snapshots.length ? (
          snapshots.map((snapshot) => (
            <div key={snapshot.id} className="rounded border border-slate-100 px-3 py-2 text-xs text-slate-600">
              <div className="font-medium text-slate-900">{snapshot.source}</div>
              <div>{formatDate(snapshot.readAt)}</div>
            </div>
          ))
        ) : (
          <div className="text-sm text-slate-500">No snapshots saved yet.</div>
        )}
      </div>
    </aside>
  );
}
