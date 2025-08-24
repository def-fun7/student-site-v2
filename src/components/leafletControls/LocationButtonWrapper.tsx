import { useLocationButtons } from '@/hooks/leafletControls/useLocationButtons';
import { useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import React from 'react';

interface locationButtonProps {
    originalLocation: LatLngExpression;
}

const LocationButtonsWrapper: React.FC<locationButtonProps> = ({originalLocation}) => {
    const map = useMap();
    useLocationButtons({ map, originalLocation: originalLocation });
    return null;
}

export default LocationButtonsWrapper;