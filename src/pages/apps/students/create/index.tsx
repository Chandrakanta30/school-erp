import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'

import PageShell, { SurfaceCard } from 'src/components/admin/PageShell'
import { LoadingState } from 'src/components/admin/FeedbackStates'
import { apiClient } from 'src/lib/apiClient'

type ParentForm = {
  name: string
  phone: string
  email?: string
  type: string
}

type StudentForm = {
  name: string
  gender: string
  dob: string
  religion?: string
  address: string
  academic_structure_id: string
  parents: ParentForm[]
}

type AcademicStructure = {
  id: number
  school?: { name?: string }
  grade?: { name?: string }
  board?: { name?: string }
}

const schema = yup.object({
  name: yup.string().trim().required('This field is required').min(2, 'Name must be at least 2 characters'),
  gender: yup.string().required('This field is required'),
  dob: yup.string().required('This field is required'),
  religion: yup.string().trim().max(50, 'Religion must be 50 characters or less'),
  address: yup.string().trim().required('This field is required').min(8, 'Address must be at least 8 characters'),
  academic_structure_id: yup.string().required('This field is required'),
  parents: yup
    .array()
    .of(
      yup.object({
        name: yup.string().trim().required('This field is required'),
        phone: yup
          .string()
          .trim()
          .required('This field is required')
          .matches(/^[0-9+\-\s()]{8,16}$/, 'Enter a valid phone number'),
        email: yup.string().trim().email('Invalid email format'),
        type: yup.string().required('This field is required')
      })
    )
    .min(1, 'Add at least one parent or guardian')
    .required()
})

const defaultValues: StudentForm = {
  name: '',
  gender: '',
  dob: '',
  religion: '',
  address: '',
  academic_structure_id: '',
  parents: [{ name: '', phone: '', email: '', type: '' }]
}

const readCollection = (response: any): AcademicStructure[] => {
  const payload = response?.data?.data ?? response?.data ?? response
  const rows = payload?.data ?? payload

  return Array.isArray(rows) ? rows : []
}

const StudentCreatePage = () => {
  const router = useRouter()
  const [structures, setStructures] = useState<AcademicStructure[]>([])
  const [loadingStructures, setLoadingStructures] = useState(true)
  const [saving, setSaving] = useState(false)

  const { control, handleSubmit } = useForm<StudentForm>({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'parents' })

  useEffect(() => {
    const fetchStructures = async () => {
      try {
        setLoadingStructures(true)
        const response = await apiClient.get('/academic-structures')
        setStructures(readCollection(response))
      } catch {
        toast.error('Could not load academic structures')
      } finally {
        setLoadingStructures(false)
      }
    }

    fetchStructures()
  }, [])

  const onSubmit = async (data: StudentForm) => {
    try {
      setSaving(true)
      await apiClient.post('/students', data)
      toast.success('Student created')
      router.push('/apps/students')
    } catch (error: any) {
      toast.error(error?.message || 'Could not create student')
    } finally {
      setSaving(false)
    }
  }

  return (
    <PageShell
      title='Create Student'
      subtitle='Capture student, academic, and guardian details in one validated workflow.'
      backHref='/apps/students'
    >
      <SurfaceCard>
        {loadingStructures ? (
          <LoadingState label='Preparing admission form...' />
        ) : (
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={5}>
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
                        label='Student name'
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Controller
                    name='gender'
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        select
                        fullWidth
                        required
                        label='Gender'
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      >
                        <MenuItem value='male'>Male</MenuItem>
                        <MenuItem value='female'>Female</MenuItem>
                        <MenuItem value='other'>Other</MenuItem>
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Controller
                    name='dob'
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        required
                        type='date'
                        label='Date of birth'
                        InputLabelProps={{ shrink: true }}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name='academic_structure_id'
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        select
                        fullWidth
                        required
                        label='Class'
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message || 'Choose the academic structure for this student.'}
                      >
                        {structures.map(structure => (
                          <MenuItem key={structure.id} value={String(structure.id)}>
                            {[structure.school?.name, structure.grade?.name, structure.board?.name].filter(Boolean).join(' - ')}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name='religion'
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Religion'
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message || 'Optional.'}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='address'
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        fullWidth
                        required
                        multiline
                        minRows={3}
                        label='Address'
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Divider />

              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'stretch', sm: 'center' }} justifyContent='space-between' spacing={2}>
                  <Typography variant='h6'>Parents and Guardians</Typography>
                  <Button
                    variant='outlined'
                    startIcon={<AddIcon />}
                    onClick={() => append({ name: '', phone: '', type: '', email: '' })}
                  >
                    Add Parent
                  </Button>
                </Stack>

                {fields.map((item, index) => (
                  <Grid container spacing={3} key={item.id} alignItems='flex-start'>
                    <Grid item xs={12} md={3}>
                      <Controller
                        name={`parents.${index}.name`}
                        control={control}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            fullWidth
                            required
                            label='Parent name'
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Controller
                        name={`parents.${index}.phone`}
                        control={control}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            fullWidth
                            required
                            label='Phone'
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Controller
                        name={`parents.${index}.email`}
                        control={control}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            fullWidth
                            type='email'
                            label='Email'
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={10} md={2}>
                      <Controller
                        name={`parents.${index}.type`}
                        control={control}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            select
                            fullWidth
                            required
                            label='Type'
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                          >
                            <MenuItem value='father'>Father</MenuItem>
                            <MenuItem value='mother'>Mother</MenuItem>
                            <MenuItem value='guardian'>Guardian</MenuItem>
                          </TextField>
                        )}
                      />
                    </Grid>
                    <Grid item xs={2} md={1}>
                      <IconButton
                        color='error'
                        disabled={fields.length === 1}
                        onClick={() => remove(index)}
                        aria-label='Remove parent'
                        sx={{ mt: 1 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent='flex-end'>
                <Button variant='outlined' color='secondary' onClick={() => router.push('/apps/students')}>
                  Cancel
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  disabled={saving}
                  startIcon={saving ? <CircularProgress size={18} color='inherit' /> : <SaveIcon />}
                >
                  Save Student
                </Button>
              </Stack>
            </Stack>
          </form>
        )}
      </SurfaceCard>
    </PageShell>
  )
}

export default StudentCreatePage
