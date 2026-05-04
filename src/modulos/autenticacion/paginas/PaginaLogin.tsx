import { ShieldCheck } from "lucide-react";
import { FormularioLogin } from "../../../componentes/login/FormularioLogin";

export function PaginaLogin() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#081225] px-4">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.13)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(14,165,233,0.22),transparent_38%,rgba(37,99,235,0.2))]" />
      <section className="relative w-full max-w-md rounded-lg border border-cyan-300/40 bg-slate-950/90 p-8 text-white shadow-[0_0_45px_rgba(14,165,233,0.2)] backdrop-blur">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-lg border border-cyan-300/50 bg-blue-600/30 text-cyan-100">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-semibold text-white">JPL-AIOT-LOCK</h1>
          <p className="mt-2 text-sm text-cyan-100/80">Plataforma AIoT de control de candados inteligentes.</p>
        </div>
        <FormularioLogin />
      </section>
    </main>
  );
}
