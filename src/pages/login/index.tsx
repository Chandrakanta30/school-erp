import { ReactNode, useState } from 'react'
import Link from 'next/link'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import LoginIcon from '@mui/icons-material/Login'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useAuth } from 'src/hooks/useAuth'
import themeConfig from 'src/configs/themeConfig'

type FormData = {
  email: string
  password: string
}

const schema = yup.object({
  email: yup.string().trim().required('This field is required').email('Invalid email format'),
  password: yup.string().required('This field is required').min(8, 'Password must be at least 8 characters')
})

const LoginPage = () => {
  const auth = useAuth()
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    setSubmitting(true)
    auth.login({ ...data, rememberMe }, () => {
      setSubmitting(false)
      setError('email', { type: 'manual', message: 'Email or password is invalid' })
    })
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) 460px' },
        bgcolor: 'background.default'
      }}
    >
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 8,
          color: 'common.white',
          background:
            'linear-gradient(135deg, rgba(37,99,235,0.95), rgba(5,150,105,0.88)), url(/images/pages/auth-v2-login-illustration-light.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Typography variant='h5' sx={{ color: 'common.white' }}>
          {themeConfig.templateName}
        </Typography>
        <Stack spacing={3} sx={{ maxWidth: 560 }}>
          <Typography variant='h2' sx={{ color: 'common.white' }}>
            Run school operations with clarity.
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.82)', fontSize: '1.05rem' }}>
            Admissions, academics, staff, and daily workflows live in one focused admin workspace.
          </Typography>
        </Stack>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 3, sm: 6 }
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: 420,
            p: { xs: 4, sm: 5 },
            borderRadius: 2,
            border: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <Stack spacing={4}>
            <Stack spacing={1}>
              <Typography variant='h4' component='h1'>
                Welcome back
              </Typography>
              <Typography color='text.secondary'>Sign in to continue to your admin dashboard.</Typography>
            </Stack>

            {errors.email?.type === 'manual' ? <Alert severity='error'>{errors.email.message}</Alert> : null}

            <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <Controller
                  name='email'
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      autoFocus
                      required
                      fullWidth
                      type='email'
                      label='Email address'
                      placeholder='admin@school.edu'
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />

                <Controller
                  name='password'
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      label='Password'
                      type={showPassword ? 'text' : 'password'}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              aria-label={showPassword ? 'Hide password' : 'Show password'}
                              onMouseDown={event => event.preventDefault()}
                              onClick={() => setShowPassword(value => !value)}
                            >
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />

                <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={2}>
                  <FormControlLabel
                    control={<Checkbox checked={rememberMe} onChange={event => setRememberMe(event.target.checked)} />}
                    label='Remember me'
                  />
                  <Typography component={Link} href='/forgot-password' color='primary' sx={{ textDecoration: 'none' }}>
                    Forgot password?
                  </Typography>
                </Stack>

                <Button
                  fullWidth
                  size='large'
                  type='submit'
                  variant='contained'
                  disabled={submitting}
                  startIcon={<LoginIcon />}
                >
                  {submitting ? 'Signing in...' : 'Sign in'}
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
LoginPage.guestGuard = true

export default LoginPage
