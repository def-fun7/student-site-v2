import React from "react";
import MenuButton from "./MenuButton";
import ViewToggle from "./ViewToggle";
// import styleString from "./ThreeDivsLayout";

interface ViewToggleProps {
    isMapView: boolean;
    onToggleView: () => void;
}

const TopBar : React.FC<ViewToggleProps> = ({ isMapView , onToggleView }) => {
    const styleString: string = ` bg-transparent content-center flex items-center justify-center `;
  return (
      <div className="flex flex-row justify-center items-center h-[15vh]">
          <div className={styleString + "w-[20vw] p-3"}>
              <MenuButton />
          </div>
          <div className={styleString + "w-[60vw]"}>
              <h1 className='font-bold p-4 text-3xl'>
                  Punjab University Busses
              </h1>
          </div>
          <div className={styleString + "w-[20vw] p-3 "}>
              <ViewToggle isMapView={isMapView} onToggleView={onToggleView} />
          </div>
      </div>
  );
};


export default TopBar;