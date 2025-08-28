import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Box, CssBaseline } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard/Dashboard'
import QuantumCircuitBuilder from './pages/QuantumCircuitBuilder/QuantumCircuitBuilder'
import AIOptimization from './pages/AIOptimization/AIOptimization'
import Blockchain from './pages/Blockchain/Blockchain'
import Analytics from './pages/Analytics/Analytics'
import Settings from './pages/Settings/Settings'

const App: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Dashboard />
                </motion.div>
              }
            />
            <Route
              path="/circuit-builder"
              element={
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <QuantumCircuitBuilder />
                </motion.div>
              }
            />
            <Route
              path="/ai-optimization"
              element={
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <AIOptimization />
                </motion.div>
              }
            />
            <Route
              path="/blockchain"
              element={
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Blockchain />
                </motion.div>
              }
            />
            <Route
              path="/analytics"
              element={
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Analytics />
                </motion.div>
              }
            />
            <Route
              path="/settings"
              element={
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Settings />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </Layout>
    </Box>
  )
}

export default App
