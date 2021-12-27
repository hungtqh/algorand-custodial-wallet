import { Dispatch } from "react";
import { Action } from "redux/reducers/transactionReducer";
import { Transaction } from "redux/reducers/transactionReducer";
import axios from "axios";

export const loadTransactions = (walletAddress: string) => async (
  dispatch: Dispatch<Action>
) => {
  let transactions: Transaction[] = [];

  try {
    transactions = (
      await axios.get(`/api/wallet/transactions/${walletAddress}`)
    ).data.transactions;
  } catch (error) {
    console.error(error);
  }

  dispatch({
    type: "FETCH_TRANSACTIONS",
    payload: { transactions },
  });
};
