import { useEffect, useMemo, useState } from 'react'

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

import PageShell, { SurfaceCard } from './PageShell'
import { EmptyState, LoadingState } from './FeedbackStates'

type MasterItem = {
  id: number
  name: string
  code?: string
  is_active?: boolean
}

type MasterService = {
  getAll: () => Promise<any>
  delete: (id: number) => Promise<any>
}

type MasterListPageProps = {
  title: string
  subtitle: string
  createHref: string
  createLabel?: string
  service: MasterService
}

const readCollection = (response: any): MasterItem[] => {
  const payload = response?.data?.data ?? response?.data ?? response
  const rows = payload?.data ?? payload

  return Array.isArray(rows) ? rows : []
}

const MasterListPage = ({ title, subtitle, createHref, createLabel = 'Add record', service }: MasterListPageProps) => {
  const [rows, setRows] = useState<MasterItem[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await service.getAll()
      setRows(readCollection(response))
    } catch {
      toast.error(`Could not load ${title.toLowerCase()}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filteredRows = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    if (!normalizedSearch) return rows

    return rows.filter(row =>
      [row.name, row.code, row.is_active ? 'active' : 'inactive']
        .filter(Boolean)
        .some(value => String(value).toLowerCase().includes(normalizedSearch))
    )
  }, [rows, search])

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(`Delete this ${title.slice(0, -1).toLowerCase()}?`)
    if (!confirmed) return

    try {
      setDeletingId(id)
      await service.delete(id)
      toast.success('Record deleted')
      await fetchData()
    } catch {
      toast.error('Delete failed')
    } finally {
      setDeletingId(null)
    }
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 96 },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 180 },
    {
      field: 'code',
      headerName: 'Code',
      flex: 1,
      minWidth: 140,
      valueGetter: params => params.row.code || '-'
    },
    {
      field: 'is_active',
      headerName: 'Status',
      minWidth: 140,
      renderCell: params => (
        <Chip
          label={params.value === false ? 'Inactive' : 'Active'}
          size='small'
          color={params.value === false ? 'default' : 'success'}
          variant='outlined'
        />
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 112,
      sortable: false,
      filterable: false,
      align: 'right',
      headerAlign: 'right',
      renderCell: params => (
        <Tooltip title='Delete record'>
          <span>
            <IconButton
              color='error'
              disabled={deletingId === params.row.id}
              onClick={() => handleDelete(params.row.id)}
              aria-label={`Delete ${params.row.name}`}
            >
              <DeleteIcon />
            </IconButton>
          </span>
        </Tooltip>
      )
    }
  ]

  return (
    <PageShell title={title} subtitle={subtitle} badge={`${rows.length} total`} actionHref={createHref} actionLabel={createLabel}>
      <SurfaceCard>
        <Stack spacing={4}>
          <TextField
            fullWidth
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder={`Search ${title.toLowerCase()} by name, code, or status`}
            aria-label={`Search ${title.toLowerCase()}`}
            InputProps={{ startAdornment: <SearchIcon color='action' sx={{ mr: 2 }} /> }}
          />

          {loading ? (
            <LoadingState label={`Loading ${title.toLowerCase()}...`} />
          ) : filteredRows.length === 0 ? (
            <EmptyState
              title={search ? 'No matching records' : `No ${title.toLowerCase()} yet`}
              message={search ? 'Try a different search term.' : 'Add your first record to start organizing this setup area.'}
            />
          ) : (
            <Box sx={{ width: '100%' }}>
              <DataGrid
                rows={filteredRows}
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

export default MasterListPage
