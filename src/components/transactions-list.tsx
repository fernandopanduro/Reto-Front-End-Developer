import { useState } from "react";
import { useContextTransactions } from "../hooks/useContext";
import TransactionItem from "./transaction-item";

type Props = {};

const TransactionsList = (props: Props) => {
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

  const [activeMonthIndex, setActiveMonthIndex] = useState<number | null>(
    currentMonth
  );

  const handleMonthClick = (month: number, index: number) => {
    setSelectedMonth(month + 1);
    setActiveMonthIndex(index + 1);
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
                onClick={() => handleMonthClick(index, index)}>
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
        {filteredTransactions.map(transaction => (
          <TransactionItem
            key={transaction.id}
            id={transaction.id}
            label={transaction.text}
            amount={transaction.amount}
          />
        ))}
      </div>
    </>
  );
};

export default TransactionsList;
