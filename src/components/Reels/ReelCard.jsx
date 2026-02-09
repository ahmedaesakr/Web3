
import React, { useRef, useState } from 'react';

const ReelCard = ({ reel }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleMouseEnter = () => {
        setIsPlaying(true);
        if (videoRef.current) {
            videoRef.current.play().catch(e => console.log("Auto-play prevented", e));
        }
    };

    const handleMouseLeave = () => {
        setIsPlaying(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0; // Reset video to start
        }
    };

    return (
        <div
            className="group relative w-full aspect-[9/16] overflow-hidden bg-[#1a1a1a] cursor-pointer rounded-xl md:rounded-none"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative w-full h-full">
                <video
                    ref={videoRef}
                    src={reel.videoUrl}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    poster={reel.thumbnailUrl}
                    loop
                    muted
                    playsInline
                />

                {/* Overlay showing stats only on hover */}
                <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${isPlaying ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex gap-5 text-white font-display font-semibold text-lg">
                        <span className="flex items-center gap-2">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" /> {/* Play icon */}
                            </svg>
                            {reel.views}
                        </span>
                        <span className="flex items-center gap-2">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /> {/* Heart icon */}
                            </svg>
                            {reel.likes}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReelCard;
