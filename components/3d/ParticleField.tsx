"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const PARTICLE_COUNT = 200

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  
  // Initialize particle data
  const particleData = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const velocities: { a: number; b: number; r: number; speed: number; drift: number; driftSpeed: number }[] = []
    const sizes = new Float32Array(PARTICLE_COUNT)
    const opacities = new Float32Array(PARTICLE_COUNT)
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Spherical distribution
      const a = Math.random() * Math.PI * 2
      const b = Math.acos(2 * Math.random() - 1)
      const r = 1.2 + Math.random() * 1.5
      
      positions[i * 3] = r * Math.sin(b) * Math.cos(a)
      positions[i * 3 + 1] = r * Math.sin(b) * Math.sin(a) * 0.6
      positions[i * 3 + 2] = r * Math.cos(b)
      
      velocities.push({
        a,
        b,
        r,
        speed: (0.2 + Math.random() * 0.5) * (Math.random() < 0.5 ? 1 : -1) * 0.01,
        drift: Math.random() * Math.PI * 2,
        driftSpeed: (0.001 + Math.random() * 0.003) * (Math.random() < 0.5 ? 1 : -1),
      })
      
      sizes[i] = Math.random() * 3 + 1
      opacities[i] = Math.random() * 0.6 + 0.2
    }
    
    return { positions, velocities, sizes, opacities }
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
    const t = state.clock.elapsedTime
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const vel = particleData.velocities[i]
      
      // Update angles
      vel.a += vel.speed
      vel.drift += vel.driftSpeed
      
      // Calculate new position with orbital motion
      const rad = vel.r + Math.sin(vel.drift) * 0.15
      positions[i * 3] = rad * Math.sin(vel.b) * Math.cos(vel.a)
      positions[i * 3 + 1] = rad * Math.sin(vel.b) * Math.sin(vel.a) * 0.6
      positions[i * 3 + 2] = rad * Math.cos(vel.b)
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.rotation.y = t * 0.02
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particleData.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[particleData.sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#c8a96d"
        size={0.02}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
