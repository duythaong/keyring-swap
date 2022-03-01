import { useActiveWeb3React } from 'hooks/web3'
import { useEffect } from 'react'

export default function GlobalHook() {
  const { active, account, library, connector, activate, deactivate, chainId } = useActiveWeb3React()

  useEffect(() => {
    if (active && account != null) {
      console.log('to do call update')
    }
  }, [chainId, library, active, account, connector])

  return null
}
