import MasterListPage from 'src/components/admin/MasterListPage'
import { createMasterService } from 'src/services/masterService'

const service = createMasterService('brands')

const BrandsPage = () => (
  <MasterListPage
    title='Brands'
    subtitle='Manage the school brands and short codes used across academic setup.'
    createHref='/apps/brands/create'
    createLabel='Add Brand'
    service={service}
  />
)

export default BrandsPage
