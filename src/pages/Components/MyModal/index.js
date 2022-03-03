import './style.scss'

import { Modal } from 'antd'
import closeIcon from 'assets/Image/Icon/close.svg'
import { images } from 'config/images'
import React from 'react'
class MyModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowModal: false,
      modalContent: null,
      config: {
        modalWidth: 480,
        closable: true,
        wrapClassName: '',
      },
    }
  }

  componentDidMount() {
    // code here
  }

  openModal = (
    modalContent,
    config = { modalWidth: 500, closable: true, wrapClassName: '', maskStyle: {}, onAfterClose: null }
  ) => {
    this.setState({
      isShowModal: true,
      modalContent,
      config,
    })
  }

  closeModal = () => {
    this.setState({
      isShowModal: false,
      modalContent: null,
    })
    const { customClose } = this.props
    customClose && customClose()
  }

  render() {
    const { isShowModal, modalContent, config } = this.state
    return (
      <Modal
        wrapClassName={config.wrapClassName}
        width={config.modalWidth}
        title={null}
        footer={null}
        centered
        visible={isShowModal}
        onOk={null}
        onCancel={this.closeModal}
        closable={config.closable}
        maskClosable={config.closable}
        maskStyle={config.maskStyle}
        afterClose={() => {
          config.onAfterClose && config.onAfterClose()
        }}
        closeIcon={<img src={images.icClose} />}
      >
        {modalContent && modalContent}
      </Modal>
    )
  }
}

export default MyModal
