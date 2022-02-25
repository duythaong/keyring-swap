/* eslint-disable @typescript-eslint/no-empty-function */
import './style.scss'

import { Button, Col, Row } from 'antd'
import { scrollTop } from 'common/function'
import { images } from 'config/images'
import MyModal from 'pages/Components/MyModal'
import React, { useEffect, useRef, useState } from 'react'
import Media from 'react-media'
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
    alert('SSS')
    dispatch(actions.setLocale('ja'))
  }

  const onConnectModal = () => {}

  const renderDesktop = () => {
    return (
      <div className="home-container">
        <Button className="btn-connect-app" onClick={onChangeLanguage}>
          <span>{'Change language'}</span>
        </Button>
        <Button className="btn-connect-app MT40" onClick={onConnectModal}>
          <span>{messages.connectApp.connectTo}</span>
        </Button>
      </div>
    )
  }

  const renderMobile = () => {
    return <div className="home-container-mobile"></div>
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
