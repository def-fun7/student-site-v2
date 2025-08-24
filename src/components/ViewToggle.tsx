
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faGridHorizontal } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

interface ViewToggleProps {
    isMapView: boolean;
    onToggleView: () => void;
}

const ViewToggle : React.FC<ViewToggleProps> = ({ isMapView, onToggleView }) => {

    return (
        <button
            onClick={onToggleView}
            className="
        group relative
        h-9 w-fit
        overflow-hidden rounded-full border border-blue-300
        bg-blue-500  font-medium
        transition-colors duration-200
        hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-400
      "
        >
            <div
                className={`
          flex h-full w-[200%] items-center
          transition-transform duration-300
          ${isMapView ? 'translate-x-0' : '-translate-x-1/2'}
        `}
            >
                {/* Map View Icon */}
                <div className="flex h-full w-1/2 items-center justify-center text-white">
                    <FontAwesomeIcon icon={faMap} className="h-5 w-5 " />
                    <span className="ml-2">Map View</span>    
                </div>
                {/* List View Icon */}
                <div className="flex h-full w-1/2 items-center  justify-center text-white">
                    <span className="mr-2">List View</span>
                    <FontAwesomeIcon icon={faGridHorizontal} className="h-5 w-5 " />                    
                </div>
            </div>
        </button>
    );
};

export default ViewToggle;