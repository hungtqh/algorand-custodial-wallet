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
  id?: string;
  newName?: string;
};

const initState: Payload = {
  wallets: [],
  currentWallet: {},
};

type ActionTypes = "FETCH_WALLETS" | "SET_CURRENT" | "CHANGE_WALLET_NAME";

export type Action = {
  type: ActionTypes;
  payload: Payload;
};

const walletReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case "FETCH_WALLETS": {
      return {
        ...state,
        wallets: action.payload.wallets,
        currentWallet: action.payload.currentWallet,
      };

      break;
    }

    case "SET_CURRENT": {
      const currentWallet = state.wallets?.find(
        (wallet) => wallet.id === action.payload.currentWalletId
      );

      return {
        ...state,
        currentWallet: currentWallet,
      };

      break;
    }

    case "CHANGE_WALLET_NAME": {
      const wallets = state.wallets?.map((wallet) => {
        if (wallet.id === action.payload.id) {
          wallet.name = action.payload.newName;
        }
        return wallet;
      });

      const currentWallet = state.currentWallet as Wallet;
      if (action.payload.id === currentWallet.id) {
        currentWallet.name = action.payload.newName;
      }

      return {
        ...state,
        wallets,
        currentWallet,
      };

      break;
    }

    default:
      return {
        ...state,
      };
  }
};

export default walletReducer;
