import { Dispatch } from "react";
import { Action } from "redux/reducers/transactionReducer";
import { Transaction } from "redux/reducers/transactionReducer";
import axios from "axios";
import { pushNotification } from "redux/actions/notificationsAction";

export const loadTransactions = (walletAddress: string) => async (
  dispatch: Dispatch<Action>
) => {
  let transactions: Transaction[] = [];

  try {
    transactions = (
      await axios.get(`/api/wallet/transactions/${walletAddress}`)
    ).data.transactions;

    dispatch({
      type: "FETCH_TRANSACTIONS",
      payload: { transactions },
    });
  } catch (error: any) {
    console.error(error);
    dispatch(pushNotification("error", "failed to load transactions") as any);
  }
};
