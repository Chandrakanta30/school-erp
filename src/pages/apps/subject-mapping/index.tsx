'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Stack, Chip, Button, Box, CircularProgress, Grid, Divider } from '@mui/material'
import Link from 'next/link'
import { apiClient } from '@/src/lib/apiClient'
import toast from 'react-hot-toast'

type Row = {
  id: number
  name: string
  mapped_subjects: number
  is_configured: boolean
}

export default function Page() {
  const [data, setData] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const res = await apiClient.get('/subject-mapping')
      setData(res.data || [])
    } catch (err) {
      toast.error('Failed to load data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='400px'>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Header Section */}
      <Stack direction='row' justifyContent='space-between' alignItems='center' mb={4}>
        <Box>
          <Typography variant='h5' fontWeight='bold' color='primary'>
            Subject Mapping
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Manage academic structures and subject assignments
          </Typography>
        </Box>
      </Stack>

      {/* Grid of Cards */}
      <Grid container spacing={3}>
        {data.length > 0 ? (
          data.map(item => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: '0.3s',
                  '&:hover': { boxShadow: theme => theme.shadows[4] }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack direction='row' justifyContent='space-between' alignItems='flex-start' mb={2}>
                    <Chip size='small' variant='outlined' label={`ID: ${item.id}`} sx={{ borderRadius: '4px' }} />
                    <Chip
                      size='small'
                      label={item.is_configured ? 'Configured' : 'Not Configured'}
                      color={item.is_configured ? 'success' : 'error'}
                    />
                  </Stack>

                  <Typography variant='h6' component='div' sx={{ fontWeight: 600, mb: 1 }}>
                    {item.name}
                  </Typography>

                  <Stack direction='row' spacing={1} alignItems='center'>
                    <Typography variant='body2' color='text.secondary'>
                      Subjects:
                    </Typography>
                    <Typography variant='body2' fontWeight='bold'>
                      {item.mapped_subjects}
                    </Typography>
                  </Stack>
                </CardContent>

                <Divider />

                <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
                  <Stack direction='row' spacing={1}>
                    {item.is_configured ? (
                      <>
                        <Button
                          fullWidth
                          variant='outlined'
                          size='small'
                          component={Link}
                          href={`/apps/subject-mapping/${item.id}`}
                        >
                          View
                        </Button>
                        <Button
                          fullWidth
                          variant='outlined'
                          size='small'
                          component={Link}
                          href={`/apps/subject-mapping/${item.id}/edit`}
                        >
                          Edit
                        </Button>
                      </>
                    ) : (
                      <Button
                        fullWidth
                        variant='contained'
                        size='small'
                        component={Link}
                        href={`/apps/subject-mapping/create?structure_id=${item.id}`}
                      >
                        Create Mapping
                      </Button>
                    )}
                  </Stack>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box textAlign='center' py={10}>
              <Typography color='text.secondary'>No records found.</Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
