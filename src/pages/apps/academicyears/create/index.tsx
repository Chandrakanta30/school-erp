import MasterCreatePage from 'src/components/admin/MasterCreatePage'
import { createMasterService } from 'src/services/masterService'

const service = createMasterService('academic-years')

const CreateAcademicYearPage = () => (
  <MasterCreatePage
    title='Academic Year'
    subtitle='Create the academic period that downstream records will reference.'
    listHref='/apps/academicyears'
    service={service}
  />
)

export default CreateAcademicYearPage
