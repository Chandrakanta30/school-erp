import MasterCreatePage from 'src/components/admin/MasterCreatePage'
import { createMasterService } from 'src/services/masterService'

const service = createMasterService('boards')

const CreateBoardPage = () => (
  <MasterCreatePage
    title='Board'
    subtitle='Create a board entry with an official name and optional internal code.'
    listHref='/apps/boards'
    service={service}
  />
)

export default CreateBoardPage
