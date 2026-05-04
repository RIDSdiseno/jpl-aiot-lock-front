import { ShieldCheck } from "lucide-react";
import { FormularioLogin } from "../../../componentes/login/FormularioLogin";

export function PaginaLogin() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.35),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.18),_transparent_30%)]" />
      <section className="relative w-full max-w-md rounded-lg border border-white/10 bg-white/95 p-8 shadow-2xl">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-lg bg-blue-600 text-white">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-950">JPL-AIOT-LOCK</h1>
          <p className="mt-2 text-sm text-slate-500">Plataforma AIoT de control de candados inteligentes.</p>
        </div>
        <FormularioLogin />
      </section>
    </main>
  );
}
