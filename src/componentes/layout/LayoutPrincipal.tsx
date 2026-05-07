import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAutenticacionStore } from "../../modulos/autenticacion/store/autenticacion.store";
import { BarraLateral } from "./BarraLateral";
import { BarraSuperior } from "./BarraSuperior";

export function LayoutPrincipal() {
  const { accessToken, usuario, cargarUsuarioActual } = useAutenticacionStore();

  useEffect(() => {
    if (accessToken && !usuario) {
      void cargarUsuarioActual();
    }
  }, [accessToken, cargarUsuarioActual, usuario]);

  return (
    <div
      className="relative min-h-screen"
      style={{ background: "linear-gradient(160deg, #060d1b 0%, #050c18 100%)" }}
    >
      {/* Subtle grid pattern over entire app */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.018) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(6,182,212,0.018) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />
      <BarraLateral />
      <div className="relative z-10 lg:pl-72">
        <BarraSuperior />
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
