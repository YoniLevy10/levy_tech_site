"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

interface CoreSphereProps {
  mousePosition: { x: number; y: number }
}

export default function CoreSphere({ mousePosition }: CoreSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  const gradientTexture = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext("2d")!

    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
    gradient.addColorStop(0, "#1a1815")
    gradient.addColorStop(0.3, "#0f0e0c")
    gradient.addColorStop(0.7, "#080706")
    gradient.addColorStop(1, "#040403")

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 256, 256)

    return new THREE.CanvasTexture(canvas)
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1

      const targetScale = 1 + Math.abs(mousePosition.x) * 0.05 + Math.abs(mousePosition.y) * 0.03
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05)
    }

    if (glowRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      glowRef.current.scale.setScalar(1.15 * pulse)

      const materials = Array.isArray(glowRef.current.material)
        ? glowRef.current.material
        : [glowRef.current.material]

      materials.forEach((material) => {
        if (material instanceof THREE.Material) {
          material.transparent = true
          material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05
        }
      })
    }
  })

  return (
    <group>
      <Sphere ref={glowRef} args={[1.3, 32, 32]}>
        <meshBasicMaterial color="#c8a96d" transparent opacity={0.08} side={THREE.BackSide} />
      </Sphere>

      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#0a0908"
          roughness={0.4}
          metalness={0.8}
          distort={0.2}
          speed={2}
          envMapIntensity={0.5}
          map={gradientTexture}
        />
      </Sphere>

      <Sphere args={[1.01, 32, 32]}>
        <meshBasicMaterial color="#c8a96d" transparent opacity={0.06} wireframe />
      </Sphere>

      <Sphere args={[0.3, 16, 16]}>
        <meshBasicMaterial color="#c8a96d" transparent opacity={0.3} />
      </Sphere>
    </group>
  )
}
