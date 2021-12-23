import { AnyAction } from "redux";

export type Wallet = {
  address: string;
};

type Payload = {
  wallets?: Wallet[];
  currentWallet?: Wallet | {};
};

const initState: Payload = {
  wallets: [],
  currentWallet: {},
};

type ActionTypes = "FETCH_WALLETS" | "SET_CURRENT";

export type Action = {
  type: ActionTypes;
  payload: Payload;
};

const walletReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case "FETCH_WALLETS":
      return {
        ...state,
        wallets: action.payload.wallets,
      };

    case "SET_CURRENT":
      return {
        ...state,
        currentWallet: action.payload.currentWallet,
      };
    default:
      return {
        ...state,
      };
  }
};

export default walletReducer;
