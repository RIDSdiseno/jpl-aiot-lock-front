import { createBrowserRouter, Navigate } from "react-router-dom";
import { LayoutPrincipal } from "../componentes/layout/LayoutPrincipal";
import { almacenamiento } from "../librerias/almacenamiento";
import { PaginaLogin } from "../modulos/autenticacion/paginas/PaginaLogin";
import { PaginaInicio } from "../modulos/inicio/paginas/PaginaInicio";
import { PaginaDispositivos } from "../modulos/dispositivos/paginas/PaginaDispositivos";
import { PaginaDetalleDispositivo } from "../modulos/dispositivos/paginas/PaginaDetalleDispositivo";
import { PaginaCandadosInteligentes } from "../modulos/dispositivos/paginas/PaginaCandadosInteligentes";
import { PaginaEventos } from "../modulos/eventos/paginas/PaginaEventos";
import { PaginaMapa } from "../modulos/gis/paginas/PaginaMapa";
import { PaginaAlertas } from "../modulos/alertas/paginas/PaginaAlertas";
import { PaginaAuditoria } from "../modulos/auditoria/paginas/PaginaAuditoria";
import { PaginaReportes } from "../modulos/reportes/paginas/PaginaReportes";
import { PaginaMantenimiento } from "../modulos/mantenimiento/paginas/PaginaMantenimiento";
import { PaginaHistorial } from "../modulos/historial/paginas/PaginaHistorial";
import { PaginaUsuarios } from "../modulos/usuarios/paginas/PaginaUsuarios";
import { PaginaDetalleUsuario } from "../modulos/usuarios/paginas/PaginaDetalleUsuario";
import { PaginaRolesPermisos } from "../modulos/usuarios/paginas/PaginaRolesPermisos";
import { PaginaEmpresas } from "../modulos/empresas/paginas/PaginaEmpresas";
import { PaginaDetalleEmpresa } from "../modulos/empresas/paginas/PaginaDetalleEmpresa";
import { RutaProtegida } from "../rutas/RutaProtegida";
import { RutaPublica } from "../rutas/RutaPublica";
import { EncabezadoPagina } from "../componentes/layout/EncabezadoPagina";
import { EstadoVacio } from "../componentes/comunes/EstadoVacio";

function RedireccionRaiz() {
  return <Navigate to={almacenamiento.obtenerToken() ? "/app/inicio" : "/login"} replace />;
}

function PaginaSimple({ titulo }: { titulo: string }) {
  return <><EncabezadoPagina titulo={titulo} /><EstadoVacio titulo={`${titulo} listo para integrar`} /></>;
}

export const router = createBrowserRouter([
  { path: "/", element: <RedireccionRaiz /> },
  { path: "/login", element: <RutaPublica><PaginaLogin /></RutaPublica> },
  {
    path: "/app",
    element: <RutaProtegida><LayoutPrincipal /></RutaProtegida>,
    children: [
      { index: true, element: <Navigate to="/app/inicio" replace /> },
      { path: "inicio", element: <PaginaInicio /> },
      { path: "monitoreo", element: <PaginaSimple titulo="Monitoreo" /> },
      { path: "control", element: <PaginaSimple titulo="Control" /> },
      { path: "eventos", element: <PaginaEventos /> },
      { path: "gis", element: <PaginaMapa /> },
      { path: "alertas", element: <PaginaAlertas /> },
      { path: "reportes", element: <PaginaReportes /> },
      { path: "auditoria", element: <PaginaAuditoria /> },
      { path: "dispositivos", element: <PaginaDispositivos /> },
      { path: "dispositivos/:dispositivoId", element: <PaginaDetalleDispositivo /> },
      { path: "candados", element: <PaginaCandadosInteligentes /> },
      { path: "mantenimiento", element: <PaginaMantenimiento /> },
      { path: "historial", element: <PaginaHistorial /> },
      { path: "usuarios", element: <PaginaUsuarios /> },
      { path: "usuarios/:usuarioId", element: <PaginaDetalleUsuario /> },
      { path: "roles-permisos", element: <PaginaRolesPermisos /> },
      { path: "empresas", element: <PaginaEmpresas /> },
      { path: "empresas/:empresaId", element: <PaginaDetalleEmpresa /> },
    ],
  },
]);
