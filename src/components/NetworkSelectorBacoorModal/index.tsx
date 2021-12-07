import ModalBacoor from 'components/ModalBacoor'

import { useModalOpen, useNWSModalToggle } from '../../state/application/hooks'
import { ApplicationModal } from '../../state/application/reducer'
import { NetworkSelectorBacoor } from './NetworkSelectorBacoor'

export default function NetworkSelectorBacoorModal() {
  const nwsModalOpen = useModalOpen(ApplicationModal.NWSBACOOR)
  const toggleEmptyModal = useNWSModalToggle()
  return (
    <ModalBacoor isOpen={nwsModalOpen} onDismiss={toggleEmptyModal}>
      <NetworkSelectorBacoor onDismiss={toggleEmptyModal} />
    </ModalBacoor>
  )
}
