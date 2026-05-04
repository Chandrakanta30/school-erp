import MasterCreatePage from 'src/components/admin/MasterCreatePage'
import { createMasterService } from 'src/services/masterService'

const service = createMasterService('grades')

const CreateGradePage = () => (
  <MasterCreatePage
    title='Grade'
    subtitle='Add a grade name that will appear in admission and student records.'
    listHref='/apps/grade'
    service={service}
  />
)

export default CreateGradePage
