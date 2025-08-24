"use client";
import React from 'react';
import { useState } from 'react';
import MapSVG from './map/MapSVG';
import TopBar from './TopBar';
import BottomBar from './BottomBar';

const ThreeDivsLayout = () => {

    const styleString: string = ` bg-transparent content-center flex items-center justify-center `;
    const [isMapView, setIsMapView] = useState(true);
    const [stateName, setStateName] = useState("Click to Select a location");

    const toggleView = () => {
        setIsMapView(!isMapView);
        // Logic to actually switch between the map and list views
    };


    return (
        <div className="flex flex-col h-screen">
            {/* Top div (20% height) */}
            <div className={styleString + "h-[15vh]"}>
                <TopBar isMapView={isMapView} onToggleView={toggleView} />

            </div>

            {/* Middle div (60% height) */}
            <div className={styleString+ " h-[70vh]"}>
                {isMapView ?
                    <MapSVG setStateName={setStateName}/> :
                    <div className="text-white p-4">List View Content Here</div>}
            </div>

            {/* Bottom div (20% height) */}
            <div className={styleString+ "h-[15vh]"}>
                <BottomBar stateName={stateName } />
            </div>
        </div>
    );
};

export default ThreeDivsLayout;