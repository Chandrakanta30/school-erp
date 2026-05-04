import MasterListPage from 'src/components/admin/MasterListPage'
import { createMasterService } from 'src/services/masterService'

const service = createMasterService('schools')

const SchoolsPage = () => (
  <MasterListPage
    title='Schools'
    subtitle='Manage school entities that anchor academic structures and student enrollments.'
    createHref='/apps/Schools/create'
    createLabel='Add School'
    service={service}
  />
)

export default SchoolsPage
