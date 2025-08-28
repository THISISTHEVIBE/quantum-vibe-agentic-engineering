import React from 'react'
import { Box, Grid, Card, CardContent, Typography, Switch, FormControlLabel, useTheme } from '@mui/material'
import { Settings as SettingsIcon } from '@mui/icons-material'
import { motion } from 'framer-motion'

const Settings: React.FC = () => {
  const theme = useTheme()

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: theme.palette.primary.main }}>
        Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card className="hover-lift">
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <SettingsIcon sx={{ color: theme.palette.primary.main }} />
                Platform Settings
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Enable Notifications"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Auto-save Circuits"
                />
                <FormControlLabel
                  control={<Switch />}
                  label="Dark Mode"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="AI Optimization Suggestions"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="hover-lift">
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Account Information
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    Username
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    Dr. Quantum
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    Email
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    quantum@quantumvibe.ai
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    Plan
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: theme.palette.secondary.main }}>
                    Pro Plan
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Settings
