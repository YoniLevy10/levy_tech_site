"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const LINE_COUNT = 8

export default function FlowLines() {
  const groupRef = useRef<THREE.Group>(null)
  
  // Create flow line data
  const flowData = useMemo(() => {
    return Array.from({ length: LINE_COUNT }, (_, i) => ({
      angle: (i / LINE_COUNT) * Math.PI * 2,
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
      opacity: 0.3 + Math.random() * 0.4,
    }))
  }, [])

  const meshRefs = useRef<(THREE.Mesh | null)[]>([])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    
    flowData.forEach((flow, index) => {
      // Update progress
      flow.progress = (flow.progress + flow.speed) % 1
      
      const mesh = meshRefs.current[index]
      if (mesh) {
        const startR = 1.1
        const endR = 3
        const r = startR + (endR - startR) * flow.progress
        
        mesh.position.x = Math.cos(flow.angle) * r
        mesh.position.y = Math.sin(flow.angle) * r * 0.5
        mesh.position.z = 0
        
        // Scale based on progress (fade in/out)
        const scale = Math.sin(flow.progress * Math.PI) * 0.8
        mesh.scale.setScalar(Math.max(0.1, scale))
        
        // @ts-expect-error - material opacity
        if (mesh.material) {
          // @ts-expect-error - material opacity
          mesh.material.opacity = flow.opacity * Math.sin(flow.progress * Math.PI)
        }
      }
    })
    
    if (groupRef.current) {
      groupRef.current.rotation.z = t * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {flowData.map((flow, index) => (
        <mesh
          key={index}
          ref={(el) => {
            meshRefs.current[index] = el
          }}
          position={[0, 0, 0]}
        >
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial
            color="#c8a96d"
            transparent
            opacity={flow.opacity}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}
