import axios from "axios";
import { AnyAction, Dispatch } from "redux";
import { Action } from "redux/reducers/walletReducer";
import { Wallet } from "redux/reducers/walletReducer";
import { pushNotification } from "redux/actions/notificationsAction";

export const loadWallets = (setCurrent: boolean = true) => async (
  dispatch: Dispatch<Action>
) => {
  let wallets: Wallet[] = [];
  let currentWallet: Wallet | undefined = undefined;

  dispatch({
    type: "WALLETS_LOADING",
  });

  try {
    wallets = (await axios.get("/api/wallet")).data;
    if (setCurrent) {
      currentWallet = wallets[0] || {};
    }
  } catch (error: any) {
    console.error(error);
    dispatch(pushNotification("error", "failed to load wallets") as any);
  }

  dispatch({
    type: "FETCH_WALLETS",
    payload: { wallets, currentWallet },
  });
};

export const setCurrentWallet = (id: string) => async (
  dispatch: Dispatch<Action>
) => {
  let currentWalletId = id;

  dispatch({
    type: "SET_CURRENT",
    payload: { currentWalletId },
  });
};

export const changewalletName = (id: string, newName: string) => async (
  dispatch: Dispatch<AnyAction>
) => {
  try {
    await axios.put(`/api/wallet/${id}`, {
      name: newName,
    });

    dispatch({
      type: "CHANGE_WALLET_NAME",
      payload: { id, newName },
    });

    dispatch(pushNotification("success", "wallet name changed") as any);
  } catch (error: any) {
    console.error(error);
    dispatch(pushNotification("error", "failed to change wallet name") as any);
  }
};
