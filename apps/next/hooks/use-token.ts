import { MOXIE_ADDRESS } from "@anon/utils/src/config";
import React from "react";
import type { Address } from "viem";

interface State {
  address: Address;
}

const memoryState: State = { address: MOXIE_ADDRESS }

function useToken() {
  const [state, setState] = React.useState<State>(memoryState)

  function setAddress(newAddress: Address): void {
    setState({
      ...state,
      address: newAddress
    })
  }

  return {
    ...state,
    setAddress
  }
}

export { useToken }
