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
      <Button
        onClick={handleShow}
        className="fw-bold btn-modal btn-modal--add fixed-bottom mb-4 mx-auto">
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
          <Modal.Title className="fw-bold acent fs-2">
            Agregar Transacción
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={onSubmit}>
          <Modal.Body className="d-flex flex-column gap-4">
            <div className="form__group">
              <input
                value={text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setText(e.target.value)
                }
                type="text"
                className="form__input"
                name="name"
                id="input-name"
                placeholder=" "
                maxLength={15}
                required
              />
              <label htmlFor="input-name" className="form__label">
                Nombre*
              </label>
            </div>
            <div className="form__group">
              <input
                value={amount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAmount(e.target.value)
                }
                id="amount"
                type="number"
                className="form__input"
                name="name"
                placeholder=" "
                maxLength={7}
                required
              />
              <label htmlFor="amount" className="form__label">
                Monto*
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" className="btn-modal">
              Agregar Transacción
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default ModalForm;
