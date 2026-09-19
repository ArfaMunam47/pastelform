import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

interface Interactive3DHeroCanvasProps {
  colorHex: string;
  modelType?: 'lounge-chair' | 'dining-chair' | 'pebble-table' | 'mushroom-lamp';
  onInteracted?: () => void;
  onAngleChange?: (degrees: number) => void;
  accentColor?: string;
  className?: string;
}

export const Interactive3DHeroCanvas: React.FC<Interactive3DHeroCanvasProps> = ({
  colorHex,
  modelType = 'lounge-chair',
  onInteracted,
  onAngleChange,
  accentColor = '#FF4757',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // References for Three.js state across re-renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const fabricMaterialsRef = useRef<THREE.MeshPhysicalMaterial[]>([]);
  const shadowMeshRef = useRef<THREE.Mesh | null>(null);

  // Physics and rotation state
  const rotationState = useRef({
    currentY: -0.45, // Initial elegant 3/4 front view
    targetY: -0.45,
    currentX: 0.08,
    targetX: 0.08,
    velocity: 0,
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0,
    hasInteracted: false,
    autoRotate: true,
  });

  // Procedural Bouclé Bump Texture Generator
  const createBoucleTexture = useCallback(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Fill neutral mid-gray
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 256, 256);

    // Draw irregular micro-loops for bouclé weave
    for (let i = 0; i < 2800; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const r = 1 + Math.random() * 2.2;
      const lightness = Math.random() > 0.5 ? 210 + Math.random() * 45 : 45 + Math.random() * 50;

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${lightness}, ${lightness}, ${lightness}, 0.65)`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(8, 8);
    return texture;
  }, []);

  // Procedural Radial Contact Shadow Texture
  const createContactShadowTexture = useCallback(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const grad = ctx.createRadialGradient(256, 256, 10, 256, 256, 250);
    grad.addColorStop(0, 'rgba(18, 22, 34, 0.42)');
    grad.addColorStop(0.25, 'rgba(20, 24, 36, 0.28)');
    grad.addColorStop(0.55, 'rgba(25, 30, 42, 0.12)');
    grad.addColorStop(0.85, 'rgba(30, 35, 48, 0.03)');
    grad.addColorStop(1, 'rgba(30, 35, 48, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    return new THREE.CanvasTexture(canvas);
  }, []);

  // Build the Photorealistic 3D Solis Sculptural Lounge Chair
  const buildSolisChair = useCallback((fabricMat: THREE.MeshPhysicalMaterial, woodMat: THREE.MeshStandardMaterial, brassMat: THREE.MeshStandardMaterial) => {
    const group = new THREE.Group();
    fabricMaterialsRef.current = [];

    // 1. SEAT CUSHION (Organic, Deep, Beveled Comfort Cushion)
    const seatGeo = new THREE.CylinderGeometry(1.35, 1.28, 0.48, 48, 8);
    // Sculpt the seat: slightly depress the center and slope backward
    const pos = seatGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const distFromCenter = Math.sqrt(x * x + z * z);

      // Ergonomic concave depression
      if (y > 0.1) {
        const depression = Math.max(0, 1 - distFromCenter / 1.3) * 0.12;
        pos.setY(i, y - depression);
      }
      // Gentle flare at the front
      if (z > 0.4 && y > 0) {
        pos.setZ(i, z + 0.06);
      }
    }
    seatGeo.computeVertexNormals();

    const seatMesh = new THREE.Mesh(seatGeo, fabricMat);
    seatMesh.position.set(0, 0.45, 0.05);
    seatMesh.castShadow = true;
    seatMesh.receiveShadow = true;
    group.add(seatMesh);
    fabricMaterialsRef.current.push(fabricMat);

    // 2. ENVELOPING BACKREST SHELL (Sculptural continuous curve with lumbar support)
    const backCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.42, 0.4, 0.4),
      new THREE.Vector3(-1.38, 0.9, -0.25),
      new THREE.Vector3(-0.95, 1.35, -0.9),
      new THREE.Vector3(0, 1.52, -1.05),
      new THREE.Vector3(0.95, 1.35, -0.9),
      new THREE.Vector3(1.38, 0.9, -0.25),
      new THREE.Vector3(1.42, 0.4, 0.4),
    ]);

    const backGeo = new THREE.TubeGeometry(backCurve, 64, 0.38, 24, false);
    // Flatten the inside of the tube to form an ergonomic embrace
    const bPos = backGeo.attributes.position;
    for (let i = 0; i < bPos.count; i++) {
      const y = bPos.getY(i);
      if (y > 0.8) {
        bPos.setY(i, y + Math.sin((y - 0.8) * Math.PI) * 0.05);
      }
    }
    backGeo.computeVertexNormals();

    const backMesh = new THREE.Mesh(backGeo, fabricMat);
    backMesh.position.set(0, 0.28, 0.12);
    backMesh.castShadow = true;
    group.add(backMesh);

    // 3. INNER LUMBAR & DUAL PILLOW BOLSTER
    const lumbarGeo = new THREE.SphereGeometry(0.85, 32, 24);
    lumbarGeo.scale(1.2, 0.72, 0.48);
    const lumbarMesh = new THREE.Mesh(lumbarGeo, fabricMat);
    lumbarMesh.position.set(0, 0.92, -0.6);
    lumbarMesh.rotation.x = 0.28;
    group.add(lumbarMesh);

    // 4. SOFT PIPING / SEAM LINE
    const seamCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.45, 0.42, 0.42),
      new THREE.Vector3(-1.41, 0.92, -0.27),
      new THREE.Vector3(-0.98, 1.38, -0.93),
      new THREE.Vector3(0, 1.55, -1.08),
      new THREE.Vector3(0.98, 1.38, -0.93),
      new THREE.Vector3(1.41, 0.92, -0.27),
      new THREE.Vector3(1.45, 0.42, 0.42),
    ]);
    const seamGeo = new THREE.TubeGeometry(seamCurve, 64, 0.028, 12, false);
    const seamMat = new THREE.MeshStandardMaterial({
      color: 0x4A3F35,
      roughness: 0.9,
    });
    const seamMesh = new THREE.Mesh(seamGeo, seamMat);
    seamMesh.position.set(0, 0.28, 0.12);
    group.add(seamMesh);

    // 5. SOLID TIMBER SUBSTRUCTURE (Sculpted European Oak Plinth)
    const plinthRingGeo = new THREE.TorusGeometry(1.08, 0.09, 16, 48);
    plinthRingGeo.rotateX(Math.PI / 2);
    const plinthRing = new THREE.Mesh(plinthRingGeo, woodMat);
    plinthRing.position.set(0, 0.24, 0);
    plinthRing.castShadow = true;
    group.add(plinthRing);

    // Cross-lap wooden struts connecting to center
    const strutGeo = new THREE.BoxGeometry(0.14, 0.08, 2.05);
    const strut1 = new THREE.Mesh(strutGeo, woodMat);
    strut1.position.set(0, 0.24, 0);
    strut1.rotation.y = Math.PI / 4;
    group.add(strut1);

    const strut2 = new THREE.Mesh(strutGeo, woodMat);
    strut2.position.set(0, 0.24, 0);
    strut2.rotation.y = -Math.PI / 4;
    group.add(strut2);

    // 6. FOUR TAPERED SCULPTURAL WOODEN LEGS
    const legAngles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
    legAngles.forEach((angle) => {
      const legGeo = new THREE.CylinderGeometry(0.065, 0.042, 0.38, 24);
      const leg = new THREE.Mesh(legGeo, woodMat);

      const radius = 1.05;
      const lx = Math.cos(angle) * radius;
      const lz = Math.sin(angle) * radius;

      leg.position.set(lx, 0.09, lz);
      // Splay legs outward slightly for high-end stance
      leg.rotation.z = -Math.cos(angle) * 0.16;
      leg.rotation.x = Math.sin(angle) * 0.16;
      leg.castShadow = true;
      group.add(leg);

      // Brass Ferrule / Acoustic Glide on foot tips
      const ferruleGeo = new THREE.CylinderGeometry(0.044, 0.042, 0.05, 24);
      const ferrule = new THREE.Mesh(ferruleGeo, brassMat);
      ferrule.position.set(lx * 1.02, -0.07, lz * 1.02);
      group.add(ferrule);
    });

    group.position.set(0, -0.4, 0);
    return group;
  }, []);

  // 4. Build Kanso Tub Chair
  const buildKansoChair = useCallback((fabricMat: THREE.MeshPhysicalMaterial, woodMat: THREE.MeshStandardMaterial) => {
    const group = new THREE.Group();
    fabricMaterialsRef.current = [];

    // Cylindrical drum seat
    const seatGeo = new THREE.CylinderGeometry(1.25, 1.25, 0.55, 48);
    const seatMesh = new THREE.Mesh(seatGeo, fabricMat);
    seatMesh.position.set(0, 0.48, 0);
    seatMesh.castShadow = true;
    group.add(seatMesh);
    fabricMaterialsRef.current.push(fabricMat);

    // Continuous curved wrap-around tub back
    const tubCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.3, 0.5, 0.7),
      new THREE.Vector3(-1.45, 0.85, -0.3),
      new THREE.Vector3(-0.9, 1.25, -1.25),
      new THREE.Vector3(0, 1.35, -1.35),
      new THREE.Vector3(0.9, 1.25, -1.25),
      new THREE.Vector3(1.45, 0.85, -0.3),
      new THREE.Vector3(1.3, 0.5, 0.7),
    ]);
    const tubGeo = new THREE.TubeGeometry(tubCurve, 64, 0.35, 24, false);
    const tubMesh = new THREE.Mesh(tubGeo, fabricMat);
    tubMesh.position.set(0, 0.25, 0);
    tubMesh.castShadow = true;
    group.add(tubMesh);

    // Recessed shadow-gap plinth base (Smoked Oak)
    const plinthGeo = new THREE.CylinderGeometry(1.05, 1.05, 0.2, 48);
    const plinthMesh = new THREE.Mesh(plinthGeo, woodMat);
    plinthMesh.position.set(0, 0.1, 0);
    plinthMesh.castShadow = true;
    group.add(plinthMesh);

    group.position.set(0, -0.4, 0);
    return group;
  }, []);

  // 5. Build Nuvola Pebble Table
  const buildPebbleTable = useCallback((woodMat: THREE.MeshStandardMaterial) => {
    const group = new THREE.Group();
    fabricMaterialsRef.current = [];

    // Organic pebble table top
    const shape = new THREE.Shape();
    shape.moveTo(-1.6, 0);
    shape.bezierCurveTo(-1.6, 1.2, -0.6, 1.8, 0.4, 1.7);
    shape.bezierCurveTo(1.6, 1.6, 2.0, 0.7, 1.8, -0.4);
    shape.bezierCurveTo(1.5, -1.4, 0.2, -1.6, -0.8, -1.3);
    shape.bezierCurveTo(-1.5, -1.0, -1.6, -0.5, -1.6, 0);

    const extrudeSettings = {
      depth: 0.14,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 2,
      bevelSize: 0.06,
      bevelThickness: 0.06,
    };

    const topGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    topGeo.rotateX(Math.PI / 2);
    const topMesh = new THREE.Mesh(topGeo, woodMat);
    topMesh.position.set(0, 0.65, 0);
    topMesh.castShadow = true;
    group.add(topMesh);

    // 3 Chunky fluted pillar legs
    const legPositions = [
      [-0.9, 0.3, 0.4],
      [0.9, 0.3, 0.2],
      [-0.1, 0.3, -0.7],
    ];

    legPositions.forEach(([lx, ly, lz]) => {
      const legGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.62, 32);
      const legMesh = new THREE.Mesh(legGeo, woodMat);
      legMesh.position.set(lx, ly, lz);
      legMesh.castShadow = true;
      group.add(legMesh);
    });

    group.position.set(0, -0.4, 0);
    return group;
  }, []);

  // 6. Build Arcadia Bench
  const buildArcadiaBench = useCallback((fabricMat: THREE.MeshPhysicalMaterial, brassMat: THREE.MeshStandardMaterial) => {
    const group = new THREE.Group();
    fabricMaterialsRef.current = [];

    // Long beveled cushion seat
    const seatGeo = new THREE.BoxGeometry(3.2, 0.42, 1.35, 32, 8, 16);
    // Bevel top surface
    const pos = seatGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      if (y > 0.1) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        const crown = (1 - (x * x) / 3.0) * (1 - (z * z) / 0.8) * 0.08;
        pos.setY(i, y + Math.max(0, crown));
      }
    }
    seatGeo.computeVertexNormals();

    const seatMesh = new THREE.Mesh(seatGeo, fabricMat);
    seatMesh.position.set(0, 0.52, 0);
    seatMesh.castShadow = true;
    group.add(seatMesh);
    fabricMaterialsRef.current.push(fabricMat);

    // Bolster headrest roll
    const bolsterGeo = new THREE.CylinderGeometry(0.24, 0.24, 1.25, 32);
    bolsterGeo.rotateX(Math.PI / 2);
    const bolsterMesh = new THREE.Mesh(bolsterGeo, fabricMat);
    bolsterMesh.position.set(-1.15, 0.82, 0);
    bolsterMesh.castShadow = true;
    group.add(bolsterMesh);

    // Arch tubular brass sled legs
    [-1.1, 1.1].forEach((xPos) => {
      const archCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(xPos, 0, -0.62),
        new THREE.Vector3(xPos, 0.35, -0.62),
        new THREE.Vector3(xPos, 0.35, 0.62),
        new THREE.Vector3(xPos, 0, 0.62),
      ]);
      const archGeo = new THREE.TubeGeometry(archCurve, 32, 0.045, 16, false);
      const archMesh = new THREE.Mesh(archGeo, brassMat);
      archMesh.castShadow = true;
      group.add(archMesh);
    });

    group.position.set(0, -0.4, 0);
    return group;
  }, []);

  // Update Material Color smoothly
  useEffect(() => {
    if (fabricMaterialsRef.current.length > 0) {
      const targetColor = new THREE.Color(colorHex);
      fabricMaterialsRef.current.forEach((mat) => {
        mat.color.set(targetColor);
        // Subtle sheen tint matching the fabric
        mat.sheenColor.set(targetColor).lerp(new THREE.Color(0xFFFFFF), 0.5);
      });
    }
  }, [colorHex]);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera with cinematic focal length (65mm equivalent, 35 deg FOV to avoid wide-angle distortion)
    const camera = new THREE.PerspectiveCamera(
      34,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.6, 6.2);
    cameraRef.current = camera;

    // 3. WebGL Renderer with True Alpha Transparency (No background, sits right on website)
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // 4. Studio Lighting System (High-End Editorial Showcase)
    // Key Light: Warm soft studio key
    const keyLight = new THREE.DirectionalLight(0xFFF7EC, 2.8);
    keyLight.position.set(4.5, 6.5, 5.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 15;
    keyLight.shadow.bias = -0.0008;
    scene.add(keyLight);

    // Fill Light: Soft cool fill to balance shadows
    const fillLight = new THREE.DirectionalLight(0xEAF1FA, 1.4);
    fillLight.position.set(-5.0, 3.5, 4.0);
    scene.add(fillLight);

    // Rim / Hair Light: Clean backlight to accent contours & silhouette
    const rimLight = new THREE.DirectionalLight(0xFFFFFF, 1.8);
    rimLight.position.set(0, 5.0, -4.5);
    scene.add(rimLight);

    // Soft Ambient Studio Glow
    const ambientLight = new THREE.AmbientLight(0xFDF8F2, 1.2);
    scene.add(ambientLight);

    // Floor Bounce: Warm reflection from floor
    const bounceLight = new THREE.DirectionalLight(0xF5E6D3, 0.7);
    bounceLight.position.set(0, -3.0, 2.0);
    scene.add(bounceLight);

    // Accent Tint Light: Reflects active color theme onto contours & surroundings
    const accentPointLight = new THREE.PointLight(new THREE.Color(accentColor), 2.5, 9);
    accentPointLight.position.set(-2.8, 1.8, 2.0);
    scene.add(accentPointLight);

    // 5. Materials
    const bumpMap = createBoucleTexture();
    const fabricMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(colorHex),
      roughness: 0.88,
      metalness: 0.04,
      bumpMap: bumpMap || undefined,
      bumpScale: 0.018,
      sheen: 0.85,
      sheenColor: new THREE.Color(0xFFFFFF),
      sheenRoughness: 0.65,
      clearcoat: 0.04,
      clearcoatRoughness: 0.8,
    });

    const woodMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xC2A888), // Natural European White Oak
      roughness: 0.38,
      metalness: 0.02,
    });

    const brassMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xD4AF37), // Satin Architectural Brass
      roughness: 0.28,
      metalness: 0.85,
    });

    // 6. Build and Add 3D Model based on modelType
    let modelGroup: THREE.Group;
    if (modelType === 'dining-chair') {
      modelGroup = buildKansoChair(fabricMat, woodMat);
    } else if (modelType === 'pebble-table') {
      modelGroup = buildPebbleTable(woodMat);
    } else if (modelType === 'mushroom-lamp') {
      modelGroup = buildArcadiaBench(fabricMat, brassMat);
    } else {
      modelGroup = buildSolisChair(fabricMat, woodMat, brassMat);
    }
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // 6b. Floating 3D Orbital Accessory Elements (Whimsical tactile floating elements inspired by 35686.png)
    const floatingGroup = new THREE.Group();
    const floatingOrbs: { mesh: THREE.Mesh; basePos: THREE.Vector3; speed: number; phase: number; radius: number }[] = [];

    const orbData = [
      { r: 0.16, color: accentColor, metalness: 0.7, roughness: 0.2, pos: [-2.1, 0.9, 0.6] },
      { r: 0.11, color: '#D4AF37', metalness: 0.95, roughness: 0.15, pos: [2.2, 1.3, -0.5] },
      { r: 0.18, color: colorHex, metalness: 0.1, roughness: 0.6, pos: [-1.9, -0.2, 1.2] },
      { r: 0.10, color: '#FFFFFF', metalness: 0.2, roughness: 0.2, pos: [2.1, -0.1, 0.9] },
      { r: 0.13, color: accentColor, metalness: 0.5, roughness: 0.3, pos: [1.7, 1.8, 0.4] },
      { r: 0.09, color: '#D4AF37', metalness: 0.95, roughness: 0.1, pos: [-1.5, 1.9, -0.8] },
    ];

    orbData.forEach((data, i) => {
      const geo = new THREE.SphereGeometry(data.r, 24, 24);
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(data.color),
        roughness: data.roughness,
        metalness: data.metalness,
      });
      const mesh = new THREE.Mesh(geo, mat);
      const basePos = new THREE.Vector3(data.pos[0], data.pos[1], data.pos[2]);
      mesh.position.copy(basePos);
      floatingGroup.add(mesh);
      floatingOrbs.push({
        mesh,
        basePos,
        speed: 1.1 + i * 0.25,
        phase: i * 1.05,
        radius: 0.12 + (i % 3) * 0.06,
      });
    });
    scene.add(floatingGroup);

    // 7. Contact Shadow Mesh (Pinned on ground underneath the model, scales naturally)
    const shadowTex = createContactShadowTexture();
    if (shadowTex) {
      const shadowGeo = new THREE.PlaneGeometry(4.2, 4.2);
      const shadowMat = new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      });
      const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
      shadowMesh.rotation.x = -Math.PI / 2;
      shadowMesh.position.set(0, -0.68, 0);
      scene.add(shadowMesh);
      shadowMeshRef.current = shadowMesh;
    }

    // 8. Animation & Render Loop with Inertia Physics
    let animationFrameId: number;
    const render = () => {
      const state = rotationState.current;

      // Auto-rotation (gentle preview before interaction)
      if (state.autoRotate) {
        state.targetY += 0.0035;
      }

      // Smooth inertia damping
      if (!state.isDragging) {
        state.targetY += state.velocity;
        state.velocity *= 0.92; // Friction damping
        if (Math.abs(state.velocity) < 0.0001) {
          state.velocity = 0;
        }
      }

      // Smooth interpolation (lerp) toward target rotation
      state.currentY += (state.targetY - state.currentY) * 0.12;
      state.currentX += (state.targetX - state.currentX) * 0.12;

      // Report angle to parent HUD
      if (onAngleChange) {
        const deg = Math.round((((state.currentY % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) * (180 / Math.PI));
        onAngleChange(deg);
      }

      // Animate floating orbital accessory elements with gentle sine-wave bobbing
      const time = Date.now() * 0.0015;
      floatingOrbs.forEach((orb) => {
        orb.mesh.position.y = orb.basePos.y + Math.sin(time * orb.speed + orb.phase) * orb.radius;
        orb.mesh.position.x = orb.basePos.x + Math.cos(time * 0.8 + orb.phase) * (orb.radius * 0.5);
      });

      // Apply ONLY to the 3D model group! (Website remains completely stationary)
      if (modelGroupRef.current) {
        modelGroupRef.current.rotation.y = state.currentY;
        modelGroupRef.current.rotation.x = state.currentX;

        // Subtle breathing float animation
        const floatOffset = Math.sin(Date.now() * 0.0018) * 0.025;
        modelGroupRef.current.position.y = -0.4 + floatOffset;

        // Sync shadow scale with breathing float
        if (shadowMeshRef.current) {
          const shadowScale = 1 - floatOffset * 0.6;
          shadowMeshRef.current.scale.set(shadowScale, shadowScale, shadowScale);
        }
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;

      // Responsive FOV adjustment for mobile so product is large & never cropped
      if (width < 640) {
        camera.fov = 42;
        camera.position.z = 6.8;
      } else if (width < 1024) {
        camera.fov = 36;
        camera.position.z = 6.4;
      } else {
        camera.fov = 32;
        camera.position.z = 5.9;
      }
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, [buildSolisChair, buildKansoChair, buildPebbleTable, buildArcadiaBench, modelType, colorHex, accentColor, createBoucleTexture, createContactShadowTexture]);

  // Mouse & Touch Drag Handlers (ROTATES ONLY THE 3D PRODUCT)
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    rotationState.current.isDragging = true;
    rotationState.current.lastMouseX = e.clientX;
    rotationState.current.lastMouseY = e.clientY;
    rotationState.current.velocity = 0;
    rotationState.current.autoRotate = false; // Stop auto-rotation immediately on touch
    setIsDragging(true);

    if (!hasInteracted) {
      setHasInteracted(true);
      rotationState.current.hasInteracted = true;
      onInteracted?.();
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!rotationState.current.isDragging) return;

    const deltaX = e.clientX - rotationState.current.lastMouseX;
    const deltaY = e.clientY - rotationState.current.lastMouseY;

    // Direct, responsive horizontal rotation mapping
    const rotSpeed = 0.0075;
    rotationState.current.targetY += deltaX * rotSpeed;
    rotationState.current.velocity = deltaX * rotSpeed * 0.65; // Store velocity for smooth fling release

    // Subtle, natural vertical pitch tilt (clamped between -0.15 and 0.25 rad)
    const pitchSpeed = 0.003;
    const newPitch = rotationState.current.targetX + deltaY * pitchSpeed;
    rotationState.current.targetX = Math.max(-0.12, Math.min(0.24, newPitch));

    rotationState.current.lastMouseX = e.clientX;
    rotationState.current.lastMouseY = e.clientY;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    rotationState.current.isDragging = false;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }
  };

  // Quick Preset Angles (Front 3/4, Profile Side, Rear 3/4, Straight Front)
  const setPresetAngle = (targetRad: number, pitchRad = 0.08) => {
    rotationState.current.autoRotate = false;
    rotationState.current.targetY = targetRad;
    rotationState.current.targetX = pitchRad;
    rotationState.current.velocity = 0;
    if (!hasInteracted) {
      setHasInteracted(true);
      onInteracted?.();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center select-none overflow-visible ${className}`}
      style={{ touchAction: 'none' }}
    >
      {/* Real-Time WebGL 3D Canvas */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`w-full h-full block cursor-grab active:cursor-grabbing transition-opacity duration-700 ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          outline: 'none',
        }}
        aria-label="Interactive 3D Furniture Model. Drag horizontally to rotate 360 degrees."
      />

      {/* Subtle "DRAG TO ROTATE" Hint Badge (Fades away as instructed once interacted) */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-700 ${
          hasInteracted ? 'opacity-0 translate-y-3' : 'opacity-90 translate-y-0'
        }`}
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#182030]/85 backdrop-blur-md text-white text-[11px] font-medium tracking-wider shadow-lg border border-white/10">
          <svg className="w-3.5 h-3.5 animate-pulse text-[#E6C994]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          <span className="uppercase">Drag to Rotate 360°</span>
        </div>
      </div>

      {/* Preset Camera Perspective Controls (Front, Profile, Rear) */}
      <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 p-1 rounded-full bg-white/70 backdrop-blur-md border border-black/5 shadow-xs">
        <button
          onClick={() => setPresetAngle(-0.45, 0.08)}
          title="3/4 Front View"
          className="px-2.5 py-1 rounded-full text-[10px] font-semibold text-[#182030] hover:bg-white transition-all"
        >
          3/4 View
        </button>
        <button
          onClick={() => setPresetAngle(Math.PI / 2, 0.05)}
          title="Profile Side View"
          className="px-2.5 py-1 rounded-full text-[10px] font-semibold text-[#5A6372] hover:text-[#182030] hover:bg-white transition-all"
        >
          Profile
        </button>
        <button
          onClick={() => setPresetAngle(Math.PI, 0.1)}
          title="Rear View"
          className="px-2.5 py-1 rounded-full text-[10px] font-semibold text-[#5A6372] hover:text-[#182030] hover:bg-white transition-all"
        >
          Back
        </button>
        <button
          onClick={() => {
            rotationState.current.autoRotate = !rotationState.current.autoRotate;
          }}
          title="Toggle Slow Auto-Orbit"
          className="p-1.5 rounded-full text-[#5A6372] hover:text-[#182030] hover:bg-white transition-all"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </div>
  );
};
