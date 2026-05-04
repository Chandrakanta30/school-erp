import MasterCreatePage from 'src/components/admin/MasterCreatePage'
import { createMasterService } from 'src/services/masterService'

const service = createMasterService('schools')

const CreateSchoolPage = () => (
  <MasterCreatePage
    title='School'
    subtitle='Create a school record with a recognizable name and optional code.'
    listHref='/apps/Schools'
    service={service}
  />
)

export default CreateSchoolPage
