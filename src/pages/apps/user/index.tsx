'use client'

import { useEffect, useState } from 'react'
import { Box, Card, CardContent, Typography, IconButton, CircularProgress, Button, Stack } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'

import Link from 'next/link'
import toast from 'react-hot-toast'

import { apiClient } from '@/src/lib/apiClient'

// ✅ Types
type Role = {
  id: number
  name: string
}

type User = {
  id: number
  name: string
  email: string
  roles: Role[]
  created_at: string
}

const UserListPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    try {
      const res: User[] = await apiClient.get('/users')
      setUsers(res)
    } catch (err) {
      toast.error('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Delete user?')) return

    try {
      await apiClient.delete(`/users/${id}`)
      toast.success('User deleted')
      fetchUsers()
    } catch {
      toast.error('Delete failed')
    }
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    {
      field: 'roles',
      headerName: 'Role',
      flex: 1,
      renderCell: params => params.row.roles?.map((r: Role) => r.name).join(', ')
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
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
        <Stack direction='row' justifyContent='space-between' mb={3}>
          <Typography variant='h5'>Users</Typography>

          <Button component={Link} href='/apps/user/create' variant='contained' startIcon={<AddIcon />}>
            Add User
          </Button>
        </Stack>

        {loading ? (
          <Box textAlign='center' py={6}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid autoHeight rows={users} columns={columns} pageSizeOptions={[10]} />
        )}
      </CardContent>
    </Card>
  )
}

export default UserListPage
