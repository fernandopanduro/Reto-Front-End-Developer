import { GlobalContext } from "../context/global-state";
import { useContext} from 'react'


export function useContextTransactions() {
  const context = useContext(GlobalContext);

  if (context === undefined) {
    throw new Error("useContext not found");
  }

  return context
}
