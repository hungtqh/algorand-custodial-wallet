import { AnyAction } from "redux";

export type NotificationType = "success" | "error" | "info";

export type Notification = {
  type: NotificationType;
  message: string;
};

export type Payload = {
  notifications: Notification[];
};

const initState: Payload = {
  notifications: [],
};

const notificationReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case "PUSH": {
      const notifications = [...state.notifications, action.payload];
      return { ...state, notifications };

      break;
    }
    // case "SHIFT": {
    //   state.shift();
    //   return [...state];
    // }
    default:
      return { ...state };
  }
};

export default notificationReducer;
