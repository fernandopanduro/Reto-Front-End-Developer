import { useContext } from "react";
import { GlobalContext } from "../context/GlobalProvider";

export function useContextTransactions() {
  const context = useContext(GlobalContext);

  if (context === undefined) {
    throw new Error("useContext not found");
  }

  return context;
}
