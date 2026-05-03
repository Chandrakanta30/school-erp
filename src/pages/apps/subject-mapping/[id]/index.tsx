'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Stack, Divider, Chip, Box, CircularProgress } from '@mui/material'

// import { useParams } from 'next/navigation'

import { useRouter } from 'next/router'

import { apiClient } from '@/src/lib/apiClient'
import toast from 'react-hot-toast'

type Subject = {
  id: number
  subject: { name: string }
  teacher?: { name: string }
  type: 'compulsory' | 'optional'
  optional_group?: number
}

export default function Page() {
  //   const { id } = useParams()

  const router = useRouter()

  //   const { id } = router.query

  const [data, setData] = useState<Subject[]>([])
  const [structureName, setStructureName] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!router.isReady) return

    const id = router.query.id

    if (!id) return

    console.log('id', id)
    fetchData(id)
  }, [router.isReady])

  //   useEffect(() => {
  //     fetchData()
  //   }, [])

  const fetchData = async (id: any) => {
    // console.log('id', id, router.query)
    try {
      const res = await apiClient.get(`/subject-mapping/${id}`)

      console.log('res', res)
      setData(res)

      // optional: fetch structure name
      const s = await apiClient.get(`/academic-structures/${id}`)
      setStructureName(s.data?.name || '')
    } catch {
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  // 🧠 Group Data
  const compulsory = data.filter(s => s.type === 'compulsory')

  const optionalGroups = data
    .filter(s => s.type === 'optional')
    .reduce((acc: any, curr) => {
      const group = curr.optional_group || 0
      if (!acc[group]) acc[group] = []
      acc[group].push(curr)

      return acc
    }, {})

  return (
    <Card>
      <CardContent>
        {loading ? (
          <Box textAlign='center' py={5}>
            <CircularProgress />
          </Box>
        ) : (
          <Stack spacing={3}>
            {/* Header */}
            <Typography variant='h5'>Subject Mapping</Typography>

            <Typography variant='subtitle2' color='text.secondary'>
              {structureName}
            </Typography>

            <Divider />

            {/* ===================== */}
            {/* COMPULSORY */}
            {/* ===================== */}
            <Typography variant='h6'>Compulsory Subjects</Typography>

            {compulsory.length === 0 ? (
              <Typography>No compulsory subjects</Typography>
            ) : (
              compulsory.map(s => (
                <Stack key={s.id} direction='row' justifyContent='space-between'>
                  <Typography>{s.subject?.name}</Typography>

                  {s.teacher && <Chip label={s.teacher.name} size='small' color='primary' />}
                </Stack>
              ))
            )}

            <Divider />

            {/* ===================== */}
            {/* OPTIONAL */}
            {/* ===================== */}
            <Typography variant='h6'>Optional Subjects</Typography>

            {Object.keys(optionalGroups).length === 0 ? (
              <Typography>No optional subjects</Typography>
            ) : (
              Object.entries(optionalGroups).map(([group, subjects]: any) => (
                <Stack key={group} spacing={1}>
                  <Typography variant='subtitle1'>Group {group}</Typography>

                  {subjects.map((s: Subject) => (
                    <Stack key={s.id} direction='row' justifyContent='space-between'>
                      <Typography>{s.subject?.name}</Typography>

                      {s.teacher && <Chip label={s.teacher.name} size='small' color='secondary' />}
                    </Stack>
                  ))}
                </Stack>
              ))
            )}
          </Stack>
        )}
      </CardContent>
    </Card>
  )
}
