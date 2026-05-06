import { useMutation, useQuery } from "@tanstack/react-query";
import { Download, Eye } from "lucide-react";
import { useState } from "react";
import { Boton } from "../../componentes/comunes/Boton";
import { Modal } from "../../componentes/comunes/Modal";
import { EncabezadoPagina } from "../../componentes/layout/EncabezadoPagina";
import { useI18n } from "../../i18n/i18nStore";
import { api, extraerDatos } from "../../librerias/api";
import { formatearFecha } from "../../librerias/fechas";

type DiagnosisLog = {
  id: string;
  deviceId: string;
  deviceName?: string | null;
  productModel?: string | null;
  companyId?: string | null;
  diagnosisType: string;
  logLevel: string;
  summary: string;
  fullLog: string;
  rawPayloadJson?: unknown;
  source: string;
  uploadedAt: string;
  uploadedByName?: string | null;
};

export function DiagnosisPage() {
  const { t } = useI18n();
  const labels = t.maintain ?? {};
  const historyLabels = t.history ?? {};
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [detail, setDetail] = useState<DiagnosisLog | null>(null);
  const logs = useQuery({ queryKey: ["diagnosis", filters], queryFn: async () => extraerDatos<DiagnosisLog[]>(await api.get("/maintain/diagnosis", { params: filters })) });
  const exportLogs = useMutation({
    mutationFn: () => api.post("/maintain/diagnosis/export", { filters }, { responseType: "blob" }),
    onSuccess: (response) => {
      const url = URL.createObjectURL(response.data as Blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "diagnosis.csv";
      link.click();
      URL.revokeObjectURL(url);
    },
  });

  return (
    <>
      <EncabezadoPagina titulo={labels.diagnosis ?? "Diagnosis"} descripcion={`${labels.title ?? "Maintain"} / ${labels.diagnosis ?? "Diagnosis"}`} acciones={<Boton icono={<Download className="h-4 w-4" />} onClick={() => exportLogs.mutate()}>{labels.export ?? "Export"}</Boton>} />
      <div className="space-y-4">
        <section className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="grid gap-3 md:grid-cols-4 xl:grid-cols-6">
            {["deviceId", "deviceName", "productModel", "uploadedBy"].map((key) => <input key={key} className="rounded-md border border-slate-200 px-3 py-2 text-sm" placeholder={key} value={draft[key] ?? ""} onChange={(event) => setDraft({ ...draft, [key]: event.target.value })} />)}
            <select className="rounded-md border border-slate-200 px-3 py-2 text-sm" value={draft.diagnosisType ?? ""} onChange={(event) => setDraft({ ...draft, diagnosisType: event.target.value })}>
              <option value="">{labels.diagnosisType ?? "Diagnosis type"}</option>
              {["NETWORK", "BLUETOOTH", "HARDWARE", "FIRMWARE", "GPS", "NFC", "BATTERY", "COMMUNICATION", "UNKNOWN"].map((value) => <option key={value}>{value}</option>)}
            </select>
            <select className="rounded-md border border-slate-200 px-3 py-2 text-sm" value={draft.logLevel ?? ""} onChange={(event) => setDraft({ ...draft, logLevel: event.target.value })}>
              <option value="">{labels.logLevel ?? "Log level"}</option>
              {["INFO", "WARNING", "ERROR", "CRITICAL"].map((value) => <option key={value}>{value}</option>)}
            </select>
            <Boton onClick={() => setFilters(draft)}>{labels.search ?? "Search"}</Boton>
            <Boton variante="secundario" onClick={() => { setDraft({}); setFilters({}); }}>{labels.reset ?? "Reset"}</Boton>
          </div>
        </section>
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500"><tr>{["Sort No.", historyLabels.deviceId, historyLabels.deviceName, historyLabels.productModel, historyLabels.company, labels.diagnosisType, labels.logLevel, labels.summary, "Source", labels.uploadTime, "Uploaded by", "Operate"].map((head) => <th key={head} className="whitespace-nowrap px-4 py-3">{head}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-100">{(logs.data ?? []).map((item, index) => <tr key={item.id}><td className="px-4 py-3">{index + 1}</td><td className="px-4 py-3">{item.deviceId}</td><td className="px-4 py-3">{item.deviceName ?? "-"}</td><td className="px-4 py-3">{item.productModel ?? "-"}</td><td className="px-4 py-3">{item.companyId ?? "-"}</td><td className="px-4 py-3">{item.diagnosisType}</td><td className="px-4 py-3">{item.logLevel}</td><td className="max-w-sm truncate px-4 py-3">{item.summary}</td><td className="px-4 py-3">{item.source}</td><td className="px-4 py-3">{formatearFecha(item.uploadedAt)}</td><td className="px-4 py-3">{item.uploadedByName ?? "-"}</td><td className="px-4 py-3"><button onClick={() => setDetail(item)}><Eye className="h-4 w-4 text-blue-600" /></button></td></tr>)}</tbody>
          </table>
        </div>
      </div>
      <Modal abierto={Boolean(detail)} titulo={labels.detail ?? "Detail"} onCerrar={() => setDetail(null)}>
        <div className="space-y-3 text-sm"><div>{labels.summary}: {detail?.summary}</div><pre className="max-h-80 overflow-auto rounded bg-slate-50 p-3 text-xs">{detail?.fullLog}</pre><pre className="max-h-60 overflow-auto rounded bg-slate-50 p-3 text-xs">{JSON.stringify(detail?.rawPayloadJson ?? {}, null, 2)}</pre></div>
      </Modal>
    </>
  );
}
