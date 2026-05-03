'use client'

// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'

// ** DataGrid
import { DataGrid } from '@mui/x-data-grid'

// ** Icons
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

// ** API Client
import { apiClient } from '@/src/lib/apiClient'
import Link from 'next/link'

const RolesComponent = () => {
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)

  // 🔄 Fetch Roles
  const fetchRoles = async () => {
    try {
      const res = await apiClient.get('/roles') // Laravel endpoint
      setRoles(res?.data)
    } catch (err) {
      console.error('Error fetching roles:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRoles()
  }, [])

  // ❌ Delete Role
  const handleDelete = async id => {
    if (!confirm('Are you sure you want to delete this role?')) return

    try {
      await apiClient.delete(`/roles/${id}`)
      fetchRoles()
    } catch (err) {
      console.error(err)
    }
  }

  // 📊 DataGrid Columns
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 80
    },
    {
      field: 'name',
      headerName: 'Role Name',
      flex: 1
    },
    {
      field: 'guard_name',
      headerName: 'Guard',
      flex: 1
    },
    {
      field: 'created_at',
      headerName: 'Created At',
      flex: 1,
      renderCell: params => new Date(params.value).toLocaleDateString()
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: params => (
        <>
          <IconButton color='primary'>
            <EditIcon />
          </IconButton>
          <IconButton color='error' onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ]

  return (
    <Grid container spacing={6}>
      {/* 🔝 Header */}
      <Grid item xs={12}>
        <Box
          sx={{
            p: 5,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #696cff, #8c8eff)',
            color: 'white'
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent='space-between'
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={3}
          >
            <Box>
              <Typography variant='h5' fontWeight={600}>
                Role Management
              </Typography>
              <Typography variant='body2'>Manage roles and permissions</Typography>
            </Box>

            <Button
              variant='contained'
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: 'white',
                color: '#696cff',
                '&:hover': { backgroundColor: '#f5f5f5' }
              }}
              component={Link}
              href='/apps/roles/create'
            >
              Add Role
            </Button>
          </Stack>
        </Box>
      </Grid>

      {/* 📊 DataGrid */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h6' sx={{ mb: 3 }}>
              Roles List
            </Typography>

            {loading ? (
              <Box display='flex' justifyContent='center' py={10}>
                <CircularProgress />
              </Box>
            ) : (
              <DataGrid
                autoHeight
                rows={roles}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10, 25, 50]}
                disableSelectionOnClick
              />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default RolesComponent
