import React from 'react';
import ReelsGrid from './Reels/ReelsGrid';

const dummyReels = [
    {
        id: "reel-1",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-25-large.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600",
        views: "1.2M",
        likes: "45K",
        caption: "Fluid motion studies..."
    },
    {
        id: "reel-2",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-white-lines-298-large.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=600",
        views: "890K",
        likes: "22K",
        caption: "Generative line formations"
    },
    {
        id: "reel-3",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-colored-smoke-in-front-of-a-black-background-4217-large.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&q=80&w=600",
        views: "2.5M",
        likes: "120K",
        caption: "Chromatic vapor mapping"
    },
    {
        id: "reel-4",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-hologram-of-a-planet-with-a-grid-31657-large.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1618005192384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
        views: "300K",
        likes: "15K",
        caption: "Spatial object modeling"
    },
    {
        id: "reel-5",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-multicolored-lights-in-abstract-movement-31580-large.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=600",
        views: "1.5M",
        likes: "67K",
        caption: "Luminescence tests"
    },
    {
        id: "reel-6",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-technological-interface-100-large.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&q=80&w=600",
        views: "4.1M",
        likes: "180K",
        caption: "Interactive grid patterns"
    }
];

const ReelsSection = () => {
    return (
        <section id="showcase" className="py-20 bg-black">
            <div className="max-w-[935px] mx-auto px-5 mb-12 text-center">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 uppercase tracking-tighter">
                    Visual Archives
                </h2>
                <p className="text-white/60 font-body max-w-lg mx-auto">
                    A collection of experiments, prototypes, and visual explorations in the realm of immersive digital art.
                </p>
            </div>
            <ReelsGrid reels={dummyReels} />
        </section>
    );
};

export default ReelsSection;
