import { Trans } from '@lingui/macro'
import styled from 'styled-components/macro'

import { ReactComponent as Close } from '../../assets/images/x.svg'
import { useEmptyModalToggle, useModalOpen } from '../../state/application/hooks'
import { ApplicationModal } from '../../state/application/reducer'
import Modal from '../Modal'

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`

const Wrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  margin: 0;
  padding: 0;
  width: 100%;
`

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`

const ContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg0};
  padding: 0 1rem 1rem 1rem;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 0 1rem 1rem 1rem`};
`

const UpperSection = styled.div`
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`

export default function EmptyModal() {
  const emptyModalOpen = useModalOpen(ApplicationModal.EMPTY)
  const toggleEmptyModal = useEmptyModalToggle()

  function getModalContent() {
    return (
      <UpperSection>
        <CloseIcon onClick={toggleEmptyModal}>
          <CloseColor />
        </CloseIcon>
        <HeaderRow>
          <Trans>Hello Mr Triet</Trans>
        </HeaderRow>
        <ContentWrapper>
          <Trans>X100.</Trans>
        </ContentWrapper>
      </UpperSection>
    )
  }

  return (
    <Modal isOpen={emptyModalOpen} onDismiss={toggleEmptyModal} minHeight={false} maxHeight={90}>
      <Wrapper>{getModalContent()}</Wrapper>
    </Modal>
  )
}
