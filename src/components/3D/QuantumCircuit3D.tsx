import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Box, Cylinder } from '@react-three/drei'
import * as THREE from 'three'


interface QuantumGate3D {
  id: string
  type: string
  position: [number, number, number]
  qubit: number
  parameters?: { [key: string]: number }
}

interface QuantumCircuit3DProps {
  gates: QuantumGate3D[]
  qubits: number
  isAnimating: boolean
}

const QuantumGate: React.FC<{ gate: QuantumGate3D; isAnimating: boolean }> = ({ gate, isAnimating }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current && isAnimating) {
      meshRef.current.rotation.y += 0.02
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.01
    }
  })

  const getGateColor = (type: string) => {
    switch (type) {
      case 'H': return '#00d4ff'
      case 'X': return '#ff6b35'
      case 'Y': return '#00ff88'
      case 'Z': return '#ff4757'
      case 'CNOT': return '#a55eea'
      case 'SWAP': return '#ffa502'
      default: return '#ffffff'
    }
  }

  const getGateGeometry = (type: string) => {
    switch (type) {
      case 'CNOT':
        return <Cylinder args={[0.3, 0.3, 0.2, 8]} />
      case 'SWAP':
        return <Box args={[0.4, 0.4, 0.4]} />
      default:
        return <Box args={[0.3, 0.3, 0.3]} />
    }
  }

  return (
    <mesh
      ref={meshRef}
      position={gate.position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {getGateGeometry(gate.type)}
      <meshStandardMaterial
        color={getGateColor(gate.type)}
        emissive={getGateColor(gate.type)}
        emissiveIntensity={hovered ? 0.3 : 0.1}
        metalness={0.8}
        roughness={0.2}
      />
      
      {/* Gate Label */}
      <Text
        position={[0, 0.4, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {gate.type}
      </Text>
          </mesh>
  )
}

const QubitLine: React.FC<{ index: number; length: number }> = ({ index, length }) => {
  const lineRef = useRef<THREE.Mesh>(null)
  const [isActive, setIsActive] = useState(false)

  useFrame((state) => {
    if (lineRef.current && isActive && lineRef.current.material instanceof THREE.MeshStandardMaterial) {
      lineRef.current.material.emissiveIntensity = Math.sin(state.clock.elapsedTime * 3) * 0.5 + 0.5
    }
  })

  return (
    <group position={[0, index * 2 - (length - 1), 0]}>
      {/* Qubit line */}
      <mesh
        ref={lineRef}
        onPointerOver={() => setIsActive(true)}
        onPointerOut={() => setIsActive(false)}
      >
        <Cylinder args={[0.02, 0.02, length * 2, 8]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={isActive ? 0.5 : 0.1}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Qubit label */}
      <Text
        position={[-length - 0.5, 0, 0]}
        fontSize={0.3}
        color="#00d4ff"
        anchorX="right"
        anchorY="middle"
      >
        Q{index}
      </Text>
    </group>
  )
}

const QuantumCircuit3D: React.FC<QuantumCircuit3DProps> = ({ gates, qubits, isAnimating }) => {
  return (
    <div style={{ width: '100%', height: '500px', position: 'relative' }}>
      <Canvas
        camera={{ position: [8, 5, 8], fov: 60 }}
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b35" />
        
        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minDistance={5}
          maxDistance={20}
        />
        
        {/* Qubit lines */}
        {Array.from({ length: qubits }, (_, i) => (
          <QubitLine key={i} index={i} length={qubits} />
        ))}
        
        {/* Quantum gates */}
        {gates.map((gate) => (
          <QuantumGate key={gate.id} gate={gate} isAnimating={isAnimating} />
        ))}
        
        {/* Grid helper */}
        <gridHelper args={[20, 20, '#00d4ff', '#1a1a2e']} />
      </Canvas>
      
      {/* Overlay controls */}
      <div style={{
        position: 'absolute',
        top: 16,
        right: 16,
        background: 'rgba(0, 0, 0, 0.8)',
        padding: '12px',
        borderRadius: '8px',
        color: 'white',
        fontSize: '14px'
      }}>
        <div>Qubits: {qubits}</div>
        <div>Gates: {gates.length}</div>
        <div>Status: {isAnimating ? 'Animating' : 'Static'}</div>
      </div>
    </div>
  )
}

export default QuantumCircuit3D
