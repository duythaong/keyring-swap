import { Trans } from '@lingui/macro'
import doneIcon from 'assets/images/circle_done.svg'
import ethereumLogo from 'assets/images/ethereum-logo.png'
import { AutoColumn } from 'components/Column'
import { AutoRow, RowBetween } from 'components/Row'
import { PaddedColumn } from 'components/SearchModal/styleds'
import { CHAIN_INFO, SupportedChainId } from 'constants/chains'
import { useActiveWeb3React } from 'hooks/web3'
import { useAppSelector } from 'state/hooks'
import styled from 'styled-components/macro'
import { CloseIcon, TYPE } from 'theme'
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

const NetworkImg = styled.img`
  border-radius: 50%;
  margin: auto;
  width: 60px;
  height: 60px;
`

const SelectedIcon = styled.img`
  vertical-align: middle;
  border-style: none;
`

interface ImportProps {
  onDismiss?: () => void
}

export function NetworkSelectorBacoor(props: ImportProps) {
  const { onDismiss } = props
  const { chainId, library } = useActiveWeb3React()
  const implements3085 = useAppSelector((state) => state.application.implements3085)

  function NetworkElement({ targetChain }: { targetChain: number }) {
    if (!library || !chainId || (!implements3085 && targetChain !== chainId)) {
      return null
    }
    const handleElementClick = () => {
      switchToNetwork({ library, chainId: targetChain })
    }
    const active = chainId === targetChain
    const isOptimism = targetChain === SupportedChainId.OPTIMISM
    const networkName = `${CHAIN_INFO[targetChain].label}${isOptimism ? ' (Optimism)' : ''}`
    const ElementContent = () => (
      <NetworkItem onClick={handleElementClick} active={active}>
        <NetworkImgWrap>
          <NetworkImg src={CHAIN_INFO[targetChain].logoUrl}></NetworkImg>
          {active && (
            <SelectedIconWrapper>
              <SelectedIcon src={doneIcon}></SelectedIcon>
            </SelectedIconWrapper>
          )}
        </NetworkImgWrap>
        <SubText>{networkName}</SubText>
      </NetworkItem>
    )

    return <ElementContent />
  }
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
            <AutoRow justify="flex-start" style={{ cursor: 'pointer', marginTop: '5px' }}>
              <Checkbox name="confirmed" type="checkbox" />
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
          <NetworkElement targetChain={SupportedChainId.MAINNET} />
          <NetworkElement targetChain={SupportedChainId.POLYGON_TESTNET} />
          <NetworkElement targetChain={SupportedChainId.TOMOCHAIN_TESNET} />
        </NetworkContainer>
      </AutoColumn>
      {/* <AutoColumn gap="md" style={{ padding: '0 1rem 1rem 1rem' }}>
        <StepContainer>
          <WalletConnectStep>3</WalletConnectStep>
          <BodyText>
            <Trans>Choose Wallet</Trans>
          </BodyText>
        </StepContainer>
      </AutoColumn>
      <AutoColumn gap="md" style={{ padding: '0 1rem 1rem 1rem' }}>
        <NetworkContainer>
          
        </NetworkContainer>
      </AutoColumn> */}
    </Wrapper>
  )
}
