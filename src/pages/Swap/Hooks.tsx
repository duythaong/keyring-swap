/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import Observer from 'utils/observer'

import { Version } from '../../hooks/useToggledVersion'
import { useDerivedSwapInfo } from '../../state/swap/hooks'
const Hooks = (props: { name: string; toggledVersion: Version | undefined; refData: any }) => {
  const { name, toggledVersion, refData } = props
  const derivedSwapInfo = useDerivedSwapInfo(name, toggledVersion)

  useEffect(() => {
    const newData = {
      ...refData.current,
      [name]: {
        trade: derivedSwapInfo.bestTrade,
        v3TradeState: derivedSwapInfo.v3Trade.state,
        allowedSlippage: derivedSwapInfo.allowedSlippage,
        currencyBalances: derivedSwapInfo.currencyBalances,
        parsedAmount: derivedSwapInfo.parsedAmount,
        currencies: derivedSwapInfo.currencies,
        swapInputError: derivedSwapInfo.inputError,
        name,
      },
    }
    refData.current = newData
    Observer.emit('UPDATE_DATA')
  }, [derivedSwapInfo])

  return <></>
}

export default Hooks
