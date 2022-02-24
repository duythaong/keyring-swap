import { actionsPageData } from '../slices/pageSlices'
import { actionsStorageData } from '../slices/storageSlices'
const actionsData = { ...actionsPageData, ...actionsStorageData }
export default actionsData
