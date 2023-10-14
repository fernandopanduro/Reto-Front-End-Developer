import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useFetch } from "../hooks/useFetch";
import { Transaction, Transactions } from "../types/globals";
import AppReducer from "./app-reducer";

const API_URL =
  "http://localhost:3000/transactions?_sort=createdAt&_order=desc";

const initialState: Transactions = {
  transactions: [],
  deleteTransaction: () => {},
};

export const GlobalContext = createContext<Transactions>(initialState);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useFetch(API_URL);
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[] | undefined
  >();

  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState<number | null>(
    currentMonth
  );

  const filterTransactions = (
    transactions: Transactions,
    targetMonth: number
  ): Transaction[] => {
    return transactions.transactions.filter(transaction => {
      const transactionDate = new Date(transaction.createdAt);
      return transactionDate.getMonth() === targetMonth;
    });
  };

  useEffect(() => {
    if (data) {
      dispatch({ type: "SET_TRANSACTIONS", payload: data });
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setFilteredTransactions(
        selectedMonth !== null
          ? filterTransactions(data, selectedMonth)
          : filterTransactions(data, currentMonth)
      );
    }
  }, [data, selectedMonth, state]);

  useEffect(() => {
    setFilteredTransactions(
      selectedMonth !== null
        ? filterTransactions(state, selectedMonth)
        : filterTransactions(state, currentMonth)
    );
  }, [state, selectedMonth]);

  function deleteTransaction(id: string) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }
  function addTransaction(transaction: Transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }

  const contextValue: Transactions = {
    ...state,
    deleteTransaction,
    addTransaction,
    filteredTransactions,
    setFilteredTransactions,
    selectedMonth,
    setSelectedMonth,
    currentMonth,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
