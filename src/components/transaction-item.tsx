import { useContextTransactions } from "../hooks/useContext";

type Props = { label: string; amount: number; id: string };

const TransactionItem = ({ label, amount, id }: Props) => {
  const isPositiveAmount = amount > 0;

  const { deleteTransaction } = useContextTransactions();

  return (
    <div className="shadow rounded-3 bg-white d-flex justify-content-between align-items-center px-3 py-2">
      <div className="d-flex align-items-center gap-2">
        <div
          className={`circle ${
            isPositiveAmount ? "circleGreen" : "circleRed"
          }`}></div>
        <h3 className="fs-6 mb-0">{label}</h3>
      </div>
      <div>
        <p className={`fs-6 mb-0 ${isPositiveAmount ? "green" : "red"}`}>
          {isPositiveAmount ? "+" : "-"}${Math.abs(amount).toFixed(2)}
        </p>
      </div>
      {/* <button onClick={() => deleteTransaction(id)}>X</button> */}
    </div>
  );
};

export default TransactionItem;
