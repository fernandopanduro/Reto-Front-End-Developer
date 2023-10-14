import Balance from "./components/balance";
import ModalForm from "./components/modal-form";
import TransactionsList from "./components/transactions-list";
import { useContextTransactions } from "./hooks/useContext";

function App() {
  const { currentMonth, selectedMonth } = useContextTransactions();

  return (
    <>
      <main className="d-flex flex-column gap-4">
        <Balance />
        <div>
          <div className="d-flex flex-column gap-2">
            <TransactionsList />
          </div>
        </div>
        {currentMonth === selectedMonth ? (
          <ModalForm />
        ) : (
          <p className="text-center mb-0 balanced">
            <strong>Solo se pueden crear movimientos en el mes actual</strong>
          </p>
        )}
      </main>
    </>
  );
}

export default App;
