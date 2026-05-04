import MasterListPage from 'src/components/admin/MasterListPage'
import { createMasterService } from 'src/services/masterService'

const service = createMasterService('subject')

const SubjectsPage = () => (
  <MasterListPage
    title='Subjects'
    subtitle='Maintain the subjects available for courses, grades, and teacher assignments.'
    createHref='/apps/subject/create'
    createLabel='Add Subject'
    service={service}
  />
)

export default SubjectsPage
