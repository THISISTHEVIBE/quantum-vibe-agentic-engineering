import React, { useState, useCallback } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  useTheme,
  Paper,
  Divider,
} from '@mui/material'
import {
  PlayArrow as PlayIcon,
  Stop as StopIcon,
  Refresh as RefreshIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Science as ScienceIcon,
  Psychology as PsychologyIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import QuantumCircuit3D from '../../components/3D/QuantumCircuit3D'

interface QuantumGate {
  id: string
  type: string
  x: number
  y: number
  qubit: number
  parameters?: { [key: string]: number }
}

interface CircuitState {
  gates: QuantumGate[]
  qubits: number
  measurements: { [key: string]: number }
  executionTime: number
  fidelity: number
}

const QuantumCircuitBuilder: React.FC = () => {
  const theme = useTheme()
  const [circuit, setCircuit] = useState<CircuitState>({
    gates: [],
    qubits: 4,
    measurements: {},
    executionTime: 0,
    fidelity: 0,
  })
  const [selectedGate, setSelectedGate] = useState<string>('H')
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationResults, setSimulationResults] = useState<any>(null)
  const [show3DView, setShow3DView] = useState(false)

  const availableGates = [
    { type: 'H', name: 'Hadamard', description: 'Creates superposition state' },
    { type: 'X', name: 'Pauli-X', description: 'Bit flip gate' },
    { type: 'Y', name: 'Pauli-Y', description: 'Phase and bit flip' },
    { type: 'Z', name: 'Pauli-Z', description: 'Phase flip gate' },
    { type: 'CNOT', name: 'CNOT', description: 'Controlled NOT gate' },
    { type: 'SWAP', name: 'SWAP', description: 'Swaps two qubits' },
    { type: 'RX', name: 'Rotation-X', description: 'X-axis rotation' },
    { type: 'RY', name: 'Rotation-Y', description: 'Y-axis rotation' },
    { type: 'RZ', name: 'Rotation-Z', description: 'Z-axis rotation' },
  ]

  const addGate = useCallback((gateType: string, qubit: number, x: number) => {
    const newGate: QuantumGate = {
      id: `${gateType}_${Date.now()}`,
      type: gateType,
      x,
      y: qubit * 80 + 40,
      qubit,
      parameters: gateType.startsWith('R') ? { angle: Math.PI / 4 } : undefined,
    }
    setCircuit(prev => ({
      ...prev,
      gates: [...prev.gates, newGate],
    }))
  }, [])

  // Convert 2D gates to 3D format for visualization
  const get3DGates = useCallback(() => {
    return circuit.gates.map(gate => ({
      id: gate.id,
      type: gate.type,
      position: [gate.x / 100, gate.qubit * 2 - (circuit.qubits - 1), 0] as [number, number, number],
      qubit: gate.qubit,
      parameters: gate.parameters,
    }))
  }, [circuit.gates, circuit.qubits])

  const removeGate = useCallback((gateId: string) => {
    setCircuit(prev => ({
      ...prev,
      gates: prev.gates.filter(gate => gate.id !== gateId),
    }))
  }, [])

  const simulateCircuit = useCallback(async () => {
    setIsSimulating(true)
    
    // Simulate quantum circuit execution
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate mock results
    const results = {
      measurements: {
        '|0000⟩': Math.random() * 0.3,
        '|0001⟩': Math.random() * 0.3,
        '|0010⟩': Math.random() * 0.3,
        '|0011⟩': Math.random() * 0.3,
        '|0100⟩': Math.random() * 0.3,
        '|0101⟩': Math.random() * 0.3,
        '|0110⟩': Math.random() * 0.3,
        '|0111⟩': Math.random() * 0.3,
        '|1000⟩': Math.random() * 0.3,
        '|1001⟩': Math.random() * 0.3,
        '|1010⟩': Math.random() * 0.3,
        '|1011⟩': Math.random() * 0.3,
        '|1100⟩': Math.random() * 0.3,
        '|1101⟩': Math.random() * 0.3,
        '|1110⟩': Math.random() * 0.3,
        '|1111⟩': Math.random() * 0.3,
      },
      executionTime: Math.random() * 100 + 50,
      fidelity: Math.random() * 0.3 + 0.7,
      circuitDepth: circuit.gates.length,
      qubitCount: circuit.qubits,
    }
    
    setSimulationResults(results)
    setIsSimulating(false)
  }, [circuit])

  const clearCircuit = useCallback(() => {
    setCircuit(prev => ({
      ...prev,
      gates: [],
      measurements: {},
      executionTime: 0,
      fidelity: 0,
    }))
    setSimulationResults(null)
  }, [])

  const renderGate = (gate: QuantumGate) => (
    <motion.div
      key={gate.id}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      style={{
        position: 'absolute',
        left: gate.x,
        top: gate.y - 20,
        zIndex: 10,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 1,
          minWidth: 60,
          textAlign: 'center',
          bgcolor: theme.palette.primary.main,
          color: 'white',
          fontWeight: 600,
          cursor: 'pointer',
          position: 'relative',
        }}
        className="quantum-gate"
      >
        {gate.type}
        {gate.parameters?.angle && (
          <Typography variant="caption" sx={{ display: 'block', fontSize: '0.7rem' }}>
            {gate.parameters.angle.toFixed(2)}π
          </Typography>
        )}
        <IconButton
          size="small"
          onClick={() => removeGate(gate.id)}
          sx={{
            position: 'absolute',
            top: -8,
            right: -8,
            bgcolor: theme.palette.error.main,
            color: 'white',
            width: 20,
            height: 20,
            '&:hover': { bgcolor: theme.palette.error.dark },
          }}
        >
          <DeleteIcon sx={{ fontSize: 12 }} />
        </IconButton>
      </Paper>
    </motion.div>
  )

  const renderQubitLine = (qubitIndex: number) => (
    <Box
      key={qubitIndex}
      sx={{
        position: 'relative',
        height: 80,
        borderBottom: '1px solid rgba(0, 212, 255, 0.3)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          position: 'absolute',
          left: 10,
          color: theme.palette.primary.main,
          fontWeight: 600,
        }}
      >
        Q{qubitIndex}
      </Typography>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '100%',
          cursor: 'crosshair',
        }}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const x = e.clientX - rect.left
          addGate(selectedGate, qubitIndex, x)
        }}
      />
    </Box>
  )

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
        Quantum Circuit Builder
      </Typography>

      <Grid container spacing={3}>
        {/* Gate Palette */}
        <Grid item xs={12} md={3}>
          <Card className="hover-lift">
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <ScienceIcon sx={{ color: theme.palette.primary.main }} />
                Quantum Gates
              </Typography>
              
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Selected Gate</InputLabel>
                <Select
                  value={selectedGate}
                  label="Selected Gate"
                  onChange={(e) => setSelectedGate(e.target.value)}
                >
                  {availableGates.map((gate) => (
                    <MenuItem key={gate.type} value={gate.type}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {gate.name} ({gate.type})
                        </Typography>
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                          {gate.description}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
                Click on a qubit line to place the selected gate
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {availableGates.map((gate) => (
                  <Chip
                    key={gate.type}
                    label={gate.type}
                    onClick={() => setSelectedGate(gate.type)}
                    sx={{
                      bgcolor: selectedGate === gate.type ? theme.palette.primary.main : 'rgba(255, 255, 255, 0.1)',
                      color: selectedGate === gate.type ? 'white' : theme.palette.text.primary,
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* Circuit Controls */}
          <Card className="hover-lift" sx={{ mt: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Circuit Controls
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={isSimulating ? <StopIcon /> : <PlayIcon />}
                  onClick={simulateCircuit}
                  disabled={circuit.gates.length === 0}
                  sx={{ bgcolor: isSimulating ? theme.palette.error.main : theme.palette.success.main }}
                >
                  {isSimulating ? 'Stop Simulation' : 'Run Simulation'}
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={clearCircuit}
                  disabled={circuit.gates.length === 0}
                >
                  Clear Circuit
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<SaveIcon />}
                  disabled={circuit.gates.length === 0}
                >
                  Save Circuit
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<ScienceIcon />}
                  onClick={() => setShow3DView(!show3DView)}
                  sx={{ mt: 1 }}
                >
                  {show3DView ? 'Hide 3D View' : 'Show 3D View'}
                </Button>
              </Box>

              {circuit.gates.length > 0 && (
                <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(0, 212, 255, 0.1)', borderRadius: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    Circuit Statistics
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    Gates: {circuit.gates.length} | Qubits: {circuit.qubits}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Circuit Canvas */}
        <Grid item xs={12} md={6}>
          <Card className="hover-lift">
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                {show3DView ? '3D Circuit Visualization' : 'Circuit Canvas'}
              </Typography>
              
              {show3DView ? (
                <QuantumCircuit3D
                  gates={get3DGates()}
                  qubits={circuit.qubits}
                  isAnimating={isSimulating}
                />
              ) : (
                <Box
                  sx={{
                    position: 'relative',
                    minHeight: 400,
                    bgcolor: 'rgba(0, 0, 0, 0.3)',
                    border: '2px solid rgba(0, 212, 255, 0.3)',
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                  className="quantum-circuit"
                >
                  {/* Qubit lines */}
                  {Array.from({ length: circuit.qubits }, (_, i) => renderQubitLine(i))}
                  
                  {/* Placed gates */}
                  <AnimatePresence>
                    {circuit.gates.map(renderGate)}
                  </AnimatePresence>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Simulation Results */}
        <Grid item xs={12} md={3}>
          <Card className="hover-lift">
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <PsychologyIcon sx={{ color: theme.palette.secondary.main }} />
                Results
              </Typography>

              {isSimulating ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <div className="quantum-loading" style={{ margin: '0 auto 16px' }} />
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    Simulating quantum circuit...
                  </Typography>
                </Box>
              ) : simulationResults ? (
                <Box>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                      Execution Time
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                      {simulationResults.executionTime.toFixed(1)}ms
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                      Fidelity
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.secondary.main }}>
                      {(simulationResults.fidelity * 100).toFixed(1)}%
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                      Circuit Depth
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {simulationResults.circuitDepth}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
                    Measurement Probabilities
                  </Typography>
                  
                  <Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
                    {Object.entries(simulationResults.measurements)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 8)
                      .map(([state, probability]) => (
                        <Box key={state} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                            {state}
                          </Typography>
                          <Typography variant="caption" sx={{ fontWeight: 600 }}>
                            {(probability * 100).toFixed(1)}%
                          </Typography>
                        </Box>
                      ))}
                  </Box>
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <TimelineIcon sx={{ fontSize: 48, color: theme.palette.text.secondary, mb: 2 }} />
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    Run simulation to see results
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Circuit Visualization */}
      {simulationResults && (
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={6}>
            <Card className="hover-lift">
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Measurement Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={Object.entries(simulationResults.measurements).map(([state, probability]) => ({
                    state,
                    probability: probability * 100,
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                    <XAxis dataKey="state" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme.palette.background.paper,
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 8,
                      }}
                    />
                    <Bar dataKey="probability" fill={theme.palette.primary.main} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className="hover-lift">
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Performance Metrics
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'rgba(0, 212, 255, 0.1)', borderRadius: 2 }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                        {simulationResults.executionTime.toFixed(0)}
                      </Typography>
                      <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                        Execution Time (ms)
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'rgba(255, 107, 53, 0.1)', borderRadius: 2 }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.secondary.main }}>
                        {(simulationResults.fidelity * 100).toFixed(0)}%
                      </Typography>
                      <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                        Fidelity
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'rgba(0, 255, 136, 0.1)', borderRadius: 2 }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#00ff88' }}>
                        {simulationResults.circuitDepth}
                      </Typography>
                      <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                        Circuit Depth
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'rgba(165, 94, 234, 0.1)', borderRadius: 2 }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#a55eea' }}>
                        {simulationResults.qubitCount}
                      </Typography>
                      <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                        Qubits Used
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default QuantumCircuitBuilder
