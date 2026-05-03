'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Button, Box, IconButton, CircularProgress, Stack } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import Link from 'next/link'
import toast from 'react-hot-toast'

import { createMasterService } from '@/src/services/masterService'

const service = createMasterService('grades')

type Item = {
  id: number
  name: string
  code?: string
  is_active: boolean
}

const BrandListPage = () => {
  const [data, setData] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const res = await service.getAll()
      setData(res.data?.data)
    } catch {
      toast.error('Failed to fetch')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id: number) => {
    await service.delete(id)
    toast.success('Deleted')
    fetchData()
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'code', headerName: 'Code', flex: 1 },
    {
      field: 'is_active',
      headerName: 'Status',
      renderCell: params => (params.value ? 'Active' : 'Inactive')
    },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: params => (
        <IconButton onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      )
    }
  ]

  return (
    <Card>
      <CardContent>
        <Stack direction='row' justifyContent='space-between' mb={3}>
          <Typography variant='h5'>Grades</Typography>

          <Button component={Link} href='/apps/grade/create' startIcon={<AddIcon />} variant='contained'>
            Add
          </Button>
        </Stack>

        {loading ? <CircularProgress /> : <DataGrid rows={data} columns={columns} autoHeight />}
      </CardContent>
    </Card>
  )
}

export default BrandListPage
