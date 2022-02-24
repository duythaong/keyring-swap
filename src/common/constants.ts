export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'

export const KEY_STORE = {
  SET_CHAIN_CONNECTED: 'SET_CHAIN_CONNECTED',
  SET_CONNECTION_METHOD: 'SET_CONNECTION_METHOD',
  SET_LOCALE: 'SET_LOCALE',
  SET_USER: 'SET_USER',
  SET_SETTING: 'SET_SETTING',
  SET_TOKEN_PAYMENT: 'SET_TOKEN_PAYMENT',
  SET_USER_INFO: 'SET_USER_INFO',
  HUB_SETTING: 'HUB_SETTING',
  SET_CART_TOKEN: 'SET_CART_TOKEN',
  SET_PAYMENT_DATA: 'SET_PAYMENT_DATA',
  SET_IMAGE_LANDING: 'SET_IMAGE_LANDING',
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

export const WALLET_CONNECT_METHOD = {
  APPROVE_FOR_SEND: 'APPROVE_FOR_SEND',
  APPROVE_FOR_PURCHASE: 'APPROVE_FOR_PURCHASE',
  APPROVE_FOR_PLAY_GACHA: 'APPROVE_FOR_PLAY_GACHA',
  APPROVE_FOR_PLAY_EXCHANGE_TICKET: 'APPROVE_FOR_PLAY_EXCHANGE_TICKET',
  APPROVE_FOR_CONVERTING: 'APPROVE_FOR_CONVERTING',
  APPROVE_FOR_EXCHANGE: 'APPROVE_FOR_EXCHANGE',
  SEND_DIRECT_NFT: 'SEND_DIRECT_NFT',
  UNLOCK_NFT: 'UNLOCK_NFT',
  SELL_NFT: 'SELL_NFT',
  BUY_NFT: 'BUY_NFT',
  PLAY_GACHA: 'PLAY_GACHA',
  PLAY_EXCHANGE_TICKET: 'PLAY_EXCHANGE_TICKET',
  CHANGE_PRICE_NFT: 'CHANGE_PRICE_NFT',
  RETRIEVE_NFT: 'RETRIEVE_NFT',
  BUY_BOX: 'BUY_BOX',
  BUY_PACKAGE: 'BUY_PACKAGE',
  CONFIRM_UNBOXING: 'CONFIRM_UNBOXING',
  CONFIRM_UNPACKING: 'CONFIRM_UNPACKING',
  APPROVE_UNPACKING: 'APPROVE_UNPACKING',
  BUY_YOSHIMOTO_GIFT_CARD: 'BUY_YOSHIMOTO_GIFT_CARD',
  CONVERT_YOSHIMOTOKEN_GIFT_CARD: 'CONVERT_YOSHIMOTOKEN_GIFT_CARD',
  EXCHANGE_NFT: 'EXCHANGE_NFT',
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

export const CHAIN_DATA = {
  DEVELOPMENT: {
    tomochain: {
      rpcUrls: ['https://rpc.testnet.tomochain.com'],
      chainId: '0x59',
      chainName: 'TomoChain Testnet',
      nativeCurrency: {
        name: 'TOMO',
        symbol: 'TOMO',
        decimals: 18,
      },
      blockExplorerUrls: ['https://scan.testnet.tomochain.com'],
    },
    ethereum: {
      rpcUrls: ['https://rinkeby.infura.io/v3/9ac74b60c03b42e98148c2fc16f170dc'],
      chainId: '0x4',
      chainName: 'Ethereum Rinkeby Testnet',
      nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
      },
      blockExplorerUrls: ['https://rinkeby.etherscan.io'],
    },
  },
  PRODUCTION: {
    tomochain: {
      rpcUrls: ['https://rpc.tomochain.com'],
      chainId: '0x58',
      chainName: 'TomoChain Mainnet',
      nativeCurrency: {
        name: 'TOMO',
        symbol: 'TOMO',
        decimals: 18,
      },
      blockExplorerUrls: ['https://scan.tomochain.com'],
    },
    ethereum: {
      rpcUrls: ['https://mainnet.infura.io/v3/9ac74b60c03b42e98148c2fc16f170dc'],
      chainId: '0x1',
      chainName: 'Ethereum Mainnet',
      nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
      },
      blockExplorerUrls: ['https://etherscan.io'],
    },
  },
}

