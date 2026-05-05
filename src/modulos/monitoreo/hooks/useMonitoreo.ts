import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { TipoMapaMonitoreo } from "../../../componentes/monitoreo/SelectorCapaMapa";
import {
  obtenerArbolEmpresasMonitoreo,
  obtenerDispositivosMonitoreo,
  obtenerGeocercasMonitoreo,
  obtenerResumenMonitoreo,
} from "../servicios/monitoreo.service";
import type {
  DispositivoMonitoreo,
  EstadoFiltroMonitoreo,
  FiltrosDispositivosMonitoreo,
} from "../tipos/monitoreo.types";

export function useMonitoreo() {
  const [estadoFiltro, setEstadoFiltro] = useState<EstadoFiltroMonitoreo>("ALL");
  const [busqueda, setBusqueda] = useState("");
  const [dispositivoSeleccionado, setDispositivoSeleccionado] = useState<DispositivoMonitoreo | null>(null);
  const [idsDispositivosVisibles, setIdsDispositivosVisibles] = useState<Set<string>>(new Set());
  const [idsGeocercasVisibles, setIdsGeocercasVisibles] = useState<Set<string>>(new Set());
  const [empresaExpandida, setEmpresaExpandida] = useState<Set<string>>(new Set());
  const [tipoMapa, setTipoMapa] = useState<TipoMapaMonitoreo>("mapa");

  const filtrosDispositivos = useMemo<FiltrosDispositivosMonitoreo>(() => {
    const filtros: FiltrosDispositivosMonitoreo = {};
    if (estadoFiltro !== "ALL") filtros.status = estadoFiltro;
    if (busqueda.trim()) filtros.search = busqueda.trim();
    return filtros;
  }, [busqueda, estadoFiltro]);

  const resumenQuery = useQuery({
    queryKey: ["monitoreo", "resumen"],
    queryFn: obtenerResumenMonitoreo,
  });

  const dispositivosQuery = useQuery({
    queryKey: ["monitoreo", "dispositivos", filtrosDispositivos],
    queryFn: () => obtenerDispositivosMonitoreo(filtrosDispositivos),
  });

  const geocercasQuery = useQuery({
    queryKey: ["monitoreo", "geocercas"],
    queryFn: () => obtenerGeocercasMonitoreo(),
  });

  const arbolEmpresasQuery = useQuery({
    queryKey: ["monitoreo", "empresas-tree"],
    queryFn: obtenerArbolEmpresasMonitoreo,
  });

  const dispositivos = dispositivosQuery.data?.devices ?? [];
  const geocercas = geocercasQuery.data?.geofences ?? [];
  const empresasTree = arbolEmpresasQuery.data?.companies ?? [];

  useEffect(() => {
    setIdsGeocercasVisibles((actual) => {
      if (actual.size || !geocercas.length) return actual;
      return new Set(geocercas.map((geocerca) => geocerca.id));
    });
  }, [geocercas]);

  useEffect(() => {
    setIdsDispositivosVisibles((actual) => {
      if (actual.size || !dispositivos.length) return actual;
      return new Set(dispositivos.map((dispositivo) => dispositivo.id));
    });
  }, [dispositivos]);

  useEffect(() => {
    setEmpresaExpandida((actual) => {
      if (actual.size || !empresasTree.length) return actual;
      return new Set([empresasTree[0].id]);
    });
  }, [empresasTree]);

  const alternarDispositivoVisible = useCallback((id: string) => {
    setIdsDispositivosVisibles((actual) => {
      const siguiente = new Set(actual);
      if (siguiente.has(id)) siguiente.delete(id);
      else siguiente.add(id);
      return siguiente;
    });
  }, []);

  const alternarGeocercaVisible = useCallback((id: string) => {
    setIdsGeocercasVisibles((actual) => {
      const siguiente = new Set(actual);
      if (siguiente.has(id)) siguiente.delete(id);
      else siguiente.add(id);
      return siguiente;
    });
  }, []);

  const alternarEmpresaExpandida = useCallback((id: string) => {
    setEmpresaExpandida((actual) => {
      const siguiente = new Set(actual);
      if (siguiente.has(id)) siguiente.delete(id);
      else siguiente.add(id);
      return siguiente;
    });
  }, []);

  const refrescarMonitoreo = useCallback(() => {
    void resumenQuery.refetch();
    void dispositivosQuery.refetch();
    void geocercasQuery.refetch();
    void arbolEmpresasQuery.refetch();
  }, [arbolEmpresasQuery, dispositivosQuery, geocercasQuery, resumenQuery]);

  const cambiarEstadoFiltro = useCallback((estado: EstadoFiltroMonitoreo) => {
    setEstadoFiltro(estado);
    setDispositivoSeleccionado(null);
  }, []);

  return {
    estadoFiltro,
    cambiarEstadoFiltro,
    busqueda,
    cambiarBusqueda: setBusqueda,
    resumen: resumenQuery.data?.summary,
    dispositivos,
    geocercas,
    empresasTree,
    empresas: empresasTree,
    idsDispositivosVisibles,
    idsGeocercasVisibles,
    empresaExpandida,
    tipoMapa,
    cambiarTipoMapa: setTipoMapa,
    loading:
      resumenQuery.isLoading ||
      dispositivosQuery.isLoading ||
      geocercasQuery.isLoading ||
      arbolEmpresasQuery.isLoading,
    error:
      resumenQuery.isError ||
      dispositivosQuery.isError ||
      geocercasQuery.isError ||
      arbolEmpresasQuery.isError,
    isLoading:
      resumenQuery.isLoading ||
      dispositivosQuery.isLoading ||
      geocercasQuery.isLoading ||
      arbolEmpresasQuery.isLoading,
    isError:
      resumenQuery.isError ||
      dispositivosQuery.isError ||
      geocercasQuery.isError ||
      arbolEmpresasQuery.isError,
    seleccionarDispositivo: setDispositivoSeleccionado,
    alternarDispositivoVisible,
    alternarGeocercaVisible,
    alternarEmpresaExpandida,
    refrescarMonitoreo,
    dispositivoSeleccionado,
    limpiarSeleccion: () => setDispositivoSeleccionado(null),
  };
}
