import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Configuration — tune these for performance vs quality
const PRIORITY_FRAMES = 15;    // Load first N frames immediately (above the fold)
const BATCH_SIZE = 8;          // Frames per lazy-load batch
const FRAME_STEP = 2;          // Skip every Nth frame (2 = use every other frame)

const ScrollSequence = ({ frameCount = 285, children }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const contextRef = useRef(null);
    const contentRef = useRef(null);
    const imagesRef = useRef(new Map());
    const currentFrameRef = useRef(0);
    const [loadProgress, setLoadProgress] = useState(0);
    const [initialReady, setInitialReady] = useState(false);

    // Build the reduced frame index list (every FRAME_STEP-th frame)
    const frameIndices = useRef([]);
    if (frameIndices.current.length === 0) {
        for (let i = 0; i < frameCount; i += FRAME_STEP) {
            frameIndices.current.push(i);
        }
        // Always include the very last frame for smooth ending
        const lastFrame = frameCount - 1;
        if (!frameIndices.current.includes(lastFrame)) {
            frameIndices.current.push(lastFrame);
        }
    }

    const totalOptimizedFrames = frameIndices.current.length;

    // Map a scroll progress (0–1) to the nearest available frame index
    const getFrameForProgress = useCallback((progress) => {
        const targetIdx = Math.min(
            totalOptimizedFrames - 1,
            Math.floor(progress * totalOptimizedFrames)
        );
        return frameIndices.current[targetIdx];
    }, [totalOptimizedFrames]);

    const renderFrame = useCallback((originalIndex) => {
        const img = imagesRef.current.get(originalIndex);
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

    // Load a single image and return a promise
    const loadImage = useCallback((originalIndex) => {
        return new Promise((resolve) => {
            if (imagesRef.current.has(originalIndex)) {
                resolve(imagesRef.current.get(originalIndex));
                return;
            }

            const img = new Image();
            // Use decoding="async" for non-blocking decode
            img.decoding = 'async';
            img.src = `/sequence/frame_${String(originalIndex).padStart(4, '0')}.webp`;
            img.onload = () => {
                imagesRef.current.set(originalIndex, img);
                resolve(img);
            };
            img.onerror = () => {
                console.error(`Failed to load frame ${originalIndex}`);
                resolve(null);
            };
        });
    }, []);

    // Phase 1: Load priority frames (first N) immediately
    useEffect(() => {
        let isMounted = true;

        const loadPriorityFrames = async () => {
            const priorityIndices = frameIndices.current.slice(0, PRIORITY_FRAMES);
            const promises = priorityIndices.map(idx => loadImage(idx));
            await Promise.all(promises);

            if (isMounted) {
                setInitialReady(true);
                setLoadProgress(Math.round((PRIORITY_FRAMES / totalOptimizedFrames) * 100));
                renderFrame(frameIndices.current[0]);
            }
        };

        loadPriorityFrames();

        return () => { isMounted = false; };
    }, [loadImage, renderFrame, totalOptimizedFrames]);

    // Phase 2: Lazy-load remaining frames in batches after priority frames are ready
    useEffect(() => {
        if (!initialReady) return;
        let isMounted = true;

        const loadRemaining = async () => {
            const remaining = frameIndices.current.slice(PRIORITY_FRAMES);
            let loadedSoFar = PRIORITY_FRAMES;

            for (let i = 0; i < remaining.length; i += BATCH_SIZE) {
                if (!isMounted) break;

                const batch = remaining.slice(i, i + BATCH_SIZE);
                await Promise.all(batch.map(idx => loadImage(idx)));

                loadedSoFar += batch.length;
                if (isMounted) {
                    setLoadProgress(Math.round((loadedSoFar / totalOptimizedFrames) * 100));
                }

                // Yield to main thread between batches to keep UI responsive
                await new Promise(r => requestAnimationFrame(r));
            }
        };

        loadRemaining();

        return () => { isMounted = false; };
    }, [initialReady, loadImage, totalOptimizedFrames]);

    // Canvas setup + GSAP ScrollTrigger
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        contextRef.current = canvas.getContext('2d', { alpha: false });

        const updateSize = () => {
            // Use devicePixelRatio for sharp rendering but cap at 1.5x for performance
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
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
                const frameIndex = getFrameForProgress(self.progress);

                if (frameIndex !== currentFrameRef.current) {
                    // Only render if the image is loaded
                    if (imagesRef.current.has(frameIndex)) {
                        currentFrameRef.current = frameIndex;
                        renderFrame(frameIndex);
                    }
                }

                // Content fade out based on scroll progress
                if (contentRef.current) {
                    const opacity = Math.max(0, 1 - self.progress * 5);
                    gsap.set(contentRef.current, { opacity, pointerEvents: opacity > 0.1 ? 'auto' : 'none' });
                }
            }
        });

        return () => {
            window.removeEventListener('resize', updateSize);
            if (trigger) trigger.kill();
        };
    }, [renderFrame, getFrameForProgress]);

    const isFullyLoaded = loadProgress >= 100;

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
            {/* Loading indicator — shows until priority frames are loaded */}
            {!initialReady && (
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

            {/* Subtle background progress for remaining frames */}
            {initialReady && !isFullyLoaded && (
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: `${loadProgress}%`,
                    height: '2px',
                    background: 'var(--accent-blue)',
                    opacity: 0.4,
                    transition: 'width 0.3s ease',
                    zIndex: 30
                }} />
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
