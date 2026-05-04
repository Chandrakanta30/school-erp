import MasterCreatePage from 'src/components/admin/MasterCreatePage'
import { createMasterService } from 'src/services/masterService'

const service = createMasterService('courses')

const CreateCoursePage = () => (
  <MasterCreatePage
    title='Course'
    subtitle='Add a course name and code for consistent academic mapping.'
    listHref='/apps/course'
    service={service}
  />
)

export default CreateCoursePage
