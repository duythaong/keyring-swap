import {
  FACTORY_ADDRESS as V2_UNI_FACTORY_ADDRESS,
  INIT_CODE_HASH as UNI_INIT_CODE_HASH,
} from '@duythao_bacoor/thaoswap-sdk'
import {
  computePairAddress,
  FACTORY_ADDRESS as V2_FACTORY_ADDRESS,
  INIT_CODE_HASH as BACOOR_INIT_CONDE_HASH,
} from '@duythao_bacoor/v2-sdk'
import {
  ChainId,
  FACTORY_ADDRESS as SUSHI_FACTORY_ADDRESS,
  INIT_CODE_HASH as SUSHI_INIT_CODE_HASH,
  ROUTER_ADDRESS,
} from '@sushiswap/sdk'
import { Token } from '@uniswap/sdk-core'
import { FACTORY_ADDRESS as V3_FACTORY_ADDRESS } from '@uniswap/v3-sdk'

import { constructSameAddressMap } from '../utils/constructSameAddressMap'
import { SupportedChainId } from './chains'

export type AddressMap = { [chainId: number]: string }

export interface SwapInfo {
  readonly factoryAddresses: AddressMap
  readonly initCodeHash: string
  readonly routerAddress: AddressMap
  computePairAddress: ({
    factoryAddress,
    initCodeHash,
    tokenA,
    tokenB,
  }: {
    factoryAddress: string
    initCodeHash: string
    tokenA: Token
    tokenB: Token
  }) => string
}

export type ChainSwapName = { [chainId: number]: string[] }
export type ChainSwapMap = { [chaindId: number]: { [name: string]: SwapInfo } }

export const UNI_ADDRESS: AddressMap = constructSameAddressMap('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984')
export const MULTICALL_ADDRESS: AddressMap = {
  ...constructSameAddressMap('0x1F98415757620B543A52E61c46B32eB19261F984', [SupportedChainId.OPTIMISTIC_KOVAN]),
  [SupportedChainId.OPTIMISM]: '0x90f872b3d8f33f305e0250db6A2761B354f7710A',
  [SupportedChainId.ARBITRUM_ONE]: '0xadF885960B47eA2CD9B55E6DAc6B42b7Cb2806dB',
  [SupportedChainId.ARBITRUM_RINKEBY]: '0xa501c031958F579dB7676fF1CE78AD305794d579',
  [SupportedChainId.POLYGON_MAINET]: '0x895CA06c053Ec87C17124c566DD511E6eC4eCcb6',
  [SupportedChainId.POLYGON_TESTNET]: '0x7aFd4508B74302E15f182032038EE7c827Cf7aDd',
  [SupportedChainId.TOMOCHAIN_TESNET]: '0x7aFd4508B74302E15f182032038EE7c827Cf7aDd',
}

// Polygon testnet
export const BACOOR_SWAP = 'Bacoorswap'
export const UNI_SWAP = 'Uniswap'
export const SUSHI_SWAP = 'Sushiswap'

export const BACOOR_ROUTER = '0x20E017D2605228CD369438e60C52aE038eC608d8'
export const UNI_ROUTER = '0x7D6361273b4D0d06b149B9639a983d88aBb56eD8'
export const SUSHI_ROUTER = ROUTER_ADDRESS[ChainId.MATIC_TESTNET]

export const V2_SUSHI_FACTORY_ADDRESS = SUSHI_FACTORY_ADDRESS[ChainId.MATIC_TESTNET]

export const V2_FACTORY_ADDRESSES: AddressMap = constructSameAddressMap(V2_FACTORY_ADDRESS)
export const V2_ROUTER_ADDRESS: AddressMap = constructSameAddressMap(BACOOR_ROUTER)

export const V2_UNI_FACTORY_ADDRESSES: AddressMap = constructSameAddressMap(V2_UNI_FACTORY_ADDRESS)
export const V2_UNI_ROUTER_ADDRESS: AddressMap = constructSameAddressMap(UNI_ROUTER)

