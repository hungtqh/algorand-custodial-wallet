import { combineReducers } from "redux";
import walletReducer from "./walletReducer";
import navbarReducer from "./navbarReducer";
import transactionReducer from "./transactionReducer";
import notificationReducer from "./notificationReducer";

const rootReducer = combineReducers({
  customer: walletReducer,
  navbar: navbarReducer,
  currentWalletTransactions: transactionReducer,
  notifications: notificationReducer,
});

export default rootReducer;
