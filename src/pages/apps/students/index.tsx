import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import toast from 'react-hot-toast'

import PageShell, { SurfaceCard } from 'src/components/admin/PageShell'
import { EmptyState, LoadingState } from 'src/components/admin/FeedbackStates'
import { apiClient } from 'src/lib/apiClient'

type Student = {
  id: number
  name: string
  gender?: string
  parents?: any[]
  academics?: any[]
}

const readRows = (response: any): Student[] => {
  const payload = response?.data?.data ?? response?.data ?? response
  const rows = payload?.data ?? payload

  return Array.isArray(rows) ? rows : []
}

const StudentListPage = () => {
  const [data, setData] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const fetchStudents = async () => {
    try {
      setLoading(true)
      const response = await apiClient.get(`/students?search=${encodeURIComponent(search)}`)
      setData(readRows(response))
    } catch {
      toast.error('Could not load students')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(fetchStudents, 250)

    return () => window.clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this student?')) return

    try {
      await apiClient.delete(`/students/${id}`)
      toast.success('Student deleted')
      fetchStudents()
    } catch {
      toast.error('Delete failed')
    }
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 88 },
    { field: 'name', headerName: 'Student', flex: 1, minWidth: 180 },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 110,
      renderCell: params => <Chip label={params.value || 'Not set'} size='small' variant='outlined' />
    },
    {
      field: 'parent',
      headerName: 'Parent',
      flex: 1,
      minWidth: 180,
      valueGetter: params => params.row.parents?.[0]?.name || '-'
    },
    {
      field: 'phone',
      headerName: 'Contact',
      flex: 1,
      minWidth: 150,
      valueGetter: params => params.row.parents?.[0]?.phone || '-'
    },
    {
      field: 'school',
      headerName: 'School',
      flex: 1,
      minWidth: 180,
      valueGetter: params => params.row.academics?.[0]?.academic_structure?.school?.name || '-'
    },
    {
      field: 'grade',
      headerName: 'Grade',
      flex: 1,
      minWidth: 130,
      valueGetter: params => params.row.academics?.[0]?.academic_structure?.grade?.name || '-'
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 130,
      sortable: false,
      filterable: false,
      align: 'right',
      headerAlign: 'right',
      renderCell: params => (
        <Stack direction='row' justifyContent='flex-end' sx={{ width: '100%' }}>
          <Tooltip title='Delete student'>
            <IconButton color='error' onClick={() => handleDelete(params.row.id)} aria-label={`Delete ${params.row.name}`}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      )
    }
  ]

  return (
    <PageShell
      title='Students'
      subtitle='Manage enrolled students with searchable parent and academic details.'
      badge={`${data.length} total`}
      actionHref='/apps/students/create'
      actionLabel='Add Student'
    >
      <SurfaceCard>
        <Stack spacing={4}>
          <TextField
            fullWidth
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder='Search by student, parent, phone, or school'
            aria-label='Search students'
            InputProps={{ startAdornment: <SearchIcon color='action' sx={{ mr: 2 }} /> }}
          />

          {loading ? (
            <LoadingState label='Loading students...' />
          ) : data.length === 0 ? (
            <EmptyState title='No students found' message='Add a student or try a different search term.' />
          ) : (
            <Box sx={{ width: '100%' }}>
              <DataGrid
                rows={data}
                columns={columns}
                autoHeight
                disableRowSelectionOnClick
                initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                pageSizeOptions={[10, 25, 50]}
              />
            </Box>
          )}
        </Stack>
      </SurfaceCard>
    </PageShell>
  )
}

export default StudentListPage
