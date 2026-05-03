'use client'

import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Card,
  CardContent,
  Stack,
  CircularProgress
} from '@mui/material'

import { useForm, Controller } from 'react-hook-form'
import { apiClient } from '@/src/lib/apiClient'
import toast from 'react-hot-toast'

// ✅ Types
type Permission = {
  id: number
  name: string
}

type FormValues = {
  name: string
  permissions: string[]
}

type GroupedPermissions = {
  [module: string]: string[]
}

const RoleCreatePage = () => {
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [groupedPermissions, setGroupedPermissions] = useState<GroupedPermissions>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [fetching, setFetching] = useState<boolean>(true)

  const { control, handleSubmit, setValue, watch, reset } = useForm<FormValues>({
    defaultValues: {
      name: '',
      permissions: []
    }
  })

  const selectedPermissions = watch('permissions')

  // 🔄 Fetch permissions
  const fetchPermissions = async () => {
    try {
      const res: Permission[] = await apiClient.get('/permissions')

      setPermissions(res?.data)

      const grouped: GroupedPermissions = {}

      res?.data.forEach(p => {
        const [module, action] = p.name.split('-')

        if (!grouped[module]) grouped[module] = []
        grouped[module].push(action)
      })

      setGroupedPermissions(grouped)
    } catch (err) {
      console.error(err)
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    fetchPermissions()
  }, [])

  // Toggle permission
  const togglePermission = (perm: string) => {
    const updated = selectedPermissions.includes(perm)
      ? selectedPermissions.filter(p => p !== perm)
      : [...selectedPermissions, perm]

    setValue('permissions', updated, { shouldValidate: true })
  }

  // Select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const all = permissions.map(p => p.name)
      setValue('permissions', all)
    } else {
      setValue('permissions', [])
    }
  }

  const isAllSelected = permissions.length > 0 && selectedPermissions.length === permissions.length

  const isIndeterminate = selectedPermissions.length > 0 && !isAllSelected

  // Submit
  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true)

      await apiClient.post('/roles', data)

      toast.success('Role created successfully')
      reset()
    } catch (err) {
      console.error(err)
      toast.error('Error creating role')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={1} mb={4}>
          <Typography variant='h5'>Create Role</Typography>
          <Typography variant='body2'>Assign permissions dynamically</Typography>
        </Stack>

        {/* Role Name */}
        <Box mb={4}>
          <Controller
            name='name'
            control={control}
            rules={{ required: 'Role name is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label='Role Name'
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Box>

        {/* Permissions */}
        <Typography variant='h6' mb={2}>
          Permissions
        </Typography>

        {fetching ? (
          <Box textAlign='center' py={6}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Module</TableCell>
                  <TableCell colSpan={3}>
                    <FormControlLabel
                      label='Select All'
                      control={
                        <Checkbox
                          checked={isAllSelected}
                          indeterminate={isIndeterminate}
                          onChange={e => handleSelectAll(e.target.checked)}
                        />
                      }
                    />
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {Object.entries(groupedPermissions).map(([module, actions]) => (
                  <TableRow key={module}>
                    <TableCell sx={{ fontWeight: 600 }}>{module}</TableCell>

                    {actions.map(action => {
                      const key = `${module}-${action}`

                      return (
                        <TableCell key={action}>
                          <FormControlLabel
                            label={action}
                            control={
                              <Checkbox
                                checked={selectedPermissions.includes(key)}
                                onChange={() => togglePermission(key)}
                              />
                            }
                          />
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Actions */}
        <Box mt={4} display='flex' gap={2}>
          <Button variant='contained' onClick={handleSubmit(onSubmit)} disabled={loading}>
            {loading ? <CircularProgress size={20} /> : 'Create Role'}
          </Button>

          <Button variant='outlined' onClick={() => reset()}>
            Reset
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default RoleCreatePage
