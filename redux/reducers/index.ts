import { combineReducers } from "redux";
import walletReducer from "./walletReducer";

const rootReducer = combineReducers({
  customer: walletReducer,
});

export default rootReducer;
