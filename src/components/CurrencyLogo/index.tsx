import { Currency } from '@uniswap/sdk-core'
import BNBLogo from 'assets/images/binance.svg'
import EthereumLogo from 'assets/images/ethereum-logo.png'
import PolygonLogo from 'assets/images/polygon.svg'
import { SupportedChainId } from 'constants/chains'
import { WETH9_EXTENDED } from 'constants/tokens'
import React, { useMemo } from 'react'
import styled from 'styled-components/macro'

import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/wrappedTokenInfo'
import Logo from '../Logo'

type Network = 'ethereum' | 'arbitrum' | 'optimism' | 'polygon' | 'mumbai'

function chainIdToNetworkName(networkId: SupportedChainId): Network {
  switch (networkId) {
    case SupportedChainId.MAINNET:
      return 'ethereum'
    case SupportedChainId.ARBITRUM_ONE:
      return 'arbitrum'
    case SupportedChainId.OPTIMISM:
      return 'optimism'
    case SupportedChainId.POLYGON_MAINET:
      return 'polygon'
    case SupportedChainId.POLYGON_TESTNET:
      return 'mumbai'
    default:
      return 'ethereum'
  }
}

export const getTokenLogoURL = (
  address: string,
  chainId: SupportedChainId = SupportedChainId.MAINNET
): string | void => {
  const networkName = chainIdToNetworkName(chainId)
  const networksWithUrls = [
    SupportedChainId.ARBITRUM_ONE,
    SupportedChainId.MAINNET,
    SupportedChainId.OPTIMISM,
    SupportedChainId.POLYGON_MAINET,
    SupportedChainId.POLYGON_TESTNET,
  ]
  if (networksWithUrls.includes(chainId)) {
    return `https://raw.githubusercontent.com/thaobacoor/assets/master/blockchains/${networkName}/assets/${address}/logo.png`
  }
}

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
`

const LOGO: { readonly [chainId in SupportedChainId]?: string } = {
  [SupportedChainId.MAINNET]: EthereumLogo,
  [SupportedChainId.POLYGON_MAINET]: PolygonLogo,
  [SupportedChainId.POLYGON_TESTNET]: PolygonLogo,
  [SupportedChainId.BSC_MAINNET]: BNBLogo,
}

const unknown = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/unknown.png'

export default function CurrencyLogo({
  currency,
  size = '24px',
  style,
  ...rest
}: {
  currency?: Currency | null
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency === null || currency === undefined) return [unknown]

    if (currency?.isNative || currency.equals(WETH9_EXTENDED[currency.chainId])) {
      return [LOGO[currency.chainId], unknown]
    }

    if (currency.isToken) {
      const defaultUrls = []
      const url = getTokenLogoURL(currency.address, currency.chainId)
      if (url) {
        defaultUrls.push(url)
      }
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, ...defaultUrls]
      }
      return defaultUrls
    }
    return []
  }, [currency, uriLocations])

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} {...rest} />
}
