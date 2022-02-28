/* eslint-disable react-hooks/rules-of-hooks */
import './style.scss'

import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { Col, Layout, Row } from 'antd'
import { OBSERVER_KEY } from 'common/constants'
import Observer from 'common/observer'
import WalletModal from 'components/WalletModal'
import { NetworkContextName } from 'constants/misc'
import useENSName from 'hooks/useENSName'
import { useActiveWeb3React } from 'hooks/web3'
// import A2hs from 'pages/Components/A2hs/a2hs'
// import ConnectApp from 'pages/Components/ConnectApp'
import Maintenance from 'pages/Components/Maintenance'
import MyModal from 'pages/Components/MyModal'
import Notice from 'pages/Components/Notice'
import React, { PureComponent, useMemo } from 'react'
import { isMobile } from 'react-device-detect'
import { connect } from 'react-redux'
import { useLocation, withRouter } from 'react-router-dom'
import actions from 'state/Redux/actions'
import { isTransactionRecent, useAllTransactions } from 'state/transactions/hooks'

// import logo from '../../static/logo192.png'
// import Footer from './Footer'
import Header from './Header'
const { Content } = Layout

const WalletModalRender = () => {
  const { active } = useWeb3React()
  const { account } = useActiveWeb3React()
  const contextNetwork = useWeb3React(NetworkContextName)

  const { ENSName } = useENSName(account ?? undefined)
  function newTransactionsFirst(a, b) {
    return b.addedTime - a.addedTime
  }
  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash)
  const confirmed = sortedRecentTransactions.filter((tx) => tx.receipt).map((tx) => tx.hash)

  return (
    <>
      {(contextNetwork.active || active) && (
        <WalletModal ENSName={ENSName ?? undefined} pendingTransactions={pending} confirmedTransactions={confirmed} />
      )}
    </>
  )
}
class BaseContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
    this.myModal = React.createRef()
  }
  componentDidMount() {
    Observer.on(OBSERVER_KEY.SIGN_IN, this.handleSignIn)
  }

  componentWillUnmount() {
    Observer.removeListener(OBSERVER_KEY.SIGN_IN, this.handleSignIn)
  }

  closeModal = () => {
    this.myModal.current.closeModal()
  }

  callback = (callback = null) => {
    Observer.emit(OBSERVER_KEY.ALREADY_SIGNED)
    this.closeModal()
    callback && callback()
  }

  callbackErr = (callbackErr = null) => {
    this.closeModal()
    callbackErr && callbackErr()
  }

  handleSignIn = async (callback = null, callbackErr = null) => {
    if (isMobile) {
      Observer.emit(OBSERVER_KEY.SIGN_WALLET_CONNECT)
    } else {
      //   this.myModal.current.openModal(
      //     <ConnectApp
      //       closeModal={this.closeModal}
      //       callback={() => this.callback(callback)}
      //       callbackErr={() => this.callbackErr(callbackErr)}
      //     />,
      //     { modalWidth: 380 }
      //   )
    }
  }

  renderLayout = () => {
    const isAccountScreen = false
    return (
      <Layout style={isAccountScreen ? { background: '#B42033' } : null}>
        <Header />
        <Layout
          className="layout-container"
          style={
            isAccountScreen ? { background: '#B42033', minHeight: 'calc(100vh - 106px)', paddingBottom: '80px' } : null
          }
        >
          <Content className="base-content">
            <Row type="flex" justify="center">
              <Col span={24}>
                <div className="base-container">{this.props.children}</div>
              </Col>
            </Row>
          </Content>
        </Layout>
        <WalletModalRender />
        {/* <Footer /> */}
        <MyModal ref={this.myModal} />
        <Notice />
        {/* {isMobile && <A2hs icon={logo} title={'Add To Home Screen'} />} */}
      </Layout>
    )
  }
  render() {
    return <>{process.env.MAINTENANCE_MODE === 'true' ? <Maintenance /> : this.renderLayout()}</>
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale,
})

const mapDispatchToProps = { setConnectionMethod: actions.setConnectionMethod }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BaseContainer))
