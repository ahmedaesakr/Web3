
import React, { useState } from 'react';
import ReelCard from './ReelCard';
import './styles.css';

const ReelsGrid = ({ reels }) => {
    return (
        <div className='reels-grid-container'>
            <div className='reels-grid-layout'>
                {reels.map((reel) => (
                    <ReelCard key={reel.id} reel={reel} />
                ))}
            </div>
        </div>
    );
};

export default ReelsGrid;
