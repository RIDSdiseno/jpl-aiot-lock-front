import { useMutation, useQuery } from "@tanstack/react-query";
import { Download } from "lucide-react";
import { useState } from "react";
import { Boton } from "../../componentes/comunes/Boton";
import { EncabezadoPagina } from "../../componentes/layout/EncabezadoPagina";
import { useI18n } from "../../i18n/i18nStore";
import { api, extraerDatos } from "../../librerias/api";
import { formatearFecha } from "../../librerias/fechas";

type AuditLog = { id: string; username?: string | null; companyName?: string | null; action: string; module?: string; entity: string; description?: string | null; ipAddress?: string | null; userAgent?: string | null; createdAt: string };

export function UserLogPage() {
  const { t } = useI18n();
  const labels = t.audit ?? {};
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [filters, setFilters] = useState<Record<string, string>>({});
  const logs = useQuery({ queryKey: ["audit-logs", filters], queryFn: async () => extraerDatos<AuditLog[]>(await api.get("/audit/logs", { params: filters })) });
  const exportLogs = useMutation({
    mutationFn: () => api.post("/audit/logs/export", { filters }, { responseType: "blob" }),
    onSuccess: (response) => {
      const url = URL.createObjectURL(response.data as Blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "audit-logs.csv";
      link.click();
      URL.revokeObjectURL(url);
    },
  });
  return (
    <>
      <EncabezadoPagina titulo={labels.title ?? "Audit"} acciones={<Boton icono={<Download className="h-4 w-4" />} onClick={() => exportLogs.mutate()}>{labels.export ?? "Export"}</Boton>} />
      <div className="space-y-4">
        <section className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="grid gap-3 md:grid-cols-5">
            {["user", "module", "action", "startDate", "endDate"].map((key) => <input key={key} type={key.includes("Date") ? "date" : "text"} className="rounded-md border border-slate-200 px-3 py-2 text-sm" placeholder={labels[key] ?? key} value={draft[key] ?? ""} onChange={(event) => setDraft({ ...draft, [key]: event.target.value })} />)}
            <Boton onClick={() => setFilters(draft)}>{labels.search ?? "Search"}</Boton>
            <Boton variante="secundario" onClick={() => { setDraft({}); setFilters({}); }}>{labels.reset ?? "Reset"}</Boton>
          </div>
        </section>
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500"><tr>{["Sort No.", labels.user, labels.company, labels.action, labels.module, labels.description, labels.ipAddress, labels.userAgent, labels.createdTime].map((head) => <th key={head} className="whitespace-nowrap px-4 py-3">{head}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-100">{(logs.data ?? []).map((item, index) => <tr key={item.id}><td className="px-4 py-3">{index + 1}</td><td className="px-4 py-3">{item.username ?? "-"}</td><td className="px-4 py-3">{item.companyName ?? "-"}</td><td className="px-4 py-3">{item.description ?? item.action}</td><td className="px-4 py-3">{item.module ?? item.entity}</td><td className="px-4 py-3">{item.description ?? "-"}</td><td className="px-4 py-3">{item.ipAddress ?? "-"}</td><td className="max-w-xs truncate px-4 py-3">{item.userAgent ?? "-"}</td><td className="px-4 py-3">{formatearFecha(item.createdAt)}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
