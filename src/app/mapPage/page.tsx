// app/mapPage/page.tsx
"use client";
import BackgroundVideo from '@/components/BackgroundVideo';

import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('@/components/map/MapView'), {
    ssr: false,
});



export default function MapPage() {
    return (
        <main className="relative h-screen w-full">
            <BackgroundVideo />
            <div className="absolute inset-0 z-0 ocean-gradient-overlay flex flex-col justify-center items-center">
                <MapView />
            </div>
        </main>
    );
}
