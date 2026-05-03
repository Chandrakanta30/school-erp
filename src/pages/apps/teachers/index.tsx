'use client'

import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Stack,
  TextField,
  IconButton,
  Button,
  Box,
  CircularProgress
} from '@mui/material'

import { DataGrid, GridColDef } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { apiClient } from '@/src/lib/apiClient'

// Types
type Teacher = {
  id: number
  name: string
  email: string
  mobile: string
  designation?: string
  employee_id: string
}

export default function TeacherListPage() {
  const [data, setData] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await apiClient.get(`/teachers?search=${search}`)
      setData(res.data.data?.data || res.data.data || [])
    } catch {
      toast.error('Failed to fetch teachers')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [search])

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this teacher?')) return

    try {
      await apiClient.delete(`/teachers/${id}`)
      toast.success('Deleted')
      fetchData()
    } catch {
      toast.error('Delete failed')
    }
  }

  const columns: GridColDef[] = [
    { field: 'employee_id', headerName: 'Emp ID', width: 120 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'mobile', headerName: 'Mobile', flex: 1 },
    { field: 'designation', headerName: 'Designation', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: params => (
        <IconButton color='error' onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      )
    }
  ]

  return (
    <Card>
      <CardContent>
        {/* Header */}
        <Stack direction='row' justifyContent='space-between' mb={3}>
          <Typography variant='h5'>Teachers</Typography>

          <Button component={Link} href='/apps/teachers/create' variant='contained' startIcon={<AddIcon />}>
            Add Teacher
          </Button>
        </Stack>

        {/* Search */}
        <TextField
          placeholder='Search teacher...'
          fullWidth
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{ mb: 3 }}
        />

        {/* Table */}
        {loading ? (
          <Box textAlign='center' py={5}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid rows={data} columns={columns} autoHeight pageSizeOptions={[10, 25, 50]} />
        )}
      </CardContent>
    </Card>
  )
}
