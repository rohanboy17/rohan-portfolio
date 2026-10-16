"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const C = {
  lilac: "#b9a8ff",
  lilacDeep: "#a08cf5",
  peach: "#ffb38a",
  pink: "#ff9fd0",
  mint: "#7ee8a6",
  sky: "#7fd3ff",
  butter: "#ffe07a",
  cream: "#f6f2ff",
  screen: "#16122b",
};

/** Glossy "clay" look: soft colour, clear-coat shine, a little velvet sheen. */
function Clay({ color, roughness = 0.34 }: { color: string; roughness?: number }) {
  return (
    <meshPhysicalMaterial
      color={color}
      roughness={roughness}
      metalness={0}
      clearcoat={1}
      clearcoatRoughness={0.2}
      sheen={0.6}
      sheenRoughness={0.5}
      sheenColor="#ffffff"
    />
  );
}

const CODE_LINES: [indent: number, width: number, color: string][] = [
  [0, 0.7, C.pink],
  [0.18, 1.0, C.sky],
  [0.36, 0.55, C.mint],
  [0.36, 0.8, C.butter],
  [0.18, 0.45, C.sky],
  [0, 0.3, C.pink],
  [0, 0.9, C.lilac],
];

function Laptop() {
  return (
    <group>
      <RoundedBox args={[2.4, 0.14, 1.6]} radius={0.07} smoothness={4}>
        <Clay color={C.lilac} />
      </RoundedBox>
      <RoundedBox args={[1.95, 0.03, 0.62]} radius={0.012} smoothness={2} position={[0, 0.075, -0.2]}>
        <Clay color={C.lilacDeep} roughness={0.5} />
      </RoundedBox>
      <RoundedBox args={[0.7, 0.03, 0.38]} radius={0.012} smoothness={2} position={[0, 0.075, 0.46]}>
        <Clay color={C.lilacDeep} roughness={0.5} />
      </RoundedBox>

      {/* Lid, hinged at the back edge and tilted slightly away from the camera */}
      <group position={[0, 0.07, -0.78]} rotation={[-0.22, 0, 0]}>
        <RoundedBox args={[2.4, 1.56, 0.1]} radius={0.07} smoothness={4} position={[0, 0.78, 0]}>
          <Clay color={C.lilac} />
        </RoundedBox>
        <RoundedBox args={[2.16, 1.32, 0.02]} radius={0.04} smoothness={2} position={[0, 0.78, 0.055]}>
          <meshStandardMaterial color={C.screen} roughness={0.35} />
        </RoundedBox>
        {CODE_LINES.map(([indent, width, color], i) => (
          <RoundedBox
            key={i}
            args={[width, 0.075, 0.02]}
            radius={0.035}
            smoothness={2}
            position={[-0.92 + indent + width / 2, 1.3 - i * 0.16, 0.075]}
          >
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.55} roughness={0.4} />
          </RoundedBox>
        ))}
      </group>
    </group>
  );
}

function Bar({ length, position, rotation }: { length: number; position: [number, number, number]; rotation: number }) {
  return (
    <RoundedBox args={[length, 0.17, 0.17]} radius={0.08} smoothness={4} position={position} rotation={[0, 0, rotation]}>
      <Clay color={C.peach} />
    </RoundedBox>
  );
}

/** The `</>` glyph built from rounded bars. */
function CodeBrackets() {
  return (
    <group>
      <Bar length={0.62} position={[-0.75, 0.17, 0]} rotation={0.6} />
      <Bar length={0.62} position={[-0.75, -0.17, 0]} rotation={-0.6} />
      <Bar length={0.9} position={[0, 0, 0]} rotation={1.15} />
      <Bar length={0.62} position={[0.75, 0.17, 0]} rotation={-0.6} />
      <Bar length={0.62} position={[0.75, -0.17, 0]} rotation={0.6} />
    </group>
  );
}

function Rocket() {
  const flame = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!flame.current) return;
    const s = 1 + Math.sin(clock.elapsedTime * 18) * 0.12;
    flame.current.scale.set(1, s, 1);
  });

  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.32, 0.36, 1, 40]} />
        <Clay color={C.cream} />
      </mesh>
      <mesh position={[0, 0.75, 0]}>
        <coneGeometry args={[0.32, 0.5, 40]} />
        <Clay color={C.pink} />
      </mesh>
      <mesh position={[0, 0.15, 0.31]}>
        <torusGeometry args={[0.13, 0.045, 16, 40]} />
        <Clay color={C.sky} />
      </mesh>
      <mesh position={[0, 0.15, 0.3]}>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshPhysicalMaterial color="#bfe9ff" roughness={0.1} clearcoat={1} transmission={0.3} />
      </mesh>
      {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((a) => (
        <RoundedBox
          key={a}
          args={[0.07, 0.42, 0.34]}
          radius={0.03}
          smoothness={2}
          position={[Math.sin(a) * 0.36, -0.42, Math.cos(a) * 0.36]}
          rotation={[0, a, 0]}
        >
          <Clay color={C.mint} />
        </RoundedBox>
      ))}
      <mesh ref={flame} position={[0, -0.72, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.2, 0.45, 24]} />
        <meshStandardMaterial color={C.butter} emissive={C.peach} emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

