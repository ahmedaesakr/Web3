
import React from 'react';
import ReelsGrid from './Reels/ReelsGrid';

const dummyReels = [
    {
        id: "reel-1",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-holographic-interface-99-large.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
        views: "1.2M",
        likes: "45K",
        caption: "Cinematic AI workflow..."
    },
    {
        id: "reel-2",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-technological-interface-100-large.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=600",
        views: "890K",
        likes: "22K",
        caption: "Data visualization systems"
    },
    {
        id: "reel-3",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-technological-interface-101-large.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1531297425163-408e27f08112?auto=format&fit=crop&q=80&w=600",
        views: "2.5M",
        likes: "120K",
        caption: "The future of interaction"
    },
    {
        id: "reel-4",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-wearing-a-virtual-reality-headset-drawing-figures-39655-large.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1617839625591-e5a7b9585140?auto=format&fit=crop&q=80&w=600",
        views: "300K",
        likes: "15K",
        caption: "Spatial Computing Demo"
    },
    {
        id: "reel-5",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-white-lines-298-large.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
        views: "1.5M",
        likes: "67K",
        caption: "Generative Art Process"
    },
    {
        id: "reel-6",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4",
        thumbnailUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=600",
        views: "4.1M",
        likes: "180K",
        caption: "Cosmic Voyage"
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
                    A collection of experiments, prototypes, and visual explorations in the realm of digital synthesis.
                </p>
            </div>
            <ReelsGrid reels={dummyReels} />
        </section>
    );
};

export default ReelsSection;
