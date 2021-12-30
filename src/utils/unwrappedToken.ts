import { NATIVE } from '@duythao_bacoor/v2-sdk'
import { Currency } from '@uniswap/sdk-core'

import { ExtendedEther, WETH9_EXTENDED } from '../constants/tokens'
import { supportedChainId } from './supportedChainId'

export function unwrappedToken(currency: Currency): Currency {
  if (currency.isNative) return currency
  const formattedChainId = supportedChainId(currency.chainId)
  if (formattedChainId && currency.equals(WETH9_EXTENDED[formattedChainId])) return NATIVE[currency.chainId]
  return currency
}
