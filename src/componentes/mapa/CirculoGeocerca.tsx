import { Circle } from "react-leaflet";

export function CirculoGeocerca({ latitud, longitud, radio = 300 }: { latitud: number; longitud: number; radio?: number }) {
  return <Circle center={[latitud, longitud]} radius={radio} pathOptions={{ color: "#2563eb", fillOpacity: 0.08 }} />;
}
