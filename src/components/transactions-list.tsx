import { useEffect, useRef, useState } from "react";
import { useContextTransactions } from "../hooks/useContext";
import TransactionItem from "./transaction-item";

const TransactionsList = () => {
  const { filteredTransactions, setSelectedMonth, currentMonth } =
    useContextTransactions();

  if (filteredTransactions === undefined) return null;

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const [activeMonthIndex, setActiveMonthIndex] = useState<number | undefined>(
    currentMonth
  );

  useEffect(() => {
    setActiveMonthIndex(currentMonth);
  }, [currentMonth]);

  const prevDateRef = useRef<string | null>(null);

  const formatDate = (transactionDate: Date) => {
    const now = new Date();
    const transactionDay = transactionDate.getDate();
    const transactionMonth = transactionDate.getMonth();

    if (
      transactionDate.getFullYear() === now.getFullYear() &&
      transactionDate.getMonth() === now.getMonth() &&
      transactionDate.getDate() === now.getDate()
    ) {
      return `Hoy - ${transactionDay} ${monthNames[transactionMonth - 1]}.`;
    } else if (
      transactionDate.getFullYear() === now.getFullYear() &&
      transactionDate.getMonth() === now.getMonth() &&
      transactionDate.getDate() === now.getDate() - 1
    ) {
      return `Ayer - ${transactionDay} ${monthNames[transactionMonth - 1]}.`;
    } else {
      return `${transactionDay} ${monthNames[transactionMonth - 1]}.`;
    }
  };

  return (
    <>
      <header className="fixed-top">
        <nav>
          <ul className="d-flex gap-5">
            {monthNames.map((monthName, index) => (
              <li
                className={`item-month ${
                  index + 1 === activeMonthIndex ? "item-month--current" : ""
                }`}
                key={index}
                onClick={() => {
                  setSelectedMonth(index + 1);
                  setActiveMonthIndex(index + 1);
                }}>
                {monthName}
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <div className="d-flex flex-column gap-2">
        {filteredTransactions.length === 0 && (
          <p className="text-center mb-0">
            <strong>No hay Movimientos</strong>
          </p>
        )}
        {filteredTransactions.map(transaction => {
          const transactionDate = new Date(transaction.createdAt);
          const formattedDate = formatDate(transactionDate);
          const showDate = prevDateRef.current !== formattedDate;
          prevDateRef.current = formattedDate;
          return (
            <div key={transaction.id}>
              {showDate && (
                <p className="mb-0">
                  <strong>{formattedDate}</strong>
                </p>
              )}
              <TransactionItem
                id={transaction.id}
                label={transaction.text}
                amount={transaction.amount}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TransactionsList;
