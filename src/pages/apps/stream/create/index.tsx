import MasterCreatePage from 'src/components/admin/MasterCreatePage'
import { createMasterService } from 'src/services/masterService'

const service = createMasterService('streams')

const CreateStreamPage = () => (
  <MasterCreatePage
    title='Stream'
    subtitle='Create a stream that can be reused across grades and courses.'
    listHref='/apps/stream'
    service={service}
  />
)

export default CreateStreamPage
