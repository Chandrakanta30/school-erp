import MasterListPage from 'src/components/admin/MasterListPage'
import { createMasterService } from 'src/services/masterService'

const service = createMasterService('streams')

const StreamsPage = () => (
  <MasterListPage
    title='Streams'
    subtitle='Set up academic streams for organized class and curriculum planning.'
    createHref='/apps/stream/create'
    createLabel='Add Stream'
    service={service}
  />
)

export default StreamsPage
