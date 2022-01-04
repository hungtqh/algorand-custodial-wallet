import { AnyAction } from "redux";

export type NotificationType = "success" | "error" | "info";

type Notification = {
  type: NotificationType;
  message: string;
};

export type Payload = Notification[];

const initState: Payload = [];

const notificationReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case "PUSH": {
      state.push(action.payload);
      return [...state];

      break;
    }
    case "SHIFT": {
      state.shift();
      return [...state];
    }
    default:
      return [...state];
  }
};

export default notificationReducer;
