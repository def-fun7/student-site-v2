// app/mapPage/page.tsx
"use client";
import MapView from '@/components/map/MapView';
import BackgroundVideo from '@/components/BackgroundVideo';

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
