import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { almacenamiento } from "../librerias/almacenamiento";

export function RutaPublica({ children }: { children: ReactNode }) {
  if (almacenamiento.obtenerToken()) return <Navigate to="/app/inicio" replace />;
  return children;
}
