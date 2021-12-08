import { BigNumber } from '@ethersproject/bignumber'
import { hexStripZeros } from '@ethersproject/bytes'
import { Web3Provider } from '@ethersproject/providers'
import { CHAIN_INFO, SupportedChainId } from 'constants/chains'
import { load, save } from 'redux-localstorage-simple'

import { addNetwork } from './addNetwork'

interface SwitchNetworkArguments {
  library: Web3Provider
  chainId?: SupportedChainId
}

// provider.request returns Promise<any>, but wallet_switchEthereumChain must return null or throw
// see https://github.com/rekmarks/EIPs/blob/3326-create/EIPS/eip-3326.md for more info on wallet_switchEthereumChain
export async function switchToNetwork({ library, chainId }: SwitchNetworkArguments): Promise<null | void> {
  console.log('====================================')
  console.log('library', library)
  console.log('====================================')
  if (!library?.provider?.request) {
    return
  }
  if (!chainId && library?.getNetwork) {
    ;({ chainId } = await library.getNetwork())
  }

  const formattedChainId = hexStripZeros(BigNumber.from(chainId).toHexString())
  try {
    await library?.provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: formattedChainId }],
    })
    console.log('REQUEST OK')
  } catch (error) {
    console.log('ERR request1', error)
    // 4902 is the error code for attempting to switch to an unrecognized chainId
    if (error.code === 4902 && chainId !== undefined) {
      console.log('chainId', chainId)
      console.log('CHAIN_INFO[chainId]', CHAIN_INFO[chainId])
      const info = CHAIN_INFO[chainId]

      // metamask (only known implementer) automatically switches after a network is added
      // the second call is done here because that behavior is not a part of the spec and cannot be relied upon in the future
      // metamask's behavior when switching to the current network is just to return null (a no-op)
      const chainIdLocal = localStorage.getItem('ADDNETWORK_CHAINID')
      console.log('chainIdLocal', chainIdLocal)

      if (!chainIdLocal || Number(chainIdLocal) !== chainId) {
        await addNetwork({ library, chainId, info })
        localStorage.setItem('ADDNETWORK_CHAINID', chainId.toString())
        await switchToNetwork({ library, chainId })
      }
    } else {
      console.log('ERR request')

      throw error
    }
  }
}
