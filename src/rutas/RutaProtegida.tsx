import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { almacenamiento } from "../librerias/almacenamiento";

export function RutaProtegida({ children }: { children: ReactNode }) {
  if (!almacenamiento.obtenerToken()) return <Navigate to="/login" replace />;
  return children;
}
