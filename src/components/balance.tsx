import { GoChevronDown } from "react-icons/go";
import { useContextTransactions } from "../hooks/useContext";

type Props = {};

const Balance = (props: Props) => {
  const { filteredTransactions } = useContextTransactions();

  const amounts = filteredTransactions
    ? filteredTransactions.map(transaction => transaction.amount)
    : [];
  const total = amounts.reduce((acc, curr) => (acc += curr), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  return (
    <div className="p-4 rounded-4 shadow bg-white d-flex flex-column gap-3">
      <div>
        <h1 className="fs-6 text-center mb-0">Balance del mes</h1>
        <p className="total-balance text-center fw-bold fs-1 mb-0">${total}</p>
      </div>
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-column align-items-center w-100 border-end">
          <span className="green">Ingresos</span>
          <strong className="green fs-4">+${income}</strong>
        </div>
        <div className="d-flex flex-column align-items-center w-100">
          <span className="red">Gastos</span>
          <strong className="red fs-4">-${expense}</strong>
        </div>
      </div>
      <div className="w-100 d-flex align-items-center justify-content-center flex-column">
        <span className="text-center text-analytics">Ver analíticas</span>
        <GoChevronDown className="opacity-75" />
      </div>
    </div>
  );
};

export default Balance;
