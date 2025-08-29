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
  TextField,
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import {
  AccountBalanceWallet as WalletIcon,
  TrendingUp as TrendingIcon,
  SwapHoriz as SwapIcon,
  Security as SecurityIcon,
  Lock as LockIcon,
  Send as SendIcon,
  Receipt as ReceiptIcon,
  History as HistoryIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Science as ScienceIcon,
} from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'
import BlochSphere from '../../components/3D/BlochSphere'

interface Token {
  symbol: string
  name: string
  balance: number
  price: number
  change24h: number
  marketCap: number
  icon: string
}

interface Transaction {
  id: string
  type: 'send' | 'receive' | 'swap' | 'stake' | 'unstake'
  amount: number
  token: string
  from: string
  to: string
  timestamp: Date
  status: 'pending' | 'confirmed' | 'failed'
  hash: string
  gasUsed: number
  gasPrice: number
}

interface SmartContract {
  id: string
  name: string
  address: string
  type: 'token' | 'dao' | 'defi' | 'nft'
  balance: number
  transactions: number
  lastActivity: Date
  status: 'active' | 'paused' | 'upgrading'
}

const Blockchain: React.FC = () => {
  const theme = useTheme()
  const [activeTab, setActiveTab] = useState(0)
  const [quantumState, setQuantumState] = useState({ theta: Math.PI / 3, phi: Math.PI / 2 })
  const [isQuantumEncryption, setIsQuantumEncryption] = useState(true)
  const [showTransactionDialog, setShowTransactionDialog] = useState(false)
  const [transactionForm, setTransactionForm] = useState({
    type: 'send',
    amount: '',
    recipient: '',
    token: 'QVT',
  })

  // Mock token data
  const [tokens] = useState<Token[]>([
    {
      symbol: 'QVT',
      name: 'QuantumVibe Token',
      balance: 1250.5,
      price: 2.45,
      change24h: 12.5,
      marketCap: 24500000,
      icon: '🔮',
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      balance: 0.85,
      price: 1850.0,
      change24h: -2.3,
      marketCap: 222000000000,
      icon: 'Ξ',
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      balance: 500.0,
      price: 1.0,
      change24h: 0.1,
      marketCap: 25000000000,
      icon: '💵',
    },
  ])

  // Mock transaction history
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'receive',
      amount: 250.0,
      token: 'QVT',
      from: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
      to: '0x1234567890123456789012345678901234567890',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'confirmed',
      hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      gasUsed: 21000,
      gasPrice: 20,
    },
    {
      id: '2',
      type: 'swap',
      amount: 100.0,
      token: 'QVT',
      from: '0x1234567890123456789012345678901234567890',
      to: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: 'confirmed',
      hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      gasUsed: 150000,
      gasPrice: 25,
    },
    {
      id: '3',
      type: 'stake',
      amount: 500.0,
      token: 'QVT',
      from: '0x1234567890123456789012345678901234567890',
      to: '0xStakingContract123456789012345678901234567890',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'confirmed',
      hash: '0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456',
      gasUsed: 80000,
      gasPrice: 22,
    },
  ])

  // Mock smart contracts
  const [smartContracts] = useState<SmartContract[]>([
    {
      id: '1',
      name: 'QuantumVibe Token',
      address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
      type: 'token',
      balance: 1000000,
      transactions: 15420,
      lastActivity: new Date(Date.now() - 30 * 60 * 1000),
      status: 'active',
    },
    {
      id: '2',
      name: 'Quantum DAO',
      address: '0xDaoContract123456789012345678901234567890',
      type: 'dao',
      balance: 500000,
      transactions: 8920,
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'active',
    },
    {
      id: '3',
      name: 'Quantum Staking Pool',
      address: '0xStakingContract1234567890abcdef1234567890',
      type: 'defi',
      balance: 2500000,
      transactions: 23450,
      lastActivity: new Date(Date.now() - 15 * 60 * 1000),
      status: 'active',
    },
  ])

  // Mock price data
  const [priceData] = useState([
    { time: '00:00', QVT: 2.45, ETH: 1850, USDC: 1.0 },
    { time: '04:00', QVT: 2.52, ETH: 1860, USDC: 1.0 },
    { time: '08:00', QVT: 2.48, ETH: 1845, USDC: 1.0 },
    { time: '12:00', QVT: 2.61, ETH: 1870, USDC: 1.0 },
    { time: '16:00', QVT: 2.58, ETH: 1865, USDC: 1.0 },
    { time: '20:00', QVT: 2.45, ETH: 1850, USDC: 1.0 },
  ])

  // Simulate quantum state evolution for encryption
  useEffect(() => {
    if (isQuantumEncryption) {
      const interval = setInterval(() => {
        setQuantumState(prev => ({
          theta: (prev.theta + 0.01) % (Math.PI * 2),
          phi: (prev.phi + 0.015) % (Math.PI * 2),
        }))
      }, 200)
      return () => clearInterval(interval)
    }
  }, [isQuantumEncryption])

  const totalPortfolioValue = tokens.reduce((sum, token) => sum + token.balance * token.price, 0)
  const totalPortfolioChange = tokens.reduce((sum, token) => sum + token.change24h * (token.balance * token.price) / 100, 0)

  const handleTransactionSubmit = useCallback(() => {
    // Here you would typically submit the transaction to the blockchain
    console.log('Submitting transaction:', transactionForm)
    setShowTransactionDialog(false)
    setTransactionForm({ type: 'send', amount: '', recipient: '', token: 'QVT' })
  }, [transactionForm])

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'send': return <SendIcon />
      case 'receive': return <ReceiptIcon />
      case 'swap': return <SwapIcon />
      case 'stake': return <LockIcon />
      case 'unstake': return <LockIcon />
      default: return <ReceiptIcon />
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'send': return theme.palette.error.main
      case 'receive': return theme.palette.success.main
      case 'swap': return theme.palette.warning.main
      case 'stake': return theme.palette.info.main
      case 'unstake': return theme.palette.info.main
      default: return theme.palette.text.primary
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#00ff88'
      case 'pending': return '#ffa502'
      case 'failed': return '#ff4757'
      default: return '#a55eea'
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
        Blockchain & DeFi Dashboard
      </Typography>

      {/* Portfolio Overview */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6} lg={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="hover-lift">
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 56, height: 56, mx: 'auto', mb: 2 }}>
                  <WalletIcon sx={{ fontSize: 28 }} />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  ${totalPortfolioValue.toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
                  Total Portfolio Value
                </Typography>
                <Chip
                  label={`${totalPortfolioChange >= 0 ? '+' : ''}${totalPortfolioChange.toFixed(2)}%`}
                  color={totalPortfolioChange >= 0 ? 'success' : 'error'}
                  size="small"
                />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="hover-lift">
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: theme.palette.secondary.main, width: 56, height: 56, mx: 'auto', mb: 2 }}>
                  <TrendingIcon sx={{ fontSize: 28 }} />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {transactions.length}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
                  Total Transactions
                </Typography>
                <Chip label="24h" color="primary" size="small" />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="hover-lift">
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: '#00ff88', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                  <SecurityIcon sx={{ fontSize: 28 }} />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {smartContracts.length}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
                  Smart Contracts
                </Typography>
                <Chip label="Active" color="success" size="small" />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="hover-lift">
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: '#a55eea', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                  <ScienceIcon sx={{ fontSize: 28 }} />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {isQuantumEncryption ? 'ON' : 'OFF'}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
                  Quantum Encryption
                </Typography>
                <Chip
                  label={isQuantumEncryption ? 'Active' : 'Inactive'}
                  color={isQuantumEncryption ? 'success' : 'default'}
                  size="small"
                />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

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
            <Tab label="Portfolio" />
            <Tab label="Transactions" />
            <Tab label="Smart Contracts" />
            <Tab label="Quantum Security" />
          </Tabs>

          {/* Portfolio Tab */}
          {activeTab === 0 && (
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Token Holdings
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setShowTransactionDialog(true)}
                >
                  Add Token
                </Button>
              </Box>

              <Grid container spacing={3}>
                {tokens.map((token, index) => (
                  <Grid item xs={12} md={6} lg={4} key={token.symbol}>
                    <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 40, height: 40 }}>
                            {token.icon}
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {token.symbol}
                            </Typography>
                            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                              {token.name}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                            {token.balance.toLocaleString()}
                          </Typography>
                          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                            ${(token.balance * token.price).toLocaleString()}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                            ${token.price.toLocaleString()}
                          </Typography>
                          <Chip
                            label={`${token.change24h >= 0 ? '+' : ''}${token.change24h.toFixed(2)}%`}
                            color={token.change24h >= 0 ? 'success' : 'error'}
                            size="small"
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Price Chart */}
              <Card sx={{ mt: 3, bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                    Token Price Performance (24h)
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={priceData}>
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
                        dataKey="QVT"
                        stackId="1"
                        stroke={theme.palette.primary.main}
                        fill={theme.palette.primary.main}
                        fillOpacity={0.3}
                      />
                      <Area
                        type="monotone"
                        dataKey="ETH"
                        stackId="1"
                        stroke={theme.palette.secondary.main}
                        fill={theme.palette.secondary.main}
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Box>
          )}

          {/* Transactions Tab */}
          {activeTab === 1 && (
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Transaction History
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<SendIcon />}
                  onClick={() => setShowTransactionDialog(true)}
                >
                  Send Transaction
                </Button>
              </Box>

              <TableContainer component={Paper} sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Type</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Token</TableCell>
                      <TableCell>From</TableCell>
                      <TableCell>To</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ color: getTransactionColor(tx.type) }}>
                              {getTransactionIcon(tx.type)}
                            </Box>
                            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                              {tx.type}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {tx.amount.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={tx.token} size="small" />
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                            {tx.from.slice(0, 8)}...{tx.from.slice(-6)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                            {tx.to.slice(0, 8)}...{tx.to.slice(-6)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={tx.status}
                            size="small"
                            sx={{ bgcolor: getStatusColor(tx.status), color: 'white' }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption">
                            {tx.timestamp.toLocaleTimeString()}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* Smart Contracts Tab */}
          {activeTab === 2 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Smart Contract Overview
              </Typography>

              <Grid container spacing={3}>
                {smartContracts.map((contract) => (
                  <Grid item xs={12} md={6} lg={4} key={contract.id}>
                    <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 40, height: 40 }}>
                            <LockIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {contract.name}
                            </Typography>
                            <Chip
                              label={contract.type.toUpperCase()}
                              size="small"
                              color="primary"
                            />
                          </Box>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                          <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: 'block', mb: 1 }}>
                            Contract Address
                          </Typography>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                            {contract.address.slice(0, 12)}...{contract.address.slice(-8)}
                          </Typography>
                        </Box>

                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                              Balance
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {contract.balance.toLocaleString()} QVT
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                              Transactions
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {contract.transactions.toLocaleString()}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Chip
                            label={contract.status}
                            size="small"
                            color={contract.status === 'active' ? 'success' : 'warning'}
                          />
                          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                            {contract.lastActivity.toLocaleTimeString()}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Quantum Security Tab */}
          {activeTab === 3 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Quantum-Resistant Cryptography
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <ScienceIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Quantum Encryption Status
                        </Typography>
                      </Box>

                      <FormControlLabel
                        control={
                          <Switch
                            checked={isQuantumEncryption}
                            onChange={(e) => setIsQuantumEncryption(e.target.checked)}
                            color="primary"
                          />
                        }
                        label="Enable Quantum-Resistant Encryption"
                        sx={{ mb: 3 }}
                      />

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                          Encryption Strength
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={isQuantumEncryption ? 95 : 0}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: isQuantumEncryption ? '#00ff88' : theme.palette.text.secondary,
                              borderRadius: 4,
                            },
                          }}
                        />
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary, mt: 1, display: 'block' }}>
                          {isQuantumEncryption ? 'Post-quantum secure (95%)' : 'Standard encryption (0%)'}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                          label="Lattice-based"
                          color={isQuantumEncryption ? 'success' : 'default'}
                          size="small"
                        />
                        <Chip
                          label="Code-based"
                          color={isQuantumEncryption ? 'success' : 'default'}
                          size="small"
                        />
                        <Chip
                          label="Hash-based"
                          color={isQuantumEncryption ? 'success' : 'default'}
                          size="small"
                        />
                        <Chip
                          label="Multivariate"
                          color={isQuantumEncryption ? 'success' : 'default'}
                          size="small"
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                        Quantum State Visualization
                      </Typography>
                      <BlochSphere
                        theta={quantumState.theta}
                        phi={quantumState.phi}
                        state="|ψ⟩"
                        isAnimating={isQuantumEncryption}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Transaction Dialog */}
      <Dialog
        open={showTransactionDialog}
        onClose={() => setShowTransactionDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Send Transaction</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Transaction Type</InputLabel>
              <Select
                value={transactionForm.type}
                label="Transaction Type"
                onChange={(e) => setTransactionForm(prev => ({ ...prev, type: e.target.value }))}
              >
                <MenuItem value="send">Send</MenuItem>
                <MenuItem value="swap">Swap</MenuItem>
                <MenuItem value="stake">Stake</MenuItem>
                <MenuItem value="unstake">Unstake</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={transactionForm.amount}
              onChange={(e) => setTransactionForm(prev => ({ ...prev, amount: e.target.value }))}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Recipient Address"
              value={transactionForm.recipient}
              onChange={(e) => setTransactionForm(prev => ({ ...prev, recipient: e.target.value }))}
              sx={{ mb: 3 }}
            />

            <FormControl fullWidth>
              <InputLabel>Token</InputLabel>
              <Select
                value={transactionForm.token}
                label="Token"
                onChange={(e) => setTransactionForm(prev => ({ ...prev, token: e.target.value }))}
              >
                {tokens.map((token) => (
                  <MenuItem key={token.symbol} value={token.symbol}>
                    {token.symbol} - {token.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowTransactionDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleTransactionSubmit}
            disabled={!transactionForm.amount || !transactionForm.recipient}
          >
            Send Transaction
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Blockchain
