import { useContextTransactions } from "../hooks/useContext";

type Props = {};

const Filter = (props: Props) => {
/*   const { transactions } = useContextTransactions();

  const filterTransactionsByMonth = (transactions:any, targetMonth: number) => {
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.createdAt);
      return transactionDate.getMonth() === targetMonth;
    });
  };

  const transactionsForCurrentMonth = filterTransactionsByMonth(
    transactions,
    currentMonth
  ); */

  return (
    <header className="fixed-top">
      <nav>
        <ul>
          <li>Enero</li>
          <li>Febrero</li>
          <li>Marzo</li>
          <li>Abril</li>
          <li>Septiembre</li>
          <li>Octubre</li>
        </ul>
      </nav>
    </header>
  );
};

export default Filter;
