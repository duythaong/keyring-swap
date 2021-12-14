import { AbstractConnector } from '@web3-react/abstract-connector'
import { SupportedChainId } from 'constants/chains'

import COINBASE_ICON_URL from '../assets/images/coinbaseWalletIcon.svg'
import METAMASK_ICON_URL from '../assets/images/metamask.png'
import WALLETCONNECT_ICON_URL from '../assets/images/walletConnectIcon.svg'
import { injected, walletconnect, walletlink } from '../connectors'

interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconURL: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
  chainSupport: number[]
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconURL: METAMASK_ICON_URL,
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
    chainSupport: [
      SupportedChainId.MAINNET,
      SupportedChainId.POLYGON_MAINET,
      SupportedChainId.POLYGON_TESTNET,
      SupportedChainId.TOMOCHAIN_TESNET,
    ],
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconURL: WALLETCONNECT_ICON_URL,
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true,
    chainSupport: [
      SupportedChainId.POLYGON_MAINET,
      SupportedChainId.MAINNET,
      SupportedChainId.POLYGON_TESTNET,
      SupportedChainId.TOMOCHAIN_TESNET,
    ],
  },
  WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase Wallet',
    iconURL: COINBASE_ICON_URL,
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5',
    chainSupport: [
      SupportedChainId.MAINNET,
      SupportedChainId.POLYGON_MAINET,
      SupportedChainId.POLYGON_TESTNET,
      SupportedChainId.TOMOCHAIN_TESNET,
    ],
  },
}
