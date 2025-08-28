import React, { useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  useTheme,
  Paper,
  Divider,
  TextField,
  InputAdornment,
} from '@mui/material'
import {
  AccountBalanceWallet as WalletIcon,
  Token as TokenIcon,
  Groups as GroupsIcon,
  TrendingUp as TrendingIcon,
  Security as SecurityIcon,
  ConnectWithoutContact as ConnectIcon,
} from '@mui/icons-material'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const Blockchain: React.FC = () => {
  const theme = useTheme()
  const [walletConnected, setWalletConnected] = useState(false)
  const [stakeAmount, setStakeAmount] = useState('')

  const tokenData = [
    { name: 'Circulating Supply', value: '750,000,000 QVT', percentage: 75 },
    { name: 'Staked Tokens', value: '200,000,000 QVT', percentage: 20 },
    { name: 'Team & Development', value: '50,000,000 QVT', percentage: 5 },
  ]

  const priceHistory = [
    { time: '00:00', price: 0.85, volume: 1250000 },
    { time: '04:00', price: 0.92, volume: 1450000 },
    { time: '08:00', price: 0.88, volume: 1350000 },
    { time: '12:00', price: 0.95, volume: 1650000 },
    { time: '16:00', price: 1.02, volume: 1850000 },
    { time: '20:00', price: 0.98, volume: 1550000 },
  ]

  const governanceProposals = [
    { id: 1, title: 'Increase Quantum Computing Rewards', status: 'active', votes: 1250, quorum: 2000 },
    { id: 2, title: 'Add New AI Model Types', status: 'pending', votes: 890, quorum: 2000 },
    { id: 3, title: 'Update Token Distribution', status: 'passed', votes: 2100, quorum: 2000 },
  ]

  const connectWallet = () => {
    setWalletConnected(true)
  }

  const handleStake = () => {
    // Handle staking logic
    console.log('Staking:', stakeAmount)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
        Blockchain & Web3 Integration
      </Typography>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card
          sx={{
            background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(165, 94, 234, 0.1) 100%)',
            border: '1px solid rgba(255, 107, 53, 0.3)',
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
              <WalletIcon sx={{ fontSize: 60, color: theme.palette.secondary.main }} />
            </motion.div>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, background: 'linear-gradient(45deg, #ff6b35, #a55eea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              QuantumVibe Token (QVT)
            </Typography>
            <Typography variant="h6" sx={{ color: theme.palette.text.secondary, mb: 3 }}>
              Decentralized governance and tokenomics for the quantum computing revolution
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={walletConnected ? <WalletIcon /> : <ConnectIcon />}
              onClick={connectWallet}
              sx={{
                bgcolor: walletConnected ? theme.palette.success.main : theme.palette.secondary.main,
                '&:hover': { bgcolor: walletConnected ? theme.palette.success.dark : theme.palette.secondary.dark },
              }}
            >
              {walletConnected ? 'Wallet Connected' : 'Connect Wallet'}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Token Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="hover-lift">
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <TokenIcon sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main, mb: 1 }}>
                  $1.02
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
                  Current QVT Price
                </Typography>
                <Chip label="+8.5%" color="success" size="small" />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="hover-lift">
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <TrendingIcon sx={{ fontSize: 48, color: theme.palette.secondary.main, mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.secondary.main, mb: 1 }}>
                  $765M
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
                  Market Cap
                </Typography>
                <Chip label="+12.3%" color="success" size="small" />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="hover-lift">
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <SecurityIcon sx={{ fontSize: 48, color: '#00ff88', mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#00ff88', mb: 1 }}>
                  1,250
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
                  QVT Balance
                </Typography>
                <Chip label="Connected" color="primary" size="small" />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Token Distribution */}
        <Grid item xs={12} lg={6}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="hover-lift">
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Token Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={tokenData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="percentage"
                    >
                      {tokenData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={[theme.palette.primary.main, theme.palette.secondary.main, '#00ff88'][index]} />
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
                  {tokenData.map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: [theme.palette.primary.main, theme.palette.secondary.main, '#00ff88'][index] }} />
                        <Typography variant="body2">{item.name}</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Price Chart */}
        <Grid item xs={12} lg={6}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="hover-lift">
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  QVT Price History (24h)
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={priceHistory}>
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
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke={theme.palette.primary.main}
                      strokeWidth={3}
                      dot={{ fill: theme.palette.primary.main, strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Staking Interface */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Card className="hover-lift">
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SecurityIcon sx={{ color: theme.palette.primary.main }} />
                  Staking Dashboard
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                    Current APY
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#00ff88' }}>
                    12.5%
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                    Staked Amount
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    0 QVT
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Stake Amount"
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">QVT</InputAdornment>,
                    }}
                    sx={{ mb: 2 }}
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleStake}
                    disabled={!walletConnected || !stakeAmount}
                    sx={{ bgcolor: theme.palette.primary.main }}
                  >
                    Stake Tokens
                  </Button>
                </Box>

                <Box sx={{ p: 2, bgcolor: 'rgba(0, 255, 136, 0.1)', borderRadius: 2 }}>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    Staking rewards are distributed every 24 hours. Minimum stake: 100 QVT
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Governance */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Card className="hover-lift">
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <GroupsIcon sx={{ color: theme.palette.secondary.main }} />
                  DAO Governance
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                    Voting Power
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.secondary.main }}>
                    1,250 QVT
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
                  Active Proposals
                </Typography>
                
                {governanceProposals.map((proposal, index) => (
                  <Paper key={proposal.id} sx={{ p: 2, mb: 2, bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {proposal.title}
                      </Typography>
                      <Chip
                        label={proposal.status}
                        size="small"
                        color={proposal.status === 'active' ? 'primary' : proposal.status === 'passed' ? 'success' : 'default'}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                        {proposal.votes} / {proposal.quorum} votes
                      </Typography>
                      <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                        {Math.round((proposal.votes / proposal.quorum) * 100)}% quorum
                      </Typography>
                    </Box>
                    {proposal.status === 'active' && (
                      <Box sx={{ mt: 1 }}>
                        <Button size="small" variant="outlined" sx={{ mr: 1 }}>
                          Vote Yes
                        </Button>
                        <Button size="small" variant="outlined">
                          Vote No
                        </Button>
                      </Box>
                    )}
                  </Paper>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Additional Features */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="hover-lift">
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Web3 Features
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <SecurityIcon sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        Smart Contracts
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        Automated execution of quantum computing workflows and reward distribution
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <GroupsIcon sx={{ fontSize: 48, color: theme.palette.secondary.main, mb: 2 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        DAO Governance
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        Community-driven decision making for platform evolution and feature development
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <TrendingIcon sx={{ fontSize: 48, color: '#00ff88', mb: 2 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        DeFi Integration
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        Yield farming, liquidity pools, and advanced DeFi strategies for QVT holders
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Blockchain
