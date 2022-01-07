/* eslint-disable prettier/prettier */
import { Trade as V2Trade } from '@duythao_bacoor/v2-sdk'
import { Trans } from '@lingui/macro'
import { Currency, CurrencyAmount, Percent, Token, TradeType } from '@uniswap/sdk-core'
import { Trade as V3Trade } from '@uniswap/v3-sdk'
import BannerImg1 from 'assets/images/Banner1.jpeg'
import BannerImg2 from 'assets/images/Banner2.jpeg'
import { LoadingOpacityContainer } from 'components/Loader/styled'
import { NetworkAlert } from 'components/NetworkAlert/NetworkAlert'
import { AdvancedSwapDetails } from 'components/swap/AdvancedSwapDetails'
import { AutoRouterLogo } from 'components/swap/RouterLabel'
import SwapRoute from 'components/swap/SwapRoute'
import TradePrice from 'components/swap/TradePrice'
import UnsupportedCurrencyFooter from 'components/swap/UnsupportedCurrencyFooter'
import { MouseoverTooltip, MouseoverTooltipContent } from 'components/Tooltip'
import useDefaultChainId from 'hooks/useDefaultChainId'
import usePrevious from 'hooks/usePrevious'
import JSBI from 'jsbi'
import { ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowDown, CheckCircle, HelpCircle, Info } from 'react-feather'
import ReactGA from 'react-ga'
import { RouteComponentProps } from 'react-router-dom'
import { Text } from 'rebass'
import { V3TradeState } from 'state/routing/types'
import { useDarkModeManager } from 'state/user/hooks'
import styled, { css, keyframes, ThemeContext } from 'styled-components/macro'
import useDeepCompareEffect from 'use-deep-compare-effect'
import Observer from 'utils/observer'

import AddressInputPanel from '../../components/AddressInputPanel'
import {
  ButtonConfirmed,
  ButtonError,
  ButtonLight,
  ButtonOutlined,
  ButtonPrimary,
  ButtonProps,
} from '../../components/Button'
import { GreyCard } from '../../components/Card'
import { AutoColumn } from '../../components/Column'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import CurrencyLogo from '../../components/CurrencyLogo'
import Loader from '../../components/Loader'
import NetworkSelectorBacoorModal from '../../components/NetworkSelectorBacoorModal'
import { Input as NumericalInput } from '../../components/NumericalInput'
import Row, { AutoRow, RowFixed } from '../../components/Row'
import confirmPriceImpactWithoutFee from '../../components/swap/confirmPriceImpactWithoutFee'
import ConfirmSwapModal from '../../components/swap/ConfirmSwapModal'
import {
  ArrowWrapper,
  Dots,
  ResponsiveTooltipContainer,
  SwapCallbackError,
  Wrapper,
} from '../../components/swap/styleds'
import SwapHeader from '../../components/swap/SwapHeader'
import { SwitchLocaleLink } from '../../components/SwitchLocaleLink'
import TokenWarningModal from '../../components/TokenWarningModal'
import { CHAIN_SWAP_NAMES, LOGO, SUSHI_SWAP, UNKNOWN_LOGO } from '../../constants/addresses'
import { CHAIN_INFO, SupportedChainId } from '../../constants/chains'
import { TRADE_MAP_UPDATE } from '../../constants/misc'
import { useAllTokens, useCurrency } from '../../hooks/Tokens'
import { ApprovalState, useApproveCallbackFromTrade } from '../../hooks/useApproveCallback'
import useENSAddress from '../../hooks/useENSAddress'
import { useERC20PermitFromTrade, UseERC20PermitState } from '../../hooks/useERC20Permit'
import useIsArgentWallet from '../../hooks/useIsArgentWallet'
import { useIsSwapUnsupported } from '../../hooks/useIsSwapUnsupported'
import { useSwapCallback } from '../../hooks/useSwapCallback'
import useToggledVersion from '../../hooks/useToggledVersion'
import { useUSDCValue } from '../../hooks/useUSDCPrice'
import useWrapCallback, { WrapType } from '../../hooks/useWrapCallback'
import { useActiveWeb3React } from '../../hooks/web3'
import { useWalletModalToggle } from '../../state/application/hooks'
import { Field } from '../../state/swap/actions'
import {
  useDefaultsFromURLSearch,
  useDerivedSwapInfo,
  useSwapActionHandlers,
  useSwapState,
} from '../../state/swap/hooks'
import { useExpertModeManager } from '../../state/user/hooks'
import { LinkStyledButton, TYPE } from '../../theme'
import { computeFiatValuePriceImpact } from '../../utils/computeFiatValuePriceImpact'
import { getTradeVersion } from '../../utils/getTradeVersion'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { warningSeverity } from '../../utils/prices'
import AppBody from '../AppBody'
import Hooks from './Hooks'

