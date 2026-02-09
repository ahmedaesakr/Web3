import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollSequence from './components/ScrollSequence'
import Navbar from './components/Navbar'
import WorkSection from './components/WorkSection'
import AboutSection from './components/AboutSection'
import ReelsSection from './components/ReelsSection'
import Footer from './components/Footer'

function App() {
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
        <main className="bg-bg-deep text-white min-h-screen">
            <Navbar />

            {/* ScrollSequence IS the Hero now */}
            <ScrollSequence frameCount={285}>
                <div className="hero-content">
                    <h1 ref={heroTitleRef} className="hero-title">
                        Vortex <br /> Portal
                    </h1>
                    <p ref={heroSubtitleRef} className="hero-subtitle">
                        A high-performance kinematic traversal through the digital wormhole.
                    </p>

                    <div ref={buttonRef} className="opacity-0 translate-y-5 scale-95">
                        <a href="#studio" className="glass-button group">
                            Begin Traversal
                            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </a>
                    </div>
                </div>
            </ScrollSequence>

            <AboutSection />

            <WorkSection />

            <ReelsSection />

            <section className="h-[80vh] bg-black flex items-center justify-center py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-accent-blue/10 to-transparent opacity-30 pointer-events-none" />
                <div className="hero-content z-10">
                    <h2 className="text-[clamp(2rem,5vw,4rem)] mb-4 font-display font-bold uppercase">Ready to Launch?</h2>
                    <p className="hero-subtitle">Experience the future of web design.</p>
                    <div className="mt-8">
                        <button className="glass-button">Initialize Project</button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}

export default App
