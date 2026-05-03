'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Stack, Button, TextField, MenuItem, Divider } from '@mui/material'

import { useForm, Controller } from 'react-hook-form'
import { apiClient } from '@/src/lib/apiClient'
import toast from 'react-hot-toast'

type Option = { id: number; name: string }

export default function Page() {
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      academic_structure_id: '',
      compulsory_subjects: [],
      optional_groups: [{ group: 1, subjects: [] }]
    }
  })

  const [structures, setStructures] = useState<any[]>([])
  const [subjects, setSubjects] = useState<any[]>([])

  const optionalGroups = watch('optional_groups')

  useEffect(() => {
    Promise.all([apiClient.get('/academic-structures'), apiClient.get('/subject')]).then(([s, sub]) => {
      setStructures(s.data.data || s.data)
      setSubjects(sub.data.data || sub.data)
    })
  }, [])

  const onSubmit = async (data: any) => {
    // 🔥 transform data for backend
    const payload = {
      academic_structure_id: data.academic_structure_id,
      subjects: [
        ...data.compulsory_subjects.map((id: number) => ({
          subject_id: id,
          type: 'compulsory'
        })),
        ...data.optional_groups.flatMap((g: any) =>
          g.subjects.map((id: number) => ({
            subject_id: id,
            type: 'optional',
            optional_group: g.group
          }))
        )
      ]
    }

    await apiClient.post('/subject-mapping', payload)
    toast.success('Saved successfully')
  }

  const addGroup = () => {
    setValue('optional_groups', [...optionalGroups, { group: optionalGroups.length + 1, subjects: [] }])
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h5' mb={3}>
          Subject Mapping
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {/* Academic Structure */}

            {JSON.stringify('data', structures)}
            <Controller
              name='academic_structure_id'
              control={control}
              render={({ field }) => (
                <TextField select label='Class' {...field}>
                  {structures.map((s: any) => (
                    <MenuItem key={s.id} value={s.id}>
                      {s?.school?.name || s.id} {s?.grade?.name || s.id}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            {/* ========================= */}
            {/* COMPULSORY SUBJECTS */}
            {/* ========================= */}
            <Typography variant='h6'>Compulsory Subjects</Typography>

            <Controller
              name='compulsory_subjects'
              control={control}
              render={({ field }) => (
                <TextField select SelectProps={{ multiple: true }} label='Select Subjects' {...field}>
                  {subjects.map(s => (
                    <MenuItem key={s.id} value={s.id}>
                      {s.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Divider />

            {/* ========================= */}
            {/* OPTIONAL GROUPS */}
            {/* ========================= */}
            <Typography variant='h6'>Optional Subjects</Typography>

            {optionalGroups.map((group: any, index: number) => (
              <Stack key={index} spacing={1}>
                <Typography variant='subtitle2'>Optional Group {group.group}</Typography>

                <Controller
                  name={`optional_groups.${index}.subjects`}
                  control={control}
                  render={({ field }) => (
                    <TextField select SelectProps={{ multiple: true }} label='Subjects' {...field}>
                      {subjects.map(s => (
                        <MenuItem key={s.id} value={s.id}>
                          {s.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Stack>
            ))}

            <Button onClick={addGroup}>Add Optional Group</Button>

            {/* SUBMIT */}
            <Button type='submit' variant='contained'>
              Save Mapping
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  )
}
