import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const bentoPatterns = [
    'col-span-1 md:col-span-2 row-span-2',
    'col-span-1 md:col-span-1 row-span-2',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 md:col-span-2 row-span-1'
];

const projects = [
    {
        title: "Ethereal Echoes",
        category: "Generative Art",
        image: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "Chromatic Synthesis",
        category: "Interactive Installation",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "Obscura",
        category: "Spatial Perception",
        image: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "Lumina",
        category: "Motion Sculpture",
        image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "Kinetic Flow",
        category: "Visual Identity",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800"
    }
];

const WorkSection = () => {
    const containerRef = useRef(null);

    return (
        <section
            id="work"
            ref={containerRef}
            className="py-20 px-5 md:px-[5vw] bg-bg-deep"
        >
            <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[minmax(200px,auto)] gap-4 max-w-[1400px] mx-auto">
                <div className="col-span-1 md:col-span-4 mb-8">
                    <h2 className="text-3xl font-display font-bold text-white/70 uppercase">Selected Works</h2>
                </div>

                {projects.map((project, i) => (
                    <motion.div
                        key={i}
                        className={`bento-item ${bentoPatterns[i]} relative bg-[#111] rounded-3xl border border-white/5 overflow-hidden flex flex-col justify-end p-8 bg-cover bg-center group`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        style={{
                            backgroundImage: `url(${project.image})`,
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10 transition-opacity duration-500 opacity-80 group-hover:opacity-100" />

                        <div className="relative z-20 transform transition-transform duration-500 group-hover:translate-y-[-5px]">
                            <h3 className="font-display text-2xl mb-2 text-white">{project.title}</h3>
                            <p className="font-body text-white/70">{project.category}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default WorkSection;
