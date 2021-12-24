import { SupportedChainId } from '../constants/chains'

export function getActiveChainBaseOnUrl(): number {
  const subdomain = window.location.host.split('.')[1] ? window.location.host.split('.')[0] : false
  switch (subdomain) {
    case 'swap_eth':
      return SupportedChainId.MAINNET
    case 'swap_bsc':
      return SupportedChainId.BSC_MAINNET
    case 'swap_polygon':
      return SupportedChainId.POLYGON_MAINET
    default:
      return SupportedChainId.MAINNET
  }
}
