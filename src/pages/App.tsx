import Routes from 'common/routes'
import ApeModeQueryParamReader from 'hooks/useApeModeQueryParamReader'
import { useActiveWeb3React } from 'hooks/web3'
import { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { updateChainId } from 'state/application/reducer'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import styled from 'styled-components/macro'

import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import AddressClaimModal from '../components/claim/AddressClaimModal'
import ErrorBoundary from '../components/ErrorBoundary'
import Header from '../components/Header'
import Polling from '../components/Header/Polling'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import { useModalOpen, useToggleModal } from '../state/application/hooks'
import { ApplicationModal } from '../state/application/reducer'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 120px 16px 0px 16px;
  align-items: center;
  flex: 1;
  z-index: 1;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 6rem 16px 16px 16px;
  `};
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 2;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

function TopLevelModals() {
  const open = useModalOpen(ApplicationModal.ADDRESS_CLAIM)
  const toggle = useToggleModal(ApplicationModal.ADDRESS_CLAIM)
  return <AddressClaimModal isOpen={open} onDismiss={toggle} />
}

export default function App() {
  // const dispatch = useAppDispatch()
  // const { chainId: chainIdWeb3 } = useActiveWeb3React()
  // const { ethereum } = window
  // useEffect(() => {
  //   const changeChainIdRedux = () => {
  //     console.log('====================================')
  //     console.log('chainIdWeb3aaaaa', chainIdWeb3)
  //     console.log('====================================')
  //     dispatch(updateChainId({ chainId: chainIdWeb3 ? chainIdWeb3 ?? null : null }))
  //   }

  //   if (ethereum && ethereum.on) {
  //     ethereum.on('chainChanged', changeChainIdRedux)
  //     // ethereum.on('networkChanged', changeChainIdRedux)
  //   }
  // }, [chainIdWeb3])

  // console.log('process.env.REACT_APP_STATE', process.env.REACT_APP_STATE)

  return (
    <ErrorBoundary>
      <Route component={GoogleAnalyticsReporter} />
      <Route component={DarkModeQueryParamReader} />
      <Route component={ApeModeQueryParamReader} />
      <Web3ReactManager>
        <AppWrapper>
          <HeaderWrapper>
            <Header />
          </HeaderWrapper>
          <BodyWrapper>
            <Popups />
            <Polling />
            <TopLevelModals />
            <Routes />
            <Marginer />
          </BodyWrapper>
        </AppWrapper>
      </Web3ReactManager>
    </ErrorBoundary>
  )
}
