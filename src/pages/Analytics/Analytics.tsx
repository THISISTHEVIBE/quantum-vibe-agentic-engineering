import React, { useState, useEffect, useCallback } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  LinearProgress,
  Avatar,
  IconButton,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Slider,
  TextField,
} from '@mui/material'
import {
  Analytics as AnalyticsIcon,
  TrendingUp as TrendingIcon,
  Speed as SpeedIcon,
  Memory as MemoryIcon,
  Psychology as PsychologyIcon,
  Science as ScienceIcon,
  Timeline as TimelineIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  FilterList as FilterIcon,
  ViewModule as ViewModuleIcon,
  ViewList as ViewListIcon,
} from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import BlochSphere from '../../components/3D/BlochSphere'

interface PerformanceMetric {
  timestamp: Date
  quantumFidelity: number
  classicalAccuracy: number
  executionTime: number
  energyConsumption: number
  qubitCount: number
  circuitDepth: number
}

interface AlgorithmPerformance {
  name: string
  category: string
  quantumAdvantage: number
  classicalBaseline: number
  quantumResult: number
  executionTime: number
  successRate: number
  qubitsUsed: number
}

interface ResourceUtilization {
  resource: string
  currentUsage: number
  maxCapacity: number
  utilization: number
  status: 'optimal' | 'warning' | 'critical'
  lastUpdated: Date
}

