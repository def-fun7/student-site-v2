// components/MapView.tsx
'use client';

import { MapContainer, TileLayer, Marker, Popup, ScaleControl } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import { TitleBarControlWrapper } from '@/components/leafletControls/TitleBarControlWrapper';
import LocationButtonsWrapper from './leafletControls/LocationButtonWrapper';

const center: LatLngExpression = [31.5497, 74.32236]; // Lahore

export default function MapView() {

  const divIcon = L.divIcon({
    html: `<div class="">
      <img src="/bus.svg" alt="marker" class="w-12 h-17 animate-bounce"" />
    </div>`,
    className: '', // prevent default styling
    iconSize: [30, 30],
  });

  return (
    <div className="h-[100vh] w-[100vw] p-0 flex flex-row justify-center items-center rounded-2xl overflow-hidden shadow-lg">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={true}
        className="h-full w-full z-0 flex flex-row justify-center items-center">
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center} icon={divIcon}>
          <Popup>
            You are here: Lahore 🗺️
          </Popup>
        </Marker>

        <TitleBarControlWrapper />
        <LocationButtonsWrapper originalLocation={center} />

        <ScaleControl position="bottomleft" />

      </MapContainer>
    </div>
  );
}
