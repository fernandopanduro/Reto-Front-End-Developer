import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useContextTransactions } from "../hooks/useContext";

function ModalForm() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const { addTransaction } = useContextTransactions();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    const newTransaction = {
      id: crypto.randomUUID(),
      text,
      createdAt: formattedDate,
      amount: +amount,
    };

    addTransaction(newTransaction);

    setAmount("");
    setText("");
    handleClose();
  };
  return (
    <>
      <Button onClick={handleShow} className="fw-bold">
        Agregar Movimiento
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
        size="sm"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Agregar Movimiento</Modal.Title>
        </Modal.Header>
        <form onSubmit={onSubmit}>
          <Modal.Body className="d-flex flex-column gap-2">
            <div className="d-flex flex-column gap-1">
              <label htmlFor="name" className="fw-bold w-25 mb-0">
                Nombre:{" "}
              </label>
              <input
                maxLength={20}
                value={text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setText(e.target.value)
                }
                id="name"
                type="text"
                placeholder="Uber"
                className="w-100"
              />
            </div>
            <div className="d-flex flex-column gap-1">
              <label htmlFor="amount" className="fw-bold w-25 mb-0">
                Monto:
              </label>
              <input
                value={amount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAmount(e.target.value)
                }
                id="amount"
                type="number"
                placeholder="500"
                className="w-100"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Crear
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default ModalForm;
