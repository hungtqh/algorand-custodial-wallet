import { Dispatch } from "react";
import { AnyAction } from "redux";
import { NotificationType } from "redux/reducers/notificationReducer";

export const pushNotification = (type: NotificationType, message: string) => (
  dispatch: Dispatch<AnyAction>
) => {
  dispatch({
    type: "PUSH",
    payload: { type, message },
  });
};

export const shiftNotification = () => (dispatch: Dispatch<AnyAction>) => {
  dispatch({
    type: "SHIFT",
  });
};
