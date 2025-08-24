import { useEffect } from 'react';
import L, { Map as LeafletMap, ControlPosition } from 'leaflet';

interface TitleBarOptions {
  map: LeafletMap | null;
  title?: string;
  position?: ControlPosition;
}

export const useTitleBarControl = ({
  map,
  title = '🗺️ My Awesome Map',
  position = 'topright',
}: TitleBarOptions) => {
  useEffect(() => {
    console.log('Initializing TitleBarControl with title:', title);
    if (!map) return;

    const TitleBarControl = L.Control.extend({
      options: {
        position,
      },

      onAdd() {
        const container = L.DomUtil.create('div');
        container.className = 'leaflet-control custom-title-bar';

        container.innerHTML = `
        <div style="
          position: fixed;
          top: 7%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(6px);
          padding: 8px 16px;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          font-size: 21px;
          z-index: 9999;
          pointer-events: none;
        ">
          ${title}
      </div>
`;


        return container;
      },

      onRemove() {
        // Optional cleanup logic
      },
    });

    const control = new TitleBarControl();
    control.addTo(map);

    return () => {
      control.remove();
    };
  }, [map, title, position]);
};
