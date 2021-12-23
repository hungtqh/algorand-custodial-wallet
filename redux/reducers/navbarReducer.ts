import { AnyAction } from "redux";

type State = {
  sideActive: boolean;
};

const initState: State = {
  sideActive: false,
};

const navbarReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case "TOGGLE_BURGER":
      return {
        ...state,
        sideActive: !state.sideActive,
      };
    default:
      return { ...state };
  }
};

export default navbarReducer;
