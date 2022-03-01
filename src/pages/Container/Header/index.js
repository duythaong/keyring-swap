import { Dropdown, Menu } from 'antd'
import { CONNECTION_METHOD, OBSERVER_KEY, PAGE_MOBILE_HIDE_HEADER_FOOTER } from 'common/constants'
import Observer from 'common/observer'
import Header from 'components/Header'
import { images } from 'config/images'
import { useActiveWeb3React } from 'hooks/web3'
import CustomLink from 'pages/Components/CustomLink'
import ExternalLink from 'pages/Components/ExternalLink'
import LanguageSwitcher from 'pages/Components/LanguageSwitcher'
import React, { useEffect, useState } from 'react'
import Media from 'react-media'
import { connect, useSelector } from 'react-redux'
import { Link, Router, useLocation } from 'react-router-dom'
import { useWalletModalToggle } from 'state/application/hooks'
import styled from 'styled-components/macro'

import {
  AvatarImg,
  AvatarWrapper,
  ButtonConnect,
  ButtonConnectMobile,
  Container,
  LayoutHeader,
  LeftSide,
  Logo,
  MenuHeader,
  MenuHeaderItem,
  RightSide,
} from './style'
const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 2;
`
const HeaderComponent = () => {
  const { messages } = useSelector((state) => state.locale)
  const { active, account, library, connector, deactivate, chainId } = useActiveWeb3React()
  const [isSigned, setIsSigned] = useState(active && account)
  console.log('active', 'account', active, account, isSigned)
  useEffect(() => {
    setIsSigned(active && account)
  }, [active, account])
  const location = useLocation()
  const toggleNWSModal = useWalletModalToggle()
  const backHome = () => {
    // Router.pushRoute('/')
  }
  const handleSignIn = () => {
    Observer.emit(OBSERVER_KEY.SIGN_IN)
    toggleNWSModal()
  }
  const handleSignOut = () => {
    deactivate()
    console.log('connector', connector, 'library', library)
    setIsSigned(false)
  }

  const renderMainNav = (mode = 'horizontal') => {
    return (
      <MenuHeader mode={mode}>
        <Menu.Item key={1}>
          <CustomLink route="/">
            <MenuHeaderItem>{messages.home.title}</MenuHeaderItem>
          </CustomLink>
        </Menu.Item>
        <Menu.Item key={2}>
          <CustomLink route="/store">
            <MenuHeaderItem>{messages.store.title}</MenuHeaderItem>
          </CustomLink>
        </Menu.Item>
        <Menu.Item key={3}>
          <CustomLink route="/market">
            <MenuHeaderItem>{messages.market.title}</MenuHeaderItem>
          </CustomLink>
        </Menu.Item>
        <Menu.Item key={4}>
          <ExternalLink url="https://swap-bsc.keyring.app/">
            <MenuHeaderItem>{messages.mainNav.trade}</MenuHeaderItem>
          </ExternalLink>
        </Menu.Item>
        <Menu.Item key={5}>
          <ExternalLink url="">
            <MenuHeaderItem>{messages.mainNav.bridge}</MenuHeaderItem>
          </ExternalLink>
        </Menu.Item>
        <Menu.Item key={6}>
          <ExternalLink url="">
            <MenuHeaderItem>{messages.mainNav.whitepaper}</MenuHeaderItem>
          </ExternalLink>
        </Menu.Item>
      </MenuHeader>
    )
  }

  const renderAccountNav = (
    <Menu>
      <Menu.Item key="profile">
        <Link route="/my-nfts">{messages.mainNav.profile}</Link>
      </Menu.Item>
      <Menu.Item key="logout">
        <a onClick={handleSignOut}>{messages.connectApp.disconnect}</a>
      </Menu.Item>
    </Menu>
  )

  const renderDesktop = () => {
    return (
      <Container>
        <LeftSide>
          <Logo onClick={backHome} src={images.logo} />
          {renderMainNav()}
        </LeftSide>
        <RightSide>
          <div className="MR30">
            <LanguageSwitcher />
          </div>
          {isSigned ? (
            <Dropdown
              placement="bottomRight"
              overlay={renderAccountNav}
              trigger="click"
              overlayClassName="overlay-header"
            >
              <AvatarWrapper>
                <AvatarImg src={images.avatarDefault} />
              </AvatarWrapper>
            </Dropdown>
          ) : (
            <ButtonConnect onClick={handleSignIn}>
              <img src={images.icConnect} className="MR9" />
              <span>{messages.connectApp.connectTo}</span>
            </ButtonConnect>
          )}
        </RightSide>
      </Container>
    )
  }

  const renderMobile = () => {
    return (
      <Container>
        <LeftSide>
          <Logo onClick={backHome} src={images.logoMobile} />
        </LeftSide>
        <RightSide>
          <div className="MR30">
            <LanguageSwitcher />
          </div>
          {isSigned ? (
            <Dropdown
              placement="bottomRight"
              overlay={renderAccountNav}
              trigger="click"
              overlayClassName="overlay-header"
            >
              <AvatarWrapper>
                <AvatarImg src={images.avatarDefault} />
              </AvatarWrapper>
            </Dropdown>
          ) : (
            <ButtonConnectMobile onClick={handleSignIn}>
              <img src={images.icConnect} className="MR9" />
              <span>{messages.connectApp.connectTo}</span>
            </ButtonConnectMobile>
          )}
        </RightSide>
      </Container>
    )
  }
  const renderScreen = () => {
    const swapScreen = location.pathname.includes('swap')
    if (swapScreen) {
      return (
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
      )
    } else {
      return renderNormalScreen()
    }
  }

  const renderNormalScreen = () => {
    return (
      <>
        <Media query="(min-width: 1073px)" render={() => <LayoutHeader>{renderDesktop()}</LayoutHeader>} />
        <Media
          query="(max-width: 1072px)"
          render={() =>
            PAGE_MOBILE_HIDE_HEADER_FOOTER.includes(Router.pathname) ? (
              <></>
            ) : (
              <LayoutHeader>{renderMobile()}</LayoutHeader>
            )
          }
        />
      </>
    )
  }

  return renderScreen()
}

export default HeaderComponent
