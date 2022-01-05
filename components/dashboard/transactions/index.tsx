import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { loadTransactions } from "redux/actions/transactionsAction";
import { Transaction as transactionType } from "redux/reducers/transactionReducer";
import Transaction from "./transaction";
import Loading from "components/loading";

export default function Transactions() {
  const { currentWallet, transactions, isLoadingTransactions } = useSelector(
    (state: RootState) => {
      return {
        currentWallet: state.customer.currentWallet,
        transactions: state.currentWalletTransactions.transactions,
        isLoadingTransactions: state.currentWalletTransactions.isLoading,
      };
    }
  );
  const dispatch = useDispatch();

  const currentWalletLoaded = Object.keys(currentWallet).length > 0;

  useEffect(() => {
    if (currentWalletLoaded && currentWallet.address) {
      dispatch({ type: "LOADING_TRANSACTIONS" });
      dispatch(loadTransactions(currentWallet.address));
    }
  }, [currentWallet]);

  return (
    <div className="overflow-y-scroll h-[100%]">
      {!isLoadingTransactions && currentWalletLoaded ? (
        transactions.map((t: transactionType, index: number) => (
          <Transaction
            key={index}
            id={t.id}
            amount={t["payment-transaction"]?.amount}
            sender={t.sender}
            time={t["round-time"]}
            receiver={t["payment-transaction"]?.receiver}
            fee={t.fee}
          />
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
}
