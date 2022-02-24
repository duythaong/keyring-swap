import { createSlice } from '@reduxjs/toolkit'
import MessageCN from 'assets/Lang/cn.json'
import MessageEN from 'assets/Lang/en.json'
import MessageVI from 'assets/Lang/ja.json'
import { KEY_STORE } from 'common/constants'
import { saveDataLocal } from 'common/function'

import initState from '../lib/initState'

const localeJA = {
  lang: 'ja',
  messages: MessageVI,
}

const localeEN = {
  lang: 'en',
  messages: MessageEN,
}

const localeCN = {
  lang: 'cn',
  messages: MessageCN,
}

const connectionMethodSlice = createSlice({
  name: 'connectionMethodRedux',
  initialState: initState.connectionMethod,
  reducers: {
    setConnectionMethod(state, action) {
      saveDataLocal(KEY_STORE.SET_CONNECTION_METHOD, action.payload)
      return action.payload
    },
  },
})

const { setConnectionMethod } = connectionMethodSlice.actions
const connectionMethodRedux = connectionMethodSlice.reducer
const reduxStorageData = { connectionMethodRedux }
export const actionsStorageData = { setConnectionMethod }
export default reduxStorageData
