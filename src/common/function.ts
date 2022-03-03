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

export const scrollTop = () => {
  if (window) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

export const detectImageUrl = (url: string) => {
  // if (!url || url === '') return ''
  // const setting = ReduxService.getSettingRedux()
  // if (url?.startsWith('https://ipfs')) {
  //   return encodeURI(url)
  // } else {
  //   return encodeURI(setting?.others?.IPFS_IMAGE_DOMAIN + url)
  // }
  return url
}
