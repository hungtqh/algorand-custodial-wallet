import { combineReducers } from "redux";
import walletReducer from "./walletReducer";
import navbarReducer from "./navbarReducer";

const rootReducer = combineReducers({
  customer: walletReducer,
  navbar: navbarReducer,
});

export default rootReducer;
