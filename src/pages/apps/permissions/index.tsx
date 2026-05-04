import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import toast from 'react-hot-toast'

import PageShell, { SurfaceCard } from 'src/components/admin/PageShell'
import { EmptyState, LoadingState } from 'src/components/admin/FeedbackStates'
import { apiClient } from 'src/lib/apiClient'

type Permission = {
  id: number
  name: string
  guard_name: string
  created_at: string
}

const readRows = (response: any): Permission[] => {
  const payload = response?.data?.data ?? response?.data ?? response
  const rows = payload?.data ?? payload

  return Array.isArray(rows) ? rows : []
}

const PermissionListPage = () => {
  const [data, setData] = useState<Permission[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPermissions = async () => {
    try {
      setLoading(true)
      const response = await apiClient.get('/permissions')
      setData(readRows(response))
    } catch {
      toast.error('Could not load permissions')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPermissions()
  }, [])

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this permission?')) return

    try {
      await apiClient.delete(`/permissions/${id}`)
      toast.success('Permission deleted')
      fetchPermissions()
    } catch {
      toast.error('Delete failed')
    }
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 88 },
    { field: 'name', headerName: 'Permission', flex: 1, minWidth: 220 },
    { field: 'guard_name', headerName: 'Guard', minWidth: 140 },
    {
      field: 'created_at',
      headerName: 'Created',
      flex: 1,
      minWidth: 160,
      renderCell: params => (params.value ? new Date(params.value).toLocaleDateString() : '-')
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
        <Stack direction='row' justifyContent='flex-end' sx={{ width: '100%' }}>
          <Tooltip title='Delete permission'>
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
      title='Permissions'
      subtitle='Review and manage access permissions used by role policies.'
      badge={`${data.length} total`}
      actionHref='/apps/permissions/create'
      actionLabel='Add Permission'
    >
      <SurfaceCard>
        {loading ? (
          <LoadingState label='Loading permissions...' />
        ) : data.length === 0 ? (
          <EmptyState title='No permissions found' message='Create permissions before assigning them to roles.' />
        ) : (
          <Box sx={{ width: '100%' }}>
            <DataGrid
              autoHeight
              rows={data}
              columns={columns}
              disableRowSelectionOnClick
              initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
              pageSizeOptions={[10, 25, 50]}
            />
          </Box>
        )}
      </SurfaceCard>
    </PageShell>
  )
}

export default PermissionListPage
