import { AnyAction } from "redux";

export type NotificationType = "success" | "failed" | "info";

type Notification = {
  type: NotificationType;
  message: string;
};

type Payload = Notification[];

const initState: Payload = [];

const notificationReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case "PUSH": {
      state.push(action.payload);
      return [...state];

      break;
    }
    default:
      return [...state];
  }
};

export default notificationReducer;
