import { useModalOpen, useNWSModalToggle } from '../../state/application/hooks'
import { ApplicationModal } from '../../state/application/reducer'
import Modal from '../Modal'
import { NetworkSelectorBacoor } from './NetworkSelectorBacoor'

export default function NetworkSelectorBacoorModal() {
  const nwsModalOpen = useModalOpen(ApplicationModal.NWSBACOOR)
  const toggleEmptyModal = useNWSModalToggle()
  return (
    <Modal isOpen={nwsModalOpen} onDismiss={toggleEmptyModal}>
      <NetworkSelectorBacoor onDismiss={toggleEmptyModal} />
    </Modal>
  )
}
