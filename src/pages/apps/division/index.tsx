import MasterListPage from 'src/components/admin/MasterListPage'
import { createMasterService } from 'src/services/masterService'

const service = createMasterService('divisions')

const DivisionsPage = () => (
  <MasterListPage
    title='Divisions'
    subtitle='Organize classroom divisions with readable names and reusable codes.'
    createHref='/apps/division/create'
    createLabel='Add Division'
    service={service}
  />
)

export default DivisionsPage