function Database() {
  return (
    <group>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, i * 0.27 - 0.27, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.22, 40]} />
          <Clay color={C.mint} />
        </mesh>
      ))}
    </group>
  );
}

function Blob({ color, radius }: { color: string; radius: number }) {
  return (
    <mesh>
      <sphereGeometry args={[radius, 40, 40]} />
      <Clay color={color} roughness={0.25} />
    </mesh>
  );
}

/** Pointer + scroll driven tilt for the whole scene. */
function Rig({ lite, children }: { lite: boolean; children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.2);
    const targetY = pointer.current.x * 0.35 + scroll * 0.6;
    const targetX = pointer.current.y * 0.18 + scroll * 0.15;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetY, 0.05);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetX, 0.05);
    g.position.y = THREE.MathUtils.lerp(g.position.y, scroll * 0.8, 0.08);
  });

  return (
    <group ref={group} scale={lite ? 0.92 : 1}>
      {children}
    </group>
  );
}

function Scene({ lite }: { lite: boolean }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} />
      <directionalLight position={[-4, -2, -3]} intensity={0.5} color={C.lilac} />

      {/* Studio reflections without downloading an HDR file */}
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={2.5} position={[0, 4, 3]} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={1.2} color={C.pink} position={[-5, 1, 1]} scale={[3, 5, 1]} />
        <Lightformer form="rect" intensity={1.2} color={C.sky} position={[5, 0, 1]} scale={[3, 5, 1]} />
      </Environment>

      <Rig lite={lite}>
        <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.6}>
          <group position={[0, -0.45, 0]} rotation={[0.42, -0.55, 0]} scale={0.95}>
            <Laptop />
          </group>
        </Float>

        <Float speed={2.1} rotationIntensity={0.6} floatIntensity={1}>
          <group position={[-1.85, 1.75, -0.4]} rotation={[0.1, 0.45, -0.12]} scale={0.62}>
            <CodeBrackets />
          </group>
        </Float>

        <Float speed={2.4} rotationIntensity={0.5} floatIntensity={1.2}>
          <group position={[1.95, 1.45, 0.3]} rotation={[0.2, 0.3, -0.65]} scale={0.72}>
            <Rocket />
          </group>
        </Float>

        <Float speed={1.8} rotationIntensity={0.7} floatIntensity={0.9}>
          <group position={[-2.1, -1.55, 0.3]} rotation={[1.1, 0.2, 0.3]}>
            <mesh>
              <torusGeometry args={[0.36, 0.17, 28, 56]} />
              <Clay color={C.butter} roughness={0.28} />
            </mesh>
          </group>
        </Float>

        {lite ? null : (
          <>
            <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
              <group position={[2.15, -1.6, -0.2]} rotation={[0.35, 0.2, 0.1]} scale={0.8}>
                <Database />
              </group>
            </Float>
            <Float speed={2.8} floatIntensity={1.6}>
              <group position={[0.35, 2.05, -1]}>
                <Blob color={C.sky} radius={0.2} />
              </group>
            </Float>
            <Float speed={2.2} floatIntensity={1.4}>
              <group position={[-0.6, -2.15, 0.6]}>
                <Blob color={C.pink} radius={0.16} />
              </group>
            </Float>
            <Float speed={3} floatIntensity={1.4}>
              <group position={[2.55, 0.1, -0.8]}>
                <Blob color={C.peach} radius={0.13} />
              </group>
            </Float>
          </>
        )}
        <Float speed={1.9} floatIntensity={1.2}>
          <group position={[-2.5, 0.35, -0.6]}>
            <Blob color={C.mint} radius={0.24} />
          </group>
        </Float>
      </Rig>
    </>
  );
}

export default function ClayScene({ active, onReady }: { active: boolean; onReady?: () => void }) {
  const lite = useMemo(
    () =>
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768),
    [],
  );

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 40 }}
      dpr={lite ? 1 : [1, 1.5]}
      frameloop={active ? "always" : "never"}
      performance={{ min: 0.6 }}
      gl={{ antialias: !lite, alpha: true, powerPreference: "high-performance" }}
      onCreated={() => requestAnimationFrame(() => onReady?.())}
      aria-hidden
    >
      <Scene lite={lite} />
    </Canvas>
  );
}
