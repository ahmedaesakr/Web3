import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const bentoPatterns = [
    'col-span-1 md:col-span-2 row-span-2',
    'col-span-1 md:col-span-1 row-span-2',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 md:col-span-2 row-span-1'
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

                {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className={`bento-item ${bentoPatterns[i]} relative bg-[#111] rounded-3xl border border-white/5 overflow-hidden flex flex-col justify-end p-8 bg-cover bg-center group`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                        viewport={{ once: true, margin: '-10% 0px' }}
                        style={{
                            backgroundImage: `url(https://picsum.photos/id/${i + 25}/800/800)`,
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10 transition-opacity duration-500 opacity-80 group-hover:opacity-100" />

                        <div className="relative z-20 transform transition-transform duration-500 group-hover:translate-y-[-5px]">
                            <h3 className="font-display text-2xl mb-2 text-white">Project {['Pulse', 'Void', 'Nucleus', 'Echo', 'Drift'][i]}</h3>
                            <p className="font-body text-white/70">Experience Design</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default WorkSection;
