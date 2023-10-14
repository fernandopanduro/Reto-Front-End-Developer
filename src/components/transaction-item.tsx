import { Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import { GoChevronDown } from "react-icons/go";
import { useContextTransactions } from "../hooks/useContext";

type Props = { label: string; amount: number; id: string };

function CustomToggle({ eventKey }: { eventKey: string }) {
  const decoratedOnClick = useAccordionButton(eventKey, () => {});
  return (
    <Button
      variant="light"
      type="button"
      className="p-1 py-0"
      onClick={decoratedOnClick}>
      <GoChevronDown />
    </Button>
  );
}

const TransactionItem = ({ label, amount, id }: Props) => {
  const isPositiveAmount = amount > 0;

  const { deleteTransaction } = useContextTransactions();

  return (
    <>
      <Accordion>
        <Card className="shadow rounded-3 bg-white">
          <Card.Header className="d-flex justify-content-between align-items-center px-3 py-2">
            <div className="d-flex align-items-center gap-2">
              <div
                className={`icon ${
                  isPositiveAmount ? "squareGreen" : "circleRed"
                }`}></div>
              <h3 className="fs-6 fw-semibold mb-0">{label}</h3>
            </div>
            <div className="d-flex gap-1 align-items-center">
              <p
                className={`fs-6 fw-bold mb-0 ${
                  isPositiveAmount ? "green" : "red"
                }`}>
                {isPositiveAmount ? "+" : "-"}${Math.abs(amount).toFixed(2)}
              </p>
              <CustomToggle eventKey="0" />
            </div>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="d-flex justify-content-end py-2">
              <Button onClick={() => deleteTransaction(id)} variant="danger">
                Eliminar
              </Button>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      {/* <div className="shadow rounded-3 bg-white d-flex justify-content-between align-items-center px-3 py-2">
        <div className="d-flex align-items-center gap-2">
          <div
            className={`icon ${
              isPositiveAmount ? "squareGreen" : "circleRed"
            }`}></div>
          <h3 className="fs-6 fw-semibold mb-0">{label}</h3>
        </div>
        <div className="d-flex gap-1 align-items-center">
          <p
            className={`fs-6 fw-bold mb-0 ${
              isPositiveAmount ? "green" : "red"
            }`}>
            {isPositiveAmount ? "+" : "-"}${Math.abs(amount).toFixed(2)}
          </p>
          <Button onClick={() => deleteTransaction(id)} variant="danger">
            Eliminar
          </Button>
          <CustomToggle eventKey="0" />
        </div>
      </div> */}
    </>
  );
};

export default TransactionItem;