export const OBSERVER_KEY = {
  SIGN_IN: 'SIGN_IN',
  ALREADY_SIGNED: 'ALREADY_SIGNED',
  CHANGED_ACCOUNT: 'CHANGED_ACCOUNT',
  UPDATE_MY_DOMAINS: 'UPDATE_MY_DOMAINS',
  SIGN_WALLET_CONNECT: 'SIGN_WALLET_CONNECT',
  TRIGGER_SCROLL: 'TRIGGER_SCROLL',
}

export const DEEP_LINKING = {
  KEYRING: 'https://keyring.app/wc?uri=',
  PREMA: 'https://premanft.com/wc?uri=',
  NMB48: 'https://nmb48-wallet.premanft.com/wc?uri=',
  KEYRINGWEBSITE_TESTNET: 'https://sign-dev.keyringpro.com',
  KEYRINGWEBSITE: 'https://sign.keyringpro.com',
  PREMA_WEB_TESTNET: 'https://sign-dev.premanft.com',
  PREMA_WEB: 'https://sign.premanft.com',
  NMB48_WEB_TESTNET: 'https://sign-dev-nmb48.premanft.com',
  NMB48_WEB: 'https://sign-nmb48.premanft.com',
}

export const RECENTLY_VIEWED = 'recently_viewed'

export const RECENTLY_SEARCHED = 'recently_searched'

export const PAGE_MOBILE_WITHOUT_HEADER_FOOTER = [
  '/Screen/CategoryDetailScreen',
  '/Screen/MyNFTCategoryScreen',
  '/Screen/MyNFTsScreen',
  '/Screen/MyNFTsScreen/Components/MyNFTDetailMobile',
  '/Screen/MyNFTsScreen/Components/DrawNFT',
  '/Screen/NFTDetailScreen',
  '/Screen/MyNFTsScreen/Components/SellNFT',
  '/Screen/NFTDetailScreen/Components/ChangePrice',
  '/Screen/NFTSwap/Components/NFTSwapMobile',
  '/Screen/NFTSwapRequest',
  '/Screen/RecentlyViewedScreen',
  '/Screen/PopularityScreen',
  '/Screen/NewArrivalsScreen',
  '/Screen/NFTEventDetailScreen',
  '/Screen/NFTEventsScreen',
  '/Screen/CreateUpdateNewsScreen',
  '/Screen/CreateNFTScreen',
  '/Screen/EntryScreen',
  '/Screen/EntryScreen/Component/EditEntryMobile',
  '/Screen/EntryScreen/Component/AddEntryMobile',
  '/Screen/NFTMarket',
  '/Screen/SettingScreen',
  '/Screen/MyNFTsScreen/Components/Unpack/UnpackAnimationMobile',
  '/Screen/MyNFTsScreen/Components/Unbox/UnboxAnimationMobile',
  '/Screen/UsersRankingScreen',
  '/Screen/UserRankingDetailsScreen',
  '/Screen/ReadEpub',
  '/Screen/AccountScreen/Components/EditProfileMobile',
  '/Screen/ReadPDFMobile',
  '/Screen/OverviewScreen',
  '/Screen/Payment',
  '/Screen/Payment/SubView/BuyToken',
  '/Screen/Payment/SubView/ConfirmPurchase',
  '/Screen/Payment/SubView/ChoosePaymentMethod',
  '/Screen/Payment/SubView/NoCreditCard',
  '/Screen/Payment/SubView/AddCreditCard',
  '/Screen/Payment/SubView/ChooseCreditCard',
  '/Screen/Payment/SubView/ConfirmCheckout',
]

export const RELOAD_MY_NFT = 'RELOAD_MY_NFT'

export const PAGE_DESKTOP_WITHOUT_HEADER = ['/Screen/ReadEpub']
export const PAGE_DESKTOP_WITHOUT_FOOTER = ['/Screen/ReadEpub']

export const USER_SCOPE = {
  PARTNER: 'partner',
  CREATOR: 'creator',
}

export const NFT_TYPE = {
  MEDIA: 'media',
  DOCUMENT: 'document',
}

export const PAGES_DISPLAY_BUTTON_MY_NFTS = ['/', '/nft-market']
// handle web3 mobile browser
export const TRANSFER_CODE_BROWSER = {
  openNFC: 'openNFC',
  openQR: 'openQR',
}

export const HUB_HAS_LANDING = ['nmb48', 'oddtaxi']
