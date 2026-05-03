'use client'

import { Card, CardContent, Typography, Stack, Divider, List, ListItem } from '@mui/material'

export default function UserManualPage() {
  return (
    <Card>
      <CardContent>
        <Stack spacing={3}>
          <Typography variant='h4'>School ERP – User Manual</Typography>

          <Typography>
            This system helps you manage your school’s daily operations like classes, subjects, teachers, and students
            in one place.
          </Typography>

          <Divider />

          {/* Getting Started */}
          <Typography variant='h6'>1. Getting Started</Typography>
          <Typography>The system works in three steps:</Typography>
          <List>
            <ListItem>• Setup basic details (Masters)</ListItem>
            <ListItem>• Create class structure</ListItem>
            <ListItem>• Manage students, teachers, and subjects</ListItem>
          </List>

          <Divider />

          {/* Masters */}
          <Typography variant='h6'>2. Basic Setup</Typography>
          <Typography>Add important information like:</Typography>
          <List>
            <ListItem>• Academic Year</ListItem>
            <ListItem>• School</ListItem>
            <ListItem>• Board (CBSE, ICSE)</ListItem>
            <ListItem>• Grade (Class)</ListItem>
            <ListItem>• Stream / Division (optional)</ListItem>
          </List>

          <Divider />

          {/* Academic Structure */}
          <Typography variant='h6'>3. Creating Classes</Typography>
          <Typography>Combine details like Year, School, Board, and Grade to create a class.</Typography>

          <Divider />

          {/* Subject Mapping */}
          <Typography variant='h6'>4. Subject Mapping</Typography>

          <Typography>
            <b>Compulsory Subjects:</b>
          </Typography>
          <List>
            <ListItem>• Subjects every student must study</ListItem>
          </List>

          <Typography>
            <b>Optional Subjects:</b>
          </Typography>
          <List>
            <ListItem>• Group subjects (e.g., Optional Group 1, Group 2)</ListItem>
            <ListItem>• Students choose one group</ListItem>
          </List>

          <Divider />

          {/* Teachers */}
          <Typography variant='h6'>5. Teachers</Typography>
          <List>
            <ListItem>• Add name, email, mobile</ListItem>
            <ListItem>• Employee ID is auto-generated</ListItem>
          </List>

          <Divider />

          {/* Students */}
          <Typography variant='h6'>6. Students</Typography>

          <Typography>
            <b>Student Info:</b>
          </Typography>
          <List>
            <ListItem>• Name, Gender, DOB</ListItem>
            <ListItem>• Address and Religion</ListItem>
          </List>

          <Typography>
            <b>Parents:</b>
          </Typography>
          <List>
            <ListItem>• Add multiple parents/guardians</ListItem>
            <ListItem>• Include contact details</ListItem>
          </List>

          <Typography>
            <b>Class Selection:</b>
          </Typography>
          <Typography>Select in order: Academic Year → School → Board → Grade → Division</Typography>

          <Divider />

          {/* Viewing */}
          <Typography variant='h6'>7. Viewing Data</Typography>
          <List>
            <ListItem>• View lists of students, teachers, and classes</ListItem>
            <ListItem>• Use search and filters</ListItem>
          </List>

          <Divider />

          {/* Editing */}
          <Typography variant='h6'>8. Editing</Typography>
          <Typography>You can update any information anytime.</Typography>

          <Divider />

          {/* Delete */}
          <Typography variant='h6'>9. Deleting</Typography>
          <Typography color='error'>Deleted data cannot be recovered. Be careful.</Typography>

          <Divider />

          {/* Tips */}
          <Typography variant='h6'>10. Tips</Typography>
          <List>
            <ListItem>• Always create class before adding students</ListItem>
            <ListItem>• Avoid duplicate entries</ListItem>
            <ListItem>• Keep subject groups organized</ListItem>
          </List>

          <Divider />

          <Typography variant='h6'>🎉 You’re Ready!</Typography>
          <Typography>You can now manage your entire school smoothly.</Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}
