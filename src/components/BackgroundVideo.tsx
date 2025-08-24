import React from 'react';

const BackgroundVideo = () => {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
            >
                <source src="https://assets.website-files.com/60253fc8855619aa1d4fe563/60260810c5657a3227d43900_background-transcode.mp4" type="video/mp4" />
                <source src="https://assets.website-files.com/60253fc8855619aa1d4fe563/60260810c5657a3227d43900_background-transcode.webm" type="video/webm" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default BackgroundVideo;