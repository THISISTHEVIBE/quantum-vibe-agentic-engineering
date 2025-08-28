import React, { useState, useEffect } from 'react'
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
} from '@mui/material'
import {
  PlayArrow as PlayIcon,
  TrendingUp as TrendingIcon,
  Speed as SpeedIcon,
  Memory as MemoryIcon,
  Psychology as PsychologyIcon,
  AccountBalanceWallet as WalletIcon,
  Science as ScienceIcon,
  Bolt as BoltIcon,
  Timeline as TimelineIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const Dashboard: React.FC = () => {
  const theme = useTheme()
  const [quantumState, setQuantumState] = useState(0)
  const [optimizationProgress, setOptimizationProgress] = useState(0)

  // Simulate quantum state evolution
  useEffect(() => {
    const interval = setInterval(() => {
      setQuantumState((prev) => (prev + 1) % 100)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // Simulate AI optimization progress
  useEffect(() => {
    const interval = setInterval(() => {
      setOptimizationProgress((prev) => {
        if (prev >= 100) return 0
        return prev + Math.random() * 10
      })
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const performanceData = [
    { name: '00:00', quantum: 65, classical: 45, ai: 78 },
    { name: '04:00', quantum: 72, classical: 48, ai: 82 },
    { name: '08:00', quantum: 78, classical: 52, ai: 85 },
    { name: '12:00', quantum: 85, classical: 55, ai: 88 },
    { name: '16:00', quantum: 92, classical: 58, ai: 91 },
    { name: '20:00', quantum: 88, classical: 61, ai: 94 },
  ]

  const quantumGates = [
    { name: 'H', count: 156, color: '#00d4ff' },
    { name: 'X', count: 89, color: '#ff6b35' },
    { name: 'Y', count: 67, color: '#00ff88' },
    { name: 'Z', count: 45, color: '#ff4757' },
    { name: 'CNOT', count: 123, color: '#a55eea' },
  ]

  const stats = [
    {
      title: 'Quantum Circuits Executed',
      value: '2,847',
      change: '+12.5%',
      icon: <ScienceIcon />,
      color: theme.palette.primary.main,
    },
    {
      title: 'AI Optimizations',
      value: '1,234',
      change: '+8.3%',
      icon: <PsychologyIcon />,
      color: theme.palette.secondary.main,
    },
    {
      title: 'Processing Speed',
      value: '1.2ms',
      change: '+15.7%',
      icon: <SpeedIcon />,
      color: '#00ff88',
    },
    {
      title: 'QVT Tokens Earned',
      value: '1,250',
      change: '+23.1%',
      icon: <WalletIcon />,
      color: '#ff6b35',
    },
  ]

  return (
    <Box sx={{ p: 3 }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card
          sx={{
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(255, 107, 53, 0.1) 100%)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            mb: 4,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <CardContent sx={{ p: 4, textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{ display: 'inline-block', marginBottom: 16 }}
            >
              <ScienceIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />
            </motion.div>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, background: 'linear-gradient(45deg, #00d4ff, #ff6b35)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Welcome to QuantumVibe
            </Typography>
            <Typography variant="h6" sx={{ color: theme.palette.text.secondary, mb: 3 }}>
              The Future of AI-Powered Quantum Computing is Here
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<PlayIcon />}
                sx={{
                  bgcolor: theme.palette.primary.main,
                  '&:hover': { bgcolor: theme.palette.primary.dark },
                }}
              >
                Start Quantum Journey
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<TrendingIcon />}
                sx={{
                  borderColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.main,
                  '&:hover': { borderColor: theme.palette.secondary.dark },
                }}
              >
                View Analytics
              </Button>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover-lift">
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Avatar sx={{ bgcolor: stat.color, width: 48, height: 48 }}>
                      {stat.icon}
                    </Avatar>
                    <Chip
                      label={stat.change}
                      size="small"
                      sx={{
                        bgcolor: stat.change.startsWith('+') ? '#00ff88' : '#ff4757',
                        color: 'white',
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    {stat.title}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Performance Chart */}
        <Grid item xs={12} lg={8}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="hover-lift">
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Real-Time Performance Metrics
                  </Typography>
                  <Chip label="Live" color="success" size="small" />
                </Box>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
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
                    <Line
                      type="monotone"
                      dataKey="quantum"
                      stroke={theme.palette.primary.main}
                      strokeWidth={3}
                      dot={{ fill: theme.palette.primary.main, strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="classical"
                      stroke={theme.palette.text.secondary}
                      strokeWidth={2}
                      dot={{ fill: theme.palette.text.secondary, strokeWidth: 2, r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="ai"
                      stroke={theme.palette.secondary.main}
                      strokeWidth={3}
                      dot={{ fill: theme.palette.secondary.main, strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Quantum Gates Distribution */}
        <Grid item xs={12} lg={4}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="hover-lift">
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Quantum Gates Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={quantumGates}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {quantumGates.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme.palette.background.paper,
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 8,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <Box sx={{ mt: 2 }}>
                  {quantumGates.map((gate, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: gate.color }} />
                        <Typography variant="body2">{gate.name}</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {gate.count}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Quantum State Monitor */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Card className="hover-lift">
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <BoltIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Quantum State Monitor
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography variant="h2" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                    {quantumState}%
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    Quantum Coherence
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={quantumState}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: 'rgba(0, 212, 255, 0.2)',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: theme.palette.primary.main,
                      borderRadius: 4,
                    },
                  }}
                />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* AI Optimization Progress */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Card className="hover-lift">
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <PsychologyIcon sx={{ color: theme.palette.secondary.main, fontSize: 28 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    AI Optimization Progress
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography variant="h2" sx={{ fontWeight: 700, color: theme.palette.secondary.main }}>
                    {Math.round(optimizationProgress)}%
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    Circuit Optimization
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={optimizationProgress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: 'rgba(255, 107, 53, 0.2)',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: theme.palette.secondary.main,
                      borderRadius: 4,
                    },
                  }}
                />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="hover-lift">
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Recent Quantum Computing Activity
                </Typography>
                <Grid container spacing={2}>
                  {[
                    { action: 'Quantum Circuit Executed', time: '2 minutes ago', status: 'success', details: 'Grover\'s Algorithm - 8 qubits' },
                    { action: 'AI Optimization Completed', time: '5 minutes ago', status: 'success', details: 'Circuit depth reduced by 23%' },
                    { action: 'Quantum Error Correction', time: '8 minutes ago', status: 'warning', details: 'Surface code applied - 99.2% fidelity' },
                    { action: 'New Quantum Algorithm', time: '12 minutes ago', status: 'info', details: 'Custom VQE implementation' },
                  ].map((activity, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Box sx={{ p: 2, border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <CheckIcon sx={{ color: '#00ff88', fontSize: 16 }} />
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {activity.action}
                          </Typography>
                        </Box>
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                          {activity.time}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1, color: theme.palette.text.secondary }}>
                          {activity.details}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard
