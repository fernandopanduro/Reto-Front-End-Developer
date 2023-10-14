import { createContext, useEffect, useReducer, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import AppReducer from "./app-reducer";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }: any) => {
  const { data } = useFetch(
    "http://localhost:3000/transactions?_sort=createdAt&_order=desc"
  );
  const [state, dispatch] = useReducer(AppReducer, { transactions: [] });
  const [filteredTransactions, setFilteredTransactions] = useState();

  useEffect(() => {
    if (data) {
      dispatch({ type: "SET_TRANSACTIONS", payload: data });
    }
  }, [data]);

  function deleteTransaction(id: string) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }
  function addTransaction(transaction: any) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const [selectedMonth, setSelectedMonth] = useState<number | null>(
    currentMonth
  );

  const filterTransactionsByMonth = (
    transactions: any,
    targetMonth: number
  ) => {
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.createdAt);
      return transactionDate.getMonth() === targetMonth;
    });
  };

  useEffect(() => {
    if (data) {
      setFilteredTransactions(
        selectedMonth !== null
          ? filterTransactionsByMonth(data, selectedMonth)
          : filterTransactionsByMonth(data, currentMonth)
      );
    }
  }, [data, selectedMonth, state]);

  useEffect(() => {
    setFilteredTransactions(
      selectedMonth !== null
        ? filterTransactionsByMonth(state.transactions, selectedMonth)
        : filterTransactionsByMonth(state.transactions, currentMonth)
    );
  }, [state, selectedMonth]);

  return (
    <GlobalContext.Provider
      value={{
        deleteTransaction,
        addTransaction,
        filteredTransactions,
        setFilteredTransactions,
        selectedMonth,
        setSelectedMonth,
        currentMonth,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
