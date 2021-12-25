import { AnyAction } from "redux";

export type Wallet = {
  id?: string;
  address?: string;
  name?: string;
  balance?: string;
};

type Payload = {
  wallets?: Wallet[];
  currentWalletId?: string;
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
        currentWallet: action.payload.currentWallet,
      };

    case "SET_CURRENT":
      const currentWallet = state.wallets?.find(
        (wallet) => wallet.id === action.payload.currentWalletId
      );

      return {
        ...state,
        currentWallet: currentWallet,
      };
    default:
      return {
        ...state,
      };
  }
};

export default walletReducer;
