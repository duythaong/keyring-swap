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
import apeswapLogoUrl from 'assets/images/ape.png'
import babyswapLogoUrl from 'assets/images/babyswap.png'
import biswapLogoUrl from 'assets/images/biswap.png'
import kyberswapLogoUrl from 'assets/images/KNC.svg'
import pancakeswapLogoUrl from 'assets/images/pancake.png'
import polycatLogoUrl from 'assets/images/polycat.png'
import polydexLogoUrl from 'assets/images/polydex.png'
import quickswapLogoUrl from 'assets/images/quickswap.png'
import shibaswapLogoUrl from 'assets/images/shiba.png'
import sushiswapLogoUrl from 'assets/images/sushi.svg'
import uniswapLogoUrl from 'assets/images/token-logo.png'

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
  [SupportedChainId.BSC_MAINNET]: '0xAACf563D469027583392A03Fa92171047dEBC719',
}

export const BACOOR_SWAP = 'BacoorSwap'
export const UNI_SWAP = 'UniSwap'
export const SUSHI_SWAP = 'SushiSwap'
export const KYBER_SWAP = 'KyberSwap'
export const SHIBA_SWAP = 'ShibaSwap'

export const QUICK_SWAP = 'QuickSwap'
export const POLYCAT = 'PolyCat'
export const POLYDEX = 'PolyDex'

export const BI_SWAP = 'BiSwap'
export const PANCAKE_SWAP = 'PancakeSwap'
export const APE_SWAP = 'ApeSwap'
export const BABY_SWAP = 'BabySwap'
// Polygon testnet

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

export const UNKNOWN_LOGO = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/unknown.png'

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

export const POLYDEX_ROUTER_ADDRESS_POLYGON: AddressMap = constructSameAddressMap(
  '0xC60aE14F2568b102F8Ca6266e8799112846DD088'
)

export const POLYDEX_FACTORY_ADDRESSES_POLYGON: AddressMap = constructSameAddressMap(
  '0xEAA98F7b5f7BfbcD1aF14D0efAa9d9e68D82f640'
)

export const POLYDEX_INIT_CODE_HASH = '0xf60eec85709051eb86026776e0ece6269f1ab16f3af55442e19958beb5239ae2'

export const APESWAP_ROUTER_ADDRESS_POLYGON: AddressMap = constructSameAddressMap(
  '0xC0788A3aD43d79aa53B09c2EaCc313A787d1d607'
)

export const APESWAP_FACTORY_ADDRESSES_POLYGON: AddressMap = constructSameAddressMap(
  '0xCf083Be4164828f00cAE704EC15a36D711491284'
)

export const APESWAP_INIT_CODE_HASH_POLYGON = '0x511f0f358fe530cda0859ec20becf391718fdf5a329be02f4c95361f3d6a42d8'

// Ethreum Mainnet
export const SUSHI_ROUTER_ADDRESS_ETH: AddressMap = constructSameAddressMap(
  '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F'
)
export const SUSHI_FACTORY_ADDRESSES_ETH: AddressMap = constructSameAddressMap(
  '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac'
)
export const SUSHI_INIT_CODE_HASH_ETH = '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303'

export const UNI_ROUTER_ADDRESS_ETH: AddressMap = constructSameAddressMap('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D')

export const UNI_FACTORY_ADDRESSES_ETH: AddressMap = constructSameAddressMap(
  '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'
)

export const UNI_INIT_CODE_HASH_ETH = '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f'

export const KYBER_ROUTER_ADDRESS_ETH: AddressMap = constructSameAddressMap(
  '0x1c87257F5e8609940Bc751a07BB085Bb7f8cDBE6'
)

export const KYBER_FACTORY_ADDRESS_ETH: AddressMap = constructSameAddressMap(
  '0x833e4083B7ae46CeA85695c4f7ed25CDAd8886dE'
)

export const KYBER_INIT_CODE_HASH_ETH = '0xf6eae63ebbc500de6e7310fc6568df4e6a4514aac0d3d423da5e4e3f332d04f5'

