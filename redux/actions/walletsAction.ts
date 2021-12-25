import axios from "axios";
import { Dispatch } from "redux";
import { Action } from "redux/reducers/walletReducer";
import { Wallet } from "redux/reducers/walletReducer";

export const loadWallets = () => async (dispatch: Dispatch<Action>) => {
  let wallets: Wallet[] = [];

  try {
    wallets = (await axios.get("/api/wallet")).data;
  } catch (error) {
    console.error(error);
  }
  dispatch({
    type: "FETCH_WALLETS",
    payload: { wallets },
  });
};

export const setCurrentWallet = (id: string) => async (
  dispatch: Dispatch<Action>
) => {
  let currentWallet = (await axios.get(`/api/wallet/${id}`)).data;

  dispatch({
    type: "SET_CURRENT",
    payload: { currentWallet },
  });
};