const StyledInfo = styled(Info)`
  height: 16px;
  width: 16px;
  margin-left: 4px;
  color: ${({ theme }) => theme.text3};
  :hover {
    color: ${({ theme }) => theme.text1};
  }
`

const BacoorOutput = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
`

const TextOutput = styled.div`
  font-size: 24px
  font-weight: 500
`

const OutlinedBottom = styled(ButtonOutlined)`
  margin-bottom: 10px;
`

const ActiveOutlinedBottom = styled(OutlinedBottom)`
  border: 1px solid;
  border-color: ${({ theme }) => theme.primary1};
`
const Logo = styled.img<{ darkMode: boolean }>`
  height: 20px;
  width: 20px;
  margin-right: 8px;
  ${(props) => css`
    fill: ${props.darkMode ? 'white' : 'black'};
  `}
`

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  50%{
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const Banner = styled.div`
  max-width: 480px;
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  // animation: ${fadeIn} 5s ease-out;
`
const Banner2 = styled.div`
  max-width: 480px;
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  // animation: ${fadeIn} 5s ease-out;
`
const Chains = styled.div`
  display: flex;
  margin: 70px auto;
`
const ChainItem = styled.a`
  background-color: ${({ theme }) => theme.bg0};
  border: 1px solid ${({ theme }) => theme.bg0};
  color: ${({ theme }) => theme.text1};
  display: flex;
  font-weight: 500;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  cursor: pointer;
  border-radius: 11px;
  margin: 0 5px;
  text-decoration: none;
  transistion: 0.3s all;
  &:hover {
    border-color: ${({ theme }) => theme.bg2};
  }
`
const ChainLogo = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`
const ChainLabel = styled.span``
const ActiveOutlinedButton = ({
  name,
  selectedSwap,
  children,
  ...rest
}: { name: string; selectedSwap: string } & ButtonProps) => {
  if (name === selectedSwap) {
    return <ActiveOutlinedBottom {...rest}>{children}</ActiveOutlinedBottom>
  } else {
    return <OutlinedBottom {...rest}>{children}</OutlinedBottom>
  }
}

type TradeMap = {
  [name: string]: {
    trade: V2Trade<Currency, Currency, TradeType> | V3Trade<Currency, Currency, TradeType> | undefined
    v3TradeState: V3TradeState
    allowedSlippage: Percent
    currencyBalances: { [field in Field]?: CurrencyAmount<Currency> }
    parsedAmount: CurrencyAmount<Currency> | undefined
    currencies: { [field in Field]?: Currency | null }
    swapInputError: ReactNode
    name: string
  }
}

