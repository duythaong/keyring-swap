import { SupportedChainId } from '../constants/chains'

export function getActiveChainBaseOnUrl(): number {
  const subdomain = process.env.SWAP_KEY
    ? process.env.SWAP_KEY
    : window.location.host.split('.')[1]
    ? window.location.host.split('.')[0]
    : false
  // console.log('process.env.REACT_APP_SWAP_KEY', process.env.REACT_APP_SWAP_KEY)
  switch (subdomain) {
    case 'swap-eth':
      return SupportedChainId.KOVAN
    case 'swap-bsc':
      return process.env.REACT_APP_STATE !== 'production' ? SupportedChainId.BSC_MAINNET : SupportedChainId.BSC_MAINNET
    case 'swap-polygon':
      return SupportedChainId.POLYGON_MAINET
    case 'swap-mumbai':
      return SupportedChainId.POLYGON_TESTNET
    default:
      return SupportedChainId.MAINNET
  }
}
