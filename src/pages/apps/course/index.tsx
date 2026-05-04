import MasterListPage from 'src/components/admin/MasterListPage'
import { createMasterService } from 'src/services/masterService'

const service = createMasterService('courses')

const CoursesPage = () => (
  <MasterListPage
    title='Courses'
    subtitle='Keep course records tidy for curriculum, enrollment, and timetable workflows.'
    createHref='/apps/course/create'
    createLabel='Add Course'
    service={service}
  />
)

export default CoursesPage
