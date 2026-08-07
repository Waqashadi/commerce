"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Approx locations shown as pins on the globe
const MARKERS = [
  { lat: 51.5, lon: -0.12 }, // London
  { lat: 40.7, lon: -74.0 }, // New York
  { lat: -33.9, lon: 151.2 }, // Sydney
  { lat: 1.35, lon: 103.8 }, // Singapore
  { lat: -23.5, lon: -46.6 }, // Sao Paulo
  { lat: 25.2, lon: 55.3 }, // Dubai
];

function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
}

export default function InteractiveGlobe() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // ---- Scene / Camera / Renderer ----------------------------------
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

    camera.position.set(0, 0, 6.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // ---- Lights -------------------------------------------------------
    scene.add(new THREE.AmbientLight(0xffffff, 1.1));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    // ---- Globe group (everything that rotates together) ---------------
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const radius = 1.8;

    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(
      "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
    );
    const bumpTexture = textureLoader.load(
      "https://unpkg.com/three-globe/example/img/earth-topology.png"
    );

    const globeGeometry = new THREE.SphereGeometry(radius, 64, 64);
    const globeMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.03,
      shininess: 6,
    });
    const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
    globeGroup.add(globeMesh);

    // ---- Soft atmosphere glow (bright sky-blue, matches reference) -----
    const atmosphereGeometry = new THREE.SphereGeometry(radius * 1.015, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      uniforms: { glowColor: { value: new THREE.Color(0x2563eb) } },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 glowColor;
        void main() {
          float intensity = pow(0.55 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(glowColor, intensity * 1.1);
        }
      `,
    });
    scene.add(new THREE.Mesh(atmosphereGeometry, atmosphereMaterial));

    // ---- Outer halo ring (soft, near-white blue like the reference) ----
    const ringGeometry = new THREE.RingGeometry(radius * 1.3, radius * 1.34, 128);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xdbeafe,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 2.4;
    scene.add(ringMesh);

    // second, wider & fainter ring for extra depth
    const ring2Geometry = new THREE.RingGeometry(radius * 1.42, radius * 1.44, 128);
    const ring2Material = new THREE.MeshBasicMaterial({
      color: 0xbfdbfe,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const ring2Mesh = new THREE.Mesh(ring2Geometry, ring2Material);
    ring2Mesh.rotation.x = Math.PI / 2.1;
    scene.add(ring2Mesh);

    // ---- Location pins (white pin + light-blue glow, no connecting arcs,
    // matching the reference image) ---------------------------------------
    const pinGroup = new THREE.Group();
    MARKERS.forEach(({ lat, lon }) => {
      const pos = latLonToVector3(lat, lon, radius * 1.01);

      const pinHead = new THREE.Mesh(
        new THREE.SphereGeometry(0.055, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      pinHead.position.copy(pos);
      pinGroup.add(pinHead);

      const glowDot = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.45 })
      );
      glowDot.position.copy(pos);
      pinGroup.add(glowDot);
    });
    globeGroup.add(pinGroup);

    
    const orbitRadius = radius * 1.55;

    const orbitTilt = THREE.MathUtils.degToRad(35);
    const orbitAxisTilt = new THREE.Vector3(1, 0, 0);

    const orbitPoints: THREE.Vector3[] = [];
    const ORBIT_SEGMENTS = 128;
    for (let i = 0; i <= ORBIT_SEGMENTS; i++) {
      const t = (i / ORBIT_SEGMENTS) * Math.PI * 2;
      const v = new THREE.Vector3(
        orbitRadius * Math.cos(t),
        0,
        orbitRadius * Math.sin(t)
      );
      v.applyAxisAngle(orbitAxisTilt, orbitTilt);
      orbitPoints.push(v);
    }
    const orbitCurve = new THREE.CatmullRomCurve3(orbitPoints, true);

    // faint full path (like a satellite track)
    const orbitPathGeometry = new THREE.BufferGeometry().setFromPoints(
      orbitCurve.getPoints(200)
    );
    const orbitPathMaterial = new THREE.LineBasicMaterial({
      color: 0xbfdbfe,
      transparent: true,
      opacity: 0.3,
    });
    const orbitPathLine = new THREE.Line(orbitPathGeometry, orbitPathMaterial);
    scene.add(orbitPathLine);

    // detailed airplane (fuselage + nose + swept wings + engines + tail fin)
    // sized to be clearly visible next to the globe, like the reference image
    function createPlaneMesh() {
      const group = new THREE.Group();

      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.25,
        roughness: 0.35,
      });
      const accentMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a });
      const wingMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.2,
        roughness: 0.4,
      });

      // fuselage — cylinder body, long axis along Z, nose toward -Z
      const fuselage = new THREE.Mesh(
        new THREE.CylinderGeometry(0.045, 0.045, 0.5, 16),
        bodyMat
      );
      fuselage.rotation.x = Math.PI / 2;
      group.add(fuselage);

      // nose cone
      const nose = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.14, 16), bodyMat);
      nose.rotation.x = -Math.PI / 2;
      nose.position.z = -0.32;
      group.add(nose);

      // tail cone (tapered rear)
      const tailCone = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.045, 0.16, 16),
        bodyMat
      );
      tailCone.rotation.x = Math.PI / 2;
      tailCone.position.z = 0.33;
      group.add(tailCone);

      // main swept wings (mirrored pair)
      const wingGeo = new THREE.BoxGeometry(0.62, 0.014, 0.16);
      const wingL = new THREE.Mesh(wingGeo, wingMat);
      wingL.position.set(0.31, -0.01, 0.02);
      wingL.rotation.y = -0.18;
      group.add(wingL);

      const wingR = new THREE.Mesh(wingGeo, wingMat);
      wingR.position.set(-0.31, -0.01, 0.02);
      wingR.rotation.y = 0.18;
      group.add(wingR);

      // horizontal tail stabilizers
      const stabGeo = new THREE.BoxGeometry(0.26, 0.01, 0.08);
      const stabL = new THREE.Mesh(stabGeo, wingMat);
      stabL.position.set(0.13, 0, 0.34);
      group.add(stabL);
      const stabR = new THREE.Mesh(stabGeo, wingMat);
      stabR.position.set(-0.13, 0, 0.34);
      group.add(stabR);

      // vertical tail fin (navy accent, like the reference image)
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.16, 0.1), accentMat);
      fin.position.set(0, 0.09, 0.32);
      group.add(fin);

      // engine pods under the wings
      const engineGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.12, 12);
      const engineL = new THREE.Mesh(engineGeo, wingMat);
      engineL.rotation.x = Math.PI / 2;
      engineL.position.set(0.18, -0.05, -0.02);
      group.add(engineL);
      const engineR = new THREE.Mesh(engineGeo, wingMat);
      engineR.rotation.x = Math.PI / 2;
      engineR.position.set(-0.18, -0.05, -0.02);
      group.add(engineR);

      return group;
    }
    const plane = createPlaneMesh();
    scene.add(plane);

    // fading motion trail behind the plane
    const TRAIL_LENGTH = 40;
    const trailGeometry = new THREE.BufferGeometry();
    trailGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(TRAIL_LENGTH * 3), 3)
    );
    const trailMaterial = new THREE.LineBasicMaterial({
      color: 0xeff6ff,
      transparent: true,
      opacity: 0.55,
    });
    const trailLine = new THREE.Line(trailGeometry, trailMaterial);
    scene.add(trailLine);

    let planeT = 0;
    const PLANE_SPEED = 0.00009;

    // ---- Controls: draggable + ALWAYS auto-rotating ----------------------
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.1; // continuous, gentle spin
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;

    // ---- Animation loop ---------------------------------------------------
    let frameId: number ;
    let lastTime = performance.now();
    const trailPos = trailGeometry.attributes.position.array;

    const animate = (now = performance.now()) => {
      frameId = requestAnimationFrame(animate);
      const delta = now - lastTime;
      lastTime = now;

      // advance plane along its orbit, looping forever
      planeT = (planeT + PLANE_SPEED * delta) % 1;

      const planePos = orbitCurve.getPointAt(planeT);
      const tangent = orbitCurve.getTangentAt(planeT).normalize();
      plane.position.copy(planePos);
      // Object3D.lookAt aims the local +Z axis at the target (unlike cameras,
      // where -Z is forward). Our plane's nose sits on -Z, so we look at the
      // point BEHIND the plane — that makes -Z (the nose) face the direction
      // of travel instead of the tail.
      plane.lookAt(planePos.clone().sub(tangent));

      // redraw the trailing streak behind the plane
      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const t = (1 + planeT - i * 0.0025) % 1;
        const p = orbitCurve.getPointAt(t);
        trailPos[i * 3] = p.x;
        trailPos[i * 3 + 1] = p.y;
        trailPos[i * 3 + 2] = p.z;
      }
      trailGeometry.attributes.position.needsUpdate = true;

      controls.update(); // keeps globe rotating every frame, even without user input
      renderer.render(scene, camera);
    };
    animate();

    // ---- Resize handling ----------------------------------------------------
    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // ---- Cleanup ------------------------------------------------------------
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      globeGeometry.dispose();
      globeMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      ring2Geometry.dispose();
      ring2Material.dispose();
      earthTexture.dispose();
      bumpTexture.dispose();
      orbitPathGeometry.dispose();
      orbitPathMaterial.dispose();
      trailGeometry.dispose();
      trailMaterial.dispose();
      plane.traverse((obj) => {
  if (obj instanceof THREE.Mesh) {
    obj.geometry.dispose();

    if (Array.isArray(obj.material)) {
      obj.material.forEach((material) => material.dispose());
    } else {
      obj.material.dispose();
    }
  }
});
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-[380px] md:h-[460px] lg:h-[520px]"
      style={{ touchAction: "none" }}
    />
  );
}