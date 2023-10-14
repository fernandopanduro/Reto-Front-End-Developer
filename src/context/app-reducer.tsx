import { toast } from "sonner";
import { API_BASE_URL, TRANSACTION_TYPE } from "../constants";

const AppReducer = (state: any, action: any) => {
  switch (action.type) {
    case TRANSACTION_TYPE.SET:
      return {
        ...state,
        transactions: action.payload,
      };
    case TRANSACTION_TYPE.DELETE:
      try {
        fetch(`${API_BASE_URL}/${action.payload}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        toast.success("Se elimino la transacción correctamente");
      } catch (error) {
        console.log("DELETE_TRANSACTION", error);
        toast.error("Algo salio mal, vuelve a intentarlo");
      }
      return {
        ...state,
        transactions: state.transactions.filter(
          transaction => transaction.id !== action.payload
        ),
      };
    case TRANSACTION_TYPE.ADD:
      try {
        fetch(API_BASE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(action.payload),
        });
        toast.success("Se añadio la transacción correctamente");
      } catch (error) {
        console.log("[ADD_TRANSACTION]", error);
        toast.error("Algo salio mal, vuelve a intentarlo");
      }
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    default:
      return state;
  }
};

export default AppReducer;
