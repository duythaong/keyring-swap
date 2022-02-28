/* eslint-disable react-hooks/rules-of-hooks */
import { hexlify } from '@ethersproject/bytes'
import { toUtf8Bytes } from '@ethersproject/strings'

export const signPersonalMessage = async (message, library, connector, account, active) => {
  if (!active) {
    // kill SessionManager
    return
  }
  try {
    console.log('connector', connector.walletConnectProvider)
    if (connector && connector.walletConnectProvider && connector.walletConnectProvider?.connector) {
      const wcMessage = hexlify(toUtf8Bytes(message))
      let signature = connector.walletConnectProvider.connector.signPersonalMessage([wcMessage, account.toLowerCase()])
      return signature
    }
  } catch (e) {
    return null
  }
  return null
}
