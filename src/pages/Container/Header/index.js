import './style.scss'

import { Button, Layout, Popover } from 'antd'
import { OBSERVER_KEY } from 'common/constants'
import Observer from 'common/observer'
import Header from 'components/Header'
import { images } from 'config/images'
// import Account from 'pages/Components/Account'
// import ConnectApp from 'pages/Components/ConnectApp'
import LanguageSwitcher from 'pages/Components/LanguageSwitcher'
import MyModal from 'pages/Components/MyModal'
import React from 'react'
import Media from 'react-media'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components/macro'
const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 2;
`
class HeaderComponent extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      isAccountOpen: false,
    }
    this.myModal = React.createRef()
  }

  backHome = () => {
    this.props?.history.pushRoute('/how-to-use')
  }

  handleSignIn = () => {
    this.closeDrawer()
    Observer.emit(OBSERVER_KEY.SIGN_IN)
  }

  renderLeftSide() {
    return (
      <div className="left-side">
        <img onClick={this.backHome} className="logo" src={images.logo} />
      </div>
    )
  }

  renderDesktop() {
    const { isAccountOpen, isOpen } = this.state
    const { locale } = this.props
    const { messages } = locale
    // const isSigned = ReduxServices.checkIsSigned()
    const isSigned = true
    return (
      <div className="wrapper">
        {this.renderLeftSide()}
        <div className="right-side">
          {/* {isSigned ? (
            <>
              <Popover
                placement="bottomRight"
                content={<Account />}
                visible={isAccountOpen}
                onVisibleChange={(value) => this.setState({ isAccountOpen: value })}
                trigger="click"
              >
                <span className={`ML30 link ${isAccountOpen && 'selected'}`}>{messages.account.title}</span>
              </Popover>
            </>
          ) : (
            <Popover
              placement="bottomRight"
              trigger="click"
              content={<ConnectApp close={() => this.setState({ isOpen: false })} />}
              visible={isOpen}
              onVisibleChange={(value) => this.setState({ isOpen: value })}
            >
              <Button type="primary">
                <img src={images.icWallet} className="MR9" />
                <span>{messages.connectApp.connectTo}</span>
              </Button>
            </Popover>
          )} */}
          <div className="ML30">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    )
  }

  renderMobile() {
    const isHome = this.props?.location.pathname === '/' || this.props?.location.pathname === '/how-to-use'
    return (
      <div className="wrapper" style={isHome ? { background: 'transparent' } : null}>
        {this.renderLeftSide()}
        <div className="right-side">
          <LanguageSwitcher />
        </div>
      </div>
    )
  }

  renderScreen = () => {
    const swapScreen = this.props?.location.pathname.includes('swap')
    if (swapScreen) {
      return (
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
      )
    } else {
      return this.renderNormalScreen()
    }
  }

  renderNormalScreen = () => {
    const { location } = this.props
    const isHome = location.pathname === '/'
    return (
      <>
        <Media
          query="(min-width: 769px)"
          render={() => <Layout.Header className={`header-container`}>{this.renderDesktop()}</Layout.Header>}
        />
        <Media
          query="(max-width: 768px)"
          render={() => (
            <Layout.Header className="header-container-mobile" style={isHome ? { background: 'transparent' } : null}>
              {this.renderMobile()}
            </Layout.Header>
          )}
        />
        <MyModal ref={this.myModal} />
      </>
    )
  }

  render() {
    return this.renderScreen()
  }
}
const mapStateToProps = (state) => ({
  locale: state.locale,
  userData: state.userData,
  metamaskRedux: state.metamaskRedux,
  connectionMethod: state.connectionMethod,
})
export default withRouter(connect(mapStateToProps, null)(HeaderComponent))
