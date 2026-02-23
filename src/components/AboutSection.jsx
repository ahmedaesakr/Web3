import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const textElements = textRef.current.querySelectorAll('.word');

        gsap.fromTo(textElements,
            {
                y: '100%',
                opacity: 0,
                rotate: 5
            },
            {
                y: '0%',
                opacity: 1,
                rotate: 0,
                stagger: 0.05,
                duration: 1.2,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, []);

    const text = "Crafting visual masterpieces and immersive digital art. We blend aesthetic design with technology to create unique studio experiences.";
    const words = text.split(" ");

    return (
        <section
            id="studio"
            ref={containerRef}
            className="min-h-[80vh] flex items-center justify-center p-[10vw] bg-bg-deep"
        >
            <div
                ref={textRef}
                className="text-[clamp(2rem,5vw,4rem)] leading-[1.2] font-display text-white text-center max-w-7xl mx-auto"
            >
                {words.map((word, i) => (
                    <span key={i} className="inline-block overflow-hidden align-top mr-[0.3em]">
                        <span className="word inline-block">{word}</span>
                    </span>
                ))}
            </div>
        </section>
    );
};

export default AboutSection;
