import Notification from "./notification";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useEffect, useState } from "react";
import { Notification as NotificationType } from "redux/reducers/notificationReducer";

export default function Notifications() {
  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );

  const [show, setShow] = useState(false);

  const [alert, setAlert] = useState<NotificationType>({
    type: "info",
    message: "",
  });

  useEffect(() => {
    if (notifications.length > 0) {
      setAlert(notifications[notifications.length - 1]);
      setShow(true);
    }
  }, [notifications]);

  return show ? (
    <div className="absolute z-50 bottom-5 right-5 w-[20rem] md:w-[25rem] lg:w-[30rem] flex justify-end">
      <Notification
        setShow={setShow}
        type={alert.type}
        message={alert.message}
      />
    </div>
  ) : null;
}
