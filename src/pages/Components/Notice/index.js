import './style.scss'

import { getDataLocal, saveDataLocal } from 'common/function'
import React, { useEffect, useRef } from 'react'

import MyModal from '../MyModal'
import NoticeContent from './NoticeContent'

const Notice = () => {
  const myModal = useRef()

  const closeModal = () => {
    myModal.current && myModal.current.closeModal()
  }

  const showNoticeModal = () => {
    myModal.current.openModal(<NoticeContent closeModal={closeModal} />, {
      wrapClassName: 'notice-modal',
      modalWidth: 576,
    })
  }

  useEffect(() => {
    const showNoticed = getDataLocal('showNoticed')
    if (showNoticed === null) {
      setTimeout(() => showNoticeModal(), 500)
      saveDataLocal('showNoticed', true)
    }
  }, [])

  return <MyModal ref={myModal} />
}

export default Notice
