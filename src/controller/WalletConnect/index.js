/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { hexlify } from '@ethersproject/bytes'
import { toUtf8Bytes } from '@ethersproject/strings'
import converter from 'hex2dec'
export const signPersonalMessage = async (message, library, connector, account, active) => {
  if (!active) {
    // kill SessionManager
    return
  }
  try {
    // console.log('connector', connector.walletConnectProvider)
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

export function getETHBalance(library, address) {
  try {
    return library.getBalance(address)
  } catch (e) {
    console.log('e', e)
  }
}

export function demoSend(library, chainId, address = '0x1e56CAB5Dc4503caf9CcB469Ae7b0b22354C678c') {
  let txt = {
    from: address,
    to: address,
    // value: ethers.utils.parseUnits('0.001', 'ether').toHexString(),
    value: converter.decToHex('1000000000000000'),
  }
  return sendTransction(library, chainId, txt)
}

export function sendTransction(library, chainId, txn) {
  library
    .getSigner()
    .estimateGas(txn)
    .then((estimate) => {
      const newTxn = {
        ...txn,
        // gasLimit: calculateGasMargin(chainId, estimate),
      }
      return library
        .getSigner()
        .sendTransaction(newTxn)
        .then((response) => {
          let callBackFunction = (result) => {
            console.log('Success', result)
          }
          trackingTxs(library, response.hash, callBackFunction)
          console.log('EEE', response)
        })
    })
    .catch((error) => {
      // setAttemptingTxn(false)
      console.error(error)
    })
}

export const getNonce = async (provider, address) => {
  let res = await provider.getTransactionCount(address)
  return res
}

export const trackingTxs = async (library, hash, callback, receipt) => {
  console.log('receipt', receipt)
  if (receipt === undefined || receipt === null || receipt.blockNumber === null || receipt.blockNumber === undefined) {
    library.getTransactionReceipt(hash).then((receipt) => {
      setTimeout(() => {
        trackingTxs(library, hash, callback, receipt)
      }, 500)
    })
  } else {
    callback && callback(receipt)
  }
}

export const signCustomMessage = (library, account, message) => {
  return library
    .getSigner(account)
    .signMessage(message)
    .then((signature) => {
      return signature
    })
    .catch((error) => {
      console.log('error', error)
      return ''
    })
}
