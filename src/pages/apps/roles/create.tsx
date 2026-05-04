import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import SaveIcon from '@mui/icons-material/Save'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'

import PageShell, { SurfaceCard } from 'src/components/admin/PageShell'
import { LoadingState } from 'src/components/admin/FeedbackStates'
import { apiClient } from 'src/lib/apiClient'

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

const schema = yup.object({
  name: yup.string().trim().required('This field is required').min(2, 'Role name must be at least 2 characters'),
  permissions: yup.array().of(yup.string().required()).min(1, 'Select at least one permission').required()
})

const readRows = (response: any): Permission[] => {
  const payload = response?.data?.data ?? response?.data ?? response
  const rows = payload?.data ?? payload

  return Array.isArray(rows) ? rows : []
}

const RoleCreatePage = () => {
  const router = useRouter()
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  const { control, handleSubmit, setValue, watch, reset } = useForm<FormValues>({
    defaultValues: { name: '', permissions: [] },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const selectedPermissions = watch('permissions')

  const groupedPermissions = useMemo<GroupedPermissions>(() => {
    return permissions.reduce((grouped, permission) => {
      const [module = 'general', action = permission.name] = permission.name.split('-')

      if (!grouped[module]) grouped[module] = []
      grouped[module].push(action)

      return grouped
    }, {} as GroupedPermissions)
  }, [permissions])

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        setFetching(true)
        const response = await apiClient.get('/permissions')
        setPermissions(readRows(response))
      } catch {
        toast.error('Could not load permissions')
      } finally {
        setFetching(false)
      }
    }

    fetchPermissions()
  }, [])

  const togglePermission = (permission: string) => {
    const updated = selectedPermissions.includes(permission)
      ? selectedPermissions.filter(item => item !== permission)
      : [...selectedPermissions, permission]

    setValue('permissions', updated, { shouldValidate: true })
  }

  const handleSelectAll = (checked: boolean) => {
    setValue('permissions', checked ? permissions.map(permission => permission.name) : [], { shouldValidate: true })
  }

  const isAllSelected = permissions.length > 0 && selectedPermissions.length === permissions.length
  const isIndeterminate = selectedPermissions.length > 0 && !isAllSelected

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true)
      await apiClient.post('/roles', data)
      toast.success('Role created')
      router.push('/apps/roles')
    } catch (error: any) {
      toast.error(error?.message || 'Could not create role')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageShell title='Create Role' subtitle='Name a role and assign the permissions it should include.' backHref='/apps/roles'>
      <SurfaceCard>
        {fetching ? (
          <LoadingState label='Loading permissions...' />
        ) : (
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={5}>
              <Controller
                name='name'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    required
                    label='Role name'
                    placeholder='Example: Academic Coordinator'
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Divider />

              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent='space-between' spacing={2}>
                  <Box>
                    <Typography variant='h6'>Permissions</Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Select the actions this role can perform.
                    </Typography>
                  </Box>
                  <FormControlLabel
                    label='Select all'
                    control={
                      <Checkbox
                        checked={isAllSelected}
                        indeterminate={isIndeterminate}
                        onChange={event => handleSelectAll(event.target.checked)}
                      />
                    }
                  />
                </Stack>

                <Grid container spacing={3}>
                  {Object.entries(groupedPermissions).map(([module, actions]) => (
                    <Grid item xs={12} md={6} lg={4} key={module}>
                      <Box
                        sx={{
                          p: 3,
                          height: '100%',
                          borderRadius: 2,
                          border: theme => `1px solid ${theme.palette.divider}`,
                          bgcolor: 'background.paper'
                        }}
                      >
                        <Typography variant='subtitle1' sx={{ mb: 1, textTransform: 'capitalize' }}>
                          {module}
                        </Typography>
                        <Stack>
                          {actions.map(action => {
                            const permissionKey = `${module}-${action}`

                            return (
                              <FormControlLabel
                                key={permissionKey}
                                label={action}
                                control={
                                  <Checkbox
                                    checked={selectedPermissions.includes(permissionKey)}
                                    onChange={() => togglePermission(permissionKey)}
                                  />
                                }
                              />
                            )
                          })}
                        </Stack>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent='flex-end'>
                <Button variant='outlined' color='secondary' onClick={() => reset()}>
                  Reset
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={18} color='inherit' /> : <SaveIcon />}
                >
                  Save Role
                </Button>
              </Stack>
            </Stack>
          </form>
        )}
      </SurfaceCard>
    </PageShell>
  )
}

export default RoleCreatePage
