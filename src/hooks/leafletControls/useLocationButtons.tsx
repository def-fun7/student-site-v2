import { useEffect } from 'react';
import L, { Map as LeafletMap } from 'leaflet';
import toast from 'react-hot-toast';

interface LocationButtonsOptions {
    map: LeafletMap | null;
    originalLocation: L.LatLngExpression;
}

export const useLocationButtons = ({ map, originalLocation }: LocationButtonsOptions) => {
    useEffect(() => {
        if (!map) return;

        const container = L.DomUtil.create('div');
        container.className = 'leaflet-control custom-location-buttons';

        container.innerHTML = `
      <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 z-[1000]">
        <button id="go-current" class="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
          📍 My Location
        </button>
        <button id="go-original" class="bg-gray-800 text-white px-4 py-2 rounded shadow hover:bg-gray-700 transition">
          🎯 Lahore
        </button>
      </div>
    `;

        document.body.appendChild(container);

        const currentBtn = document.getElementById('go-current');
        const originalBtn = document.getElementById('go-original');

        let userMarker: L.Marker | null = null;

        currentBtn?.addEventListener('click', () => {
            toast.loading('Fetching your location...');

            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    toast.dismiss();
                    toast.success('Location found!');

                    const { latitude, longitude } = pos.coords;
                    const latlng = [latitude, longitude] as L.LatLngExpression;

                    map.flyTo(latlng, 15, { duration: 1.5 });

                    if (userMarker) map.removeLayer(userMarker);

                    const pulsingIcon = L.divIcon({
                        className: 'pulsing-icon',
                        html: `<div class="animate-ping w-6 h-6 bg-blue-500 rounded-full opacity-75"></div>
                   <div class="absolute w-3 h-3 bg-blue-700 rounded-full top-1.5 left-1.5"></div>`,
                        iconSize: [12, 12],
                        iconAnchor: [6, 6],
                    });

                    userMarker = L.marker(latlng, { icon: pulsingIcon }).addTo(map);
                },
                () => {
                    toast.dismiss();
                    toast.error('Unable to retrieve location');
                }
            );
        });

        originalBtn?.addEventListener('click', () => {
            map.flyTo(originalLocation, 13, { duration: 1.5 });
        });

        return () => {
            container.remove();
            if (userMarker) map.removeLayer(userMarker);
        };
    }, [map, originalLocation]);
};
