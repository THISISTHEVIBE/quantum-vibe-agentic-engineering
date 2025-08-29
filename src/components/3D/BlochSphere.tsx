import React, { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Line, Text } from '@react-three/drei'
import * as THREE from 'three'

interface BlochSphereProps {
  theta: number // Polar angle (0 to π)
  phi: number   // Azimuthal angle (0 to 2π)
  state: string // Quantum state label
  isAnimating: boolean
}

const BlochSphere: React.FC<BlochSphereProps> = ({ theta, phi, state, isAnimating }) => {
  const sphereRef = useRef<THREE.Mesh>(null)
  const stateVectorRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  // Calculate state vector position on Bloch sphere
  const stateVectorPosition = useMemo(() => {
    const x = Math.sin(theta) * Math.cos(phi)
    const y = Math.sin(theta) * Math.sin(phi)
    const z = Math.cos(theta)
    return [x, y, z] as [number, number, number]
  }, [theta, phi])

  // Animate sphere rotation
  useFrame((state) => {
    if (sphereRef.current && isAnimating) {
      sphereRef.current.rotation.y += 0.005
    }
  })

  // Animate state vector
  useFrame((state) => {
    if (stateVectorRef.current && isAnimating) {
      stateVectorRef.current.rotation.y += 0.01
      stateVectorRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.01
    }
  })

  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <Canvas
        camera={{ position: [3, 2, 3], fov: 60 }}
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#00d4ff" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff6b35" />
        
        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI}
          minDistance={2}
          maxDistance={10}
        />
        
        {/* Bloch sphere surface */}
        <mesh
          ref={sphereRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#00d4ff"
            transparent
            opacity={0.1}
            wireframe
            wireframeLinewidth={1}
          />
        </mesh>
        
        {/* Coordinate axes */}
        <group>
          {/* X-axis */}
          <Line
            points={[[-1.2, 0, 0], [1.2, 0, 0]]}
            color="#ff6b35"
            lineWidth={2}
          />
          <Text position={[1.3, 0, 0]} fontSize={0.1} color="#ff6b35">
            X
          </Text>
          
          {/* Y-axis */}
          <Line
            points={[[0, -1.2, 0], [0, 1.2, 0]]}
            color="#00ff88"
            lineWidth={2}
          />
          <Text position={[0, 1.3, 0]} fontSize={0.1} color="#00ff88">
            Y
          </Text>
          
          {/* Z-axis */}
          <Line
            points={[[0, 0, -1.2], [0, 0, 1.2]]}
            color="#a55eea"
            lineWidth={2}
          />
          <Text position={[0, 0, 1.3]} fontSize={0.1} color="#a55eea">
            Z
          </Text>
        </group>
        
        {/* State vector */}
        <group ref={stateVectorRef} position={stateVectorPosition}>
          {/* Vector line from origin to state */}
          <Line
            points={[[0, 0, 0], stateVectorPosition]}
            color="#ff4757"
            lineWidth={3}
          />
          
          {/* State point */}
          <mesh>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial
              color="#ff4757"
              emissive="#ff4757"
              emissiveIntensity={0.5}
            />
          </mesh>
          
          {/* State label */}
          <Text
            position={[0, 0.15, 0]}
            fontSize={0.08}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {state}
          </Text>
        </group>
        
        {/* Basis states */}
        <group>
          {/* |0⟩ state (north pole) */}
          <mesh position={[0, 0, 1]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshStandardMaterial color="#00ff88" />
          </mesh>
          <Text position={[0, 0, 1.15]} fontSize={0.08} color="#00ff88">
            |0⟩
          </Text>
          
          {/* |1⟩ state (south pole) */}
          <mesh position={[0, 0, -1]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshStandardMaterial color="#ff6b35" />
          </mesh>
          <Text position={[0, 0, -1.15]} fontSize={0.08} color="#ff6b35">
            |1⟩
          </Text>
          
          {/* |+⟩ state (positive X) */}
          <mesh position={[1, 0, 0]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshStandardMaterial color="#00d4ff" />
          </mesh>
          <Text position={[1.15, 0, 0]} fontSize={0.08} color="#00d4ff">
            |+⟩
          </Text>
          
          {/* |-⟩ state (negative X) */}
          <mesh position={[-1, 0, 0]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshStandardMaterial color="#a55eea" />
          </mesh>
          <Text position={[-1.15, 0, 0]} fontSize={0.08} color="#a55eea">
            |-⟩
          </Text>
        </group>
        
        {/* Grid helper */}
        <gridHelper args={[4, 4, '#00d4ff', '#1a1a2e']} />
      </Canvas>
      
      {/* Overlay information */}
      <div style={{
        position: 'absolute',
        top: 16,
        left: 16,
        background: 'rgba(0, 0, 0, 0.8)',
        padding: '12px',
        borderRadius: '8px',
        color: 'white',
        fontSize: '14px'
      }}>
        <div style={{ marginBottom: '8px' }}>
          <strong>Quantum State: {state}</strong>
        </div>
        <div>θ: {(theta * 180 / Math.PI).toFixed(1)}°</div>
        <div>φ: {(phi * 180 / Math.PI).toFixed(1)}°</div>
        <div style={{ marginTop: '8px', fontSize: '12px', opacity: 0.8 }}>
          Click and drag to rotate view
        </div>
      </div>
    </div>
  )
}

export default BlochSphere
