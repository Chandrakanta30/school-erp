'use client'

import { useFieldArray, useForm, Controller } from 'react-hook-form'
import { TextField, Button, Stack, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { apiClient } from '@/src/lib/apiClient'
import toast from 'react-hot-toast'

export default function Page() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      gender: '',
      dob: '',
      religion: '',
      address: '',
      academic_structure_id: '',
      parents: [{ name: '', phone: '', email: '', type: '' }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'parents'
  })

  const [structures, setStructures] = useState([])

  useEffect(() => {
    apiClient.get('/academic-structures').then(r => {
      setStructures(r.data?.data)
    })
  }, [])

  const onSubmit = async (data: any) => {
    await apiClient.post('/students', data)
    toast.success('Student Created')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        {/* STUDENT */}
        <Controller
          name='name'
          control={control}
          render={({ field }) => <TextField {...field} label='Student Name' />}
        />

        <Controller
          name='gender'
          control={control}
          render={({ field }) => (
            <TextField {...field} select label='Gender'>
              <MenuItem value='male'>Male</MenuItem>
              <MenuItem value='female'>Female</MenuItem>
            </TextField>
          )}
        />

        <Controller
          name='dob'
          control={control}
          render={({ field }) => <TextField {...field} type='date' label='DOB' InputLabelProps={{ shrink: true }} />}
        />

        <Controller
          name='religion'
          control={control}
          render={({ field }) => <TextField {...field} label='Religion' />}
        />

        <Controller
          name='address'
          control={control}
          render={({ field }) => <TextField {...field} label='Address' multiline />}
        />

        {/* ACADEMIC */}
        <Controller
          name='academic_structure_id'
          control={control}
          render={({ field }) => (
            <TextField select label='Class' {...field}>
              {structures.map((s: any) => (
                <MenuItem key={s.id} value={s.id}>
                  {s.school?.name} - {s.grade?.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        {/* PARENTS */}
        {fields.map((item, index) => (
          <Stack key={item.id} direction='row' spacing={1}>
            <Controller
              name={`parents.${index}.name`}
              control={control}
              render={({ field }) => <TextField {...field} label='Parent Name' />}
            />

            <Controller
              name={`parents.${index}.phone`}
              control={control}
              render={({ field }) => <TextField {...field} label='Phone' />}
            />

            <Controller
              name={`parents.${index}.email`}
              control={control}
              render={({ field }) => <TextField {...field} label='Email' />}
            />

            <Controller
              name={`parents.${index}.type`}
              control={control}
              render={({ field }) => <TextField {...field} label='Type' />}
            />

            <Button onClick={() => remove(index)}>X</Button>
          </Stack>
        ))}

        <Button onClick={() => append({ name: '', phone: '', type: '', email: '' })}>Add Parent</Button>

        <Button type='submit' variant='contained'>
          Create Student
        </Button>
      </Stack>
    </form>
  )
}
