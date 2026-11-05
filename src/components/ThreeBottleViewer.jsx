import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { generateLabelTexture } from '../utils/generateLabelTexture';
import { Rotate3d, ZoomIn, Sun, Sparkles, Compass, Eye, ShieldCheck, Droplet } from 'lucide-react';

export default function ThreeBottleViewer({ product, interactive = true, className = '' }) {
  const mountRef = useRef(null);
  const [isRotating, setIsRotating] = useState(true);
  const [activePreset, setActivePreset] = useState('full');
  const [lightingMode, setLightingMode] = useState('neon'); // 'neon' | 'studio' | 'amber'
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0);

  // References to keep across re-renders
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const bottleGroupRef = useRef(null);
  const liquidMeshRef = useRef(null);
  const labelMeshRef = useRef(null);
  const particlesRef = useRef(null);
  const rimLightRef = useRef(null);
  const keyLightRef = useRef(null);
  const innerGlowRef = useRef(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.1, y: 0 });
  const currentRotationRef = useRef({ x: 0.1, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 5.2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Lighting System (60% Dark, 10% Neon Lime, 30% Amber/Secondary)
    const ambientLight = new THREE.AmbientLight(0x0e1712, 1.2);
    scene.add(ambientLight);

    // Main Key Light (Soft Warm White Studio Specular)
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 3.2);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    // Secondary Fill Light (Muted Botanical Emerald)
    const fillLight = new THREE.DirectionalLight(0x1a3322, 2.0);
    fillLight.position.set(-4, -2, -3);
    scene.add(fillLight);

    // Signature 10% Neon/Lime Green Rim Light for the Glass Contour!
    const rimLight = new THREE.PointLight(0x38EF7D, 6.0, 12);
    rimLight.position.set(-3.2, 1.8, -2.5);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    // Golden / Herbal Transillumination Light inside bottle core
    const innerGlow = new THREE.PointLight(0xD9943B, 2.5, 4);
    innerGlow.position.set(0, -0.4, 0.2);
    scene.add(innerGlow);
    innerGlowRef.current = innerGlow;

    // 3. Construct Detailed Botanical Apothecary Bottle Group
    const bottleGroup = new THREE.Group();
    bottleGroupRef.current = bottleGroup;
    scene.add(bottleGroup);

    // --- A. Outer Borosilicate Glass Body ---
    // Smooth Lathe geometry or compound cylindrical profile
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x071109,
      transmission: 0.90,
      opacity: 1,
      transparent: true,
      roughness: 0.04,
      ior: 1.54,
      thickness: 1.4,
      attenuationColor: new THREE.Color(0x183020),
      attenuationDistance: 1.6,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      specularIntensity: 1.2,
      depthWrite: false
    });

    // Glass Main Cylinder
    const glassBodyGeo = new THREE.CylinderGeometry(0.85, 0.85, 2.3, 64, 1, true);
    const glassBody = new THREE.Mesh(glassBodyGeo, glassMaterial);
    glassBody.position.y = -0.35;
    bottleGroup.add(glassBody);

    // Glass Rounded Base (Solid bottom lens)
    const glassBaseGeo = new THREE.CylinderGeometry(0.85, 0.78, 0.25, 64);
    const glassBase = new THREE.Mesh(glassBaseGeo, glassMaterial);
    glassBase.position.y = -1.55;
    bottleGroup.add(glassBase);

    // Glass Shoulder (Tapering from body to neck)
    const glassShoulderGeo = new THREE.CylinderGeometry(0.42, 0.85, 0.5, 64, 1, true);
    const glassShoulder = new THREE.Mesh(glassShoulderGeo, glassMaterial);
    glassShoulder.position.y = 1.05;
    bottleGroup.add(glassShoulder);

    // Glass Neck with Thread Ridge
    const glassNeckGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.65, 64);
    const glassNeck = new THREE.Mesh(glassNeckGeo, glassMaterial);
    glassNeck.position.y = 1.55;
    bottleGroup.add(glassNeck);

    // Glass Lip Rim (at top of neck)
    const glassLipGeo = new THREE.TorusGeometry(0.42, 0.04, 24, 64);
    const glassLip = new THREE.Mesh(glassLipGeo, glassMaterial);
    glassLip.rotation.x = Math.PI / 2;
    glassLip.position.y = 1.85;
    bottleGroup.add(glassLip);

    // --- B. Inner Viscous Herbal Liquid Volume ---
    const initialLiquidColor = product?.liquidColor || 0x228B22;
    const liquidMaterial = new THREE.MeshPhysicalMaterial({
      color: initialLiquidColor,
      transmission: 0.75,
      roughness: 0.12,
      ior: 1.48,
      thickness: 2.0,
      transparent: true,
      attenuationColor: new THREE.Color(initialLiquidColor),
      attenuationDistance: 0.8,
      clearcoat: 0.4
    });

    const liquidGeo = new THREE.CylinderGeometry(0.81, 0.81, 2.2, 64);
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMaterial);
    liquidMesh.position.y = -0.4;
    bottleGroup.add(liquidMesh);
    liquidMeshRef.current = liquidMesh;

    // Liquid Meniscus Surface at Top
    const meniscusGeo = new THREE.CylinderGeometry(0.81, 0.78, 0.06, 64);
    const meniscusMesh = new THREE.Mesh(meniscusGeo, liquidMaterial);
    meniscusMesh.position.y = 0.71;
    bottleGroup.add(meniscusMesh);

    // --- C. Internal Glass Pipette Dropper Tube ---
    const pipetteMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.96,
      roughness: 0.05,
      ior: 1.5,
      thickness: 0.4,
      transparent: true
    });
    const pipetteGeo = new THREE.CylinderGeometry(0.08, 0.07, 2.6, 32);
    const pipetteMesh = new THREE.Mesh(pipetteGeo, pipetteMaterial);
    pipetteMesh.position.y = 0.4;
    bottleGroup.add(pipetteMesh);

    // Dropper Tip Bead (A golden oil droplet hanging at the tip)
    const beadMaterial = new THREE.MeshStandardMaterial({
      color: 0xF59E0B,
      roughness: 0.1,
      metalness: 0.1,
      emissive: 0x38EF7D,
      emissiveIntensity: 0.2
    });
    const beadGeo = new THREE.SphereGeometry(0.065, 24, 24);
    const beadMesh = new THREE.Mesh(beadGeo, beadMaterial);
    beadMesh.position.set(0, -0.92, 0);
    bottleGroup.add(beadMesh);

    // --- D. Suspended Botanical Phytoplankton / Ayurvedic Flecks ---
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 0.1 + Math.random() * 0.65;
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = -1.3 + Math.random() * 1.9; // Inside liquid height
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      scales[i] = 0.015 + Math.random() * 0.035;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xD4AF37, // Golden botanical flecks
      size: 0.055,
      transparent: true,
      opacity: 0.85
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    bottleGroup.add(particles);
    particlesRef.current = particles;

    // --- E. Knurled Gold / Brass Dropper Collar ---
    const goldCollarMat = new THREE.MeshStandardMaterial({
      color: 0xC5A059, // Brushed pale royal gold
      metalness: 0.92,
      roughness: 0.28,
    });
    const collarGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.55, 64);
    const collarMesh = new THREE.Mesh(collarGeo, goldCollarMat);
    collarMesh.position.y = 1.95;
    bottleGroup.add(collarMesh);

    // Knurling Ring Details (aesthetic ribbed rings)
    for (let r = 0; r < 3; r++) {
      const ringGeo = new THREE.TorusGeometry(0.49, 0.02, 16, 64);
      const ringMesh = new THREE.Mesh(ringGeo, goldCollarMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = 1.78 + r * 0.16;
      bottleGroup.add(ringMesh);
    }

    // --- F. Matte Silicone Rubber Bulb ---
    const bulbMat = new THREE.MeshStandardMaterial({
      color: 0x141815,
      roughness: 0.88,
      metalness: 0.08
    });
    // Bulb body: teardrop / squished sphere
    const bulbGeo = new THREE.SphereGeometry(0.44, 32, 32);
    bulbGeo.scale(1, 1.45, 1);
    const bulbMesh = new THREE.Mesh(bulbGeo, bulbMat);
    bulbMesh.position.y = 2.75;
    bottleGroup.add(bulbMesh);

    // --- G. Embossed Front Label Cylinder Wrap ---
    const labelTexture = generateLabelTexture(product);
    const labelMaterial = new THREE.MeshStandardMaterial({
      map: labelTexture,
      roughness: 0.55,
      metalness: 0.25,
      transparent: true,
      side: THREE.DoubleSide
    });

    // 160 degree cylindrical sector wrapping around the front
    const labelGeo = new THREE.CylinderGeometry(0.855, 0.855, 1.75, 64, 1, true, -Math.PI * 0.48, Math.PI * 0.96);
    const labelMesh = new THREE.Mesh(labelGeo, labelMaterial);
    labelMesh.position.y = -0.35;
    bottleGroup.add(labelMesh);
    labelMeshRef.current = labelMesh;

    // Ground Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(3.5, 3.5);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x020302,
      transparent: true,
      opacity: 0.75
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.7;
    bottleGroup.add(shadowMesh);

    // 4. Mouse & Touch Interaction Handlers
    const onMouseDown = (e) => {
      if (!interactive) return;
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDraggingRef.current || !interactive) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      targetRotationRef.current.y += deltaX * 0.008;
      targetRotationRef.current.x = Math.max(-0.4, Math.min(0.4, targetRotationRef.current.x + deltaY * 0.008));

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onTouchStart = (e) => {
      if (!interactive || e.touches.length === 0) return;
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchMove = (e) => {
      if (!isDraggingRef.current || !interactive || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      targetRotationRef.current.y += deltaX * 0.01;
      targetRotationRef.current.x = Math.max(-0.4, Math.min(0.4, targetRotationRef.current.x + deltaY * 0.01));

      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 5. Render Loop with Inertia, Auto-Rotation, and Botanical Bobbing
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Auto rotation when idle
      if (isRotating && !isDraggingRef.current) {
        targetRotationRef.current.y += 0.0035;
      }

      // Smooth damping / inertia lerp
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.08;
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.08;

      if (bottleGroupRef.current) {
        bottleGroupRef.current.rotation.y = currentRotationRef.current.y;
        bottleGroupRef.current.rotation.x = currentRotationRef.current.x;

        // Subtle biological floating oscillation
        bottleGroupRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.04;

        // Report rotation angle for HUD readout
        const degrees = Math.round(((currentRotationRef.current.y % (Math.PI * 2)) / (Math.PI * 2)) * 360);
        setRotationAngle(degrees >= 0 ? degrees : 360 + degrees);
      }

      // Micro-animation for suspended botanical particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.05;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 6. Resize Observer
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      renderer.dispose();
      if (labelTexture) labelTexture.dispose();
    };
  }, []);

  // Update label texture & liquid color when selected product changes
  useEffect(() => {
    if (!product || !labelMeshRef.current || !liquidMeshRef.current) return;

    // Update label texture
    const newTexture = generateLabelTexture(product);
    if (labelMeshRef.current.material.map) {
      labelMeshRef.current.material.map.dispose();
    }
    labelMeshRef.current.material.map = newTexture;
    labelMeshRef.current.material.needsUpdate = true;

    // Update liquid color and inner glow
    const liquidColorHex = product.liquidColor || 0x228B22;
    liquidMeshRef.current.material.color.setHex(liquidColorHex);
    liquidMeshRef.current.material.attenuationColor.setHex(liquidColorHex);
    liquidMeshRef.current.material.needsUpdate = true;

    if (innerGlowRef.current) {
      innerGlowRef.current.color.setHex(product.liquidColor || 0xD9943B);
    }
    if (rimLightRef.current) {
      rimLightRef.current.color.setStyle(product.colorHex || '#38EF7D');
    }
  }, [product]);

  // Lighting Mode Swapper
  const toggleLighting = (mode) => {
    setLightingMode(mode);
    if (!rimLightRef.current || !keyLightRef.current || !innerGlowRef.current) return;

    if (mode === 'neon') {
      rimLightRef.current.intensity = 7.0;
      rimLightRef.current.color.setStyle(product?.colorHex || '#38EF7D');
      keyLightRef.current.intensity = 2.8;
      innerGlowRef.current.intensity = 3.0;
    } else if (mode === 'studio') {
      rimLightRef.current.intensity = 2.0;
      keyLightRef.current.intensity = 5.0;
      innerGlowRef.current.intensity = 1.0;
    } else if (mode === 'amber') {
      rimLightRef.current.intensity = 2.0;
      rimLightRef.current.color.setHex(0xD9943B);
      keyLightRef.current.intensity = 2.0;
      innerGlowRef.current.intensity = 6.0;
      innerGlowRef.current.color.setHex(0xF59E0B);
    }
  };

  // Camera Presets
  const applyPreset = (preset) => {
    setActivePreset(preset);
    if (!cameraRef.current) return;

    if (preset === 'full') {
      cameraRef.current.position.set(0, 0.2, 5.2);
    } else if (preset === 'dropper') {
      cameraRef.current.position.set(0, 1.8, 3.2);
    } else if (preset === 'core') {
      cameraRef.current.position.set(0, -0.4, 3.4);
    } else if (preset === 'label') {
      cameraRef.current.position.set(0, -0.2, 3.0);
      targetRotationRef.current.y = 0; // face forward
    }
  };

  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating HUD Controls */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-20 pointer-events-auto">
        <div className="flex items-center gap-2 bg-obsidian-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-lime-neon/20 text-xs font-mono text-lime-soft">
          <Compass className="w-3.5 h-3.5 text-lime-neon animate-spin" style={{ animationDuration: '8s' }} />
          <span>{rotationAngle}° AZIMUTH</span>
          <span className="w-1.5 h-1.5 rounded-full bg-lime-neon animate-pulse" />
        </div>
      </div>

      {/* Right Controls: Rotation, Presets & Lighting */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-20 pointer-events-auto">
        {/* Toggle Auto-Rotate */}
        <button
          onClick={() => setIsRotating(!isRotating)}
          title="Toggle 360° Auto Orbit"
          className={`p-2.5 rounded-xl border backdrop-blur-md transition-all ${
            isRotating
              ? 'bg-botanical-surface/90 border-lime-neon text-lime-neon shadow-neon-subtle'
              : 'bg-obsidian-900/80 border-white/10 text-neutral-400 hover:text-white'
          }`}
        >
          <Rotate3d className="w-4 h-4" />
        </button>

        {/* Lighting Selector */}
        <div className="bg-obsidian-900/85 backdrop-blur-md p-1 rounded-xl border border-white/10 flex flex-col gap-1">
          <button
            onClick={() => toggleLighting('neon')}
            title="Bioluminescent Neon Rim"
            className={`p-2 rounded-lg text-xs transition-colors flex items-center justify-center ${
              lightingMode === 'neon' ? 'bg-lime-neon/20 text-lime-neon' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleLighting('studio')}
            title="Studio High-Key Daylight"
            className={`p-2 rounded-lg text-xs transition-colors flex items-center justify-center ${
              lightingMode === 'studio' ? 'bg-white/20 text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sun className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleLighting('amber')}
            title="Herbal Transillumination"
            className={`p-2 rounded-lg text-xs transition-colors flex items-center justify-center ${
              lightingMode === 'amber' ? 'bg-amber-500/20 text-amber-400' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Droplet className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Camera Macro Presets Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-obsidian-900/85 backdrop-blur-md p-1.5 rounded-2xl border border-lime-neon/20 pointer-events-auto shadow-card-dark text-xs font-mono">
        <button
          onClick={() => applyPreset('full')}
          className={`px-3 py-1.5 rounded-xl transition-all ${
            activePreset === 'full' ? 'bg-lime-neon text-obsidian-950 font-bold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Full Vessel
        </button>
        <button
          onClick={() => applyPreset('label')}
          className={`px-3 py-1.5 rounded-xl transition-all ${
            activePreset === 'label' ? 'bg-lime-neon text-obsidian-950 font-bold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Apothecary Foil
        </button>
        <button
          onClick={() => applyPreset('core')}
          className={`px-3 py-1.5 rounded-xl transition-all ${
            activePreset === 'core' ? 'bg-lime-neon text-obsidian-950 font-bold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Botanical Core
        </button>
        <button
          onClick={() => applyPreset('dropper')}
          className={`px-3 py-1.5 rounded-xl transition-all ${
            activePreset === 'dropper' ? 'bg-lime-neon text-obsidian-950 font-bold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Pipette Cap
        </button>
      </div>

      {/* Interactive Micro-Hotspots floating over the 3D bottle */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Hotspot 1: Pipette Cap */}
        <div
          onClick={() => setActiveHotspot(activeHotspot === 'cap' ? null : 'cap')}
          className="absolute top-[28%] left-[51%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
        >
          <div className="relative flex items-center justify-center">
            <span className="w-6 h-6 rounded-full bg-lime-neon/20 border border-lime-neon animate-ping absolute" />
            <span className="w-3 h-3 rounded-full bg-lime-neon shadow-neon-glow relative flex items-center justify-center" />
          </div>
          {activeHotspot === 'cap' && (
            <div className="absolute left-8 top-1/2 -translate-y-1/2 w-64 bg-obsidian-900/95 border border-lime-neon/40 p-3 rounded-xl backdrop-blur-xl shadow-2xl text-left pointer-events-auto animate-fade-in z-30">
              <div className="text-[10px] font-mono text-lime-neon uppercase tracking-wider mb-1">Cap Precision</div>
              <h4 className="text-sm font-semibold text-white">Knurled Brass Collar & Rubber Pipette</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Airtight hermetic seal preserving sensitive phytochemicals from oxidation. Delivers calibrated 0.05ml micro-droplets.
              </p>
            </div>
          )}
        </div>

        {/* Hotspot 2: Borosilicate Glass & Fluid Core */}
        <div
          onClick={() => setActiveHotspot(activeHotspot === 'fluid' ? null : 'fluid')}
          className="absolute top-[62%] left-[46%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
        >
          <div className="relative flex items-center justify-center">
            <span className="w-6 h-6 rounded-full bg-botanical-amber/20 border border-botanical-amber animate-ping absolute" />
            <span className="w-3 h-3 rounded-full bg-botanical-amber shadow-neon-glow relative flex items-center justify-center" />
          </div>
          {activeHotspot === 'fluid' && (
            <div className="absolute right-8 top-1/2 -translate-y-1/2 w-64 bg-obsidian-900/95 border border-botanical-amber/40 p-3 rounded-xl backdrop-blur-xl shadow-2xl text-left pointer-events-auto animate-fade-in z-30">
              <div className="text-[10px] font-mono text-botanical-amber uppercase tracking-wider mb-1">Phyto-Extraction</div>
              <h4 className="text-sm font-semibold text-white">99.4% Bioactive Decoction</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Slow-macerated in virgin sesame and copper vessels for 14 lunar cycles. High concentration of wedelolactone and bacopasides.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