export const V2_SUSHI_ROUTER_ADDRESS: AddressMap = constructSameAddressMap(SUSHI_ROUTER)
export const V2_SUSHI_FACTORY_ADDRESSES: AddressMap = constructSameAddressMap(V2_SUSHI_FACTORY_ADDRESS)

// Polygon Mainnet
export const QUICK_SWAP = 'Quickswap'
export const POLYCAT = 'Polycat'

export const SUSHI_ROUTER_ADDRESS_MAINNET: AddressMap = constructSameAddressMap(
  '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506'
)
export const SUSHI_FACTORY_ADDRESSES_MAINNET: AddressMap = constructSameAddressMap(
  '0xc35DADB65012eC5796536bD9864eD8773aBc74C4'
)
export const SUSHI_INIT_CODE_HASH_MAINNET = '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303'

export const QUICK_ROUTER_ADDRESS_MAINNET: AddressMap = constructSameAddressMap(
  '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff'
)

export const QUICK_FACTORY_ADDRESSES_MAINNET: AddressMap = constructSameAddressMap(
  '0x5757371414417b8c6caad45baef941abc7d3ab32'
)

export const QUICK_INIT_CODE_HASH = '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f'

export const POLYCAT_ROUTER_ADDRESS_MAINNET: AddressMap = constructSameAddressMap(
  '0x94930a328162957FF1dd48900aF67B5439336cBD'
)

export const POLYCAT_FACTORY_ADDRESSES_MAINNET: AddressMap = constructSameAddressMap(
  '0x477Ce834Ae6b7aB003cCe4BC4d8697763FF456FA'
)

export const POLYCAT_INIT_CODE_HASH = '0x3cad6f9e70e13835b4f07e5dd475f25a109450b22811d0437da51e66c161255a'

export const CHAIN_SWAP_NAMES: ChainSwapName = {
  [SupportedChainId.POLYGON_MAINET]: [POLYCAT, QUICK_SWAP, SUSHI_SWAP],
  [SupportedChainId.POLYGON_TESTNET]: [BACOOR_SWAP, UNI_SWAP, SUSHI_SWAP],
}

export const SWAP_MAP = {
  [BACOOR_SWAP]: {
    factoryAddresses: V2_FACTORY_ADDRESSES,
    initCodeHash: BACOOR_INIT_CONDE_HASH,
    routerAddress: V2_ROUTER_ADDRESS,
    computePairAddress,
  },
  [UNI_SWAP]: {
    factoryAddresses: V2_UNI_FACTORY_ADDRESSES,
    initCodeHash: UNI_INIT_CODE_HASH,
    routerAddress: V2_UNI_ROUTER_ADDRESS,
    computePairAddress,
  },
  [SUSHI_SWAP]: {
    factoryAddresses: V2_SUSHI_FACTORY_ADDRESSES,
    initCodeHash: SUSHI_INIT_CODE_HASH[ChainId.MATIC_TESTNET],
    routerAddress: V2_SUSHI_ROUTER_ADDRESS,
    computePairAddress,
  },
}