export const SHIBA_ROUTER_ADDRESS_ETH: AddressMap = constructSameAddressMap(
  '0x03f7724180AA6b939894B5Ca4314783B0b36b329'
)

export const SHIBA_FACTORY_ADDRESS_ETH: AddressMap = constructSameAddressMap(
  '0x115934131916C8b277DD010Ee02de363c09d037c'
)

export const SHIBA_INIT_CODE_HASH_ETH = '0x65d1a3b1e46c6e4f1be1ad5f99ef14dc488ae0549dc97db9b30afe2241ce1c7a'

// BSC Mainnet

export const PANCAKE_ROUTER_ADDRESS_BSC: AddressMap = constructSameAddressMap(
  '0x10ED43C718714eb63d5aA57B78B54704E256024E'
)

export const PANCAKE_FACTORY_ADDRESS_BSC: AddressMap = constructSameAddressMap(
  '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73'
)

export const PANCAKE_INIT_CODE_HASH_BSC = '0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5'

export const BISWAP_ROUTER_ADDRESS_BSC: AddressMap = constructSameAddressMap(
  '0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8'
)

export const BISWAP_FACTORY_ADDRESS_BSC: AddressMap = constructSameAddressMap(
  '0x858E3312ed3A876947EA49d572A7C42DE08af7EE'
)

export const BISWAP_INIT_CODE_HASH_BSC = '0xfea293c909d87cd4153593f077b76bb7e94340200f4ee84211ae8e4f9bd7ffdf'

export const APESWAP_ROUTER_ADDRESS_BSC: AddressMap = constructSameAddressMap(
  '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7'
)

export const APESWAP_FACTORY_ADDRESS_BSC: AddressMap = constructSameAddressMap(
  '0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6'
)

export const APESWAP_INIT_CODE_HASH_BSC = '0xf4ccce374816856d11f00e4069e7cada164065686fbef53c6167a63ec2fd8c5b'

export const SUSHISWAP_ROUTER_ADDRESS_BSC: AddressMap = constructSameAddressMap(
  '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506'
)

export const SUSHISWAP_FACTORY_ADDRESS_BSC: AddressMap = constructSameAddressMap(
  '0xc35DADB65012eC5796536bD9864eD8773aBc74C4'
)

export const SUSHISWAP_INIT_CODE_HASH_BSC = '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303'

export const BABYSWAP_ROUTER_ADDRESS_BSC: AddressMap = constructSameAddressMap(
  '0x325E343f1dE602396E256B67eFd1F61C3A6B38Bd'
)

export const BABYSWAP_FACTORY_ADDRESS_BSC: AddressMap = constructSameAddressMap(
  '0x86407bEa2078ea5f5EB5A52B2caA963bC1F889Da'
)

export const BABYSWAP_INIT_CODE_HASH_BSC = '0x48c8bec5512d397a5d512fbb7d83d515e7b6d91e9838730bd1aa1b16575da7f5'

export const CHAIN_SWAP_NAMES: ChainSwapName = {
  [SupportedChainId.MAINNET]: [SUSHI_SWAP, UNI_SWAP, KYBER_SWAP, SHIBA_SWAP],
  [SupportedChainId.POLYGON_MAINET]: [SUSHI_SWAP, QUICK_SWAP, APE_SWAP, POLYCAT, POLYDEX],
  [SupportedChainId.BSC_MAINNET]: [SUSHI_SWAP, PANCAKE_SWAP, BI_SWAP, APE_SWAP, BABY_SWAP],
  [SupportedChainId.POLYGON_TESTNET]: [SUSHI_SWAP, BACOOR_SWAP, UNI_SWAP],
}

export const LOGO: { [key: string]: string } = {
  [UNI_SWAP]: uniswapLogoUrl,
  [SUSHI_SWAP]: sushiswapLogoUrl,
  [KYBER_SWAP]: kyberswapLogoUrl,
  [SHIBA_SWAP]: shibaswapLogoUrl,
  [QUICK_SWAP]: quickswapLogoUrl,
  [POLYCAT]: polycatLogoUrl,
  [POLYDEX]: polydexLogoUrl,
  [BI_SWAP]: biswapLogoUrl,
  [PANCAKE_SWAP]: pancakeswapLogoUrl,
  [APE_SWAP]: apeswapLogoUrl,
  [BABY_SWAP]: babyswapLogoUrl,
}

