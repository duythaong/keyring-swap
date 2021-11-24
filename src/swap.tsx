import React, { useState } from 'react'

import { BACOOR_SWAP } from './constants/addresses'

interface ISwap {
  name: string
  setName?: React.Dispatch<React.SetStateAction<string>>
}

const defaultState = {
  name: BACOOR_SWAP,
}

const SwapContext = React.createContext<ISwap>(defaultState)

const SwapProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState<string>(BACOOR_SWAP)

  return <SwapContext.Provider value={{ name, setName }}>{children}</SwapContext.Provider>
}

export { SwapContext, SwapProvider }
