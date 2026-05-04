import { ReactNode } from 'react'
import Link from 'next/link'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

type PageShellProps = {
  title: string
  subtitle?: string
  badge?: string
  actionHref?: string
  actionLabel?: string
  backHref?: string
  children: ReactNode
}

const PageShell = ({ title, subtitle, badge, actionHref, actionLabel, backHref, children }: PageShellProps) => {
  return (
    <Box sx={{ display: 'grid', gap: 6 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'stretch', sm: 'center' }}
        justifyContent='space-between'
        spacing={3}
      >
        <Stack spacing={1}>
          <Stack direction='row' alignItems='center' spacing={2} flexWrap='wrap'>
            {backHref ? (
              <Button
                component={Link}
                href={backHref}
                color='secondary'
                variant='outlined'
                size='small'
                startIcon={<ArrowBackIcon fontSize='small' />}
                aria-label='Go back'
              >
                Back
              </Button>
            ) : null}
            <Typography variant='h4' component='h1'>
              {title}
            </Typography>
            {badge ? <Chip label={badge} color='primary' variant='outlined' size='small' /> : null}
          </Stack>
          {subtitle ? (
            <Typography color='text.secondary' sx={{ maxWidth: 720 }}>
              {subtitle}
            </Typography>
          ) : null}
        </Stack>

        {actionHref && actionLabel ? (
          <Button
            component={Link}
            href={actionHref}
            variant='contained'
            startIcon={<AddIcon />}
            aria-label={actionLabel}
            sx={{ alignSelf: { xs: 'stretch', sm: 'center' } }}
          >
            {actionLabel}
          </Button>
        ) : null}
      </Stack>

      {children}
    </Box>
  )
}

export const SurfaceCard = ({ children }: { children: ReactNode }) => (
  <Card>
    <CardContent>{children}</CardContent>
  </Card>
)

export default PageShell
