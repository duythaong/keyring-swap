import { createSlice } from '@reduxjs/toolkit'

import initState from '../lib/initState'
const internetReduxSlice = createSlice({
  name: 'internetRedux',
  initialState: initState.internet,
  reducers: {
    setInternet(state, action) {
      return action.payload
    },
  },
})
const { setInternet } = internetReduxSlice.actions
const internetRedux = internetReduxSlice.reducer
const reduxPageData = { internetRedux }

export const actionsPageData = { setInternet }
export default reduxPageData
