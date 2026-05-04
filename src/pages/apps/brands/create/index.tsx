import MasterCreatePage from 'src/components/admin/MasterCreatePage'
import { createMasterService } from 'src/services/masterService'

const service = createMasterService('brands')

const CreateBrandPage = () => (
  <MasterCreatePage
    title='Brand'
    subtitle='Add a clear brand name and optional internal code.'
    listHref='/apps/brands'
    service={service}
  />
)

export default CreateBrandPage
