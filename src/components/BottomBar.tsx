// components/ActionBar.js
"use client";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigateToMapPage } from '@/hooks/useNavigateToMapPage';

interface stateNameProps {
    stateName: string;
}

const BottomBar: React.FC<stateNameProps> = ({ stateName }) => {
    const { handleNavigate } = useNavigateToMapPage(); // ✅ Hook called inside component
    return (
        <div className=" w-[80vw] backdrop-blur-md bg-white/10 border border-white/20 text-white flex items-center justify-between px-6 py-4 rounded-lg shadow-md transition-all duration-300 ease-in-out">

            {/* Left Label */}
            <div className="font-bold text-lg">
                LOCATION
            </div>

            {/* Center Icon + Label */}
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-900 rounded-full" />
                <span className="text-white font-medium">{stateName}</span>
            </div>

            {/* Right Button */}
            <button
                onClick={handleNavigate}
                className="flex items-center gap-2 bg-blue-900 text-white border border-blue-300 px-4 py-2 rounded-full hover:bg-blue-600 transition">
                Go to Map
                <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
            </button>
        </div>
    );
}

export default BottomBar;   
