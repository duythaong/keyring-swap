import { Token } from '@uniswap/sdk-core'

import Modal from '../Modal'
import { NetworkSelectorBacoor } from './NetworkSelectorBacoor'

export default function NetworkSelectorModal({
  isOpen,
  onDismiss,
}: {
  isOpen: boolean
  onConfirm: () => void
  onDismiss: () => void
}) {
  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss}>
      <NetworkSelectorBacoor onDismiss={onDismiss} />
    </Modal>
  )
}
