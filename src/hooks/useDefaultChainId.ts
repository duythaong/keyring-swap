import { useMemo } from 'react'
import { getActiveChainBaseOnUrl } from 'utils/getActiveChain'

import { useActiveWeb3React } from './web3'

export default function (): [number | undefined] {
  const { account, chainId: chainidAfterConnected } = useActiveWeb3React()

  return useMemo(() => {
    let chainId: number | undefined = chainidAfterConnected
    if (account === null || account === undefined) {
      chainId = getActiveChainBaseOnUrl()
    }
    return [chainId]
  }, [account, chainidAfterConnected])
}
