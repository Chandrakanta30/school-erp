'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, TextField, Button, Typography, Stack, Autocomplete } from '@mui/material'

import { useForm, Controller } from 'react-hook-form'
import { apiClient } from '@/src/lib/apiClient'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const Page = () => {
  const { control, handleSubmit } = useForm()
  const router = useRouter()

  const [data, setData] = useState<any>({})

  useEffect(() => {
    Promise.all([
      apiClient.get('/academic-years'),
      apiClient.get('/schools'),
      apiClient.get('/brands'),
      apiClient.get('/boards'),
      apiClient.get('/grades'),
      apiClient.get('/courses'),
      apiClient.get('/streams'),
      apiClient.get('/shifts'),
      apiClient.get('/divisions')
    ]).then(([y, s, b, bo, g, c, st, sh, d]) => {
      setData({
        years: y.data?.data || y.data || [],
        schools: s.data?.data || s.data || [],
        brands: b.data?.data || b.data || [],
        boards: bo.data?.data || bo.data || [],
        grades: g.data?.data || g.data || [],
        courses: c.data?.data || c.data || [],
        streams: st.data?.data || st.data || [],
        shifts: sh.data?.data || sh.data || [],
        divisions: d.data?.data || d.data || []
      })
    })
  }, [])

  const onSubmit = async (form: any) => {
    try {
      await apiClient.post('/academic-structures/generate', form)
      toast.success('Created')
      router.push('/apps/academic-structure')
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error')
    }
  }

  const renderMultiSelect = (name: string, label: string, options: any[] = []) => (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <Autocomplete
          multiple
          options={options}
          getOptionLabel={option => option.name}
          value={options.filter(opt => field.value?.includes(opt.id))}
          onChange={(_, selected) => field.onChange(selected.map(item => item.id))}
          renderInput={params => <TextField {...params} label={label} margin='normal' />}
        />
      )}
    />
  )

  return (
    <Card>
      <CardContent>
        <Stack mb={3}>
          <Typography variant='h5'>Create Academic Structure</Typography>
        </Stack>

        <form onSubmit={handleSubmit(onSubmit)}>
          {JSON.stringify('data', data)}
          {renderMultiSelect('academic_year_ids', 'Academic Year', data.years)}
          {renderMultiSelect('school_ids', 'School', data.schools)}
          {renderMultiSelect('brand_ids', 'Brand', data.brands)}
          {renderMultiSelect('board_ids', 'Board', data.boards)}
          {renderMultiSelect('grade_ids', 'Grade', data.grades)}
          {renderMultiSelect('course_ids', 'Course', data.courses)}
          {renderMultiSelect('stream_ids', 'Stream', data.streams)}
          {renderMultiSelect('shift_ids', 'Shift', data.shifts)}
          {renderMultiSelect('division_ids', 'Division', data.divisions)}

          <Button type='submit' variant='contained'>
            Create
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default Page
