import { combineReducers } from 'redux'

import reduxPageData from '../slices/pageSlices'
import reduxStorageData from '../slices/storageSlices'

const rootReducer = combineReducers({
  ...reduxPageData,
  ...reduxStorageData,
})

export default rootReducer
