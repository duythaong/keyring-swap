import { SupportedChainId } from '../constants/chains'

export function getActiveChainBaseOnUrl(): number {
  const subdomain = window.location.host.split('.')[1] ? window.location.host.split('.')[0] : false
  switch (subdomain) {
    case 'swap-eth':
      return SupportedChainId.MAINNET
    case 'swap-bsc':
      return SupportedChainId.BSC_MAINNET
    case 'swap-polygon':
      return SupportedChainId.POLYGON_MAINET
    case 'swap-mumbai':
      return SupportedChainId.POLYGON_TESTNET
    default:
      return SupportedChainId.MAINNET
  }
}
