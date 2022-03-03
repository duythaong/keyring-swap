import cn from 'assets/Lang/cn.json'
import en from 'assets/Lang/en.json'
import ja from 'assets/Lang/ja.json'
import React, { useEffect, useState } from 'react'
import { IntlProvider } from 'react-intl'
import { useAppSelector } from 'state/hooks'
// const locale= navigator.language
const messagesDefault = {
  en,
  cn,
  ja,
}

const Wrapper = (props) => {
  const currentLocale = useAppSelector((state) => state.locale.lang)
  const [locale, setLocale] = useState(currentLocale)
  const [messages, setMessages] = useState(messagesDefault[currentLocale])
  useEffect(() => {
    setLocale(currentLocale)
    setMessages(messagesDefault[currentLocale])
  }, [currentLocale])
  return (
    <IntlProvider messages={messages} locale={locale}>
      {props.children}
    </IntlProvider>
  )
}

export default Wrapper
