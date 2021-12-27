import { combineReducers } from "redux";
import walletReducer from "./walletReducer";
import navbarReducer from "./navbarReducer";
import transactionReducer from "./transactionReducer";

const rootReducer = combineReducers({
  customer: walletReducer,
  navbar: navbarReducer,
  currentWalletTransactions: transactionReducer,
});

export default rootReducer;
