'use client'

import { useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, TextField, Typography, Stack, CircularProgress, MenuItem } from '@mui/material'

import { useForm, Controller } from 'react-hook-form'
import { apiClient } from '@/src/lib/apiClient'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

// ✅ Types
type Role = {
  id: number
  name: string
}

type FormValues = {
  name: string
  email: string
  password: string
  role: string
}

const UserCreatePage = () => {
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  const router = useRouter()

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: ''
    }
  })

  const fetchRoles = async () => {
    try {
      const res: any = await apiClient.get('/roles')
      setRoles(res?.data)
    } catch {
      toast.error('Failed to load roles')
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    fetchRoles()
  }, [])

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true)

      console.log('form data  data', data)

      await apiClient.post('/users', data)

      toast.success('User created 🎉')
      reset()

      router.push('/apps/user')
    } catch (err: any) {
      toast.error(err?.message || 'Error creating user')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={1} mb={4}>
          <Typography variant='h5'>Create User</Typography>
        </Stack>

        {fetching ? (
          <CircularProgress />
        ) : (
          <Box component='form' onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <Controller
              name='name'
              control={control}
              rules={{ required: 'Name required' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label='Name'
                  fullWidth
                  margin='normal'
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            {/* Email */}
            <Controller
              name='email'
              control={control}
              rules={{ required: 'Email required' }}
              render={({ field }) => <TextField {...field} label='Email' fullWidth margin='normal' />}
            />

            {/* Password */}
            <Controller
              name='password'
              control={control}
              rules={{ required: 'Password required' }}
              render={({ field }) => (
                <TextField {...field} label='Password' type='password' fullWidth margin='normal' />
              )}
            />

            {/* Role Dropdown */}
            <Controller
              name='role'
              control={control}
              rules={{ required: 'Role required' }}
              render={({ field }) => (
                <TextField {...field} select label='Role' fullWidth margin='normal'>
                  {roles.map(role => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Box mt={3}>
              <Button type='submit' variant='contained' disabled={loading}>
                {loading ? <CircularProgress size={20} /> : 'Create User'}
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default UserCreatePage
