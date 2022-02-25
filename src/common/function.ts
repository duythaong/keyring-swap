/* eslint-disable react-hooks/rules-of-hooks */
import { useIntl } from 'react-intl'

export function formatMessage(messageId: any) {
  return useIntl().formatMessage({ id: messageId })
}

export const saveDataLocal = (key: any, data: any) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const getDataLocal = (key: any) => {
  // eslint-disable-next-line no-undef
  try {
    return JSON.parse(localStorage.getItem(key) || '{}')
  } catch (e) {
    return ''
  }
}
