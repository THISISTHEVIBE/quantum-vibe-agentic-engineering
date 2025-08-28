import React from 'react'
import { Box, Grid, Card, CardContent, Typography, useTheme } from '@mui/material'
import { Analytics as AnalyticsIcon } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

const Analytics: React.FC = () => {
  const theme = useTheme()

  const performanceData = [
    { month: 'Jan', quantum: 65, classical: 45, ai: 78 },
    { month: 'Feb', quantum: 72, classical: 48, ai: 82 },
    { month: 'Mar', quantum: 78, classical: 52, ai: 85 },
    { month: 'Apr', quantum: 85, classical: 55, ai: 88 },
    { month: 'May', quantum: 92, classical: 58, ai: 91 },
    { month: 'Jun', quantum: 88, classical: 61, ai: 94 },
  ]

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
        Analytics Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card className="hover-lift">
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Performance Metrics Over Time
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
                  <YAxis stroke={theme.palette.text.secondary} />
                  <Tooltip />
                  <Line type="monotone" dataKey="quantum" stroke={theme.palette.primary.main} strokeWidth={3} />
                  <Line type="monotone" dataKey="classical" stroke={theme.palette.text.secondary} strokeWidth={2} />
                  <Line type="monotone" dataKey="ai" stroke={theme.palette.secondary.main} strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card className="hover-lift">
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Platform Usage
              </Typography>
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <AnalyticsIcon sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                  2,847
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  Quantum Circuits Executed
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Analytics
