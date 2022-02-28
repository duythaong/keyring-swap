import { convertUtf8ToHex } from '@walletconnect/utils'
export default class MetaMaskServices {
  static signPersonalMessage(address, message) {
    const msgParams = [convertUtf8ToHex(message), address]
    if (window.ethereum) {
      return new Promise((resolve, reject) => {
        // Sign transaction
        window.ethereum
          .request({ method: 'personal_sign', params: msgParams })
          .then((result) => {
            // Returns signed transaction
            return resolve(result)
          })
          .catch((error) => {
            // Error returned when rejected
            return reject(error)
          })
      })
    } else {
      return null
    }
  }
}
