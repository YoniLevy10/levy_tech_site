"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { Preload } from "@react-three/drei"
import CoreSphere from "./CoreSphere"
import HelixRings from "./HelixRings"
import ParticleField from "./ParticleField"
import FlowLines from "./FlowLines"
import Effects from "./Effects"

interface HeroSceneProps {
  mousePosition: { x: number; y: number }
}

export default function HeroScene({ mousePosition }: HeroSceneProps) {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#c8a96d" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#6b5b95" />
          
          <group position={[mousePosition.x * 0.15, mousePosition.y * 0.1, 0]}>
            <CoreSphere mousePosition={mousePosition} />
            <HelixRings />
            <ParticleField />
            <FlowLines />
          </group>
          
          <Effects />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
