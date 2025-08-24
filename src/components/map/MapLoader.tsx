// components/MapLoader.tsx
import { MapIcon } from '@heroicons/react/24/outline';

const MapLoader = () => (
    <div className="flex flex-col items-center justify-center h-screen text-gray-500">
        <MapIcon className="h-12 w-12 animate-bounce mb-2" />
        <span className="animate-pulse text-lg">Loading latest location...</span>
    </div>
);

export default MapLoader;