const Analytics: React.FC = () => {
  const theme = useTheme()
  const [activeTab, setActiveTab] = useState(0)
  const [timeRange, setTimeRange] = useState('24h')
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['quantumFidelity', 'executionTime'])
  const [isRealTime, setIsRealTime] = useState(true)
  const [quantumState, setQuantumState] = useState({ theta: Math.PI / 6, phi: Math.PI / 3 })
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Mock performance data
  const [performanceData] = useState<PerformanceMetric[]>([
    { timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000), quantumFidelity: 0.85, classicalAccuracy: 0.72, executionTime: 45, energyConsumption: 120, qubitCount: 8, circuitDepth: 24 },
    { timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000), quantumFidelity: 0.87, classicalAccuracy: 0.74, executionTime: 42, energyConsumption: 118, qubitCount: 8, circuitDepth: 22 },
    { timestamp: new Date(Date.now() - 21 * 60 * 60 * 1000), quantumFidelity: 0.89, classicalAccuracy: 0.76, executionTime: 40, energyConsumption: 115, qubitCount: 8, circuitDepth: 20 },
    { timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000), quantumFidelity: 0.91, classicalAccuracy: 0.78, executionTime: 38, energyConsumption: 112, qubitCount: 8, circuitDepth: 18 },
    { timestamp: new Date(Date.now() - 19 * 60 * 60 * 1000), quantumFidelity: 0.93, classicalAccuracy: 0.80, executionTime: 35, energyConsumption: 110, qubitCount: 8, circuitDepth: 16 },
    { timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000), quantumFidelity: 0.95, classicalAccuracy: 0.82, executionTime: 32, energyConsumption: 108, qubitCount: 8, circuitDepth: 14 },
    { timestamp: new Date(Date.now() - 17 * 60 * 60 * 1000), quantumFidelity: 0.97, classicalAccuracy: 0.84, executionTime: 30, energyConsumption: 105, qubitCount: 8, circuitDepth: 12 },
    { timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000), quantumFidelity: 0.98, classicalAccuracy: 0.86, executionTime: 28, energyConsumption: 103, qubitCount: 8, circuitDepth: 10 },
    { timestamp: new Date(Date.now() - 15 * 60 * 60 * 1000), quantumFidelity: 0.99, classicalAccuracy: 0.88, executionTime: 25, energyConsumption: 100, qubitCount: 8, circuitDepth: 8 },
    { timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000), quantumFidelity: 0.99, classicalAccuracy: 0.90, executionTime: 22, energyConsumption: 98, qubitCount: 8, circuitDepth: 6 },
    { timestamp: new Date(Date.now() - 13 * 60 * 60 * 1000), quantumFidelity: 0.99, classicalAccuracy: 0.92, executionTime: 20, energyConsumption: 95, qubitCount: 8, circuitDepth: 4 },
    { timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), quantumFidelity: 0.99, classicalAccuracy: 0.94, executionTime: 18, energyConsumption: 92, qubitCount: 8, circuitDepth: 2 },
  ])

  // Mock algorithm performance data
  const [algorithmData] = useState<AlgorithmPerformance[]>([
    { name: 'Grover\'s Algorithm', category: 'Search', quantumAdvantage: 0.85, classicalBaseline: 0.45, quantumResult: 0.92, executionTime: 15, successRate: 0.94, qubitsUsed: 8 },
    { name: 'Shor\'s Algorithm', category: 'Factoring', quantumAdvantage: 0.92, classicalBaseline: 0.28, quantumResult: 0.89, executionTime: 25, successRate: 0.87, qubitsUsed: 12 },
    { name: 'VQE', category: 'Optimization', quantumAdvantage: 0.78, classicalBaseline: 0.62, quantumResult: 0.85, executionTime: 35, successRate: 0.91, qubitsUsed: 6 },
    { name: 'QAOA', category: 'Optimization', quantumAdvantage: 0.81, classicalBaseline: 0.58, quantumResult: 0.88, executionTime: 30, successRate: 0.93, qubitsUsed: 8 },
    { name: 'Quantum Fourier Transform', category: 'Transform', quantumAdvantage: 0.88, classicalBaseline: 0.52, quantumResult: 0.95, executionTime: 20, successRate: 0.96, qubitsUsed: 10 },
  ])

  // Mock resource utilization data
  const [resourceData] = useState<ResourceUtilization[]>([
    { resource: 'Quantum Processor', currentUsage: 85, maxCapacity: 100, utilization: 85, status: 'optimal', lastUpdated: new Date() },
    { resource: 'Classical Compute', currentUsage: 72, maxCapacity: 100, utilization: 72, status: 'optimal', lastUpdated: new Date() },
    { resource: 'Memory', currentUsage: 68, maxCapacity: 100, utilization: 68, status: 'optimal', lastUpdated: new Date() },
    { resource: 'Network Bandwidth', currentUsage: 45, maxCapacity: 100, utilization: 45, status: 'optimal', lastUpdated: new Date() },
    { resource: 'Storage', currentUsage: 58, maxCapacity: 100, utilization: 58, status: 'optimal', lastUpdated: new Date() },
    { resource: 'GPU Clusters', currentUsage: 78, maxCapacity: 100, utilization: 78, status: 'warning', lastUpdated: new Date() },
  ])

  // Simulate quantum state evolution
  useEffect(() => {
    if (isRealTime) {
      const interval = setInterval(() => {
        setQuantumState(prev => ({
          theta: (prev.theta + 0.008) % (Math.PI * 2),
          phi: (prev.phi + 0.012) % (Math.PI * 2),
        }))
      }, 300)
      return () => clearInterval(interval)
    }
  }, [isRealTime])

  const chartData = performanceData.map(metric => ({
    time: metric.timestamp.toLocaleTimeString(),
    quantumFidelity: metric.quantumFidelity * 100,
    classicalAccuracy: metric.classicalAccuracy * 100,
    executionTime: metric.executionTime,
    energyConsumption: metric.energyConsumption,
    qubitCount: metric.qubitCount,
    circuitDepth: metric.circuitDepth,
  }))

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return '#00ff88'
      case 'warning': return '#ffa502'
      case 'critical': return '#ff4757'
      default: return '#a55eea'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal': return <CheckIcon />
      case 'warning': return <WarningIcon />
      case 'critical': return <ErrorIcon />
      default: return <TimelineIcon />
    }
  }

  const radarData = [
    { metric: 'Quantum Fidelity', quantum: 95, classical: 72 },
    { metric: 'Execution Speed', quantum: 88, classical: 65 },
    { metric: 'Energy Efficiency', quantum: 82, classical: 78 },
    { metric: 'Scalability', quantum: 90, classical: 60 },
    { metric: 'Accuracy', quantum: 92, classical: 75 },
    { metric: 'Reliability', quantum: 87, classical: 70 },
  ]

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
        Advanced Analytics & Performance Metrics
      </Typography>

      {/* Control Panel */}
      <Card className="hover-lift" sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
              <AnalyticsIcon sx={{ color: theme.palette.primary.main }} />
              Analytics Control Center
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isRealTime}
                    onChange={(e) => setIsRealTime(e.target.checked)}
                    color="primary"
                  />
                }
                label="Real-time Updates"
              />
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                size="small"
              >
                Refresh Data
              </Button>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                size="small"
              >
                Export Report
              </Button>
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Time Range</InputLabel>
                <Select
                  value={timeRange}
                  label="Time Range"
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <MenuItem value="1h">Last Hour</MenuItem>
                  <MenuItem value="24h">Last 24 Hours</MenuItem>
                  <MenuItem value="7d">Last 7 Days</MenuItem>
                  <MenuItem value="30d">Last 30 Days</MenuItem>
                  <MenuItem value="90d">Last 90 Days</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {['quantumFidelity', 'classicalAccuracy', 'executionTime', 'energyConsumption', 'qubitCount', 'circuitDepth'].map((metric) => (
                  <Chip
                    key={metric}
                    label={metric.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    onClick={() => {
                      if (selectedMetrics.includes(metric)) {
                        setSelectedMetrics(prev => prev.filter(m => m !== metric))
                      } else {
                        setSelectedMetrics(prev => [...prev, metric])
                      }
                    }}
                    sx={{
                      bgcolor: selectedMetrics.includes(metric) ? theme.palette.primary.main : 'rgba(255, 255, 255, 0.1)',
                      color: selectedMetrics.includes(metric) ? 'white' : theme.palette.text.primary,
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  onClick={() => setViewMode('grid')}
                  sx={{ color: viewMode === 'grid' ? theme.palette.primary.main : theme.palette.text.secondary }}
                >
                  <ViewModuleIcon />
                </IconButton>
                <IconButton
                  onClick={() => setViewMode('list')}
                  sx={{ color: viewMode === 'list' ? theme.palette.primary.main : theme.palette.text.secondary }}
                >
                  <ViewListIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Card className="hover-lift" sx={{ mb: 3 }}>
        <CardContent sx={{ p: 0 }}>
          <Tabs
            value={activeTab}
            onChange={(_: React.SyntheticEvent, newValue: number) => setActiveTab(newValue)}
            sx={{
              borderBottom: 1,
              borderColor: 'rgba(255, 255, 255, 0.1)',
              '& .MuiTab-root': {
                color: theme.palette.text.secondary,
                '&.Mui-selected': {
                  color: theme.palette.primary.main,
                },
              },
            }}
          >
            <Tab label="Performance Overview" />
            <Tab label="Algorithm Analysis" />
            <Tab label="Resource Monitoring" />
            <Tab label="Quantum Insights" />
          </Tabs>

          {/* Performance Overview Tab */}
          {activeTab === 0 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Real-time Performance Metrics
              </Typography>

              {/* Key Metrics Cards */}
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ bgcolor: 'rgba(0, 212, 255, 0.1)' }}>
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main, mb: 1 }}>
                        {(performanceData[performanceData.length - 1]?.quantumFidelity * 100).toFixed(1)}%
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        Quantum Fidelity
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ bgcolor: 'rgba(255, 107, 53, 0.1)' }}>
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.secondary.main, mb: 1 }}>
                        {performanceData[performanceData.length - 1]?.executionTime}ms
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        Execution Time
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ bgcolor: 'rgba(0, 255, 136, 0.1)' }}>
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#00ff88', mb: 1 }}>
                        {performanceData[performanceData.length - 1]?.qubitCount}
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        Active Qubits
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card sx={{ bgcolor: 'rgba(165, 94, 234, 0.1)' }}>
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#a55eea', mb: 1 }}>
                        {performanceData[performanceData.length - 1]?.circuitDepth}
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        Circuit Depth
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Performance Charts */}
              <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                  <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                        Performance Trends Over Time
                      </Typography>
                      <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
                          <YAxis stroke={theme.palette.text.secondary} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: theme.palette.background.paper,
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: 8,
                            }}
                          />
                          {selectedMetrics.includes('quantumFidelity') && (
                            <Line
                              type="monotone"
                              dataKey="quantumFidelity"
                              stroke={theme.palette.primary.main}
                              strokeWidth={3}
                              dot={{ fill: theme.palette.primary.main, strokeWidth: 2, r: 4 }}
                              name="Quantum Fidelity (%)"
                            />
                          )}
                          {selectedMetrics.includes('classicalAccuracy') && (
                            <Line
                              type="monotone"
                              dataKey="classicalAccuracy"
                              stroke={theme.palette.secondary.main}
                              strokeWidth={3}
                              dot={{ fill: theme.palette.secondary.main, strokeWidth: 2, r: 4 }}
                              name="Classical Accuracy (%)"
                            />
                          )}
                          {selectedMetrics.includes('executionTime') && (
                            <Line
                              type="monotone"
                              dataKey="executionTime"
                              stroke="#00ff88"
                              strokeWidth={3}
                              dot={{ fill: '#00ff88', strokeWidth: 2, r: 4 }}
                              name="Execution Time (ms)"
                            />
                          )}
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} lg={4}>
                  <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                        Energy vs Performance
                      </Typography>
                      <ResponsiveContainer width="100%" height={300}>
                        <ScatterChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                          <XAxis dataKey="energyConsumption" stroke={theme.palette.text.secondary} />
                          <YAxis dataKey="quantumFidelity" stroke={theme.palette.text.secondary} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: theme.palette.background.paper,
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: 8,
                            }}
                          />
                          <Scatter
                            dataKey="quantumFidelity"
                            fill={theme.palette.primary.main}
                            stroke={theme.palette.primary.main}
                          />
                        </ScatterChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Algorithm Analysis Tab */}
          {activeTab === 1 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Quantum vs Classical Algorithm Performance
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} lg={6}>
                  <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                        Performance Comparison Radar
                      </Typography>
                      <ResponsiveContainer width="100%" height={400}>
                        <RadarChart data={radarData}>
                          <PolarGrid stroke="rgba(255, 255, 255, 0.1)" />
                          <PolarAngleAxis dataKey="metric" stroke={theme.palette.text.secondary} />
                          <PolarRadiusAxis stroke="rgba(255, 255, 255, 0.1)" />
                          <Radar
                            name="Quantum Performance"
                            dataKey="quantum"
                            stroke={theme.palette.primary.main}
                            fill={theme.palette.primary.main}
                            fillOpacity={0.3}
                          />
                          <Radar
                            name="Classical Performance"
                            dataKey="classical"
                            stroke={theme.palette.secondary.main}
                            fill={theme.palette.secondary.main}
                            fillOpacity={0.3}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: theme.palette.background.paper,
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: 8,
                            }}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} lg={6}>
                  <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                        Algorithm Success Rates
                      </Typography>
                      <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={algorithmData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                          <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                          <YAxis stroke={theme.palette.text.secondary} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: theme.palette.background.paper,
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: 8,
                            }}
                          />
                          <Bar dataKey="successRate" fill={theme.palette.primary.main} name="Success Rate" />
                          <Bar dataKey="quantumAdvantage" fill={theme.palette.secondary.main} name="Quantum Advantage" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Algorithm Details Table */}
                <Grid item xs={12}>
                  <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                        Detailed Algorithm Performance
                      </Typography>
                      <TableContainer component={Paper} sx={{ bgcolor: 'transparent' }}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Algorithm</TableCell>
                              <TableCell>Category</TableCell>
                              <TableCell>Quantum Advantage</TableCell>
                              <TableCell>Success Rate</TableCell>
                              <TableCell>Execution Time</TableCell>
                              <TableCell>Qubits Used</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {algorithmData.map((algo) => (
                              <TableRow key={algo.name}>
                                <TableCell>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {algo.name}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Chip label={algo.category} size="small" color="primary" />
                                </TableCell>
                                <TableCell>
                                  <Typography variant="body2" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                                    {(algo.quantumAdvantage * 100).toFixed(1)}%
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography variant="body2" sx={{ color: theme.palette.success.main, fontWeight: 600 }}>
                                    {(algo.successRate * 100).toFixed(1)}%
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography variant="body2">
                                    {algo.executionTime}ms
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography variant="body2">
                                    {algo.qubitsUsed}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Resource Monitoring Tab */}
          {activeTab === 2 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                System Resource Utilization
              </Typography>

              <Grid container spacing={3}>
                {resourceData.map((resource) => (
                  <Grid item xs={12} sm={6} md={4} key={resource.resource}>
                    <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Avatar sx={{ bgcolor: getStatusColor(resource.status), width: 40, height: 40 }}>
                            {getStatusIcon(resource.status)}
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {resource.resource}
                            </Typography>
                            <Chip
                              label={resource.status}
                              size="small"
                              sx={{ bgcolor: getStatusColor(resource.status), color: 'white' }}
                            />
                          </Box>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                              Utilization
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {resource.utilization}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={resource.utilization}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              bgcolor: 'rgba(255, 255, 255, 0.1)',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: getStatusColor(resource.status),
                                borderRadius: 4,
                              },
                            }}
                          />
                        </Box>

                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                              Current Usage
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {resource.currentUsage}%
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                              Max Capacity
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {resource.maxCapacity}%
                            </Typography>
                          </Grid>
                        </Grid>

                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary, mt: 2, display: 'block' }}>
                          Last updated: {resource.lastUpdated.toLocaleTimeString()}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Quantum Insights Tab */}
          {activeTab === 3 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Quantum Computing Insights
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <ScienceIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Quantum State Evolution
                        </Typography>
                      </Box>
                      <BlochSphere
                        theta={quantumState.theta}
                        phi={quantumState.phi}
                        state="|ψ⟩"
                        isAnimating={isRealTime}
                      />
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                        Quantum-Classical Performance Gap
                      </Typography>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
                          <YAxis stroke={theme.palette.text.secondary} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: theme.palette.background.paper,
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: 8,
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="quantumFidelity"
                            stackId="1"
                            stroke={theme.palette.primary.main}
                            fill={theme.palette.primary.main}
                            fillOpacity={0.3}
                            name="Quantum Performance"
                          />
                          <Area
                            type="monotone"
                            dataKey="classicalAccuracy"
                            stackId="1"
                            stroke={theme.palette.secondary.main}
                            fill={theme.palette.secondary.main}
                            fillOpacity={0.3}
                            name="Classical Performance"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default Analytics
