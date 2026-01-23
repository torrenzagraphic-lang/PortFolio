import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import MagneticButton from "@/components/portfolio/MagneticButton";
import { profile } from "@/data/portfolio";

function Orb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!ref.current) return;
    ref.current.rotation.y = t * 0.18;
    ref.current.position.y = Math.sin(t * 0.7) * 0.18;
  });

  return (
    <Float floatIntensity={0.9} rotationIntensity={0.4} speed={1.1}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.05, 4]} />
        <meshStandardMaterial
          color={new THREE.Color("hsl(214, 92%, 62%)")}
          emissive={new THREE.Color("hsl(214, 92%, 62%)")}
          emissiveIntensity={0.35}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
    </Float>
  );
}

function LaptopHint() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(t * 0.5) * 0.03;
    ref.current.rotation.x = -0.22 + Math.sin(t * 0.45) * 0.02;
  });

  return (
    <group ref={ref} position={[0, -0.6, -0.2]}>
      <Float floatIntensity={0.35} rotationIntensity={0.2} speed={0.9}>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[2.1, 1.35, 0.08]} />
          <meshStandardMaterial color={new THREE.Color("hsl(210, 40%, 99%)")} roughness={0.35} metalness={0.08} />
        </mesh>
        <mesh position={[0, -0.55, 0.25]} rotation={[-0.75, 0, 0]}>
          <boxGeometry args={[2.2, 1.3, 0.08]} />
          <meshStandardMaterial
            color={new THREE.Color("hsl(214, 26%, 90%)")}
            roughness={0.5}
            metalness={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
}

function Scene() {
  const sparkles = useMemo(
    () => ({
      count: 70,
      speed: 0.35,
      size: 1.2,
      opacity: 0.45,
      color: "#7cc7ff",
    }),
    [],
  );

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 4, 4]} intensity={1.1} />
      <directionalLight position={[-4, -1, -3]} intensity={0.4} color={"#9ad7ff"} />

      <Orb />
      <LaptopHint />
      <Sparkles {...sparkles} scale={[7, 3, 4]} position={[0, 0.2, 0]} />
      <Environment preset="city" />
    </>
  );
}

export default function ThreeHero() {
  const reduced = useReducedMotion();

  return (
    <section id="top" className="relative min-h-[92vh] overflow-hidden pt-20">
      <div className="pointer-events-none absolute inset-0 bg-hero" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 grain" aria-hidden="true" />

      <div className="absolute inset-0" aria-hidden="true">
        <Canvas
          frameloop={reduced ? "never" : "demand"}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0.25, 5], fov: 42 }}
        >
          <Scene />
        </Canvas>
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-1 text-xs text-muted-foreground shadow-soft backdrop-blur-xl"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            {profile.availability} · {profile.location}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          >
            <span className="text-gradient">Premium</span> {profile.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            {profile.subhead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <MagneticButton asChild variant="hero" size="lg">
              <a href="#projects">View Projects</a>
            </MagneticButton>
            <MagneticButton asChild variant="glass" size="lg">
              <a href="#cv">Download CV</a>
            </MagneticButton>
          </motion.div>
        </div>

        <motion.a
          href="#skills"
          aria-label="Scroll to skills"
          className="group mt-16 inline-flex w-fit items-center gap-2 rounded-full border border-border/60 bg-card/45 px-4 py-2 text-xs text-muted-foreground shadow-soft backdrop-blur-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="relative flex h-4 w-4 items-center justify-center">
            <span className="absolute h-4 w-4 animate-ping rounded-full bg-primary/25" aria-hidden="true" />
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
          </span>
          Scroll
          <span className="transition-transform group-hover:translate-y-0.5" aria-hidden="true">
            ↓
          </span>
        </motion.a>
      </div>
    </section>
  );
}
