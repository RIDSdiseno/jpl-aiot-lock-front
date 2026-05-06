import type { NfcCardItem } from "../../types/control.types";

export function NfcCardList({ cards }: { cards: NfcCardItem[] }) {
  if (!cards.length) {
    return <div className="rounded border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">No NFC cards for this block.</div>;
  }

  return (
    <div className="overflow-hidden rounded border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">Card number</th>
            <th className="px-4 py-3">Block</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Synced at</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {cards.map((card) => (
            <tr key={card.id}>
              <td className="px-4 py-3 font-medium text-slate-900">{card.cardNumber}</td>
              <td className="px-4 py-3 text-slate-600">{card.blockNumber ?? "Block 1"}</td>
              <td className="px-4 py-3 text-slate-600">{card.status}</td>
              <td className="px-4 py-3 text-slate-500">{card.syncedAt ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
