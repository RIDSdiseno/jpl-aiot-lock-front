import { createBrowserRouter, Navigate } from "react-router-dom";
import { LayoutPrincipal } from "../componentes/layout/LayoutPrincipal";
import { almacenamiento } from "../librerias/almacenamiento";
import { PaginaLogin } from "../modulos/autenticacion/paginas/PaginaLogin";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { PaginaDispositivos } from "../modulos/dispositivos/paginas/PaginaDispositivos";
import { PaginaDetalleDispositivo } from "../modulos/dispositivos/paginas/PaginaDetalleDispositivo";
import { PaginaCandadosInteligentes } from "../modulos/dispositivos/paginas/PaginaCandadosInteligentes";
import { PaginaMapa } from "../modulos/gis/paginas/PaginaMapa";
import { MonitoringPage } from "../pages/monitoring/MonitoringPage";
import { CmdRecordPage } from "../pages/control/commands/CmdRecordPage";
import { NfcPage } from "../pages/control/nfc/NfcPage";
import { ParameterPage } from "../pages/control/parameter/ParameterPage";
import { PasswordPage } from "../pages/control/password/PasswordPage";
import { AlarmEventsPage } from "../pages/events/alarm-event/AlarmEventsPage";
import { AllEventsPage } from "../pages/events/all-events/AllEventsPage";
import { PushEventsPage } from "../pages/events/push-event/PushEventsPage";
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

function RedireccionRaiz() {
  return <Navigate to={almacenamiento.obtenerToken() ? "/app/inicio" : "/login"} replace />;
}

export const router = createBrowserRouter([
  { path: "/", element: <RedireccionRaiz /> },
  { path: "/dashboard", element: <Navigate to="/app/dashboard" replace /> },
  { path: "/monitoring", element: <Navigate to="/app/monitoreo" replace /> },
  { path: "/control/nfc", element: <Navigate to="/app/control/nfc" replace /> },
  { path: "/control/password", element: <Navigate to="/app/control/password" replace /> },
  { path: "/control/cmd-record", element: <Navigate to="/app/control/cmd-record" replace /> },
  { path: "/control/parameter", element: <Navigate to="/app/control/parameter" replace /> },
  { path: "/event/all-events", element: <Navigate to="/app/event/all-events" replace /> },
  { path: "/event/alarm-event", element: <Navigate to="/app/event/alarm-event" replace /> },
  { path: "/event/push-event", element: <Navigate to="/app/event/push-event" replace /> },
  { path: "/login", element: <RutaPublica><PaginaLogin /></RutaPublica> },
  {
    path: "/app",
    element: <RutaProtegida><LayoutPrincipal /></RutaProtegida>,
    children: [
      { index: true, element: <Navigate to="/app/inicio" replace /> },
      { path: "inicio", element: <DashboardPage /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "monitoreo", element: <MonitoringPage /> },
      { path: "control", element: <Navigate to="/app/control/nfc" replace /> },
      { path: "control/nfc", element: <NfcPage /> },
      { path: "control/password", element: <PasswordPage /> },
      { path: "control/cmd-record", element: <CmdRecordPage /> },
      { path: "control/parameter", element: <ParameterPage /> },
      { path: "eventos", element: <Navigate to="/app/event/all-events" replace /> },
      { path: "eventos/todos", element: <Navigate to="/app/event/all-events" replace /> },
      { path: "eventos/alarmas", element: <Navigate to="/app/event/alarm-event" replace /> },
      { path: "eventos/push", element: <Navigate to="/app/event/push-event" replace /> },
      { path: "event", element: <Navigate to="/app/event/all-events" replace /> },
      { path: "event/all-events", element: <AllEventsPage /> },
      { path: "event/alarm-event", element: <AlarmEventsPage /> },
      { path: "event/push-event", element: <PushEventsPage /> },
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
