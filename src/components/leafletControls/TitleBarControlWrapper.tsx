'use client';
import { useMap } from 'react-leaflet';
import { useTitleBarControl } from '../../hooks/leafletControls/useTitleBarControl';

export function TitleBarControlWrapper() {
    const map = useMap();

    useTitleBarControl({
        map,
        title: '📍 Bus Router',
        position: 'topleft',
    });

    return null;
}
