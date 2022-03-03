import { METAMASK_INFO } from 'common/constants'

var initState = {
  lang: 'en',
  userData: null,
  userInfo: null,
  hubSetting: null,
  chainConnected: 'tomochain',
  connectionMethod: null,
  metamaskRedux: {
    network: 0,
    accounts: [],
    address: '',
  },
  pantograph: {
    status: METAMASK_INFO.status.Loading,
    network: 0,
    chainName: '',
    account: '',
  },
  walletConnect: {
    connector: {},
    chainId: 0,
    accounts: [],
    address: '',
    session: {},
    appConnected: null,
  },
  internet: true,
  isloading: true,
  setting: {},
  transferData: {},
  cart: [],
  tokensRedux: [],
  balanceRedux: {
    balanceETH: 0,
  },
  tokenPayment: [],
  cartToken: [],
  paymentData: {},
  imageLandingPage: {
    current: 0,
    list: [],
  },
}

export default initState
