import './style.scss'

import React from 'react'
import { useSelector } from 'react-redux'

const NoticeContent = ({ closeModal }) => {
  const messages = useSelector((state) => state.locale.messages)
  const handleSeeDetail = () => {
    // history.pushRoute('/how-to-use')
    closeModal && closeModal()
  }
  return (
    <div className="notice-modal-container">
      <p className="title">{messages.notice.title}</p>
      <p className="text">{messages.notice.text1}</p>
      <p className="text">{messages.notice.text2}</p>
      <p className="text">{messages.notice.text3}</p>
      <div className="details-btn" onClick={handleSeeDetail}>
        {messages.notice.seeDetails}
      </div>
    </div>
  )
}

export default NoticeContent