export const CHAIN_SWAP_MAP: ChainSwapMap = {
  [SupportedChainId.POLYGON_TESTNET]: {
    [BACOOR_SWAP]: {
      factoryAddresses: V2_FACTORY_ADDRESSES,
      initCodeHash: BACOOR_INIT_CONDE_HASH,
      routerAddress: V2_ROUTER_ADDRESS,
      computePairAddress,
    },
    [UNI_SWAP]: {
      factoryAddresses: V2_UNI_FACTORY_ADDRESSES,
      initCodeHash: UNI_INIT_CODE_HASH,
      routerAddress: V2_UNI_ROUTER_ADDRESS,
      computePairAddress,
    },
    [SUSHI_SWAP]: {
      factoryAddresses: V2_SUSHI_FACTORY_ADDRESSES,
      initCodeHash: SUSHI_INIT_CODE_HASH[ChainId.MATIC_TESTNET],
      routerAddress: V2_SUSHI_ROUTER_ADDRESS,
      computePairAddress,
    },
  },
  [SupportedChainId.POLYGON_MAINET]: {
    [SUSHI_SWAP]: {
      factoryAddresses: SUSHI_FACTORY_ADDRESSES_MAINNET,
      initCodeHash: SUSHI_INIT_CODE_HASH_MAINNET,
      routerAddress: SUSHI_ROUTER_ADDRESS_MAINNET,
      computePairAddress,
    },
    [QUICK_SWAP]: {
      factoryAddresses: QUICK_FACTORY_ADDRESSES_MAINNET,
      initCodeHash: QUICK_INIT_CODE_HASH,
      routerAddress: QUICK_ROUTER_ADDRESS_MAINNET,
      computePairAddress,
    },
    [POLYCAT]: {
      factoryAddresses: POLYCAT_FACTORY_ADDRESSES_MAINNET,
      initCodeHash: POLYCAT_INIT_CODE_HASH,
      routerAddress: POLYCAT_ROUTER_ADDRESS_MAINNET,
      computePairAddress,
    },
  },
}

/**
 * The oldest V0 governance address
 */
export const GOVERNANCE_ALPHA_V0_ADDRESSES: AddressMap = constructSameAddressMap(
  '0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F'
)
/**
 * The older V1 governance address
 */
export const GOVERNANCE_ALPHA_V1_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0xC4e172459f1E7939D522503B81AFAaC1014CE6F6',
}
/**
 * The latest governor bravo that is currently admin of timelock
 */
export const GOVERNANCE_BRAVO_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x408ED6354d4973f66138C91495F2f2FCbd8724C3',
}

export const TIMELOCK_ADDRESS: AddressMap = constructSameAddressMap('0x1a9C8182C09F50C8318d769245beA52c32BE35BC')

export const MERKLE_DISTRIBUTOR_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0x090D4613473dEE047c3f2706764f49E0821D256e',
}
export const ARGENT_WALLET_DETECTOR_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0xeca4B0bDBf7c55E9b7925919d03CbF8Dc82537E8',
}
export const V3_CORE_FACTORY_ADDRESSES: AddressMap = constructSameAddressMap(V3_FACTORY_ADDRESS, [
  SupportedChainId.OPTIMISM,
  SupportedChainId.OPTIMISTIC_KOVAN,
  SupportedChainId.ARBITRUM_ONE,
  SupportedChainId.ARBITRUM_RINKEBY,
])
export const QUOTER_ADDRESSES: AddressMap = constructSameAddressMap('0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6', [
  SupportedChainId.OPTIMISM,
  SupportedChainId.OPTIMISTIC_KOVAN,
  SupportedChainId.ARBITRUM_ONE,
  SupportedChainId.ARBITRUM_RINKEBY,
])
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESSES: AddressMap = constructSameAddressMap(
  '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
  [
    SupportedChainId.OPTIMISM,
    SupportedChainId.OPTIMISTIC_KOVAN,
    SupportedChainId.ARBITRUM_ONE,
    SupportedChainId.ARBITRUM_RINKEBY,
  ]
)
export const ENS_REGISTRAR_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.ROPSTEN]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.GOERLI]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.RINKEBY]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
}
export const SOCKS_CONTROLLER_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x65770b5283117639760beA3F867b69b3697a91dd',
}
export const SWAP_ROUTER_ADDRESSES: AddressMap = constructSameAddressMap('0xE592427A0AEce92De3Edee1F18E0157C05861564', [
  SupportedChainId.OPTIMISM,
  SupportedChainId.OPTIMISTIC_KOVAN,
  SupportedChainId.ARBITRUM_ONE,
  SupportedChainId.ARBITRUM_RINKEBY,
])
export const V3_MIGRATOR_ADDRESSES: AddressMap = constructSameAddressMap('0xA5644E29708357803b5A882D272c41cC0dF92B34', [
  SupportedChainId.ARBITRUM_ONE,
  SupportedChainId.ARBITRUM_RINKEBY,
])
