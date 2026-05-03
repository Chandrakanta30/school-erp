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
import VisibilityIcon from '@mui/icons-material/Visibility'
import AddIcon from '@mui/icons-material/Add'

import Link from 'next/link'
import toast from 'react-hot-toast'
import { apiClient } from '@/src/lib/apiClient'

// ✅ Types
type Student = {
  id: number
  name: string
  gender?: string
  dob?: string
  parents: any[]
  academics: any[]
}

const StudentListPage = () => {
  const [data, setData] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const fetchStudents = async () => {
    try {
      setLoading(true)

      const res = await apiClient.get(`/students?search=${search}`)
      setData(res.data.data?.data || res.data.data || [])
    } catch {
      toast.error('Failed to fetch students')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [search])

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this student?')) return

    try {
      await apiClient.delete(`/students/${id}`)
      toast.success('Deleted')
      fetchStudents()
    } catch {
      toast.error('Delete failed')
    }
  }

  // ✅ Columns
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },

    { field: 'name', headerName: 'Student Name', flex: 1 },

    {
      field: 'gender',
      headerName: 'Gender',
      width: 120
    },

    {
      field: 'parent',
      headerName: 'Parent',
      flex: 1,
      valueGetter: params => params.row.parents?.[0]?.name || '-'
    },

    {
      field: 'phone',
      headerName: 'Contact',
      flex: 1,
      valueGetter: params => params.row.parents?.[0]?.phone || '-'
    },

    {
      field: 'school',
      headerName: 'School',
      flex: 1,
      valueGetter: params => params.row.academics?.[0]?.academic_structure?.school?.name || '-'
    },

    {
      field: 'grade',
      headerName: 'Grade',
      flex: 1,
      valueGetter: params => params.row.academics?.[0]?.academic_structure?.grade?.name || '-'
    },

    {
      field: 'board',
      headerName: 'Board',
      flex: 1,
      valueGetter: params => params.row.academics?.[0]?.academic_structure?.board?.name || '-'
    },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 140,
      sortable: false,
      renderCell: params => (
        <>
          <IconButton component={Link} href={`/students/${params.row.id}`}>
            <VisibilityIcon />
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
        {/* HEADER */}
        <Stack direction='row' justifyContent='space-between' alignItems='center' mb={3}>
          <Typography variant='h5'>Students</Typography>

          <Button component={Link} href='/apps/students/create' variant='contained' startIcon={<AddIcon />}>
            Add Student
          </Button>
        </Stack>

        {/* SEARCH */}
        <TextField
          placeholder='Search student...'
          fullWidth
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{ mb: 3 }}
        />

        {/* TABLE */}
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

export default StudentListPage
