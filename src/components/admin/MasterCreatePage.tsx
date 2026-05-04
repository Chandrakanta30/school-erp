import { useState } from 'react'
import { useRouter } from 'next/router'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import SaveIcon from '@mui/icons-material/Save'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import * as yup from 'yup'

import PageShell, { SurfaceCard } from './PageShell'

type FormValues = {
  name: string
  code?: string
}

type MasterService = {
  create: (data: FormValues) => Promise<any>
}

type MasterCreatePageProps = {
  title: string
  subtitle: string
  listHref: string
  service: MasterService
}

const schema = yup.object({
  name: yup.string().trim().required('This field is required').min(2, 'Name must be at least 2 characters'),
  code: yup.string().trim().max(32, 'Code must be 32 characters or less')
})

const MasterCreatePage = ({ title, subtitle, listHref, service }: MasterCreatePageProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm<FormValues>({
    defaultValues: { name: '', code: '' },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true)
      await service.create(data)
      toast.success(`${title} created`)
      router.push(listHref)
    } catch (error: any) {
      toast.error(error?.message || `Could not create ${title.toLowerCase()}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageShell title={`Create ${title}`} subtitle={subtitle} backHref={listHref}>
      <SurfaceCard>
        <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
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
                    label='Name'
                    placeholder={`Enter ${title.toLowerCase()} name`}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message || 'Use the official display name.'}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name='code'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Code'
                    placeholder='Optional short code'
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message || 'Short internal code, if applicable.'}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent='flex-end'>
                <Button variant='outlined' color='secondary' onClick={() => router.push(listHref)}>
                  Cancel
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  disabled={loading || !isValid}
                  startIcon={loading ? <CircularProgress size={18} color='inherit' /> : <SaveIcon />}
                >
                  Save {title}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </SurfaceCard>
    </PageShell>
  )
}

export default MasterCreatePage
