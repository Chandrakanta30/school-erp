import MasterListPage from 'src/components/admin/MasterListPage'
import { createMasterService } from 'src/services/masterService'

const service = createMasterService('grades')

const GradesPage = () => (
  <MasterListPage
    title='Grades'
    subtitle='Maintain grade levels used for class assignment and academic structure.'
    createHref='/apps/grade/create'
    createLabel='Add Grade'
    service={service}
  />
)

export default GradesPage
