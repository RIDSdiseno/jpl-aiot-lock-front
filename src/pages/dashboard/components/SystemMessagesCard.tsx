import { EstadoVacio } from "../../../componentes/comunes/EstadoVacio";
import type { DashboardSystemMessage } from "../types/dashboard.types";
import { useI18n } from "../../../i18n/i18nStore";

export function SystemMessagesCard({ messages }: { messages: DashboardSystemMessage[] }) {
  const { t } = useI18n();
  const sm = t.dashboard.systemMessages;

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-slate-900">{sm.title}</h2>
      <div className="mt-3 space-y-3">
        {messages.length === 0 ? (
          <EstadoVacio titulo={sm.noMessages} />
        ) : (
          messages.map((message) => (
            <article key={message.id} className="rounded border border-slate-100 bg-slate-50 p-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-800">{message.title}</h3>
                <span className="text-xs text-slate-500">{message.level}</span>
              </div>
              <p className="mt-1 text-sm text-slate-600">{message.message}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
