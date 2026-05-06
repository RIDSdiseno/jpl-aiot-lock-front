import { Eye, EyeOff, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Boton } from "../../../../componentes/comunes/Boton";
import type { DynamicPasswordResponse } from "../../types/control.types";
import { PasswordSecurityNotice } from "./PasswordSecurityNotice";

export function DynamicPasswordPanel({
  data,
  onRefresh,
  loading,
}: {
  data?: DynamicPasswordResponse;
  onRefresh: () => void;
  loading?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const passwordText = data?.password && visible ? data.password : "••••••";

  return (
    <div className="rounded border border-slate-200 bg-gradient-to-br from-slate-900 to-blue-950 p-6 text-white shadow-sm">
      <div className="mx-auto max-w-xl space-y-5">
        <div>
          <h2 className="text-xl font-semibold">Unlock dynamic password</h2>
          <p className="mt-1 text-sm text-blue-100">{data?.generatedAt ? `Generated at ${data.generatedAt}` : "No password yet."}</p>
        </div>
        <div className="rounded border border-white/10 bg-white/10 p-5">
          {data?.hasPassword ? (
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-3xl tracking-normal">{passwordText}</span>
              <button
                type="button"
                onClick={() => setVisible((current) => !current)}
                className="rounded p-2 text-blue-100 hover:bg-white/10"
                aria-label={visible ? "Hide password" : "Show password"}
              >
                {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          ) : (
            <div className="text-sm text-blue-100">No password yet.</div>
          )}
        </div>
        <PasswordSecurityNotice warning={data?.warning ?? "Do not reveal the password to non-elock operators."} />
        <Boton type="button" variante="secundario" icono={<RefreshCw className="h-4 w-4" />} onClick={onRefresh} disabled={loading}>
          Update
        </Boton>
      </div>
    </div>
  );
}
