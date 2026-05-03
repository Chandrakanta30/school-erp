'use client'

import { Box, Button, Card, CardContent, TextField, Typography, Stack, CircularProgress } from '@mui/material'

import { useForm, Controller } from 'react-hook-form'
import { apiClient } from '@/src/lib/apiClient'
import { useState } from 'react'
import toast from 'react-hot-toast'

// ✅ Types
type FormValues = {
  name: string
}

const PermissionCreatePage = () => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: ''
    }
  })

  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true)

      await apiClient.post('/permissions', data)

      toast.success('Permission created successfully')
      reset()
    } catch (err) {
      console.error(err)
      alert('Error creating permission')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={1} mb={4}>
          <Typography variant='h5'>Create Permission</Typography>
          <Typography variant='body2'>Define a new permission</Typography>
        </Stack>

        <Box mb={4}>
          <Controller
            name='name'
            control={control}
            rules={{ required: 'Permission name is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label='Permission Name'
                placeholder='e.g. user-read'
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Box>

        <Box display='flex' gap={2}>
          <Button variant='contained' onClick={handleSubmit(onSubmit)} disabled={loading}>
            {loading ? <CircularProgress size={20} /> : 'Create'}
          </Button>

          <Button variant='outlined' onClick={() => reset()}>
            Reset
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default PermissionCreatePage
