import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const SailboatDisplay = ({ pitch, roll }) => {
    const mountRef = useRef(null);

    // Helper function to convert degrees to radians
    const degToRad = (degrees) => {
        return degrees * (Math.PI / 180);
    };

    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Boat geometry
        const boatGeometry = new THREE.BoxGeometry(2, 0.5, 1);
        const boatMaterial = new THREE.MeshBasicMaterial({ color: 0x3498db });
        const boat = new THREE.Mesh(boatGeometry, boatMaterial);
        scene.add(boat);

        // Sail geometry
        const sailGeometry = new THREE.ConeGeometry(0.5, 2, 32);
        const sailMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const sail = new THREE.Mesh(sailGeometry, sailMaterial);
        sail.position.set(0, 1, 0);
        boat.add(sail);

        // Light
        const light = new THREE.AmbientLight(0x404040); // soft white light
        scene.add(light);

        camera.position.z = 5;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Update the boat rotation based on pitch and roll
            boat.rotation.x = degToRad(pitch);  // Use the custom degree-to-radian converter
            boat.rotation.z = degToRad(roll);

            renderer.render(scene, camera);
        };
        animate();

        // Clean up on component unmount
        return () => {
            mountRef.current.removeChild(renderer.domElement);
        };
    }, [pitch, roll]);

    return <div ref={mountRef}></div>;
};

export default SailboatDisplay;