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
export const internetRedux = internetReduxSlice.reducer
export const actionsPageData = { setInternet }
