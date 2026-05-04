import MasterCreatePage from 'src/components/admin/MasterCreatePage'
import { createMasterService } from 'src/services/masterService'

const service = createMasterService('shifts')

const CreateShiftPage = () => (
  <MasterCreatePage
    title='Shift'
    subtitle='Create a shift label and optional internal code.'
    listHref='/apps/Shift'
    service={service}
  />
)

export default CreateShiftPage
