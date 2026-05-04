'use client'

import React from 'react'
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Stack,
  IconButton,
  LinearProgress,
  Chip,
  Button,
  Divider
} from '@mui/material'
import {
  Users,
  DollarSign,
  Calendar,
  MoreVertical,
  ArrowUpRight,
  Zap
} from 'lucide-react'

// =========================================================================
// Advanced Materialize-Inspired Constants
// =========================================================================
const THEME = {
  primary: '#7367F0',
  success: '#28C76F',
  warning: '#FF9F43',
  info: '#00CFE8',
  bg: '#F8F7FA',
  cardRadius: '8px'
}

const GlassPaper = ({ children, sx = {}, ...props }: any) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      borderRadius: THEME.cardRadius,
      border: '1px solid rgba(226, 232, 240, 0.8)',
      backgroundColor: 'white',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        boxShadow: '0 10px 25px -5px rgba(115, 103, 240, 0.1)'
      },
      ...sx
    }}
    {...props}
  >
    {children}
  </Paper>
)

export default function AdvancedDashboard() {
  return (
    <Box sx={{ bgcolor: THEME.bg, minHeight: '100vh', p: { xs: 2, md: 4 } }}>
      {/* --- 1. Top Integrated Header --- */}
      <Stack direction='row' justifyContent='space-between' alignItems='center' mb={5}>
        <Box>
          <Typography variant='h4' fontWeight='800'>
            EduCore{' '}
            <Box component='span' sx={{ color: THEME.primary }}>
              Intelligence
            </Box>
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Live Institutional Monitoring •{' '}
            <Box component='span' sx={{ color: THEME.success, fontWeight: 600 }}>
              System Online
            </Box>
          </Typography>
        </Box>
        {/* 
        <Stack direction='row' spacing={2} alignItems='center'>
          <Button
            variant='outlined'
            startIcon={<Filter size={18} />}
            sx={{ borderRadius: '12px', textTransform: 'none', px: 3 }}
          >
            Spring 2026
          </Button>
          <IconButton sx={{ bgcolor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
            <Bell size={20} />
          </IconButton>
          <Avatar
            src='https://i.pravatar.cc/150?u=principal'
            sx={{ width: 48, height: 48, border: `2px solid ${THEME.primary}` }}
          />
        </Stack> */}
      </Stack>

      <Grid container spacing={3}>
        {/* --- 2. Floating KPI Row --- */}
        {[
          { label: 'Total Enrollment', val: '1,240', change: '+12%', icon: <Users />, color: THEME.primary },
          { label: 'Revenue Stream', val: '$84,200', change: '+8%', icon: <DollarSign />, color: THEME.success },
          { label: 'Staff Efficiency', val: '92%', change: '-2%', icon: <Zap />, color: THEME.warning },
          { label: 'Daily Attendance', val: '94.2%', change: '+0.4%', icon: <Calendar />, color: THEME.info }
        ].map((kpi, i) => (
          <Grid item xs={12} sm={6} lg={3} key={i}>
            <GlassPaper sx={{ p: 2.5 }}>
              <Stack direction='row' spacing={2} alignItems='center'>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: '16px',
                    bgcolor: `${kpi.color}15`,
                    color: kpi.color,
                    display: 'flex'
                  }}
                >
                  {React.cloneElement(kpi.icon as React.ReactElement, { size: 24 })}
                </Box>
                <Box>
                  <Typography variant='caption' color='text.secondary' fontWeight='600'>
                    {kpi.label}
                  </Typography>
                  <Stack direction='row' spacing={1} alignItems='baseline'>
                    <Typography variant='h5' fontWeight='800'>
                      {kpi.val}
                    </Typography>
                    <Typography
                      variant='caption'
                      sx={{ color: kpi.change.startsWith('+') ? THEME.success : 'error.main', fontWeight: 700 }}
                    >
                      {kpi.change}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </GlassPaper>
          </Grid>
        ))}

        {/* --- 3. Main Analytics Bento Section --- */}
        <Grid item xs={12} lg={8}>
          <GlassPaper sx={{ height: '100%' }}>
            <Stack direction='row' justifyContent='space-between' mb={4}>
              <Box>
                <Typography variant='h6' fontWeight='800'>
                  Financial Growth & Collection
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  Fee distribution across academic levels
                </Typography>
              </Box>
              <IconButton>
                <MoreVertical size={20} />
              </IconButton>
            </Stack>

            <Stack spacing={4}>
              {[
                { grade: 'Primary School (G1-G5)', progress: 85, color: THEME.primary, total: '$42k' },
                { grade: 'Middle School (G6-G8)', progress: 62, color: THEME.success, total: '$28k' },
                { grade: 'High School (G9-G12)', progress: 40, color: THEME.warning, total: '$14k' }
              ].map(item => (
                <Box key={item.grade}>
                  <Stack direction='row' justifyContent='space-between' mb={1.5} alignItems='center'>
                    <Typography variant='body2' fontWeight='600'>
                      {item.grade}
                    </Typography>
                    <Stack direction='row' spacing={2}>
                      <Typography variant='caption' color='text.secondary'>
                        Target: {item.total}
                      </Typography>
                      <Typography variant='subtitle2' fontWeight='800' color={item.color}>
                        {item.progress}%
                      </Typography>
                    </Stack>
                  </Stack>
                  <LinearProgress
                    variant='determinate'
                    value={item.progress}
                    sx={{
                      height: 12,
                      borderRadius: 6,
                      bgcolor: '#f1f5f9',
                      '& .MuiLinearProgress-bar': { bgcolor: item.color, borderRadius: 6 }
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </GlassPaper>
        </Grid>

        {/* --- 4. Live Activity / Schedule Sidebar --- */}
        <Grid item xs={12} lg={4}>
          <GlassPaper sx={{ height: '100%', bgcolor: THEME.primary, color: 'white', border: 'none' }}>
            <Typography variant='h6' fontWeight='800' mb={3}>
              Today's Agenda
            </Typography>
            <Stack spacing={2.5}>
              {[
                { time: '09:00', title: 'Board Meeting', desc: 'Conference Hall A', active: true },
                { time: '11:30', title: 'Teacher Training', desc: 'Digital Library', active: false },
                { time: '14:00', title: 'Physics Exam', desc: 'Grade 10 - Block B', active: false }
              ].map((task, i) => (
                <Box
                  key={i}
                  sx={{
                    p: 2,
                    borderRadius: '16px',
                    bgcolor: task.active ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <Stack direction='row' spacing={2} alignItems='center'>
                    <Typography variant='caption' fontWeight='800'>
                      {task.time}
                    </Typography>
                    <Divider orientation='vertical' flexItem sx={{ bgcolor: 'rgba(255,255,255,0.3)' }} />
                    <Box>
                      <Typography variant='body2' fontWeight='700'>
                        {task.title}
                      </Typography>
                      <Typography variant='caption' sx={{ opacity: 0.7 }}>
                        {task.desc}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              ))}
            </Stack>
            <Button
              fullWidth
              sx={{
                mt: 4,
                bgcolor: 'white',
                color: THEME.primary,
                borderRadius: '12px',
                py: 1.5,
                fontWeight: '700',
                '&:hover': { bgcolor: '#f1f1f1' }
              }}
            >
              Add New Event
            </Button>
          </GlassPaper>
        </Grid>

        {/* --- 5. Data List / Admission Records --- */}
        <Grid item xs={12}>
          <GlassPaper>
            <Stack direction='row' justifyContent='space-between' alignItems='center' mb={3}>
              <Typography variant='h6' fontWeight='800'>
                New Admission Pipeline
              </Typography>
              <Stack direction='row' spacing={1}>
                <Chip label='All Classes' variant='outlined' size='small' sx={{ borderRadius: '8px' }} />
                <Chip
                  label='Export CSV'
                  clickable
                  size='small'
                  sx={{ borderRadius: '8px', bgcolor: THEME.primary, color: 'white' }}
                />
              </Stack>
            </Stack>

            <Box sx={{ overflowX: 'auto' }}>
              <Stack spacing={2}>
                {[
                  { name: 'Alex Johnson', id: 'STD-2024-01', grade: 'Grade 10', date: 'Mar 24', status: 'Verified' },
                  { name: 'Maria Garcia', id: 'STD-2024-02', grade: 'Grade 08', date: 'Mar 23', status: 'Pending' },
                  { name: 'James Wilson', id: 'STD-2024-03', grade: 'Grade 12', date: 'Mar 22', status: 'Verified' }
                ].map((row, i) => (
                  <Stack
                    key={i}
                    direction='row'
                    alignItems='center'
                    justifyContent='space-between'
                    sx={{ p: 2, borderRadius: '16px', '&:hover': { bgcolor: THEME.bg } }}
                  >
                    <Stack direction='row' spacing={2} alignItems='center'>
                      <Avatar sx={{ bgcolor: THEME.primary, fontWeight: 'bold' }}>{row.name[0]}</Avatar>
                      <Box>
                        <Typography variant='body2' fontWeight='700'>
                          {row.name}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {row.id}
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography variant='body2' fontWeight='600'>
                      {row.grade}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      {row.date}
                    </Typography>
                    <Chip
                      label={row.status}
                      size='small'
                      sx={{
                        fontWeight: 700,
                        bgcolor: row.status === 'Verified' ? `${THEME.success}20` : `${THEME.warning}20`,
                        color: row.status === 'Verified' ? THEME.success : THEME.warning
                      }}
                    />
                    <IconButton size='small'>
                      <ArrowUpRight size={18} />
                    </IconButton>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </GlassPaper>
        </Grid>
      </Grid>
    </Box>
  )
}
