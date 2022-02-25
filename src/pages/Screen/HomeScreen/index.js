/* eslint-disable @typescript-eslint/no-empty-function */
import './style.scss'

import { Button, Col, Row } from 'antd'
import { scrollTop } from 'common/function'
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
  console.log('locale', locales)
  const { messages } = locales
  useEffect(() => {
    scrollTop && scrollTop()
  }, [])

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
  const Example = () => {
    return (
      <div className="notice-modal-container">
        <p className="title">{'AAA'}</p>
      </div>
    )
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
