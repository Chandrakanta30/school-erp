import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import InboxIcon from '@mui/icons-material/Inbox'
import RefreshIcon from '@mui/icons-material/Refresh'

type LoadingStateProps = {
  label?: string
}

export const LoadingState = ({ label = 'Loading data...' }: LoadingStateProps) => (
  <Box
    role='status'
    aria-live='polite'
    sx={{
      py: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Stack spacing={2} alignItems='center'>
      <CircularProgress size={28} />
      <Typography variant='body2' color='text.secondary'>
        {label}
      </Typography>
    </Stack>
  </Box>
)

type EmptyStateProps = {
  title?: string
  message?: string
  actionLabel?: string
  onAction?: () => void
}

export const EmptyState = ({
  title = 'No records found',
  message = 'Create a new record or adjust your search filters.',
  actionLabel,
  onAction
}: EmptyStateProps) => (
  <Box
    sx={{
      py: 10,
      px: 3,
      borderRadius: 2,
      border: theme => `1px dashed ${theme.palette.divider}`,
      bgcolor: theme => theme.palette.action.hover,
      textAlign: 'center'
    }}
  >
    <Stack spacing={2} alignItems='center'>
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: 2,
          display: 'grid',
          placeItems: 'center',
          color: 'primary.main',
          bgcolor: theme => theme.palette.primary.main + '14'
        }}
      >
        <InboxIcon />
      </Box>
      <Box>
        <Typography variant='h6'>{title}</Typography>
        <Typography variant='body2' color='text.secondary'>
          {message}
        </Typography>
      </Box>
      {actionLabel && onAction ? (
        <Button startIcon={<RefreshIcon />} onClick={onAction} variant='outlined'>
          {actionLabel}
        </Button>
      ) : null}
    </Stack>
  </Box>
)
