import { createBrowserRouter, Navigate } from "react-router-dom";
import { LayoutPrincipal } from "../componentes/layout/LayoutPrincipal";
import { almacenamiento } from "../librerias/almacenamiento";
import { PaginaLogin } from "../modulos/autenticacion/paginas/PaginaLogin";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { DevicePage } from "../pages/device/DevicePage";
import { PaginaDetalleDispositivo } from "../modulos/dispositivos/paginas/PaginaDetalleDispositivo";
import { PaginaCandadosInteligentes } from "../modulos/dispositivos/paginas/PaginaCandadosInteligentes";
import { PaginaMapa } from "../modulos/gis/paginas/PaginaMapa";
import { GeoFencePage } from "../pages/gis/GeoFencePage";
import { FenceRecordPage } from "../pages/gis/FenceRecordPage";
import { UserLogPage } from "../pages/audit/UserLogPage";
import { DeviceHistoryPage } from "../pages/history/DeviceHistoryPage";
import { DiagnosisPage } from "../pages/maintain/DiagnosisPage";
import { FirmwarePage } from "../pages/maintain/FirmwarePage";
import { OtaPage } from "../pages/maintain/OtaPage";
import { OtaUpgradeRecordPage } from "../pages/maintain/OtaUpgradeRecordPage";
import { OrganizationPage } from "../pages/user-center/OrganizationPage";
import { PermissionPage } from "../pages/user-center/PermissionPage";
import { UserPage } from "../pages/user-center/UserPage";
import { MonitoringPage } from "../pages/monitoring/MonitoringPage";
import { CmdRecordPage } from "../pages/control/commands/CmdRecordPage";
import { NfcPage } from "../pages/control/nfc/NfcPage";
import { ParameterPage } from "../pages/control/parameter/ParameterPage";
import { PasswordPage } from "../pages/control/password/PasswordPage";
import { PresetPage } from "../pages/control/preset/PresetPage";
import { AlarmEventsPage } from "../pages/events/alarm-event/AlarmEventsPage";
import { AllEventsPage } from "../pages/events/all-events/AllEventsPage";
import { PushEventsPage } from "../pages/events/push-event/PushEventsPage";
import { AppSealUnsealReportPage } from "../pages/reports/AppSealUnsealReportPage";
import { FenceRecordReportPage } from "../pages/reports/FenceRecordReportPage";
import { FenceSealUnsealReportPage } from "../pages/reports/FenceSealUnsealReportPage";
import { LockUnlockReportPage } from "../pages/reports/LockUnlockReportPage";
import { UserLogReportPage as ReportUserLogPage } from "../pages/reports/UserLogReportPage";
import { PaginaAlertas } from "../modulos/alertas/paginas/PaginaAlertas";
import { PaginaAuditoria } from "../modulos/auditoria/paginas/PaginaAuditoria";
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
  { path: "/device", element: <Navigate to="/app/device" replace /> },
  { path: "/control/nfc", element: <Navigate to="/app/control/nfc" replace /> },
  { path: "/control/password", element: <Navigate to="/app/control/password" replace /> },
  { path: "/control/cmd-record", element: <Navigate to="/app/control/cmd-record" replace /> },
  { path: "/control/preset", element: <Navigate to="/app/control/preset" replace /> },
  { path: "/control/parameter", element: <Navigate to="/app/control/parameter" replace /> },
  { path: "/event/all-events", element: <Navigate to="/app/event/all-events" replace /> },
  { path: "/event/alarm-event", element: <Navigate to="/app/event/alarm-event" replace /> },
  { path: "/event/push-event", element: <Navigate to="/app/event/push-event" replace /> },
  { path: "/reports/app-seal-unseal", element: <Navigate to="/app/reports/app-seal-unseal" replace /> },
  { path: "/reports/lock-unlock", element: <Navigate to="/app/reports/lock-unlock" replace /> },
  { path: "/reports/fence-seal-unseal", element: <Navigate to="/app/reports/fence-seal-unseal" replace /> },
  { path: "/reports/fence-record", element: <Navigate to="/app/reports/fence-record" replace /> },
  { path: "/reports/user-log", element: <Navigate to="/app/reports/user-log" replace /> },
  { path: "/events/all", element: <Navigate to="/app/event/all-events" replace /> },
  { path: "/events/alarms", element: <Navigate to="/app/event/alarm-event" replace /> },
  { path: "/events/push", element: <Navigate to="/app/event/push-event" replace /> },
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
      { path: "control/preset", element: <PresetPage /> },
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
      { path: "gis/geofences", element: <GeoFencePage /> },
      { path: "gis/fence-seal-unseal", element: <GeoFencePage /> },
      { path: "gis/fence-record", element: <FenceRecordPage /> },
      { path: "alertas", element: <PaginaAlertas /> },
      { path: "reportes", element: <Navigate to="/app/reports/lock-unlock" replace /> },
      { path: "reports", element: <Navigate to="/app/reports/lock-unlock" replace /> },
      { path: "reports/app-seal-unseal", element: <AppSealUnsealReportPage /> },
      { path: "reports/lock-unlock", element: <LockUnlockReportPage /> },
      { path: "reports/fence-seal-unseal", element: <FenceSealUnsealReportPage /> },
      { path: "reports/fence-record", element: <FenceRecordReportPage /> },
      { path: "reports/user-log", element: <ReportUserLogPage /> },
      { path: "auditoria", element: <PaginaAuditoria /> },
      { path: "audit", element: <UserLogPage /> },
      { path: "user-log", element: <UserLogPage /> },
      { path: "dispositivos", element: <DevicePage /> },
      { path: "dispositivos/:dispositivoId", element: <PaginaDetalleDispositivo /> },
      { path: "device", element: <DevicePage /> },
      { path: "devices", element: <DevicePage /> },
      { path: "devices/:dispositivoId", element: <PaginaDetalleDispositivo /> },
      { path: "devices/:dispositivoId/alarm-strategy", element: <PaginaDetalleDispositivo /> },
      { path: "candados", element: <PaginaCandadosInteligentes /> },
      { path: "mantenimiento", element: <PaginaMantenimiento /> },
      { path: "maintain", element: <Navigate to="/app/maintain/firmware" replace /> },
      { path: "maintain/firmware", element: <FirmwarePage /> },
      { path: "maintain/ota", element: <OtaPage /> },
      { path: "maintain/ota/records", element: <OtaUpgradeRecordPage /> },
      { path: "maintain/diagnosis", element: <DiagnosisPage /> },
      { path: "historial", element: <PaginaHistorial /> },
      { path: "history", element: <DeviceHistoryPage /> },
      { path: "user-center", element: <Navigate to="/app/user-center/organization" replace /> },
      { path: "user-center/organization", element: <OrganizationPage /> },
      { path: "user-center/permission", element: <PermissionPage /> },
      { path: "user-center/user", element: <UserPage /> },
      { path: "user-center/users", element: <UserPage /> },
      { path: "c_company", element: <Navigate to="/app/user-center/organization" replace /> },
      { path: "c_role", element: <Navigate to="/app/user-center/permission" replace /> },
      { path: "c_user", element: <Navigate to="/app/user-center/user" replace /> },
      { path: "usuarios", element: <PaginaUsuarios /> },
      { path: "usuarios/:usuarioId", element: <PaginaDetalleUsuario /> },
      { path: "roles-permisos", element: <PaginaRolesPermisos /> },
      { path: "empresas", element: <PaginaEmpresas /> },
      { path: "empresas/:empresaId", element: <PaginaDetalleEmpresa /> },
    ],
  },
]);
