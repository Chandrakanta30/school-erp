import MasterCreatePage from 'src/components/admin/MasterCreatePage'
import { createMasterService } from 'src/services/masterService'

const service = createMasterService('subject')

const CreateSubjectPage = () => (
  <MasterCreatePage
    title='Subject'
    subtitle='Add a subject with a concise name and optional short code.'
    listHref='/apps/subject'
    service={service}
  />
)

export default CreateSubjectPage
