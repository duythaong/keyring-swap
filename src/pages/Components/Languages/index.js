import MessageCN from 'assets/Lang/cn.json'
import MessageEN from 'assets/Lang/en.json'
import MessageJA from 'assets/Lang/ja.json'
import React, { useState } from 'react'
import { IntlProvider } from 'react-intl'
export const Context = React.createContext()

const local = navigator.language

let lang
if (local === 'cn') {
  lang = MessageCN
} else {
  if (local === 'ja') {
    lang = MessageJA
  } else {
    lang = MessageEN
  }
}

const Wrapper = (props) => {
  const [locale, setLocale] = useState(local)

  const [messages, setMessages] = useState(lang)

  function selectLanguage(e) {
    const newLocale = e.target.value
    setLocale(newLocale)
    if (newLocale === 'cn') {
      setMessages(MessageCN)
    } else {
      if (newLocale === 'ja') {
        setMessages(MessageJA)
      } else {
        setMessages(MessageEN)
      }
    }
  }

  return (
    <Context.Provider value={{ locale, selectLanguage }}>
      <IntlProvider messages={messages} locale={locale}>
        {props.children}
      </IntlProvider>
    </Context.Provider>
  )
}

export default Wrapper
