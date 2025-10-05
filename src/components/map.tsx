"use client";

import React, { useEffect, useRef } from "react";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

export default function Map() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any | null>(null);
  const roRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (mapRef.current) return;

    let mounted = true;
    let createdMarkers: any[] = [];

    (async () => {
      const LeafletModule = await import("leaflet");
      const L = LeafletModule?.default ?? LeafletModule;

      // usa immagini copiate in /public/leaflet
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: markerIcon2x,
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
      });

      if (!mounted || !containerRef.current) return;

      const map = L.map(containerRef.current, {
        center: [38.031884, 12.533437],
        zoom: 17,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        map
      );

      const markersData = [
        {
          position: [38.031884, 12.533437],
          popup: "Qui riposa Maria Rossi ❤️",
          openPopup: false,
        },
      ];

      createdMarkers = markersData.map((m) =>
        L.marker(m.position as [number, number])
          .addTo(map)
          .bindPopup(m.popup)
      );

      if (markersData[0]?.openPopup && createdMarkers[0]) {
        createdMarkers[0].openPopup();
      }

      // invalidazione dimensione al mount e quando il container cambia dimensione
      setTimeout(() => map.invalidateSize?.(), 100);
      roRef.current = new ResizeObserver(() => map.invalidateSize?.());
      roRef.current.observe(containerRef.current);

      mapRef.current = map;
    })();

    return () => {
      mounted = false;
      roRef.current?.disconnect();
      createdMarkers.forEach((m) => m.remove && m.remove());
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} style={{ height: "100%", width: "100%" }} />;
}
