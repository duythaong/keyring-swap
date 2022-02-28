import './Style/override.scss'
import './Style/global.scss'

import { message, notification } from 'antd'
import { KEY_STORE } from 'common/constants'
import { getDataLocal } from 'common/function'
import Routes from 'common/routes'
import ApeModeQueryParamReader from 'hooks/useApeModeQueryParamReader'
import ReduxConnectIntl from 'pages/Components/Languages'
import Loading from 'pages/Components/Loading'
import BaseContainer from 'pages/Container'
import React from 'react'
import { Route } from 'react-router-dom'
import store from 'state'
import storageActions from 'state/Redux/actions'
import init from 'state/Redux/lib/initState'
import { checkLocalStoreToRedux } from 'state/Redux/lib/reducerConfig'
import styled from 'styled-components/macro'

import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import AddressClaimModal from '../components/claim/AddressClaimModal'
import ErrorBoundary from '../components/ErrorBoundary'
// import Header from '../components/Header'
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

// export default function App() {
//   return (
//     <ErrorBoundary>
//       <Route component={GoogleAnalyticsReporter} />
//       <Route component={DarkModeQueryParamReader} />
//       <Route component={ApeModeQueryParamReader} />
//       <Web3ReactManager>
//         <AppWrapper>
//           <HeaderWrapper>
//             <Header />
//           </HeaderWrapper>
//           <BodyWrapper>
//             <Popups />
//             <Polling />
//             <TopLevelModals />
//             <Routes />
//             <Marginer />
//           </BodyWrapper>
//         </AppWrapper>
//       </Web3ReactManager>
//     </ErrorBoundary>
//   )
// }
// eslint-disable-next-line @typescript-eslint/ban-types
class MyComponent extends React.Component<{}, { isLoading: boolean }> {
  constructor(props: any) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }
  async componentDidMount() {
    message.config({
      top: window.innerHeight / 2,
    })
    notification.config({
      placement: 'topRight',
    })
    try {
      if (process.env.MAINTENANCE_MODE === 'true') {
        this.setState({
          isLoading: false,
        })
        return
      }
      const storageRedux = [
        {
          key: KEY_STORE.SET_CONNECTION_METHOD,
          action: storageActions.setConnectionMethod,
          init: init.connectionMethod,
        },
        {
          key: KEY_STORE.SET_LOCALE,
          action: storageActions.setLocale,
          init: init.lang,
        },
      ]

      const promiseArr = storageRedux.map((item) => {
        checkLocalStoreToRedux(store, item.key, item.action, item.init)
      })
      await Promise.all(promiseArr)
      // in the case reload page: need to wait for detect connection method already in use before showing page
      const initDataPromiseArr: any[] = []
      if (getDataLocal(KEY_STORE.SET_SETTING)) {
        Promise.all(initDataPromiseArr)
      } else {
        // if user access the fisrt time and don't have data in local store
        await Promise.all(initDataPromiseArr)
      }
    } finally {
      this.setState({
        isLoading: false,
      })
    }
  }

  render() {
    const { isLoading } = this.state
    return (
      <ErrorBoundary>
        {/* <Route component={GoogleAnalyticsReporter} /> */}
        {/* <Route component={DarkModeQueryParamReader} /> */}
        {/* <Route component={ApeModeQueryParamReader} /> */}
        <Web3ReactManager>
          {isLoading ? (
            <div className="loading-container">
              <Loading />
            </div>
          ) : (
            <ReduxConnectIntl>
              <BaseContainer>
                <AppWrapper>
                  {/* <HeaderWrapper>
                    <Header />
                  </HeaderWrapper> */}
                  <BodyWrapper>
                    <Popups />
                    <Polling />
                    <TopLevelModals />
                    <Routes />
                    <Marginer />
                  </BodyWrapper>
                </AppWrapper>
              </BaseContainer>
            </ReduxConnectIntl>
          )}
        </Web3ReactManager>
      </ErrorBoundary>
    )
  }
}

export default MyComponent
