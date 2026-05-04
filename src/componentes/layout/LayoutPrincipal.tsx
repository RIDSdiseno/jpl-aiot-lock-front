import { Outlet } from "react-router-dom";
import { BarraLateral } from "./BarraLateral";
import { BarraSuperior } from "./BarraSuperior";

export function LayoutPrincipal() {
  return (
    <div className="min-h-screen bg-slate-100">
      <BarraLateral />
      <div className="lg:pl-72">
        <BarraSuperior />
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
