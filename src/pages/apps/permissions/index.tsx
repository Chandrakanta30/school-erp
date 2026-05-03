'use client'

import { useEffect, useState } from 'react'
import { Box, Card, CardContent, Typography, IconButton, CircularProgress, Button, Stack } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

import { apiClient } from '@/src/lib/apiClient'
import Link from 'next/link'

// ✅ Types
type Permission = {
  id: number
  name: string
  guard_name: string
  created_at: string
}

const PermissionListPage = () => {
  const [data, setData] = useState<Permission[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchPermissions = async () => {
    try {
      const res: Permission[] = await apiClient.get('/permissions')
      setData(res?.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPermissions()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this permission?')) return

    try {
      await apiClient.delete(`/permissions/${id}`)
      fetchPermissions()
    } catch (err) {
      console.error(err)
    }
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Permission', flex: 1 },
    { field: 'guard_name', headerName: 'Guard', width: 120 },
    {
      field: 'created_at',
      headerName: 'Created',
      flex: 1,
      renderCell: params => new Date(params.value).toLocaleDateString()
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 140,
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
    <Card>
      <CardContent>
        <Stack direction='row' justifyContent='space-between' alignItems='center' mb={3}>
          <Typography variant='h5'>Permissions</Typography>

          <Button variant='contained' startIcon={<AddIcon />} component={Link} href='/apps/permissions/create'>
            Add Permission
          </Button>
        </Stack>

        {loading ? (
          <Box textAlign='center' py={6}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid autoHeight rows={data} columns={columns} pageSize={10} />
        )}
      </CardContent>
    </Card>
  )
}

export default PermissionListPage
