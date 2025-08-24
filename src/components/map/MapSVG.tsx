"use client";

import React, { useState, useEffect } from 'react';

// Type for the style object
interface SVGStyle {
    [key: string]: string | number;
}

interface mapProps { 
    setStateName: (name: string) => void;
}
// This function converts a CSS string to a JS object
const convertStyleStringToObject = (styleString: string): SVGStyle => {
    const styleObject: SVGStyle = {};
    styleString.split(';').forEach(pair => {
        if (pair.trim() === '') return;
        const [key, value] = pair.split(':').map(s => s.trim());
        if (key && value) {
            const camelCaseKey = key.replace(/-./g, x => x[1].toUpperCase());
            styleObject[camelCaseKey] = value;
        }
    });
    return styleObject;
};

// Define your color map here
const STATE_COLORS: { [key: string]: string } = {
    'AL': '#f44336', // Alabama
    'AK': '#e91e63', // Alaska
    'AZ': '#9c27b0', // Arizona
    'AR': '#673ab7', // Arkansas
    'CA': '#3f51b5', // California
    'CO': '#2196f3', // Colorado
    'CT': '#03a9f4', // Connecticut
    'DE': '#00bcd4', // Delaware
    'FL': '#009688', // Florida
    'GA': '#4caf50', // Georgia
    'HI': '#8bc34a', // Hawaii
    'ID': '#cddc39', // Idaho
    'IL': '#ffeb3b', // Illinois
    'IN': '#ffc107', // Indiana
    'IA': '#ff9800', // Iowa
    'KS': '#ff5722', // Kansas
    'KY': '#795548', // Kentucky
    'LA': '#9e9e9e', // Louisiana
    'ME': '#607d8b', // Maine
    'MD': '#f44336', // Maryland
    'MA': '#e91e63', // Massachusetts
    'MI': '#9c27b0', // Michigan
    'MN': '#673ab7', // Minnesota
    'MS': '#3f51b5', // Mississippi
    'MO': '#2196f3', // Missouri
    'MT': '#03a9f4', // Montana
    'NE': '#00bcd4', // Nebraska
    'NV': '#009688', // Nevada
    'NH': '#4caf50', // New Hampshire
    'NJ': '#8bc34a', // New Jersey
    'NM': '#cddc39', // New Mexico
    'NY': '#ffeb3b', // New York
    'NC': '#ffc107', // North Carolina
    'ND': '#ff9800', // North Dakota
    'OH': '#ff5722', // Ohio
    'OK': '#795548', // Oklahoma
    'OR': '#9e9e9e', // Oregon
    'PA': '#607d8b', // Pennsylvania
    'RI': '#f44336', // Rhode Island
    'SC': '#e91e63', // South Carolina
    'SD': '#9c27b0', // South Dakota
    'TN': '#673ab7', // Tennessee
    'TX': '#3f51b5', // Texas
    'UT': '#2196f3', // Utah
    'VT': '#03a9f4', // Vermont
    'VA': '#00bcd4', // Virginia
    'WA': '#009688', // Washington
    'WV': '#4caf50', // West Virginia
    'WI': '#8bc34a', // Wisconsin
    'WY': '#cddc39', // Wyoming
    'DC': '#f44336', // District of Columbia
    'PR': '#e91e63', // Puerto Rico
};

const MapSVG: React.FC<mapProps> = ({setStateName}) => {
    const [svgJSX, setSvgJSX] = useState<React.ReactElement | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [clickedState, setClickedState] = useState<string | null>(null);
    const handleStateClick = (stateId: string, stateName: string) => {
        setClickedState(stateId);

        // Clear the clicked state after a short delay
        setTimeout(() => {
            setClickedState(null);
        }, 200);
        // Logic to update the bar below will go here
        console.log(`Clicked on: ${stateName} (${stateId})`);
        setStateName(stateName);
    };

    useEffect(() => {
        fetch('/us.svg')
            .then(response => response.text())
            .then(svgText => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(svgText, "image/svg+xml");
                const svgElement = doc.documentElement;
                const paths = svgElement.querySelectorAll('path');

                const newPaths = Array.from(paths).map((path, index) => {
                    const stateId = path.getAttribute('id') || `path-${index}`;
                    const stateName = path.getAttribute('data-name') || '';
                    const d = path.getAttribute('d') || '';
                    const styleString = path.getAttribute('style') || '';

                    const reactStyleObject = styleString ? convertStyleStringToObject(styleString) : {};

                    // Set consistent border with a darker color for contrast
                    reactStyleObject.stroke = '#2f2e51';
                    reactStyleObject.strokeWidth = 1;

                    // Use the color from the color map for the fill
                    reactStyleObject.fill = STATE_COLORS[stateId] || '#ccc';

                    const dynamicClasses = `
            transition-all duration-200 ease-in-out
            hover:scale-[1.05]
            ${clickedState === stateId ? 'scale-[1.1]' : ''}
          `;

                    return React.createElement('path', {
                        key: stateId,
                        id: stateId,
                        d: d,
                        style: reactStyleObject,
                        className: dynamicClasses,
                        onClick: () => handleStateClick(stateId, stateName),
                    });
                });

                const finalSvg = React.createElement('svg', {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: svgElement.getAttribute('viewBox') || '0 0 100 100',
                    className: "w-full h-full",
                }, newPaths);

                setSvgJSX(finalSvg);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setIsLoading(false);
            });

    }, [clickedState, handleStateClick]);

    if (isLoading) {
        return <div>Loading map...</div>;
    }

    return (
        <div className="relative w-full h-full overflow-hidden">
            {svgJSX}
        </div>
    );
};

export default MapSVG;