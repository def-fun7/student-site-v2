// components/MapView.tsx
'use client';

import { MapContainer, TileLayer, Marker, Popup, ScaleControl } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import { TitleBarControlWrapper } from '@/components/leafletControls/TitleBarControlWrapper';
import LocationButtonsWrapper from '../leafletControls/LocationButtonWrapper';
import useRealtimeMap from '../../hooks/useRealtimeMap';
import MapLoader from './MapLoader';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const center: LatLngExpression = [31.5497, 74.32236]; // Lahore

export default function MapView() {

  const divIcon = L.divIcon({
    html: `<div class="">
      <img src="/bus.svg" alt="marker" class="w-12 h-17 animate-bounce"" />
    </div>`,
    className: '', // prevent default styling
    iconSize: [30, 30],
  });

  const { loading, latestEntry , retry} = useRealtimeMap();
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        setTimedOut(true);
        toast.error("Location fetch timed out.");
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [loading]);

  if (loading && !timedOut) {
    return (
      <MapLoader />
    );
  }

  if (timedOut && !latestEntry) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-500">
        <ArrowPathIcon className="h-10 w-10 mb-2" />
        <span className="mb-4">Could not load location.</span>
        <button
          onClick={retry}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }
  const locationNow = latestEntry ? [latestEntry.lat, latestEntry.long] as LatLngExpression : center;

  return (
    <div className="h-[100vh] w-[100vw] p-0 flex flex-row justify-center items-center rounded-2xl overflow-hidden shadow-lg">
      <MapContainer
        center={locationNow}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={true}
        className="h-full w-full z-0 flex flex-row justify-center items-center">
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={locationNow} icon={divIcon}>
          <Popup>
            You are here: Lahore 🗺️
          </Popup>
        </Marker>

        <TitleBarControlWrapper />
        <LocationButtonsWrapper originalLocation={locationNow} />
        <ScaleControl position="bottomleft" />

      </MapContainer>
    </div>
  );
}

