import "./App.css";
import Balance from "./components/balance";
import ModalForm from "./components/modal-form";
import TransactionsList from "./components/transactions-list";

function App() {
  return (
    <>
      <main className="d-flex flex-column gap-4">
        <Balance />
        <div>
          <div className="d-flex flex-column gap-2">
            <p className="mb-0 fw-bold">Today - 8 Dic</p>
            <TransactionsList />
          </div>
        </div>
        <ModalForm />
      </main>
    </>
  );
}

export default App;
