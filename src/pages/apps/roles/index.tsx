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

type Role = {
  id: number
  name: string
  guard_name: string
  created_at: string
}

const readRows = (response: any): Role[] => {
  const payload = response?.data?.data ?? response?.data ?? response
  const rows = payload?.data ?? payload

  return Array.isArray(rows) ? rows : []
}

const RolesPage = () => {
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)

  const fetchRoles = async () => {
    try {
      setLoading(true)
      const response = await apiClient.get('/roles')
      setRoles(readRows(response))
    } catch {
      toast.error('Could not load roles')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRoles()
  }, [])

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this role?')) return

    try {
      await apiClient.delete(`/roles/${id}`)
      toast.success('Role deleted')
      fetchRoles()
    } catch {
      toast.error('Delete failed')
    }
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 88 },
    { field: 'name', headerName: 'Role Name', flex: 1, minWidth: 220 },
    { field: 'guard_name', headerName: 'Guard', flex: 1, minWidth: 140 },
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
          <Tooltip title='Delete role'>
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
      title='Roles'
      subtitle='Create and maintain role groups for secure, predictable access control.'
      badge={`${roles.length} total`}
      actionHref='/apps/roles/create'
      actionLabel='Add Role'
    >
      <SurfaceCard>
        {loading ? (
          <LoadingState label='Loading roles...' />
        ) : roles.length === 0 ? (
          <EmptyState title='No roles found' message='Create a role and assign permissions to begin access setup.' />
        ) : (
          <Box sx={{ width: '100%' }}>
            <DataGrid
              autoHeight
              rows={roles}
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

export default RolesPage
