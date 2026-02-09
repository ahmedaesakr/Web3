
import React, { useState } from 'react';
import ReelCard from './ReelCard';

const ReelsGrid = ({ reels }) => {
    return (
        <div className='max-w-[935px] mx-auto p-5'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-1 w-full'>
                {reels.map((reel) => (
                    <ReelCard key={reel.id} reel={reel} />
                ))}
            </div>
        </div>
    );
};

export default ReelsGrid;
