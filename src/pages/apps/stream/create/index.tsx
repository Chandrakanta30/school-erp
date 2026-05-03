'use client'

import { Card, CardContent, TextField, Button, Typography, Stack, CircularProgress, Box } from '@mui/material'

import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { createMasterService } from '@/src/services/masterService'

const service = createMasterService('streams')

type FormValues = {
  name: string
  code?: string
}

const BrandCreatePage = () => {
  const { control, handleSubmit, reset } = useForm<FormValues>()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true)

      await service.create(data)

      toast.success('Created')
      reset()
      router.push('/apps/stream')
    } catch {
      toast.error('Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent>
        <Stack mb={4}>
          <Typography variant='h5'>Create Stream</Typography>
        </Stack>

        <Box component='form' onSubmit={handleSubmit(onSubmit)}>
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

          <Controller
            name='code'
            control={control}
            render={({ field }) => <TextField {...field} label='Code' fullWidth margin='normal' />}
          />

          <Button type='submit' variant='contained' disabled={loading}>
            {loading ? <CircularProgress size={20} /> : 'Create'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default BrandCreatePage
