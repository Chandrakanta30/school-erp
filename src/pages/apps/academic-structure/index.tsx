'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Button, Stack, IconButton, Box, CircularProgress } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import Link from 'next/link'
import toast from 'react-hot-toast'

import { apiClient } from '@/src/lib/apiClient'

// ✅ Types
type AcademicStructure = {
  id: number
  academicYear?: { name: string }
  school?: { name: string }
  brand?: { name: string }
  board?: { name: string }
  grade?: { name: string }
  course?: { name: string }
  stream?: { name: string }
  shift?: { name: string }
  division?: { name: string }
}

const Page = () => {
  const [data, setData] = useState<AcademicStructure[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const res = await apiClient.get('/academic-structures')
      setData(res.data?.data)
    } catch {
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this combination?')) return

    try {
      await apiClient.delete(`/academic-structures/${id}`)
      toast.success('Deleted successfully')
      fetchData()
    } catch {
      toast.error('Delete failed')
    }
  }

  // ✅ Columns
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },

    {
      field: 'academicYear',
      headerName: 'Year',
      flex: 1,
      valueGetter: params => params.row.academic_year?.name || '-'
    },
    {
      field: 'school',
      headerName: 'School',
      flex: 1,
      valueGetter: params => params.row.school?.name || '-'
    },
    {
      field: 'brand',
      headerName: 'Brand',
      flex: 1,
      valueGetter: params => params.row.brand?.name || '-'
    },
    {
      field: 'board',
      headerName: 'Board',
      flex: 1,
      valueGetter: params => params.row.board?.name || '-'
    },
    {
      field: 'grade',
      headerName: 'Grade',
      flex: 1,
      valueGetter: params => params.row.grade?.name || '-'
    },
    {
      field: 'course',
      headerName: 'Course',
      flex: 1,
      valueGetter: params => params.row.course?.name || '-'
    },
    {
      field: 'stream',
      headerName: 'Stream',
      flex: 1,
      valueGetter: params => params.row.stream?.name || '-'
    },
    {
      field: 'shift',
      headerName: 'Shift',
      flex: 1,
      valueGetter: params => params.row.shift?.name || '-'
    },
    {
      field: 'division',
      headerName: 'Division',
      flex: 1,
      valueGetter: params => params.row.division?.name || '-'
    },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
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
        <Stack direction='row' justifyContent='space-between' alignItems='center' mb={3}>
          <Typography variant='h5'>Academic Structures</Typography>

          <Button component={Link} href='/apps/academic-structure/create' variant='contained' startIcon={<AddIcon />}>
            Add Combination
          </Button>
        </Stack>

        {/* Data */}
        {loading ? (
          <Box textAlign='center' py={6}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid rows={data} columns={columns} autoHeight pageSizeOptions={[10, 25, 50]} />
        )}
      </CardContent>
    </Card>
  )
}

export default Page
