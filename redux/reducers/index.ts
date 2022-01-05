import { combineReducers } from "redux";
import walletReducer from "./walletReducer";
import navbarReducer from "./navbarReducer";
import transactionReducer from "./transactionReducer";
import notificationReducer from "./notificationReducer";

const appReducer = combineReducers({
  customer: walletReducer,
  navbar: navbarReducer,
  currentWalletTransactions: transactionReducer,
  notifications: notificationReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "USER_LOGOUT") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
