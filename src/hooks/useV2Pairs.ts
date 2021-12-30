import { Pair } from '@duythao_bacoor/v2-sdk'
import { Interface } from '@ethersproject/abi'
import { Currency, CurrencyAmount } from '@uniswap/sdk-core'
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import useDefaultChainId from 'hooks/useDefaultChainId'
import { useMemo } from 'react'

import { BACOOR_SWAP, CHAIN_SWAP_MAP } from '../constants/addresses'
import { SupportedChainId } from '../constants/chains'
import { useMultipleContractSingleData } from '../state/multicall/hooks'
import { useActiveWeb3React } from './web3'

const PAIR_INTERFACE = new Interface(IUniswapV2PairABI)

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID,
}

export function useV2Pairs(
  name: string,
  currencies: [Currency | undefined, Currency | undefined][]
): [PairState, Pair | null][] {
  const tokens = useMemo(
    () => currencies.map(([currencyA, currencyB]) => [currencyA?.wrapped, currencyB?.wrapped]),
    [currencies]
  )

  // const { chainId } = useActiveWeb3React()
  const [chainId] = useDefaultChainId()

  const pairAddresses = useMemo(
    () =>
      tokens.map(([tokenA, tokenB]) => {
        return tokenA &&
          tokenB &&
          tokenA.chainId === tokenB.chainId &&
          !tokenA.equals(tokenB) &&
          name &&
          CHAIN_SWAP_MAP[chainId ?? SupportedChainId.POLYGON_MAINET] &&
          CHAIN_SWAP_MAP[chainId ?? SupportedChainId.POLYGON_MAINET][name] &&
          CHAIN_SWAP_MAP[chainId ?? SupportedChainId.POLYGON_MAINET][name].factoryAddresses[tokenA.chainId]
          ? CHAIN_SWAP_MAP[chainId ?? SupportedChainId.POLYGON_MAINET][name].computePairAddress({
              factoryAddress:
                CHAIN_SWAP_MAP[chainId ?? SupportedChainId.POLYGON_MAINET][name].factoryAddresses[tokenA.chainId],
              initCodeHash: CHAIN_SWAP_MAP[chainId ?? SupportedChainId.POLYGON_MAINET][name].initCodeHash,
              tokenA,
              tokenB,
            })
          : undefined
      }),
    [chainId, name, tokens]
  )
  const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves')

  return useMemo(() => {
    return results.map((result, i) => {
      const { result: reserves, loading } = result
      const tokenA = tokens[i][0]
      const tokenB = tokens[i][1]

      if (loading) return [PairState.LOADING, null]
      if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null]
      if (!reserves) return [PairState.NOT_EXISTS, null]

      const { reserve0, reserve1 } = reserves
      const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]

      return [
        PairState.EXISTS,
        new Pair(
          CHAIN_SWAP_MAP[chainId ?? SupportedChainId.POLYGON_MAINET][name].factoryAddresses[tokenA.chainId],
          CHAIN_SWAP_MAP[chainId ?? SupportedChainId.POLYGON_MAINET][name].initCodeHash,
          CurrencyAmount.fromRawAmount(token0, reserve0.toString()),
          CurrencyAmount.fromRawAmount(token1, reserve1.toString())
        ),
      ]
    })
  }, [chainId, name, results, tokens])
}

export function useV2Pair(tokenA?: Currency, tokenB?: Currency): [PairState, Pair | null] {
  const inputs: [[Currency | undefined, Currency | undefined]] = useMemo(() => [[tokenA, tokenB]], [tokenA, tokenB])
  // const [chainId] = useDefaultChainId() ?? SupportedChainId.POLYGON_MAINET
  return useV2Pairs(BACOOR_SWAP, inputs)[0]
}