export const CHAIN_SWAP_MAP: ChainSwapMap = {
  [SupportedChainId.MAINNET]: {
    [UNI_SWAP]: {
      factoryAddresses: UNI_FACTORY_ADDRESSES_ETH,
      initCodeHash: UNI_INIT_CODE_HASH_ETH,
      routerAddress: UNI_ROUTER_ADDRESS_ETH,
      computePairAddress,
    },
    [SUSHI_SWAP]: {
      factoryAddresses: SUSHI_FACTORY_ADDRESSES_ETH,
      initCodeHash: SUSHI_INIT_CODE_HASH_ETH,
      routerAddress: SUSHI_ROUTER_ADDRESS_ETH,
      computePairAddress,
    },
    [KYBER_SWAP]: {
      factoryAddresses: KYBER_FACTORY_ADDRESS_ETH,
      initCodeHash: KYBER_INIT_CODE_HASH_ETH,
      routerAddress: KYBER_ROUTER_ADDRESS_ETH,
      computePairAddress,
    },
    [SHIBA_SWAP]: {
      factoryAddresses: SHIBA_FACTORY_ADDRESS_ETH,
      initCodeHash: SHIBA_INIT_CODE_HASH_ETH,
      routerAddress: SHIBA_ROUTER_ADDRESS_ETH,
      computePairAddress,
    },
  },
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
    [APE_SWAP]: {
      factoryAddresses: APESWAP_FACTORY_ADDRESSES_POLYGON,
      initCodeHash: APESWAP_INIT_CODE_HASH_POLYGON,
      routerAddress: APESWAP_ROUTER_ADDRESS_POLYGON,
      computePairAddress,
    },
    [POLYCAT]: {
      factoryAddresses: POLYCAT_FACTORY_ADDRESSES_MAINNET,
      initCodeHash: POLYCAT_INIT_CODE_HASH,
      routerAddress: POLYCAT_ROUTER_ADDRESS_MAINNET,
      computePairAddress,
    },
    [POLYDEX]: {
      factoryAddresses: POLYDEX_FACTORY_ADDRESSES_POLYGON,
      initCodeHash: POLYDEX_INIT_CODE_HASH,
      routerAddress: POLYDEX_ROUTER_ADDRESS_POLYGON,
      computePairAddress,
    },
  },
  [SupportedChainId.BSC_MAINNET]: {
    [PANCAKE_SWAP]: {
      factoryAddresses: PANCAKE_FACTORY_ADDRESS_BSC,
      initCodeHash: PANCAKE_INIT_CODE_HASH_BSC,
      routerAddress: PANCAKE_ROUTER_ADDRESS_BSC,
      computePairAddress,
    },
    [BI_SWAP]: {
      factoryAddresses: BISWAP_FACTORY_ADDRESS_BSC,
      initCodeHash: BISWAP_INIT_CODE_HASH_BSC,
      routerAddress: BISWAP_ROUTER_ADDRESS_BSC,
      computePairAddress,
    },
    [APE_SWAP]: {
      factoryAddresses: APESWAP_FACTORY_ADDRESS_BSC,
      initCodeHash: APESWAP_INIT_CODE_HASH_BSC,
      routerAddress: APESWAP_ROUTER_ADDRESS_BSC,
      computePairAddress,
    },
    [SUSHI_SWAP]: {
      factoryAddresses: SUSHISWAP_FACTORY_ADDRESS_BSC,
      initCodeHash: SUSHISWAP_INIT_CODE_HASH_BSC,
      routerAddress: SUSHISWAP_ROUTER_ADDRESS_BSC,
      computePairAddress,
    },
    [BABY_SWAP]: {
      factoryAddresses: BABYSWAP_FACTORY_ADDRESS_BSC,
      initCodeHash: BABYSWAP_INIT_CODE_HASH_BSC,
      routerAddress: BABYSWAP_ROUTER_ADDRESS_BSC,
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
