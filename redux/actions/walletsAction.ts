import axios from "axios";
import { Dispatch } from "redux";
import { Action } from "redux/reducers/walletReducer";
import { Wallet } from "redux/reducers/walletReducer";

export const loadWallets = () => async (dispatch: Dispatch<Action>) => {
  let wallets: Wallet[] = [];
  let currentWallet: Wallet = {};

  try {
    wallets = (await axios.get("/api/wallet")).data;
    currentWallet = wallets[0];
  } catch (error) {
    console.error(error);
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
  dispatch: Dispatch<Action>
) => {
  try {
    await axios.put(`/api/wallet/${id}`, {
      data: newName,
    });

    dispatch({
      type: "CHANGE_WALLET_NAME",
      payload: { id, newName },
    });
  } catch (error) {}
};
