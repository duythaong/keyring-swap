import { Trans } from '@lingui/macro'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import doneIcon from 'assets/images/circle_done.svg'
import { AutoColumn } from 'components/Column'
import { AutoRow, RowBetween } from 'components/Row'
import { PaddedColumn } from 'components/SearchModal/styleds'
import { CHAIN_INFO, SupportedChainId } from 'constants/chains'
import { SUPPORTED_WALLETS } from 'constants/wallet'
import { useWalletConnectMonitoringEventCallback } from 'hooks/useMonitoringEventCallback'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback, useState } from 'react'
import ReactGA from 'react-ga'
import { updateChainId } from 'state/application/reducer'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import styled, { css } from 'styled-components/macro'
import { CloseIcon, TYPE } from 'theme'
import { supportedChainId } from 'utils/supportedChainId'
import { switchToNetwork } from 'utils/switchToNetwork'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: auto;
`

const WalletConnectStep = styled.span`
  display: inline-block;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background-color: #212a3b;
  color: #7e96b8;
`
const BodyText = styled.span`
  font-weight: 500;
  font-size: 16px;
  margin-top: 5px;
`
const SubText = styled.div`
  font-weight: 400;
  font-size: 14px;
  padding-top: 7px;
`

const Textblue = styled.span`
  color: #5599ff;
`
const Checkbox = styled.input`
  border: 1px solid white;
  height: 20px;
  margin: 0;
`
const StepContainer = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr;
  grid-column-gap: 12px;
`

const NetworkContainer = styled.div`
  display: grid;
  grid-column: 1 / span 2;
  grid-template-columns: 1fr 1fr 1fr;
`
const NetworkItem = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  border-radius: 16px;
  cursor: pointer;
`
const SelectedIconWrapper = styled.div`
  position: absolute;
  padding: 2px;
  border-radius: 50%;
  bottom: -2px;
  right: -2px;
  color: #21c187;
`

const NetworkImgWrap = styled.div`
  position: relative;
`

const NetworkImg = styled.img<{ isConfirm: boolean }>`
  border-radius: 50%;
  margin: auto;
  width: 60px;
  height: 60px;
  ${(props) => css`
    filter: ${!props.isConfirm ? 'grayscale(100%)' : ''};
  `}
`

const SelectedIcon = styled.img<{ isConfirm: boolean }>`
  vertical-align: middle;
  border-style: none;
  ${(props) => css`
    filter: ${!props.isConfirm ? 'grayscale(100%)' : ''};
  `}
`

const WalletContainer = styled.div`
  display: grid;
  grid-column: 1 / span 2;
  grid-template-columns: 1fr 1fr 1fr;
  // min-height: 400px;
`

const WalletItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  border-radius: 16px;
  cursor: pointer;
  // max-height: 105px;
`

interface ImportProps {
  onDismiss?: () => void
}
// ============================================================================================================
function NetworkElement({ targetChain, confirmed }: { targetChain: number; confirmed: boolean }) {
  const { chainId: chainIdWeb3, library, account, activate } = useActiveWeb3React()
  const chainId = useAppSelector((state) => state.application.chainId)
  const active = chainId === targetChain
  const isOptimism = targetChain === SupportedChainId.OPTIMISM
  const networkName = `${CHAIN_INFO[targetChain].label}${isOptimism ? ' (Optimism)' : ''}`

  const dispatch = useAppDispatch()

  const handleElementClick = () => {
    if (confirmed) {
      dispatch(updateChainId({ chainId: targetChain ? supportedChainId(targetChain) ?? null : null }))
    }
  }

  const ElementContent = useCallback(
    () => (
      <NetworkItem onClick={handleElementClick} active={active}>
        <NetworkImgWrap>
          <NetworkImg src={CHAIN_INFO[targetChain].logoUrl} isConfirm={confirmed}></NetworkImg>
          {active && (
            <SelectedIconWrapper>
              <SelectedIcon src={doneIcon} isConfirm={confirmed}></SelectedIcon>
            </SelectedIconWrapper>
          )}
        </NetworkImgWrap>
        <SubText>{networkName}</SubText>
      </NetworkItem>
    ),
    [targetChain, confirmed, networkName, chainId]
  )

  if (!library || !chainId) {
    return null
  }

  return <ElementContent />
}
// ============================================================================================================
function WalletElement({ wallet, confirmed }: { wallet: string; confirmed: boolean }) {
  const { chainId: chainIdWeb3, library, account, activate } = useActiveWeb3React()
  const chainId = useAppSelector((state) => state.application.chainId)
  const logMonitoringEvent = useWalletConnectMonitoringEventCallback()

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    let name = ''
    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name)
      }
      return true
    })
    // log selected wallet
    ReactGA.event({
      category: 'Wallet',
      action: 'Change Wallet',
      label: name,
    })

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector) {
      connector.walletConnectProvider = undefined
    }

    connector &&
      activate(connector, undefined, true)
        .then(async () => {
          const walletAddress = await connector.getAccount()
          logMonitoringEvent({ walletAddress })
        })
        .catch((error) => {
          if (error instanceof UnsupportedChainIdError) {
            activate(connector) // a little janky...can't use setError because the connector isn't set
          }
        })
  }

  const handleElementClick = () => {
    if (confirmed) {
      tryActivation(SUPPORTED_WALLETS[wallet].connector)
    }
  }

  const ElementContent = useCallback(
    () => (
      <WalletItem onClick={handleElementClick}>
        <NetworkImgWrap>
          <NetworkImg src={SUPPORTED_WALLETS[wallet].iconURL} isConfirm={confirmed}></NetworkImg>
        </NetworkImgWrap>
        <SubText>{SUPPORTED_WALLETS[wallet].name}</SubText>
      </WalletItem>
    ),
    [wallet, confirmed]
  )

  if (!library || !chainId) {
    return null
  }

  return <ElementContent />
}

