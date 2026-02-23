import React from 'react'
import { motion } from 'framer-motion'
import AboutSection from '../components/AboutSection'

function Studio() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-20"
        >
            <AboutSection />
            <section className="py-20 bg-black flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] mb-4 font-display font-bold uppercase text-white">Our creative process</h2>
                <p className="text-white/70 max-w-2xl font-body">We blend traditional artistic sensibilities with cutting-edge technology. Our studio serves as a playground for visual experimentation, merging the boundaries of generative art and interactive digital spaces.</p>
            </section>
        </motion.div>
    )
}

export default Studio
