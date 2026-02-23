import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollSequence from '../components/ScrollSequence'
import ReelsSection from '../components/ReelsSection'
import WorkSection from '../components/WorkSection'

function Home() {
    const heroTitleRef = useRef(null)
    const heroSubtitleRef = useRef(null)
    const buttonRef = useRef(null)

    useEffect(() => {
        if (heroTitleRef.current && heroSubtitleRef.current && buttonRef.current) {
            const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } })

            tl.to(heroTitleRef.current, { opacity: 1, y: 0, duration: 1.5, delay: 0.5 })
                .to(heroSubtitleRef.current, { opacity: 1, y: 0 }, '-=1.2')
                .to(buttonRef.current, { opacity: 1, y: 0, scale: 1 }, '-=1')
        }
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <ScrollSequence frameCount={285}>
                <div className="hero-content">
                    <h1 ref={heroTitleRef} className="hero-title">
                        Lumina <br /> Studio
                    </h1>
                    <p ref={heroSubtitleRef} className="hero-subtitle">
                        Crafting visual masterpieces and immersive digital experiences.
                    </p>

                    <div ref={buttonRef} className="opacity-0 translate-y-5 scale-95">
                        <Link to="/studio" className="glass-button group">
                            Explore Studio
                            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </Link>
                    </div>
                </div>
            </ScrollSequence>

            <WorkSection />

            <ReelsSection />
        </motion.div>
    )
}

export default Home
