const AppReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_TRANSACTIONS":
      return {
        ...state,
        transactions: action.payload,
      };
    case "DELETE_TRANSACTION":
      fetch(`http://localhost:3000/transactions/${action.payload}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return {
        ...state,
        transactions: state.transactions.filter(
          transaction => transaction.id !== action.payload
        ),
      };
    case "ADD_TRANSACTION":
      fetch("http://localhost:3000/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.payload),
      });
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    default:
      return state;
  }
};

export default AppReducer;
