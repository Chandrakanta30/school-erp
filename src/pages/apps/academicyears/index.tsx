import MasterListPage from 'src/components/admin/MasterListPage'
import { createMasterService } from 'src/services/masterService'

const service = createMasterService('academic-years')

const AcademicYearsPage = () => (
  <MasterListPage
    title='Academic Years'
    subtitle='Control active academic-year records used in admissions, billing, and reporting.'
    createHref='/apps/academicyears/create'
    createLabel='Add Year'
    service={service}
  />
)

export default AcademicYearsPage
