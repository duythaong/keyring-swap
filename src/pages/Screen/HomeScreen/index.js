/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-empty-function */
import './style.scss'

import { useWeb3React } from '@web3-react/core'
import { Button, Col, Row } from 'antd'
import { scrollTop } from 'common/function'
import MetaMaskServices from 'controller/Metamask'
import { demoSend, getETHBalance, getNonce, signCustomMessage, signPersonalMessage } from 'controller/WalletConnect'
import { useActiveWeb3React } from 'hooks/web3'
import ConnectModal from 'pages/Components/ConnectModal'
import MyModal from 'pages/Components/MyModal'
import React, { useEffect, useRef, useState } from 'react'
import Media from 'react-media'
import { useWalletModalToggle } from 'state/application/hooks'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import actions from 'state/Redux/actions'
const HomeScreen = () => {
  const myModal = useRef()
  const [disableNFC, setDisableNFC] = useState(false)
  const [disableQR, setDisableQR] = useState(false)
  const dispatch = useAppDispatch()
  const locales = useAppSelector((state) => state.locale)
  const { active, account, library, connector, activate, deactivate, chainId } = useActiveWeb3React()
  // console.log('locale', locales)
  const { messages } = locales
  useEffect(() => {
    scrollTop && scrollTop()
  }, [])

  useEffect(() => {
    // console.log('active', active)
    // console.log('account', account)
    // console.log('library', library)
    // console.log('connector', connector)
    // console.log('activate', activate)
    // console.log('deactivate', deactivate)
    async function activate() {
      // if (active && account != null) {
      //   // let res = await MetaMaskServices.signPersonalMessage(account, 'MISSSAKE')
      //   // console.log('res', res)
      //   console.log('ress')
      //   let res = await signPersonalMessage('MISSSAKE', connector, account, active, deactivate)
      //   console.log('res', res)
      // }
      // if (active && account != null) {
      //   console.log('res1111')
      //   // let balance = await getETHBalance(library, account)
      //   let nonce = await getNonce(library, account)
      //   console.log('nonce', nonce)
      //   // console.log('balance', balance.toString())
      // }
      if (active && account != null) {
        // demoSend(library, chainId, '0x57EF6F871888e2d294470A0061292675F6dC309c')
        // let signData = await signCustomMessage(library, account, 'MISSSAKE')
        // console.log('signData', signData)
      }
    }
    activate()
  }, [active, account, library, connector, activate, deactivate])

  const openInNewTab = (href) => {
    Object.assign(document.createElement('a'), {
      target: '_blank',
      href,
    }).click()
  }
  const onChangeLanguage = () => {
    dispatch(actions.setLocale('en'))
  }
  const toggleNWSModal = useWalletModalToggle()

  const closeModal = () => {
    myModal.current && myModal.current.closeModal()
  }

  const onConnectModal = () => {
    // myModal.current.openModal(<ConnectModal closeModal={closeModal} />, {
    //   modalWidth: 576,
    // })
    // myModal.current.openModal(<Example closeModal={closeModal} />, {
    //   modalWidth: 576,
    // })
  }

  const renderMobile = () => {
    return <div className="home-container-mobile"></div>
  }
  const renderDesktop = () => {
    return (
      <div className="home-container">
        <Button className="btn-connect-app" onClick={onChangeLanguage}>
          <span>{'Change language'}</span>
        </Button>
        <Button className="btn-connect-app MT40" onClick={toggleNWSModal}>
          <span>{messages.connectApp.connectTo}</span>
        </Button>
      </div>
    )
  }
  return (
    <>
      <Media query="(min-width: 769px)" render={() => renderDesktop()} />
      <Media query="(max-width: 768px)" render={() => renderMobile()} />
      <MyModal ref={myModal} />
    </>
  )
}

export default HomeScreen
