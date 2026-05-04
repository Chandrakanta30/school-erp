import MasterCreatePage from 'src/components/admin/MasterCreatePage'
import { createMasterService } from 'src/services/masterService'

const service = createMasterService('divisions')

const CreateDivisionPage = () => (
  <MasterCreatePage
    title='Division'
    subtitle='Create a division label that staff can recognize quickly.'
    listHref='/apps/division'
    service={service}
  />
)

export default CreateDivisionPage