function renderWalletByChain(chainId: number | null, confirmed: boolean) {
  const arr = Object.keys(SUPPORTED_WALLETS).filter((key) => {
    return SUPPORTED_WALLETS[key].chainSupport.includes(chainId || 1)
  })

  return arr.map((ele, index) => {
    return <WalletElement key={index} wallet={ele.toString()} confirmed={confirmed} />
  })
}
// ============================================================================================================
export function NetworkSelectorBacoor(props: ImportProps) {
  const { onDismiss } = props
  const [confirmed, setConfirmed] = useState(false)
  const chainId = useAppSelector((state) => state.application.chainId)

  return (
    <Wrapper>
      <PaddedColumn gap="14px" style={{ width: '100%', flex: '1 1', paddingBottom: 0 }}>
        <RowBetween>
          <TYPE.smallHeader>
            <p>Connect Wallet</p>
          </TYPE.smallHeader>
          {onDismiss ? <CloseIcon onClick={onDismiss} /> : <div />}
        </RowBetween>
      </PaddedColumn>
      <AutoColumn gap="md" style={{ padding: '0 1rem 1rem 1rem' }}>
        <StepContainer>
          <WalletConnectStep>1</WalletConnectStep>
          <BodyText>
            <Trans>
              Accept <Textblue>Terms of Service </Textblue> and <Textblue>Privacy Policy</Textblue>
            </Trans>
            <AutoRow
              justify="flex-start"
              style={{ cursor: 'pointer', marginTop: '5px' }}
              onClick={() => setConfirmed(!confirmed)}
            >
              <Checkbox
                name="confirmed"
                type="checkbox"
                checked={confirmed}
                onChange={() => setConfirmed(!confirmed)}
              />
              <TYPE.body ml="10px" fontSize="16px" fontWeight={500}>
                <Trans>I read and accept</Trans>
              </TYPE.body>
            </AutoRow>
          </BodyText>
        </StepContainer>
      </AutoColumn>
      <AutoColumn gap="md" style={{ padding: '0 1rem 1rem 1rem' }}>
        <StepContainer>
          <WalletConnectStep>2</WalletConnectStep>
          <BodyText>
            <Trans>Choose Network</Trans>
          </BodyText>
        </StepContainer>
      </AutoColumn>
      <AutoColumn gap="md" style={{ padding: '0 1rem 1rem 1rem' }}>
        <NetworkContainer>
          <NetworkElement targetChain={SupportedChainId.MAINNET} confirmed={confirmed} />
          <NetworkElement targetChain={SupportedChainId.POLYGON_MAINET} confirmed={confirmed} />
        </NetworkContainer>
      </AutoColumn>
      <AutoColumn gap="md" style={{ padding: '0 1rem 1rem 1rem' }}>
        <StepContainer>
          <WalletConnectStep>3</WalletConnectStep>
          <BodyText>
            <Trans>Choose Wallet</Trans>
          </BodyText>
        </StepContainer>
      </AutoColumn>
      <AutoColumn gap="md" style={{ padding: '0 1rem 1rem 1rem' }}>
        <WalletContainer>{renderWalletByChain(chainId, confirmed)}</WalletContainer>
      </AutoColumn>
    </Wrapper>
  )
}
