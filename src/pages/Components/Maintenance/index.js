import './style.scss'

import { Col, Row } from 'antd'
import { images } from 'config/images'
import React from 'react'
import { connect } from 'react-redux'

class Maintenance extends React.PureComponent {
  render() {
    const { messages } = this.props.locale
    return (
      <div className="maintenance-container">
        <div className="wrapper PT50 PB50 text text-center">
          <Row type="flex" justify="center">
            <Col span={24}>
              <h2 className="text title MB30">{messages.maintenance.title}</h2>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span={20} align="center">
              <p className="text text-description MB30">{messages.maintenance.desc}</p>
              <img className="img text-center MB70" src={images.underMaintenance} alt="Under maintenance" />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale,
})

export default connect(mapStateToProps)(Maintenance)
