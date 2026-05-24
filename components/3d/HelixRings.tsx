"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Line } from "@react-three/drei"
import * as THREE from "three"

export default function HelixRings() {
  const group1Ref = useRef<THREE.Group>(null)
  const group2Ref = useRef<THREE.Group>(null)
  const group3Ref = useRef<THREE.Group>(null)
  const group4Ref = useRef<THREE.Group>(null)

  // Create ring geometries with different parameters
  const rings = useMemo(() => {
    return [
      { rx: 1.5, ry: 0.5, tilt: -0.3, speed: 0.3, lineWidth: 1, opacity: 0.35, dashed: true },
      { rx: 1.9, ry: 0.6, tilt: 0.5, speed: -0.2, lineWidth: 0.8, opacity: 0.2, dashed: true },
      { rx: 2.4, ry: 0.75, tilt: 0.15, speed: 0.15, lineWidth: 0.6, opacity: 0.13, dashed: true },
      { rx: 2.9, ry: 0.4, tilt: -0.6, speed: -0.12, lineWidth: 0.5, opacity: 0.09, dashed: false },
    ]
  }, [])

  // Create ellipse curve points
  const createEllipseCurve = (rx: number, ry: number, segments: number = 128) => {
    const points: THREE.Vector3[] = []
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      points.push(new THREE.Vector3(Math.cos(angle) * rx, 0, Math.sin(angle) * ry))
    }
    return points
  }

  useFrame((state) => {
    const t = state.clock.elapsedTime
    
    if (group1Ref.current) {
      group1Ref.current.rotation.y = t * rings[0].speed
      group1Ref.current.rotation.x = rings[0].tilt + Math.sin(t * 0.5) * 0.05
    }
    if (group2Ref.current) {
      group2Ref.current.rotation.y = t * rings[1].speed
      group2Ref.current.rotation.x = rings[1].tilt + Math.sin(t * 0.4) * 0.05
    }
    if (group3Ref.current) {
      group3Ref.current.rotation.y = t * rings[2].speed
      group3Ref.current.rotation.x = rings[2].tilt + Math.sin(t * 0.3) * 0.05
    }
    if (group4Ref.current) {
      group4Ref.current.rotation.y = t * rings[3].speed
      group4Ref.current.rotation.x = rings[3].tilt + Math.sin(t * 0.35) * 0.05
    }
  })

  const groupRefs = [group1Ref, group2Ref, group3Ref, group4Ref]

  return (
    <group>
      {rings.map((ring, index) => {
        const points = createEllipseCurve(ring.rx, ring.ry)
        
        return (
          <group key={index} ref={groupRefs[index]}>
            <Line
              points={points}
              color="#c8a96d"
              transparent
              opacity={ring.opacity}
              lineWidth={ring.lineWidth}
              dashed={ring.dashed}
              dashSize={0.1}
              gapSize={0.15}
            />
          </group>
        )
      })}
    </group>
  )
}
