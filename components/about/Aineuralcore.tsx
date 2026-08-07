"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// ---------------------------------------------------------------------------
// AI Neural Core
// A rotating icosahedral lattice of nodes, with light pulses that travel
// along the edges in real time — a visual metaphor for signals moving
// through a neural network / model "thinking".
// ---------------------------------------------------------------------------

const CYAN = 0x22d3ee;
const VIOLET = 0x818cf8;
const CORE_COLOR = 0x0a0e1a;

interface Pulse {
  edgeIndex: number;
  t: number; // 0..1 progress along the edge
  speed: number;
  mesh: THREE.Mesh;
}

export default function AINeuralCore() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // ---- Scene / Camera / Renderer ----------------------------------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // ---- Lights -------------------------------------------------------
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const key = new THREE.PointLight(0x22d3ee, 2.2, 20);
    key.position.set(3, 2, 4);
    scene.add(key);
    const rim = new THREE.PointLight(0x818cf8, 1.4, 20);
    rim.position.set(-4, -2, -3);
    scene.add(rim);

    // ---- Core lattice group -------------------------------------------
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    const radius = 2.1;

    // Subdivided icosahedron gives an even, organic node/edge distribution.
    // NOTE: depending on the installed three.js version, PolyhedronGeometry
    // may or may not come back indexed — handle both cases explicitly
    // instead of assuming icoGeo.index exists.
    const icoGeo = new THREE.IcosahedronGeometry(radius, 2);
    const posAttr = icoGeo.attributes.position;
    const indexAttr = icoGeo.index; // may be null

    const key3 = (v: THREE.Vector3) =>
      `${v.x.toFixed(3)}_${v.y.toFixed(3)}_${v.z.toFixed(3)}`;

    // Deduplicate vertices -> nodes
    const nodeMap = new Map<string, THREE.Vector3>();
    for (let i = 0; i < posAttr.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(posAttr, i);
      nodeMap.set(key3(v), v);
    }
    const nodes = Array.from(nodeMap.values());

    // Build unique edges by walking triangles, whether the geometry is
    // indexed or a raw (non-indexed) triangle soup.
    const triCount = indexAttr ? indexAttr.count / 3 : posAttr.count / 3;
    const getVertex = (triVertexIndex: number) => {
      const i = indexAttr ? indexAttr.getX(triVertexIndex) : triVertexIndex;
      return new THREE.Vector3().fromBufferAttribute(posAttr, i);
    };

    const edgeSet = new Set<string>();
    const edges: [THREE.Vector3, THREE.Vector3][] = [];
    for (let t = 0; t < triCount; t++) {
      const a = getVertex(t * 3);
      const b = getVertex(t * 3 + 1);
      const c = getVertex(t * 3 + 2);
      const tris: [THREE.Vector3, THREE.Vector3][] = [
        [a, b],
        [b, c],
        [c, a],
      ];
      tris.forEach(([p, q]) => {
        const k1 = key3(p) + "|" + key3(q);
        const k2 = key3(q) + "|" + key3(p);
        if (!edgeSet.has(k1) && !edgeSet.has(k2)) {
          edgeSet.add(k1);
          edges.push([p, q]);
        }
      });
    }

    // Safety net: if for any reason we still ended up with no edges
    // (e.g. a future geometry format change), fall back to connecting
    // each node to its neighbor in list order so the scene never crashes.
    if (edges.length === 0 && nodes.length > 1) {
      nodes.forEach((n, i) => {
        const next = nodes[(i + 1) % nodes.length];
        edges.push([n, next]);
      });
    }

    // Faint lattice wireframe (idle state, violet)
    const linePositions: number[] = [];
    edges.forEach(([a, b]) => {
      linePositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    });
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: VIOLET,
      transparent: true,
      opacity: 0.22,
    });
    const latticeLines = new THREE.LineSegments(lineGeo, lineMat);
    coreGroup.add(latticeLines);

    // Nodes (small glowing spheres)
    const nodeGeo = new THREE.SphereGeometry(0.035, 12, 12);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: VIOLET,
      emissive: new THREE.Color(VIOLET),
      emissiveIntensity: 0.6,
      roughness: 0.4,
    });
    nodes.forEach((pos) => {
      const m = new THREE.Mesh(nodeGeo, nodeMat);
      m.position.copy(pos);
      coreGroup.add(m);
    });

    // A few "hub" nodes rendered larger — these are the ones we anchor
    // feature-label callouts to from the parent page (see data-node attrs).
    const hubIndices = [2, 14, 27, 41, 55].filter((i) => i < nodes.length);
    const hubMat = new THREE.MeshStandardMaterial({
      color: CYAN,
      emissive: new THREE.Color(CYAN),
      emissiveIntensity: 1.1,
      roughness: 0.3,
    });
    const hubGeo = new THREE.SphereGeometry(0.07, 16, 16);
    hubIndices.forEach((i) => {
      const m = new THREE.Mesh(hubGeo, hubMat);
      m.position.copy(nodes[i]);
      coreGroup.add(m);
    });

    // Inner glowing core sphere (the "mind")
    const innerGeo = new THREE.SphereGeometry(radius * 0.4, 32, 32);
    const innerMat = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        colorA: { value: new THREE.Color(CYAN) },
        colorB: { value: new THREE.Color(VIOLET) },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 colorA;
        uniform vec3 colorB;
        uniform float uTime;
        void main() {
          float pulse = 0.5 + 0.5 * sin(uTime * 1.6);
          vec3 col = mix(colorA, colorB, pulse);
          float fresnel = pow(1.0 - abs(vNormal.z), 2.2);
          gl_FragColor = vec4(col, fresnel * 0.9);
        }
      `,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Outer atmosphere glow
    const glowGeo = new THREE.SphereGeometry(radius * 1.08, 48, 48);
    const glowMat = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      uniforms: { glowColor: { value: new THREE.Color(CYAN) } },
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
          float intensity = pow(0.5 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(glowColor, intensity * 0.7);
        }
      `,
    });
    scene.add(new THREE.Mesh(glowGeo, glowMat));

    // ---- Data pulses traveling along random edges ------------------------
    const pulseGeo = new THREE.SphereGeometry(0.045, 10, 10);
    const pulseMat = new THREE.MeshBasicMaterial({ color: CYAN });
    const pulses: Pulse[] = [];
    const MAX_PULSES = 22;

    function spawnPulse() {
      const edgeIndex = Math.floor(Math.random() * edges.length);
      const mesh = new THREE.Mesh(pulseGeo, pulseMat.clone());
      coreGroup.add(mesh);
      pulses.push({
        edgeIndex,
        t: 0,
        speed: 0.006 + Math.random() * 0.01,
        mesh,
      });
    }
    for (let i = 0; i < MAX_PULSES; i++) spawnPulse();

    // ---- Controls -----------------------------------------------------
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.9;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;

    // ---- Animation loop -------------------------------------------------
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      innerMat.uniforms.uTime.value = elapsed;

      pulses.forEach((p) => {
        if (edges.length === 0) return; // nothing to travel along — skip safely

        p.t += p.speed;
        if (p.t >= 1) {
          p.t = 0;
          p.edgeIndex = Math.floor(Math.random() * edges.length);
        }
        const edge = edges[p.edgeIndex];
        if (!edge) {
          p.edgeIndex = 0;
          return;
        }
        const [a, b] = edge;
        p.mesh.position.lerpVectors(a, b, p.t);
        const mat = p.mesh.material as THREE.MeshBasicMaterial;
        // fade in/out at the ends of travel for a softer look
        const fade = Math.sin(p.t * Math.PI);
        mat.opacity = 0.4 + 0.6 * fade;
        mat.transparent = true;
      });

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // ---- Resize -------------------------------------------------------
    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // ---- Cleanup --------------------------------------------------------
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      icoGeo.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      hubGeo.dispose();
      hubMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      pulseGeo.dispose();
      pulses.forEach((p) => {
        (p.mesh.material as THREE.Material).dispose();
      });
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-[420px] md:h-[520px] lg:h-[580px]"
      style={{ touchAction: "none" }}
    />
  );
}