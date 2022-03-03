import { images } from 'config/images'

export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
export const RELOAD_MY_NFT = 'RELOAD_MY_NFT'

export const KEY_STORE = {
  SET_CONNECTION_METHOD: 'SET_CONNECTION_METHOD',
  SET_LOCALE: 'SET_LOCALE',
  SET_USER: 'SET_USER',
  SET_SETTING: 'SET_SETTING',
  SET_USER_INFO: 'SET_USER_INFO',
}

export const REQUEST_TYPE = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
}

export const LOCALE_DATA = {
  JA: 'ja',
  CN: 'cn',
  EN: 'en',
}

export const CONNECTION_METHOD = {
  METAMASK: 'METAMASK',
  WALLET_CONNECT: 'WALLET_CONNECT',
  PANTOGRAPH: 'PANTOGRAPH',
}

export const METAMASK_INFO = {
  status: {
    Loading: 'loading',
    NoWeb3: 'noweb3',
    Error: 'error',
    Locked: 'locked',
    ChangeAccount: 'changeaccount',
    Ready: 'ready',
  },
  network: {
    1: 'Mainnet',
    2: 'Morden',
    3: 'Ropsten',
    4: 'Rinkeby',
    42: 'Kovan',
    56: 'Binance Smart Chain Mainnet',
    97: 'Binance Smart Chain Testnet',
    88: 'TomoChain Mainnet',
    89: 'TomoChain Testnet',
    5777: 'Private',
  },
}

export const LINK_SUPPORT = {
  PANTOGRAPH_CHROME: 'https://chrome.google.com/webstore/detail/pantograph/ocfgfhicacgipgpiapepehhpidbhijkl?hl=en',
  PANTOGRAPH_FIREFOX: 'https://addons.mozilla.org/vi/firefox/addon/pantograph/',
  PANTOGRAPH_IOS: 'https://apps.apple.com/vn/app/pantograph-networking-app/id1504033778',
  PANTOGRAPH_GOOGLE: 'https://play.google.com/store/apps/details?id=pantograph.bacoor.crypto.co',
}

export const BSC_RPC = {
  56: {
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    chainId: '0x38',
    chainName: 'Binance Smart Chain Mainnet',
    nativeCurrency: {
      name: 'Binance',
      symbol: 'BNB',
      decimals: 18,
    },
    blockExplorerUrls: ['https://bscscan.com'],
  },
  97: {
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
    chainId: '0x61',
    chainName: 'Binance Smart Chain Testnet',
    nativeCurrency: {
      name: 'Binance',
      symbol: 'BNB',
      decimals: 18,
    },
    blockExplorerUrls: ['https://testnet.bscscan.com'],
  },
}

export const OBSERVER_KEY = {
  SIGN_IN: 'SIGN_IN',
  ALREADY_SIGNED: 'ALREADY_SIGNED',
  CHANGED_ACCOUNT: 'CHANGED_ACCOUNT',
  UPDATE_MY_DOMAINS: 'UPDATE_MY_DOMAINS',
  SIGN_WALLET_CONNECT: 'SIGN_WALLET_CONNECT',
}

export const WALLET_CONNECT_APP = [
  {
    name: 'KEYRING PRO',
    icon: images.download.keyring,
    mobile: {
      native: 'keyring:',
      universal: 'https://keyring.app',
    },
  },
  {
    name: 'METAMASK',
    icon: images.download.metamask2,
    mobile: {
      native: 'metamask:',
      universal: 'https://metamask.app.link',
    },
  },
  {
    name: 'TRUST',
    icon: images.download.trust,
    mobile: {
      native: 'trust:',
      universal: 'https://link.trustwallet.com',
    },
  },
  {
    name: 'PREMA Wallet',
    icon: images.icPrema,
    mobile: {
      native: 'prema:',
      universal: 'https://premanft.com',
    },
  },
]

export const DEEP_LINKING = {
  KEYRING: 'https://keyring.app/wc?uri=',
  PREMA: 'https://premanft.com/wc?uri=',
  KEYRINGWEBSITE_TESTNET: 'https://sign-dev.keyringpro.com',
  KEYRINGWEBSITE: 'https://sign.keyringpro.com',
  PREMA_WEB_TESTNET: 'https://sign-dev.premanft.com',
  PREMA_WEB: 'https://sign.premanft.com',
}

export const PAGE_MOBILE_HIDE_HEADER_FOOTER = ['MyNFTScreen/Subview/MyNFTDetailMobile']
