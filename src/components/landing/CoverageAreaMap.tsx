import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import * as React from "react";

import { Card } from "@/components/landing/Layout";
import { Button } from "@/components/ui/button";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { ArrowUpRight, MapPinned } from "lucide-react";

// Corrige os ícones do Marker no bundler (Vite)
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

type LatLng = { lat: number; lng: number };

function FitToBounds({ points }: { points: LatLng[] }) {
  const map = useMap();

  React.useEffect(() => {
    if (!points.length) return;

    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [18, 18] });
  }, [map, points]);

  return null;
}

async function geocodeAddress(address: string, signal?: AbortSignal): Promise<LatLng | null> {
  // 1) Provider com CORS amigável (geralmente funciona melhor em navegador)
  try {
    const url = `https://geocode.maps.co/search?q=${encodeURIComponent(address)}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal,
    });

    if (res.ok) {
      const data: Array<{ lat: string; lon: string }> = await res.json();
      const first = data?.[0];
      if (first) return { lat: Number(first.lat), lng: Number(first.lon) };
    }
  } catch {
    // ignora e tenta fallback abaixo
  }

  // 2) Fallback para Nominatim (pode falhar por CORS/rate limit)
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal,
    });

    if (res.ok) {
      const data: Array<{ lat: string; lon: string }> = await res.json();
      const first = data?.[0];
      if (first) return { lat: Number(first.lat), lng: Number(first.lon) };
    }
  } catch {
    // ignora e tenta fallback abaixo
  }

  // 3) Último recurso: centro aproximado da cidade (mantém o mapa funcional)
  if (/est[âa]ncia velha/i.test(address)) {
    return { lat: -29.65, lng: -51.183 };
  }

  return null;
}

type RegionPoint = LatLng & { name: string };

type CoverageAreaMapProps = {
  address: string;
  regionLabel: string;
  regionPoints: RegionPoint[];
};

export function CoverageAreaMap({ address, regionLabel, regionPoints }: CoverageAreaMapProps) {
  const [center, setCenter] = React.useState<LatLng | null>(null);
  const [status, setStatus] = React.useState<"idle" | "loading" | "error">("idle");

  React.useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    setCenter(null);

    geocodeAddress(address, controller.signal)
      .then((pos) => {
        if (!pos) {
          setStatus("error");
          setCenter(regionPoints[0] ?? null);
          return;
        }
        setCenter(pos);
        setStatus("idle");
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        console.error("Geocoding failed", err);
        setStatus("error");
        setCenter(regionPoints[0] ?? null);
      });

    return () => controller.abort();
  }, [address, regionPoints]);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(address)}&navigate=yes`;

  const boundsPoints: LatLng[] = React.useMemo(() => {
    const pts: LatLng[] = [];
    if (center) pts.push(center);
    pts.push(...regionPoints);
    return pts;
  }, [center, regionPoints]);

  return (
    <div className="mt-12">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-wide text-primary">Área que cobrimos</p>
          <h3 className="mt-2 text-balance text-xl font-semibold tracking-tight sm:text-2xl">Região do {regionLabel}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            No mapa abaixo, marcamos algumas cidades de referência dentro da região atendida pela nossa unidade móvel.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button asChild variant="premium" size="sm">
            <a href={googleMapsUrl} target="_blank" rel="noreferrer">
              <MapPinned /> Abrir no Google Maps <ArrowUpRight />
            </a>
          </Button>
          <Button asChild variant="hero" size="sm">
            <a href={wazeUrl} target="_blank" rel="noreferrer">
              Abrir no Waze <ArrowUpRight />
            </a>
          </Button>
        </div>
      </div>

      <Card className="mt-6 overflow-hidden p-0">
        <div className="relative aspect-[16/10]">
          {status === "loading" ? (
            <div className="absolute inset-0 grid place-items-center bg-card/40">
              <p className="text-sm text-muted-foreground">Carregando mapa…</p>
            </div>
          ) : null}

          {status === "error" ? (
            <div className="absolute inset-0 grid place-items-center bg-card/40">
              <p className="max-w-md px-6 text-center text-sm text-muted-foreground">
                Não foi possível localizar o endereço automaticamente. O mapa segue com uma centralização aproximada.
              </p>
            </div>
          ) : null}

          {center ? (
            <MapContainer center={[center.lat, center.lng]} zoom={10} scrollWheelZoom={false} className="h-full w-full">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {boundsPoints.length ? <FitToBounds points={boundsPoints} /> : null}

              <Marker position={[center.lat, center.lng]} />
              {regionPoints.map((p) => (
                <Marker key={p.name} position={[p.lat, p.lng]} />
              ))}
            </MapContainer>
          ) : null}
        </div>
      </Card>

      <p className="mt-3 text-xs text-muted-foreground">
        Base de referência: <span className="text-foreground/90">{address}</span>
      </p>
    </div>
  );
}