const useParsedAmounts = (
  independentField: Field,
  parsedAmount: CurrencyAmount<Currency> | undefined,
  showWrap: boolean,
  trade: V2Trade<Currency, Currency, TradeType> | V3Trade<Currency, Currency, TradeType> | undefined
) => {
  return useMemo(
    () =>
      showWrap
        ? {
            [Field.INPUT]: parsedAmount,
            [Field.OUTPUT]: parsedAmount,
          }
        : {
            [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
            [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
          },
    [independentField, parsedAmount, showWrap, trade]
  )
}

const useSortedTrades = (showWrap: boolean, tradeMap: TradeMap) => {
  return useMemo(
    () =>
      Object.values(tradeMap)
        .sort((a, b) => {
          if (showWrap) {
            return 0
          } else {
            const amountA = Number(a?.trade?.outputAmount?.toSignificant(6) ?? '')
            const amountB = Number(b?.trade?.outputAmount?.toSignificant(6) ?? '')
            return amountB - amountA
          }
        })
        .map((item) => ({
          name: item.name,
          logo: LOGO[item.name] ?? UNKNOWN_LOGO,
          amountOut: showWrap ? item.parsedAmount?.toExact() ?? '' : item?.trade?.outputAmount?.toSignificant(6) ?? '',
        })),
    [showWrap, tradeMap]
  )
}

const useRouting = (
  trade: V2Trade<Currency, Currency, TradeType> | V3Trade<Currency, Currency, TradeType> | undefined,
  v3TradeState: V3TradeState
) => {
  return useMemo(
    () => [
      trade instanceof V3Trade ? !trade?.swaps : !trade?.route,
      V3TradeState.LOADING === v3TradeState,
      V3TradeState.SYNCING === v3TradeState,
    ],
    [trade, v3TradeState]
  )
}

export default function Swap({ history }: RouteComponentProps) {
  const { account } = useActiveWeb3React()
  // let chainId: number | undefined = chainidAfterConnected
  // if (account === null || account === undefined) {
  //   chainId = getActiveChainBaseOnUrl()
  // }
  const [chainId] = useDefaultChainId()
  const previousChainId = usePrevious(chainId)
  const loadedUrlParams = useDefaultsFromURLSearch()
  const [darkMode] = useDarkModeManager()
  // token warning stuff
  const [loadedInputCurrency, loadedOutputCurrency] = [
    useCurrency(loadedUrlParams?.inputCurrencyId),
    useCurrency(loadedUrlParams?.outputCurrencyId),
  ]
  const [dismissTokenWarning, setDismissTokenWarning] = useState<boolean>(false)
  const [isRenderAngo, setIsRenderAngo] = useState<boolean>(false)
  const urlLoadedTokens: Token[] = useMemo(
    () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c?.isToken ?? false) ?? [],
    [loadedInputCurrency, loadedOutputCurrency]
  )
  const handleConfirmTokenWarning = useCallback(() => {
    setDismissTokenWarning(true)
  }, [])

  // dismiss warning if all imported tokens are in active lists
  const defaultTokens = useAllTokens()
  const importTokensNotInDefault =
    urlLoadedTokens &&
    urlLoadedTokens.filter((token: Token) => {
      return !Boolean(token.address in defaultTokens)
    })

  const theme = useContext(ThemeContext)

  // toggle wallet when disconnected
  const toggleWalletModal = useWalletModalToggle()

  // for expert mode
  const [isExpertMode] = useExpertModeManager()

  // get version from the url
  const toggledVersion = useToggledVersion()

  // swap state
  const { independentField, typedValue, recipient } = useSwapState()

  const [selectedSwap, setSelectedSwap] = useState<string>(SUSHI_SWAP)

  const refData = useRef<any>({})

  const userHasSelected = useRef(false)

  // Bacoor
  const {
    v3Trade: { state: v3TradeStateBacoor },
    bestTrade: tradeBacoor,
    allowedSlippage: allowedSlippageBacoor,
    currencyBalances: currencyBalancesBacoor,
    parsedAmount: parsedAmountBacoor,
    currencies: currenciesBacoor,
    inputError: swapInputErrorBacoor,
  } = useDerivedSwapInfo(SUSHI_SWAP, toggledVersion)

  const tradeMapInit: TradeMap = {
    [SUSHI_SWAP]: {
      trade: tradeBacoor,
      v3TradeState: v3TradeStateBacoor,
      allowedSlippage: allowedSlippageBacoor,
      currencyBalances: currencyBalancesBacoor,
      parsedAmount: parsedAmountBacoor,
      currencies: currenciesBacoor,
      swapInputError: swapInputErrorBacoor,
      name: SUSHI_SWAP,
    },
  }

  const [tradeMap, setTradeMap] = useState<TradeMap>(tradeMapInit)

  useEffect(() => {
    setSelectedSwap(SUSHI_SWAP)
  }, [chainId])

  useEffect(() => {
    const tradeMapUpdate = () => {
      setTradeMap(refData.current)
    }
    const bannerInte = setInterval(() => {
      setIsRenderAngo((state) => !state)
    }, 5000)
    Observer.on(TRADE_MAP_UPDATE, tradeMapUpdate)

    return () => {
      Observer.removeListener(TRADE_MAP_UPDATE, tradeMapUpdate)
      clearInterval(bannerInte)
    }
  }, [])

  const {
    trade,
    v3TradeState,
    allowedSlippage,
    currencyBalances,
    parsedAmount,
    currencies,
    swapInputError,
    name,
  }: {
    trade: V2Trade<Currency, Currency, TradeType> | V3Trade<Currency, Currency, TradeType> | undefined
    v3TradeState: V3TradeState
    allowedSlippage: Percent
    currencyBalances: { [field in Field]?: CurrencyAmount<Currency> }
    parsedAmount: CurrencyAmount<Currency> | undefined
    currencies: { [field in Field]?: Currency | null }
    swapInputError: ReactNode
    name: string
  } = tradeMap[selectedSwap]

  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const { address: recipientAddress } = useENSAddress(recipient)

  const parsedAmounts = useParsedAmounts(independentField, parsedAmount, showWrap, trade)

  const [routeNotFound, routeIsLoading, routeIsSyncing] = useRouting(trade, v3TradeState)

  const fiatValueInput = useUSDCValue(parsedAmounts[Field.INPUT])
  const fiatValueOutput = useUSDCValue(parsedAmounts[Field.OUTPUT])
  const priceImpact = routeIsSyncing ? undefined : computeFiatValuePriceImpact(fiatValueInput, fiatValueOutput)

  const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers()
  const isValid = !swapInputError
  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput]
  )
  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value)
    },
    [onUserInput]
  )

  // reset if they close warning without tokens in params
  const handleDismissTokenWarning = useCallback(() => {
    setDismissTokenWarning(true)
    history.push('/swap/')
  }, [history])

  // modal and loading
  const [{ showConfirm, tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    showConfirm: boolean
    tradeToConfirm: V2Trade<Currency, Currency, TradeType> | V3Trade<Currency, Currency, TradeType> | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    showConfirm: false,
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })

  // const formattedAmounts = {
  //   [independentField]: typedValue,
  //   [dependentField]: showWrap
  //     ? parsedAmounts[independentField]?.toExact() ?? ''
  //     : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  // }

  const formattedAmounts = useMemo(
    () => ({
      [independentField]: typedValue,
      [dependentField]: showWrap
        ? parsedAmounts[independentField]?.toExact() ?? ''
        : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
    }),
    [dependentField, independentField, parsedAmounts, showWrap, typedValue]
  )

  const sortedTrades: { name: string; logo: string; amountOut: string }[] = useSortedTrades(showWrap, tradeMap)

  useDeepCompareEffect(() => {
    if (!userHasSelected.current) {
      setSelectedSwap(sortedTrades[0].name)
    }
  }, [sortedTrades])

  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0))
  )

  // check whether the user has approved the router on the input token
  const [approvalState, approveCallback] = useApproveCallbackFromTrade(name, trade, allowedSlippage)
  const {
    state: signatureState,
    signatureData,
    gatherPermitSignature,
  } = useERC20PermitFromTrade(trade, allowedSlippage)

  const handleApprove = useCallback(async () => {
    if (signatureState === UseERC20PermitState.NOT_SIGNED && gatherPermitSignature) {
      try {
        await gatherPermitSignature()
      } catch (error) {
        // try to approve if gatherPermitSignature failed for any reason other than the user rejecting it
        if (error?.code !== 4001) {
          await approveCallback()
        }
      }
    } else {
      await approveCallback()

      ReactGA.event({
        category: 'Swap',
        action: 'Approve',
        label: [trade?.inputAmount.currency.symbol, toggledVersion].join('/'),
      })
    }
  }, [approveCallback, gatherPermitSignature, signatureState, toggledVersion, trade?.inputAmount.currency.symbol])

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approvalState === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approvalState, approvalSubmitted])

  const maxInputAmount: CurrencyAmount<Currency> | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  const showMaxButton = Boolean(maxInputAmount?.greaterThan(0) && !parsedAmounts[Field.INPUT]?.equalTo(maxInputAmount))

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(
    name,
    trade,
    allowedSlippage,
    recipient,
    signatureData
  )

  const handleSwap = useCallback(() => {
    if (!swapCallback) {
      return
    }
    if (priceImpact && !confirmPriceImpactWithoutFee(priceImpact)) {
      return
    }
    setSwapState({ attemptingTxn: true, tradeToConfirm, showConfirm, swapErrorMessage: undefined, txHash: undefined })
    swapCallback()
      .then((hash) => {
        setSwapState({ attemptingTxn: false, tradeToConfirm, showConfirm, swapErrorMessage: undefined, txHash: hash })
        ReactGA.event({
          category: 'Swap',
          action:
            recipient === null
              ? 'Swap w/o Send'
              : (recipientAddress ?? recipient) === account
              ? 'Swap w/o Send + recipient'
              : 'Swap w/ Send',
          label: [
            trade?.inputAmount?.currency?.symbol,
            trade?.outputAmount?.currency?.symbol,
            getTradeVersion(trade),
            'MH',
          ].join('/'),
        })
      })
      .catch((error) => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          showConfirm,
          swapErrorMessage: error.message,
          txHash: undefined,
        })
      })
  }, [swapCallback, priceImpact, tradeToConfirm, showConfirm, recipient, recipientAddress, account, trade])

  // errors
  const [showInverted, setShowInverted] = useState<boolean>(false)

  // warnings on the greater of fiat value price impact and execution price impact
  const priceImpactSeverity = useMemo(() => {
    const executionPriceImpact = trade?.priceImpact
    return warningSeverity(
      executionPriceImpact && priceImpact
        ? executionPriceImpact.greaterThan(priceImpact)
          ? executionPriceImpact
          : priceImpact
        : executionPriceImpact ?? priceImpact
    )
  }, [priceImpact, trade])

  const isArgentWallet = useIsArgentWallet()

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !isArgentWallet &&
    !swapInputError &&
    (approvalState === ApprovalState.NOT_APPROVED ||
      approvalState === ApprovalState.PENDING ||
      (approvalSubmitted && approvalState === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !isExpertMode)

  const handleConfirmDismiss = useCallback(() => {
    setSwapState({ showConfirm: false, tradeToConfirm, attemptingTxn, swapErrorMessage, txHash })
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '')
    }
  }, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash])

  const handleAcceptChanges = useCallback(() => {
    setSwapState({ tradeToConfirm: trade, swapErrorMessage, txHash, attemptingTxn, showConfirm })
  }, [attemptingTxn, showConfirm, swapErrorMessage, trade, txHash])

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      userHasSelected.current = false
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency)
    },
    [onCurrencySelection]
  )

  const handleMaxInput = useCallback(() => {
    maxInputAmount && onUserInput(Field.INPUT, maxInputAmount.toExact())
  }, [maxInputAmount, onUserInput])

  const handleOutputSelect = useCallback(
    (outputCurrency) => {
      userHasSelected.current = false
      onCurrencySelection(Field.OUTPUT, outputCurrency)
    },
    [onCurrencySelection]
  )

  const swapIsUnsupported = useIsSwapUnsupported(currencies[Field.INPUT], currencies[Field.OUTPUT])

  const priceImpactTooHigh = priceImpactSeverity > 3 && !isExpertMode

  const renderHooks = useMemo(() => {
    if (chainId !== previousChainId) {
      refData.current = {}
    }
    const swapNames =
      CHAIN_SWAP_NAMES[chainId ?? SupportedChainId.POLYGON_MAINET] ?? CHAIN_SWAP_NAMES[SupportedChainId.POLYGON_MAINET]
    return swapNames.map((item) => <Hooks key={item} name={item} refData={refData} toggledVersion={toggledVersion} />)
  }, [chainId, previousChainId, toggledVersion])

  return (
    <>
      {renderHooks}
      <TokenWarningModal
        isOpen={importTokensNotInDefault.length > 0 && !dismissTokenWarning}
        tokens={importTokensNotInDefault}
        onConfirm={handleConfirmTokenWarning}
        onDismiss={handleDismissTokenWarning}
      />
      <NetworkAlert />
      <AppBody>
        <SwapHeader allowedSlippage={allowedSlippage} />
        <Wrapper id="swap-page">
          <ConfirmSwapModal
            isOpen={showConfirm}
            trade={trade}
            originalTrade={tradeToConfirm}
            onAcceptChanges={handleAcceptChanges}
            attemptingTxn={attemptingTxn}
            txHash={txHash}
            recipient={recipient}
            allowedSlippage={allowedSlippage}
            onConfirm={handleSwap}
            swapErrorMessage={swapErrorMessage}
            onDismiss={handleConfirmDismiss}
            selectedSwap={selectedSwap}
          />

          <AutoColumn gap={'sm'}>
            <div style={{ display: 'relative' }}>
              <CurrencyInputPanel
                label={
                  independentField === Field.OUTPUT && !showWrap ? <Trans>From (at most)</Trans> : <Trans>From</Trans>
                }
                value={formattedAmounts[Field.INPUT]}
                showMaxButton={showMaxButton}
                currency={currencies[Field.INPUT]}
                onUserInput={handleTypeInput}
                onMax={handleMaxInput}
                fiatValue={fiatValueInput ?? undefined}
                onCurrencySelect={handleInputSelect}
                otherCurrency={currencies[Field.OUTPUT]}
                showCommonBases={true}
                id="swap-currency-input"
                loading={independentField === Field.OUTPUT && routeIsSyncing}
              />
              <ArrowWrapper clickable>
                <ArrowDown
                  size="16"
                  onClick={() => {
                    setApprovalSubmitted(false) // reset 2 step UI for approvals
                    onSwitchTokens()
                    handleTypeInput(sortedTrades[0].amountOut)
                  }}
                  color={currencies[Field.INPUT] && currencies[Field.OUTPUT] ? theme.text1 : theme.text3}
                />
              </ArrowWrapper>
              <CurrencyInputPanel
                value={' '}
                onUserInput={handleTypeOutput}
                label={independentField === Field.INPUT && !showWrap ? <Trans>To (at least)</Trans> : <Trans>To</Trans>}
                showMaxButton={false}
                hideBalance={false}
                fiatValue={fiatValueOutput ?? undefined}
                priceImpact={priceImpact}
                currency={currencies[Field.OUTPUT]}
                onCurrencySelect={handleOutputSelect}
                otherCurrency={currencies[Field.INPUT]}
                showCommonBases={true}
                id="swap-currency-output"
                loading={independentField === Field.INPUT && routeIsSyncing}
                disabled={true}
                customNode={
                  <>
                    {sortedTrades.slice(0, 3).map(({ name, logo, amountOut }) => (
                      <ActiveOutlinedButton
                        key={name}
                        name={name}
                        selectedSwap={selectedSwap}
                        onClick={() => {
                          userHasSelected.current = true
                          setSelectedSwap(name)
                        }}
                      >
                        <BacoorOutput>
                          <Logo darkMode={darkMode} src={logo} />
                          <TextOutput>{`${name}`}</TextOutput>
                          <NumericalInput
                            className="token-amount-input"
                            onUserInput={() => {
                              console.log(amountOut)
                            }}
                            value={amountOut !== '' ? amountOut : '0'}
                            // disabled={true}
                          />
                        </BacoorOutput>
                      </ActiveOutlinedButton>
                    ))}
                  </>
                }
              />
            </div>

            {recipient !== null && !showWrap ? (
              <>
                <AutoRow justify="space-between" style={{ padding: '0 1rem' }}>
                  <ArrowWrapper clickable={false}>
                    <ArrowDown size="16" color={theme.text2} />
                  </ArrowWrapper>
                  <LinkStyledButton id="remove-recipient-button" onClick={() => onChangeRecipient(null)}>
                    <Trans>- Remove recipient</Trans>
                  </LinkStyledButton>
                </AutoRow>
                <AddressInputPanel id="recipient" value={recipient} onChange={onChangeRecipient} />
              </>
            ) : null}

            {!showWrap && trade && (
              <Row justify={!trade ? 'center' : 'space-between'}>
                <RowFixed style={{ position: 'relative' }}>
                  <MouseoverTooltipContent
                    wrap={false}
                    content={
                      <ResponsiveTooltipContainer>
                        <SwapRoute trade={trade} syncing={routeIsSyncing} />
                      </ResponsiveTooltipContainer>
                    }
                    placement="bottom"
                    onOpen={() =>
                      ReactGA.event({
                        category: 'Swap',
                        action: 'Router Tooltip Open',
                      })
                    }
                  >
                    <AutoRow gap="4px" width="auto">
                      <AutoRouterLogo />
                      <LoadingOpacityContainer $loading={routeIsSyncing}>
                        {trade instanceof V3Trade && trade.swaps.length > 1 && (
                          <TYPE.blue fontSize={14}>{trade.swaps.length} routes</TYPE.blue>
                        )}
                      </LoadingOpacityContainer>
                    </AutoRow>
                  </MouseoverTooltipContent>
                </RowFixed>
                <RowFixed>
                  <LoadingOpacityContainer $loading={routeIsSyncing}>
                    <TradePrice
                      price={trade.executionPrice}
                      showInverted={showInverted}
                      setShowInverted={setShowInverted}
                    />
                  </LoadingOpacityContainer>
                  <MouseoverTooltipContent
                    wrap={false}
                    content={
                      <ResponsiveTooltipContainer origin="top right" width={'295px'}>
                        <AdvancedSwapDetails
                          trade={trade}
                          allowedSlippage={allowedSlippage}
                          syncing={routeIsSyncing}
                          selectedSwap={selectedSwap}
                        />
                      </ResponsiveTooltipContainer>
                    }
                    placement="bottom"
                    onOpen={() =>
                      ReactGA.event({
                        category: 'Swap',
                        action: 'Transaction Details Tooltip Open',
                      })
                    }
                  >
                    <StyledInfo />
                  </MouseoverTooltipContent>
                </RowFixed>
              </Row>
            )}

            <div>
              {swapIsUnsupported ? (
                <ButtonPrimary disabled={true}>
                  <TYPE.main mb="4px">
                    <Trans>Unsupported Asset</Trans>
                  </TYPE.main>
                </ButtonPrimary>
              ) : !account ? (
                <>
                  <ButtonLight onClick={toggleWalletModal}>
                    <Trans>Connect Wallet</Trans>
                  </ButtonLight>
                  <NetworkSelectorBacoorModal />
                </>
              ) : showWrap ? (
                <ButtonPrimary disabled={Boolean(wrapInputError)} onClick={onWrap}>
                  {wrapInputError ??
                    (wrapType === WrapType.WRAP ? (
                      <Trans>Wrap</Trans>
                    ) : wrapType === WrapType.UNWRAP ? (
                      <Trans>Unwrap</Trans>
                    ) : null)}
                </ButtonPrimary>
              ) : routeIsSyncing || routeIsLoading ? (
                <GreyCard style={{ textAlign: 'center' }}>
                  <TYPE.main mb="4px">
                    <Dots>
                      <Trans>Loading</Trans>
                    </Dots>
                  </TYPE.main>
                </GreyCard>
              ) : routeNotFound && userHasSpecifiedInputOutput ? (
                <GreyCard style={{ textAlign: 'center' }}>
                  <TYPE.main mb="4px">
                    <Trans>Insufficient liquidity for this trade.</Trans>
                  </TYPE.main>
                </GreyCard>
              ) : showApproveFlow ? (
                <AutoRow style={{ flexWrap: 'nowrap', width: '100%' }}>
                  <AutoColumn style={{ width: '100%' }} gap="12px">
                    <ButtonConfirmed
                      onClick={() => {
                        userHasSelected.current = true
                        handleApprove()
                      }}
                      disabled={
                        approvalState !== ApprovalState.NOT_APPROVED ||
                        approvalSubmitted ||
                        signatureState === UseERC20PermitState.SIGNED
                      }
                      width="100%"
                      altDisabledStyle={approvalState === ApprovalState.PENDING} // show solid button while waiting
                      confirmed={
                        approvalState === ApprovalState.APPROVED || signatureState === UseERC20PermitState.SIGNED
                      }
                    >
                      <AutoRow justify="space-between" style={{ flexWrap: 'nowrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                          <CurrencyLogo
                            currency={currencies[Field.INPUT]}
                            size={'20px'}
                            style={{ marginRight: '8px', flexShrink: 0 }}
                          />
                          {/* we need to shorten this string on mobile */}
                          {approvalState === ApprovalState.APPROVED || signatureState === UseERC20PermitState.SIGNED ? (
                            <Trans>You can now trade {currencies[Field.INPUT]?.symbol}</Trans>
                          ) : (
                            <Trans>{`Allow the ${name} Protocol to use your ${currencies[Field.INPUT]?.symbol}`}</Trans>
                          )}
                        </span>
                        {approvalState === ApprovalState.PENDING ? (
                          <Loader stroke="white" />
                        ) : (approvalSubmitted && approvalState === ApprovalState.APPROVED) ||
                          signatureState === UseERC20PermitState.SIGNED ? (
                          <CheckCircle size="20" color={theme.green1} />
                        ) : (
                          <MouseoverTooltip
                            text={
                              <Trans>
                                You must give the KEYRING SWAP smart contracts permission to use your {currencies[Field.INPUT]?.symbol}. You only have to do this once per token.
                              </Trans>
                            }
                          >
                            <HelpCircle size="20" color={'white'} style={{ marginLeft: '8px' }} />
                          </MouseoverTooltip>
                        )}
                      </AutoRow>
                    </ButtonConfirmed>
                    <ButtonError
                      onClick={() => {
                        if (isExpertMode) {
                          handleSwap()
                        } else {
                          setSwapState({
                            tradeToConfirm: trade,
                            attemptingTxn: false,
                            swapErrorMessage: undefined,
                            showConfirm: true,
                            txHash: undefined,
                          })
                        }
                      }}
                      width="100%"
                      id="swap-button"
                      disabled={
                        !isValid ||
                        (approvalState !== ApprovalState.APPROVED && signatureState !== UseERC20PermitState.SIGNED) ||
                        priceImpactTooHigh
                      }
                      error={isValid && priceImpactSeverity > 2}
                    >
                      <Text fontSize={16} fontWeight={500}>
                        {priceImpactTooHigh ? (
                          <Trans>High Price Impact</Trans>
                        ) : priceImpactSeverity > 2 ? (
                          <Trans>Swap Anyway</Trans>
                        ) : (
                          <Trans>Swap</Trans>
                        )}
                      </Text>
                    </ButtonError>
                  </AutoColumn>
                </AutoRow>
              ) : (
                <>
                  <ButtonError
                    onClick={() => {
                      userHasSelected.current = true
                      if (isExpertMode) {
                        handleSwap()
                      } else {
                        setSwapState({
                          tradeToConfirm: trade,
                          attemptingTxn: false,
                          swapErrorMessage: undefined,
                          showConfirm: true,
                          txHash: undefined,
                        })
                      }
                    }}
                    id="swap-button"
                    disabled={!isValid || priceImpactTooHigh || !!swapCallbackError}
                    error={isValid && priceImpactSeverity > 2 && !swapCallbackError}
                  >
                    <Text fontSize={20} fontWeight={500}>
                      {swapInputError ? (
                        swapInputError
                      ) : priceImpactTooHigh ? (
                        <Trans>Price Impact Too High</Trans>
                      ) : priceImpactSeverity > 2 ? (
                        <Trans>Swap Anyway</Trans>
                      ) : (
                        <Trans>Swap</Trans>
                      )}
                    </Text>
                  </ButtonError>
                </>
              )}
              {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
            </div>
          </AutoColumn>
        </Wrapper>
      </AppBody>
      {/* <SwitchLocaleLink /> */}
      {/* {isRenderAngo ? (
        <Banner>
          <img
            src={BannerImg1}
            width={'100%'}
            onClick={() => window.open('https://app.angoname.com/', '_blank')}
            style={{ cursor: 'pointer' }}
          />
        </Banner>
      ) : (
        <Banner2>
          <img
            src={BannerImg2}
            width={'100%'}
            onClick={() => window.open('https://app.wraptag.io/', '_blank')}
            style={{ cursor: 'pointer' }}
          />
        </Banner2>
      )} */}
      <Banner>
        <img
          src={isRenderAngo ? BannerImg1 : BannerImg2}
          width={'100%'}
          onClick={() =>
            isRenderAngo ? window.open('https://angoname.com', '_blank') : window.open('https://wraptag.io', '_blank')
          }
          style={{ cursor: 'pointer' }}
        />
      </Banner>
      {!swapIsUnsupported ? null : (
        <UnsupportedCurrencyFooter
          show={swapIsUnsupported}
          currencies={[currencies[Field.INPUT], currencies[Field.OUTPUT]]}
        />
      )}
      <Chains>
        <ChainItem href='https://swap-eth.keyring.app/#/swap' target='_blank'>
          <ChainLogo src={CHAIN_INFO[SupportedChainId.MAINNET].logoUrl} />
          <ChainLabel>Ethereum</ChainLabel>
        </ChainItem>
        <ChainItem href='https://swap-bsc.keyring.app/#/swap' target='_blank'>
          <ChainLogo src={CHAIN_INFO[SupportedChainId.BSC_MAINNET].logoUrl} />
          <ChainLabel>BSC</ChainLabel>
        </ChainItem>
        <ChainItem href='https://swap-polygon.keyring.app/#/swap' target='_blank'>
          <ChainLogo src={CHAIN_INFO[SupportedChainId.POLYGON_MAINET].logoUrl} />
          <ChainLabel>Polygon</ChainLabel>
        </ChainItem>
      </Chains>
    </>
  )
}
