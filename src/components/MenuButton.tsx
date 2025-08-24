import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon you need

const MenuButton = () => {
    return (
        <button className="flex items-center justify-center pl-2 pr-2 pt-1 pb-1 rounded-full overflow-hidden border border-blue-300 bg-blue-500 hover:bg-blue-600 focus:outline-none">
            <FontAwesomeIcon
                icon={faBars}
                className="h-5 w-5  text-white" // Use Tailwind classes to style the icon
            />
            <span className=" ml-2">Menu</span>    
        </button>
    );
};

export default MenuButton;