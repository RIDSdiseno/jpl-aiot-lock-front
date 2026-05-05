import { useQuery } from "@tanstack/react-query";
import { getGeoFences } from "../services/monitoring.service";

export function useGeoFences(search: string) {
  return useQuery({
    queryKey: ["monitoring", "geofences", search],
    queryFn: () => getGeoFences(search),
  });
}
