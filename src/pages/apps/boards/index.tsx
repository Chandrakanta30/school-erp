import MasterListPage from 'src/components/admin/MasterListPage'
import { createMasterService } from 'src/services/masterService'

const service = createMasterService('boards')

const BoardsPage = () => (
  <MasterListPage
    title='Boards'
    subtitle='Manage education board records used by schools and academic structures.'
    createHref='/apps/boards/create'
    createLabel='Add Board'
    service={service}
  />
)

export default BoardsPage
