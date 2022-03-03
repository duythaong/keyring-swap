import './style.scss'

import { Dropdown } from 'antd'
import { images } from 'config/images'
import moment from 'moment'
import enLocale from 'moment/locale/en-au'
import jaLocale from 'moment/locale/ja'
import React from 'react'
import { connect } from 'react-redux'
import Actions from 'state/Redux/actions'
const configRenderLanguage = [
  {
    title: '日本語(Japanese)',
    lang: 'ja',
    src: images.flags['ja'],
  },
  {
    title: 'English',
    lang: 'en',
    src: images.flags['en'],
  },
]

class LanguageSwitcher extends React.PureComponent {
  onSetLocale = (lang) => () => {
    const { setLocale } = this.props
    setLocale && setLocale(lang)
    switch (lang) {
      case 'en':
        moment.updateLocale('en', enLocale, {
          monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        })
        break
      case 'ja':
        moment.updateLocale('ja', jaLocale, {
          monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        })
        moment.updateLocale('ja', {
          weekdays: ['(日)', '(月)', '(火)', '(水)', '(木)', '(金)', '(土)'],
        })
        break
      case 'cn':
        moment.updateLocale('ja', jaLocale, {
          monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        })
        moment.updateLocale('ja', {
          weekdays: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        })
        break
    }
  }

  menuLanguage = () => {
    let { lang } = this.props.locale
    let selectOptionList = configRenderLanguage

    return (
      <React.Fragment>
        {selectOptionList.map((item, i) => (
          <div
            key={item}
            onClick={this.onSetLocale(item.lang)}
            className={`menu-flag-item ${item.lang === lang ? 'selected' : ''}`}
          >
            <span>
              <img className="flags" alt={item.title} src={item.src} />
              {`${item.title}`}
            </span>
          </div>
        ))}
      </React.Fragment>
    )
  }

  render() {
    const { lang } = this.props.locale
    let currentSelectedObj = configRenderLanguage.find((obj) => obj.lang === lang)
    return (
      <Dropdown
        overlayClassName="dropdown-lang"
        placement="bottomRight"
        overlay={this.menuLanguage}
        trigger={['click']}
      >
        <a className="ctn-select-lang ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <img className="selected-flag" alt={currentSelectedObj.title} src={currentSelectedObj.src} />
          {/* <span className='text text-bold text-color-main PR5'>{currentSelectedObj.title}</span> */}
        </a>
      </Dropdown>
    )
  }
}
const mapStateToProps = (state) => ({
  locale: state.locale,
})
const mapDispatchToProps = { setLocale: Actions.setLocale }
export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcher)
