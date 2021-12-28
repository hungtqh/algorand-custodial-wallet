import { AnyAction } from "redux";

export type Transaction = {
  id?: string;
  "payment-transaction"?: {
    amount?: number;
    receiver?: string;
  };
  sender?: string;
  "round-time"?: number;
  fee?: number;
};

type Payload = {
  transactions: Transaction[];
  isLoading: boolean;
};

type ActionTypes = "FETCH_TRANSACTIONS" | "LOADING_TRANSACTIONS";

export type Action = {
  type: ActionTypes;
  payload: Payload;
};

const initState: Payload = {
  transactions: [],
  isLoading: false,
};

const transactionReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case "FETCH_TRANSACTIONS":
      return {
        ...state,
        transactions: action.payload.transactions,
        isLoading: false,
      };

    case "LOADING_TRANSACTIONS":
      return {
        ...state,
        isLoading: true,
      };

    default:
      return {
        ...state,
      };
  }
};

export default transactionReducer;
