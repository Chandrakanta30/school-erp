'use client'

import { useForm, Controller } from 'react-hook-form'
import { TextField, Button, Stack, Card, CardContent, Typography, CircularProgress } from '@mui/material'

import { apiClient } from '@/src/lib/apiClient'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Types
type FormValues = {
  name: string
  email: string
  mobile: string
  designation?: string
}

export default function TeacherCreatePage() {
  const { control, handleSubmit, reset } = useForm<FormValues>()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true)

      await apiClient.post('/teachers', data)

      toast.success('Teacher created 🎉')
      reset()
      router.push('/apps/teachers')
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} mb={3}>
          <Typography variant='h5'>Create Teacher</Typography>
        </Stack>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name='name'
              control={control}
              rules={{ required: 'Name required' }}
              render={({ field, fieldState }) => (
                <TextField {...field} label='Name' error={!!fieldState.error} helperText={fieldState.error?.message} />
              )}
            />

            <Controller
              name='email'
              control={control}
              rules={{ required: 'Email required' }}
              render={({ field, fieldState }) => (
                <TextField {...field} label='Email' error={!!fieldState.error} helperText={fieldState.error?.message} />
              )}
            />

            <Controller
              name='mobile'
              control={control}
              rules={{ required: 'Mobile required' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label='Mobile'
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name='designation'
              control={control}
              render={({ field }) => <TextField {...field} label='Designation' />}
            />

            <Button type='submit' variant='contained' disabled={loading}>
              {loading ? <CircularProgress size={20} /> : 'Create Teacher'}
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  )
}
