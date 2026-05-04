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

type Teacher = {
  id: number
  name: string
  email: string
  mobile: string
  designation?: string
  employee_id?: string
}

const readRows = (response: any): Teacher[] => {
  const payload = response?.data?.data ?? response?.data ?? response
  const rows = payload?.data ?? payload

  return Array.isArray(rows) ? rows : []
}

const TeacherListPage = () => {
  const [data, setData] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await apiClient.get(`/teachers?search=${encodeURIComponent(search)}`)
      setData(readRows(response))
    } catch {
      toast.error('Could not load teachers')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(fetchData, 250)

    return () => window.clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this teacher?')) return

    try {
      await apiClient.delete(`/teachers/${id}`)
      toast.success('Teacher deleted')
      fetchData()
    } catch {
      toast.error('Delete failed')
    }
  }

  const columns: GridColDef[] = [
    { field: 'employee_id', headerName: 'Employee ID', minWidth: 140, valueGetter: params => params.row.employee_id || '-' },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 180 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 220 },
    { field: 'mobile', headerName: 'Mobile', flex: 1, minWidth: 150 },
    {
      field: 'designation',
      headerName: 'Designation',
      flex: 1,
      minWidth: 160,
      renderCell: params => <Chip label={params.value || 'Not assigned'} size='small' variant='outlined' />
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 110,
      sortable: false,
      filterable: false,
      align: 'right',
      headerAlign: 'right',
      renderCell: params => (
        <Tooltip title='Delete teacher'>
          <IconButton color='error' onClick={() => handleDelete(params.row.id)} aria-label={`Delete ${params.row.name}`}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )
    }
  ]

  return (
    <PageShell
      title='Teachers'
      subtitle='Search, review, and manage teaching staff records.'
      badge={`${data.length} total`}
      actionHref='/apps/teachers/create'
      actionLabel='Add Teacher'
    >
      <SurfaceCard>
        <Stack spacing={4}>
          <TextField
            fullWidth
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder='Search by name, email, mobile, or designation'
            aria-label='Search teachers'
            InputProps={{ startAdornment: <SearchIcon color='action' sx={{ mr: 2 }} /> }}
          />

          {loading ? (
            <LoadingState label='Loading teachers...' />
          ) : data.length === 0 ? (
            <EmptyState title='No teachers found' message='Add your first teacher or adjust your search term.' />
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

export default TeacherListPage
