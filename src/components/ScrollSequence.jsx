import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollSequence = ({ frameCount, children }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const contextRef = useRef(null);
    const contentRef = useRef(null);
    const imagesRef = useRef([]);
    const currentFrameRef = useRef(0);
    const [loadProgress, setLoadProgress] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const renderFrame = useCallback((index) => {
        const img = imagesRef.current[index];
        const canvas = canvasRef.current;
        const context = contextRef.current;

        if (img && img.complete && img.naturalWidth !== 0 && context && canvas) {
            const canvasAspect = canvas.width / canvas.height;
            const imgAspect = img.width / img.height;
            let drawWidth, drawHeight, offsetX, offsetY;

            if (canvasAspect > imgAspect) {
                drawWidth = canvas.width;
                drawHeight = canvas.width / imgAspect;
                offsetX = 0;
                offsetY = (canvas.height - drawHeight) / 2;
            } else {
                drawWidth = canvas.height * imgAspect;
                drawHeight = canvas.height;
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = 0;
            }

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
    }, []);

    useEffect(() => {
        let isMounted = true;
        const batchSize = 10;
        let loadedCount = 0;

        const loadBatch = async (startIndex) => {
            if (!isMounted) return;

            const endIndex = Math.min(startIndex + batchSize, frameCount);
            const promises = [];

            for (let i = startIndex; i < endIndex; i++) {
                if (imagesRef.current[i]) continue;

                const promise = new Promise((resolve) => {
                    const img = new Image();
                    img.src = `/sequence/frame_${String(i).padStart(4, '0')}.webp`;
                    img.onload = () => {
                        loadedCount++;
                        if (isMounted) setLoadProgress(Math.round((loadedCount / frameCount) * 100));
                        resolve(img);
                    };
                    img.onerror = () => {
                        console.error(`Failed to load frame ${i}`);
                        resolve(null);
                    };
                    imagesRef.current[i] = img;
                });
                promises.push(promise);
            }

            await Promise.all(promises);

            if (startIndex === 0 && isMounted) {
                renderFrame(0);
            }

            if (endIndex < frameCount && isMounted) {
                requestAnimationFrame(() => loadBatch(endIndex));
            } else if (isMounted) {
                setImagesLoaded(true);
            }
        };

        loadBatch(0);

        return () => {
            isMounted = false;
        };
    }, [frameCount, renderFrame]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        contextRef.current = canvas.getContext('2d');

        const updateSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            renderFrame(currentFrameRef.current);
        };

        updateSize();
        window.addEventListener('resize', updateSize);

        const trigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top top',
            end: '+=500%',
            scrub: 0,
            pin: true,
            onUpdate: (self) => {
                const frameIndex = Math.min(
                    frameCount - 1,
                    Math.floor(self.progress * (frameCount - 1))
                );
                if (frameIndex !== currentFrameRef.current) {
                    currentFrameRef.current = frameIndex;
                    renderFrame(frameIndex);
                }

                // Optimize content fade out based on scroll progress
                if (contentRef.current) {
                    const opacity = Math.max(0, 1 - self.progress * 5); // Fade out quickly
                    gsap.set(contentRef.current, { opacity, pointerEvents: opacity > 0.1 ? 'auto' : 'none' });
                }
            }
        });

        return () => {
            window.removeEventListener('resize', updateSize);
            if (trigger) trigger.kill();
        };
    }, [frameCount, renderFrame]);

    return (
        <div
            ref={containerRef}
            className="scroll-sequence-container"
            style={{
                height: '100vh',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                background: '#000'
            }}
        >
            {!imagesLoaded && loadProgress < 100 && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 50,
                    background: 'rgba(0,0,0,0.95)'
                }}>
                    <div className="loader">INITIALIZING SYSTEM</div>
                    <div style={{ marginTop: '1rem', width: '200px', height: '2px', background: 'rgba(255,255,255,0.2)' }}>
                        <div style={{ width: `${loadProgress}%`, height: '100%', background: 'var(--accent-blue)', transition: 'width 0.2s' }}></div>
                    </div>
                    <div style={{ marginTop: '0.5rem', fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        BUFFERING SEQUENCE: {loadProgress}%
                    </div>
                </div>
            )}

            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 0
                }}
            />

            {children && (
                <div
                    ref={contentRef}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {children}
                </div>
            )}

            <div style={{
                position: 'absolute',
                bottom: '50px',
                width: '100%',
                textAlign: 'center',
                pointerEvents: 'none',
                zIndex: 20
            }}>
                <p style={{
                    fontFamily: 'var(--font-display)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    fontSize: '0.9rem',
                    opacity: 0.7
                }}>
                    Scroll to Traverse
                </p>
            </div>
        </div>
    );
};

export default ScrollSequence;
