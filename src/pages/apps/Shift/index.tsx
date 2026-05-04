import MasterListPage from 'src/components/admin/MasterListPage'
import { createMasterService } from 'src/services/masterService'

const service = createMasterService('shifts')

const ShiftsPage = () => (
  <MasterListPage
    title='Shifts'
    subtitle='Maintain shift timings used in class schedules and academic structures.'
    createHref='/apps/Shift/create'
    createLabel='Add Shift'
    service={service}
  />
)

export default ShiftsPage
