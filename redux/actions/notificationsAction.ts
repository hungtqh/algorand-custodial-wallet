import { Dispatch } from "react";
import { AnyAction } from "redux";
import { NotificationType } from "redux/reducers/notificationReducer";

export const pushNotification = (
  type: NotificationType,
  message: string
) => async (dispatch: Dispatch<AnyAction>) => {
  dispatch({
    type: "PUSH",
    payload: { type, message },
  });
};
