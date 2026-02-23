import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleBackground = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const currentRef = mountRef.current;
        if (!currentRef) return;

        // Scene Setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050505, 0.001); // Deep background fog

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 100;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        currentRef.appendChild(renderer.domElement);

        // Particle System - "Organic Turbulence" Algorithmic Art Style
        const particleCount = 2000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = [];

        for (let i = 0; i < particleCount; i++) {
            // Spherical distribution
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(Math.random() * 2 - 1);
            const radius = 50 + Math.random() * 150;

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta); // x
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta); // y
            positions[i * 3 + 2] = radius * Math.cos(phi); // z

            velocities.push({
                x: (Math.random() - 0.5) * 0.2,
                y: (Math.random() - 0.5) * 0.2,
                z: (Math.random() - 0.5) * 0.2,
            });
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Create a custom material that looks like glowing points
        const material = new THREE.PointsMaterial({
            size: 1.5,
            color: 0x00e5ff, // Using the accent-blue from index.css
            transparent: true,
            opacity: 0.8,
            blendEquation: THREE.AdditiveBlending,
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // Interaction
        let mouseX = 0;
        let mouseY = 0;
        const handleMouseMove = (e) => {
            mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
            mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation Loop
        let frameId;
        const clock = new THREE.Clock();

        const animate = () => {
            frameId = requestAnimationFrame(animate);
            const time = clock.getElapsedTime();

            // Rotate the entire particle system slowly
            particles.rotation.y = time * 0.05;
            particles.rotation.z = time * 0.02;

            // Camera smoothly follows mouse
            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };
        animate();

        // Responsive
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(frameId);

            if (currentRef && currentRef.contains(renderer.domElement)) {
                currentRef.removeChild(renderer.domElement);
            }

            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-40 mix-blend-screen"
            style={{ background: 'transparent' }}
        />
    );
};

export default ParticleBackground;
