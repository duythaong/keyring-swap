import './style.scss'

import { Col, Layout, Row } from 'antd'
import { OBSERVER_KEY } from 'common/constants'
import Observer from 'common/observer'
// import A2hs from 'pages/Components/A2hs/a2hs'
// import ConnectApp from 'pages/Components/ConnectApp'
import Maintenance from 'pages/Components/Maintenance'
import MyModal from 'pages/Components/MyModal'
import Notice from 'pages/Components/Notice'
import React, { PureComponent } from 'react'
import { isMobile } from 'react-device-detect'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import actions from 'state/Redux/actions'

// import logo from '../../static/logo192.png'
// import Footer from './Footer'
// import Header from './Header'
const { Content } = Layout

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
        {/* <Header /> */}
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
