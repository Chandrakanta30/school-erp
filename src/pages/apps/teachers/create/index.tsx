import { useState } from 'react'
import { useRouter } from 'next/router'

import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import SaveIcon from '@mui/icons-material/Save'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'

import PageShell, { SurfaceCard } from 'src/components/admin/PageShell'
import { apiClient } from 'src/lib/apiClient'

type FormValues = {
  name: string
  email: string
  mobile: string
  designation?: string
}

const schema = yup.object({
  name: yup.string().trim().required('This field is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().trim().required('This field is required').email('Invalid email format'),
  mobile: yup
    .string()
    .trim()
    .required('This field is required')
    .matches(/^[0-9+\-\s()]{8,16}$/, 'Enter a valid phone number'),
  designation: yup.string().trim().max(80, 'Designation must be 80 characters or less')
})

const TeacherCreatePage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { name: '', email: '', mobile: '', designation: '' },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true)
      await apiClient.post('/teachers', data)
      toast.success('Teacher created')
      router.push('/apps/teachers')
    } catch (error: any) {
      toast.error(error?.message || 'Could not create teacher')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageShell
      title='Create Teacher'
      subtitle='Add staff contact details with validation before saving.'
      backHref='/apps/teachers'
    >
      <SurfaceCard>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Controller
                name='name'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    required
                    label='Full name'
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name='email'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    required
                    type='email'
                    label='Email address'
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message || 'Example: teacher@school.edu'}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name='mobile'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    required
                    label='Mobile number'
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name='designation'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Designation'
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message || 'Optional role or department.'}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent='flex-end'>
                <Button variant='outlined' color='secondary' onClick={() => router.push('/apps/teachers')}>
                  Cancel
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={18} color='inherit' /> : <SaveIcon />}
                >
                  Save Teacher
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </SurfaceCard>
    </PageShell>
  )
}

export default TeacherCreatePage
